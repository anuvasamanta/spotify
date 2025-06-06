"use client";

import { Albums, AlbumSongType, SongType } from "@/interface/song";
import { createContext, FormEvent, useContext, useEffect, useRef, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import toast from "react-hot-toast";
interface Song {
  id: string;
  song_url: string;
}
interface AudioRef {
  current: HTMLAudioElement | null;
}


interface UserContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (state: boolean) => void;
  setAuthToken: (state: string |null) => void;
  setIsLoading: (state: boolean) => void;
  song: SongType[] | null;
  albums: Albums[] | null;
  currentSong: SongType | null | Song;
  isPlaying: boolean;
  audioRef: AudioRef;
  handlePlay: (song: SongType | Song | AlbumSongType) => void
  setIsPlaying: (state: boolean) => void;
  searchQuery: string | null | undefined;
  setSearchQuery: (state:string | null | undefined) => void;
  searchResult: SongType[] | Albums[] | null;
  setSearchResult: (state: SongType[] | Albums[] | null) => void;
  selectedSong?: SongType | Albums | null;
  setSelectedSong: (state:null) => void;
  handelSearch: (event: FormEvent<HTMLFormElement>) => Promise<void>;
}

const AuthContext = createContext<UserContextType | undefined>(undefined);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [authToken, setAuthToken] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>();

  const [song, setSong] = useState<SongType[] | null>(null);
  const [albums, setAlbums] = useState<Albums[] | null>(null);

  const [currentSong, setCurrentSong] = useState<SongType | Song | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [searchQuery, setSearchQuery] = useState<string | null | undefined >("");
  const [searchResult, setSearchResult] = useState<SongType[] | Albums[] | null>([]);
  const [selectedSong, setSelectedSong] = useState<SongType| Albums | null >(null);
  

  // handel search

  const handelSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if ((searchQuery ?? "").trim() === "") {
      setSearchResult([]);
      return;
    }    
    try {
      const { data, error } = await supabase
        .from("song")
        .select("*")
        .ilike("song_title", `%${searchQuery}%`);
      const { data: albumdata, error: albumError } = await supabase
        .from("albums")
        .select("*")
        .ilike("title", `%${searchQuery}%`);
      if (error || albumError) {
        throw new Error("failed to search");
      }
      const result = [...data, ...albumdata];
      console.log("result", result);
      // setSearchResult(result);
      setSelectedSong(result[0]);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(selectedSong);

  // handel audio
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  
  const handlePlay = (song: SongType | Song) => {
    // Check if audioRef is available
    if (!audioRef.current) {
      console.error('Audio element is not available');
      return;
    }
  
    // If the same song is already playing, toggle play/pause
    if (currentSong?.id === song.id) {
      togglePlayPause();
      return;
    }
  
    try {
      // Pause and reset current audio if different song is selected
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
  
      // Validate and set new song URL
      if (!song.song_url) {
        throw new Error('Song URL is missing');
      }
  
      const songUrl = typeof song.song_url === 'string' ? song.song_url : '';
      if (!songUrl) {
        throw new Error('Invalid song URL format');
      }
  
      // Set new song and play
      audioRef.current.src = songUrl;
      setCurrentSong(song);
      setIsPlaying(true);
  
      // Handle play promise for modern browsers
      const playPromise = audioRef.current.play();
  
      if (playPromise !== undefined) {
        playPromise
          .catch(error => {
            console.error('Playback failed:', error);
            setIsPlaying(false);
            toast.error('Playback failed. Please try again.');
          });
      }
    } catch (error) {
      console.error('Error handling play:', error);
      setIsPlaying(false);
      toast.error('Error playing song');
    }
  };
  // useeffect
  useEffect(() => {
    // song fetching
    const fetchAllSong = async () => {
      const { data, error } = await supabase.from("song").select();

      if (error) {
        setFetchError("could not fetch");
        // setSong(null);
        console.log(error);
        // console.log(fetchError);
      }
      if (data) {
        setSong(data);
        // setFetchError(null);
      }
    };
    fetchAllSong();

    // album fetching
    const fetchAllAlbum = async () => {
      const { data, error } = await supabase.from("albums").select();
      if (error) {
        setFetchError("could not fetch albums");
        console.log("album", error);
      }
      if (data) {
        setAlbums(data);
      }
    };
    fetchAllAlbum();

    // token handeling
    const token = localStorage.getItem("access_token");
    if (token) {
      setAuthToken(token);
      setIsLoggedIn(true);
    }
  }, [setSong, setAlbums, fetchError]);
  // console.log("song",song);
  console.log(authToken);
  console.log(isLoading);
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        setAuthToken,
        setIsLoading,
        song,
        albums,
        currentSong,
        isPlaying,
        audioRef,
        handlePlay,
        setIsPlaying,
        searchQuery,
        setSearchQuery,
        setSearchResult,
        searchResult,
        selectedSong,
        setSelectedSong,
        handelSearch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const MyAppHook = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("App context function must be wrapped");
  }
  return context;
};

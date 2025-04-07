"use client";

import { Albums, SongType } from "@/interface/song";
import { createContext, FormEvent, useContext, useEffect, useRef, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
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
  currentSong: SongType[] | null | any;
  isPlaying: boolean;
  audioRef: AudioRef;
  handlePlay: (song: SongType | Song) => void
  setIsPlaying: (state: boolean) => void;
  searchQuery: string | null | undefined;
  setSearchQuery: (state:string | null | undefined) => void;
  searchResult: SongType[] | Albums[] | null;
  setSearchResult: (state: SongType[] | Albums[] | null) => void;
  selectedSong: SongType[] | Albums[] | null | boolean | any;
  setSelectedSong: (state: boolean) => void;
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

  const [currentSong, setCurrentSong] = useState<SongType[] | null | any>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null | any>(null);

  const [searchQuery, setSearchQuery] = useState<string | null | undefined >("");
  const [searchResult, setSearchResult] = useState<SongType[] | Albums[] | null>([]);
  const [selectedSong, setSelectedSong] = useState<SongType[] | Albums[] | null | boolean >(null);

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

  const handlePlay = (song: SongType  | Song  ) => {
    if (audioRef.current) {
      if (currentSong?.id === song.id) {
        togglePlayPause()
      } else {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.src = song.song_url;
        setCurrentSong(song);
        setIsPlaying(true);
        audioRef.current.play();
      }
    }
  };

  // useeffect
  useEffect(() => {
    // song fetching
    const fetchAllSong = async () => {
      const { data, error } = await supabase.from("song").select();

      if (error) {
        setFetchError("could not fetch");
        setSong(null);
        console.log(error);
        console.log(fetchError);
      }
      if (data) {
        setSong(data);
        setFetchError(null);
      }
    };
    fetchAllSong();

    // album fetching
    const fetchAllAlbum = async () => {
      const { data, error } = await supabase.from("albums").select();
      if (error) {
        setFetchError("could not fetch albums");
        setAlbums(null);
        console.log("album", error);
      }
      if (data) {
        setAlbums(data);
        setFetchError(null);
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

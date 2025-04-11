// components/LikedSongsList.tsx
'use client';

import { SongType } from '@/interface/song';

interface LikedSongsListProps {
  songs: SongType[];
}

export default function LikedSongsList({ songs }: LikedSongsListProps) {
  if (!songs.length) {
    return <div>No liked songs found</div>;
  }

  return (
    <ul className="space-y-2">
      {songs.map((song) => (
        <li key={song.id} className="p-4 border rounded-lg">
          <div className="flex items-center gap-4">
            {/* <img 
              src={song.image_path} 
              alt={song.title} 
              className="w-16 h-16 rounded-md object-cover"
            /> */}
            <div>
              {/* <h3 className="font-semibold">{song.title}</h3>
              <p className="text-gray-600">{song.author}</p> */}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
export interface user {
  id?: string;
  email: string;
  encrypted_password?: string;
  email_confirmed_at?: string;
  raw_user_meta_data: {
   sub?: string;
   email: string;
   fullName: string;
   email_verified?: boolean;
 }
 UID:string|number;
 is_super_admin?: boolean | null;
  created_at?: string;
  updated_at?: string;
}

export interface SongType {
  user_id?: number | string;
  album_title: string;
  artist_name: string;
  song_title: string;
  song_category: string;
  song_img: string | File | null;
  song_url: string | File | null;
  id?:null| string | number;
  album_id?: number | undefined,
  release_date:string | number

}
export interface AlbumSongType {
  user_id?: number | string;
  album_title: string;
  artist_name: string;
  song_title: string;
  song_category: string;
  song_img: string | File | null;
  song_url: string | File | null;
  id?: string | number | null;
  album_id?: number;
  release_date:string | number
}

export interface CurrentType {
  user_id?: number | string;
  album_title: string;
  artist_name: string;
  song_title: string;
  song_category: string;
  song_img: string | File | null;
  song_url: string | File | null;
  id?: null | number | string;
  album_id?: number;
}
export interface ContactType {
  user_id?: number;
  fullname: string;
  email: string;
  message: string;
}
export interface JoinUs {
  user_id?: number;
  fullname: string;
  age: number;
  location: string;
  discodeaccount: number | string;
  facebook: string;
  instagram: string;
  spotify: string;
  twitter: string;
  Q1: string;
  Q2: string;
  Q3: string;
  Q4: string;
}
export interface Albums {
  title: string;
  artist: string;
  release_date: number;
  user_id?: number | string;
  id?: number;
  cover_img?: string | File | null;
}
export interface EditType{
  artist_name:string;
  album_title:string;
  song_title:string;
  release_date:number;
  song_category:string;
  song_url: string | File | null;
}
export interface Forget{
email:  string | undefined
}
export interface CurrentSongType {
  album_title?: string;
  artist_name?: string;
  song_title?: string;
  song_category?: string;
  song_img?: string | File | null;
  id: string | number | null | undefined;
  song_url?: string;
}




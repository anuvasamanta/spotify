

export interface SongType{
   user_id?:number | string,
   album_title:string,
   artist_name:string,
   song_title:string,
   song_category:string ,
   song_img:string | File | null;
   song_url:string | File | null;
   id?:null | number | string ;
   album_id?:number;
};
export interface ContactType{
   user_id?:number,
   fullname:string,
   email:string,
   message:string
};
export interface JoinUs{
   user_id?:number,
   fullname:string,
   age:number,
   location:string,
   discodeaccount:any,
   facebook:string,
   instagram:string,
   spotify:string,
   twitter:string,
   Q1:string,
   Q2:string,
   Q3:string,
   Q4:string
}
export interface Albums{
   title:string;
   artist:string;
   release_date:number;
   user_id?:number | string;
   id?:number;
   cover_img:string | File | null
}



import React from 'react';

const LibrarySong = ({song ,songs , setCurrentSong , id, audioRef ,isPlaying,setSongs})=>{
    const songSelectHandler =()=>{
setCurrentSong(song)
if(isPlaying){
   const playPromise= audioRef.current.play(); 
   if(playPromise !== undefined){
    playPromise.then((audio)=>{
        audioRef.current.play();
    })
   }
}
const newSongs=  songs.map((song)=>{
    if(song.id === id){
        return{
            ...song,
            active: true,
        }
    }else{
        return{
        ...song,
        active: false,
        }
    } 
   })
   setSongs(newSongs)

    }
    return(
        <div onClick={songSelectHandler} className={`library-song ${song.active ? 'selected' : ""}`}>
        <img src={song.cover} alt="cover"></img>
        <div  className="song-desc">
        <h2>{song.name}</h2>
        <h3> {song.artist}</h3>
        </div>
        </div>
    )
    }
export default LibrarySong;
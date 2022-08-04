import React from 'react';

const LibrarySong = ({song ,songs , setCurrentSong})=>{
    const songSelectHandler =()=>{
const selectSong= songs.filter((state)=> state.id === id)
    }
    return(
        <div onClick={songSelectHandler} className="library-song">
        <img src={song.cover} alt="cover"></img>
        <div  className="song-desc">
        <h2>{song.name}</h2>
        <h3> {song.artist}</h3>
        </div>
        </div>
    )
    }
export default LibrarySong;
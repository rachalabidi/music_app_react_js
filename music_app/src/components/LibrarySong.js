import React from 'react';

const LibrarySong = ({song ,songs , setCurrentSong , id })=>{
    const songSelectHandler =()=>{
const selectedSong= songs.filter((state)=> state.id === id)
setCurrentSong(selectedSong[0])
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
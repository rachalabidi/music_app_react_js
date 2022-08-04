import React , { useRef,useState} from "react";
import Song from "./components/Song";
import Player from "./components/Player";
import './style/app.scss';

import data from "./data"
import Library from "./components/Library";

function App() {
  //states
  const [ songs , setSongs] = useState(data()); // THIS ONE FOR SETTING SONGS 
  const [ currentSong , setCurrentSong]= useState(songs[0]); // CHOSSING THE SONG THAT IS PLAYING
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo , setSongInfo]= useState(
    {
        currentTime : 0,
        duration: 0,
    });
  // REF
  const audioRef= useRef(null);


  const timeUpdateHandler =( e)=>{
    const current= e.target.currentTime;
    const duration= e.target.duration;
    setSongInfo({...songInfo, currentTime: current , duration})  }

  return (
    <div className="App">
          <Song
           currentSong={currentSong}
            />
          <Player
          setSongInfo={setSongInfo}
          songInfo ={songInfo}
          audioRef={audioRef}
           currentSong={currentSong}
           isPlaying={isPlaying} 
           setIsPlaying={setIsPlaying}
           />
           <Library 
           audioRef= {audioRef}
           songs={songs}
           setCurrentSong={setCurrentSong}
           isPlaying={isPlaying}
           setSongs={setSongs}
            /> 
             <audio onTimeUpdate={timeUpdateHandler}
            onLoadedMetadata={timeUpdateHandler}
             ref={audioRef} 
             src={currentSong.audio}></audio>      
   </div>
  
  );
}

export default App;

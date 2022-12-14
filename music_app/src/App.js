import React , { useRef,useState} from "react";
import Song from "./components/Song";
import Player from "./components/Player";
import Nav from "./components/Nav";
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
    const [libraryStatus, setLibraryStatus] = useState(false)
  // REF
  const audioRef= useRef(null);


  const timeUpdateHandler =( e)=>{
    const current= e.target.currentTime;
    const duration= e.target.duration;
    setSongInfo({...songInfo, currentTime: current , duration})  }
    const songEndhandler = async()=>{
      let currentIndex = songs.findIndex((song)=> song.id === currentSong.id)
   await setCurrentSong(songs[(currentIndex+1)%songs.length])
   if(isPlaying) audioRef.current.play();
    }

  return (
    <div className={`app ${libraryStatus ? "active-app" : ""}`}>
          <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
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
           songs={songs}
           setCurrentSong={setCurrentSong}
           setSongs={setSongs}

           />
           <Library 
           audioRef= {audioRef}
           songs={songs}
           setCurrentSong={setCurrentSong}
           isPlaying={isPlaying}
           setSongs={setSongs}
           libraryStatus={libraryStatus}
            /> 
             <audio onTimeUpdate={timeUpdateHandler}
            onLoadedMetadata={timeUpdateHandler}
             ref={audioRef} 
             src={currentSong.audio}>
              onEnded={songEndhandler}
            </audio>      
   </div>
  
  );
}

export default App;

import React , {useState} from "react";
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
  return (
    <div className="App">
          <Song
           currentSong={currentSong}
            />
          <Player
           currentSong={currentSong}
           isPlaying={isPlaying} 
           setIsPlaying={setIsPlaying}
           />
           <Library 
           songs={songs}
           setCurrentSong={setCurrentSong}
            />       
   </div>
  
  );
}

export default App;

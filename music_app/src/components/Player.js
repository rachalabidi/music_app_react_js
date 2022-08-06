import React  from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faPlay ,faAngleLeft ,faAngleRight , faPause } from "@fortawesome/free-solid-svg-icons"


const Player =({ currentSong , isPlaying , setIsPlaying , audioRef , songInfo, setSongInfo , songs, setCurrentSong,setSongs})=>{

    // const audioRef= useRef(null);
    const activeLibraryHandler =( nextprev)=>{
        const newSongs=  songs.map((song)=>{
            if(song.id === nextprev.id){
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
    //add events handlers 
    const playSongHandler=()=>{
        if(isPlaying){

            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        }else{
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    }
//     const timeUpdateHandler =( e)=>{
// const current= e.target.currentTime;
// const duration= e.target.duration;
// setSongInfo({...songInfo, currentTime: current , duration})  }
const getTime=(time)=>{
    return(
        Math.floor(time /60) + ":" + ("0"+ Math.floor(time%60)).slice(-2)
    );
}
const dragHandler =(e)=>{
    audioRef.current.currentTime = e.target.value;
    setSongInfo({...songInfo , currentTime:e.target.value})
}
const skip =(direction)=>{
 let currentIndex = songs.findIndex((song)=> song.id === currentSong.id)
  if( direction === "forward"){
    setCurrentSong(songs[(currentIndex+1)%songs.length])
    activeLibraryHandler(songs[(currentIndex+1)%songs.length])
  }
  if(direction === "back"){
    if((currentIndex-1) % songs.length === -1){
        setCurrentSong(songs[(songs.length-1)])
        activeLibraryHandler(songs[(currentIndex-1)%songs.length])

        if(isPlaying){
            const playPromise= audioRef.current.play(); 
            if(playPromise !== undefined){
             playPromise.then((audio)=>{
                 audioRef.current.play();
             })
            }
         }
         return;
    }
    setCurrentSong(songs[(currentIndex-1)%songs.length])

  }
  if(isPlaying){
    const playPromise= audioRef.current.play(); 
    if(playPromise !== undefined){
     playPromise.then((audio)=>{
         audioRef.current.play();
     })
    }
 }
}
    //states
    // const [songInfo , setSongInfo]= useState(
    //     {
    //         currentTime : 0,
    //         duration: 0,
    //     });
    return(
        <div className="player">
            <div className="time-control">
                <p> {getTime(songInfo.currentTime)}</p>
                <input
                 min={0} 
                max={songInfo.duration || 0} 
                value={songInfo.currentTime} 
                onChange={dragHandler}
                type="range">
                     
                </input>
                <p> { songInfo.duration ? getTime(songInfo.duration) : "0:00" }
                </p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon onClick={()=> skip("back")} className="skip-back" size="2x" icon={faAngleLeft} />
                <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={isPlaying ? faPause : faPlay} />
                <FontAwesomeIcon onClick={()=> skip("forward")} className="skip-forwad"  size="2x" icon={faAngleRight} />
            </div>
            {/* <audio onTimeUpdate={timeUpdateHandler}
            onLoadedMetadata={timeUpdateHandler}
             ref={audioRef} 
             src={currentSong.audio}></audio>             <h6>MADE BY : Rasha Labidi :) </h6>
*/}
        </div>
    )
}
export default Player;
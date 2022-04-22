import React, {useRef, useState} from 'react';
import Box from '@mui/material/Box';
import LoadingBar from 'react-top-loading-bar';
import { IconButton } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

// Config
//const websiteURL = "http://localhost:3000/"
const websiteURL = "http://3.99.30.184:8080/"
const s3URL = "https://effiam-bucket.s3.ca-central-1.amazonaws.com/audio/"

const ProcessText = (text, transformationsData, loadingBarRef, handleSetLoading) => {
  //console.log("Processing text: " + text)

  // Loading bar start 
  loadingBarRef.current.continuousStart()

  //test
  //const mergedata = [
      //mydata.instructions,
      //mydata2.instructions,
      //mydata3.instructions
  //]

  //console.log(JSON.stringify(transformationsData))

  //axios.post(websiteURL + 'api/v1/audio-profile/processtext', 
  axios.post(websiteURL + 'api/v1/audio-profile/testjsonPOST', {
    textID: uuidv4(), 
    textData: text,
    instructions: transformationsData
  })

  .then( res => { 
    console.log("playing audio file: " + s3URL + res.data.audioLink)

    // Finish loading bar
    loadingBarRef.current.complete()

    const audio = new Audio(s3URL + res.data.audioLink)
    audio.load()
    PlayAudio(audio)

    // Enable play button again
    handleSetLoading()
  });

  return true;
}

// Receives audio and plays it
const PlayAudio = (audio) => {

  const audioPromise = audio.play()

  if (audioPromise !== undefined) {
    audioPromise
      .then(_ => {
        // autoplay started
      })
      .catch(err => {
        // catch dom exception
        console.info(err)
      })
  }
}

// Play button component receives value from textarea
const ButtonPlay = ({text, transformationsData}) => {
    const loadingBarRef = useRef(null);
    const [loading, setLoading] = React.useState(false);
    const handleSetLoading = () => {
      setLoading(false)
    }
  
    return (
      <Box>
        <LoadingBar color="#f11946" ref={loadingBarRef} shadow={true} height={3} />
  
        <IconButton 
          size="small"
          color="primary" 
          className='button' 
          onClick={ () => {
              setLoading(true)
              ProcessText(text, transformationsData, loadingBarRef, handleSetLoading)
            }
          }
          disabled={loading}
        >
          <PlayArrowIcon />
        </IconButton>
      </Box>
    )
}

const ButtonMusic = ({text, transformationsData}) => {
    const loadingBarRef = useRef(null);
    const [loading, setLoading] = React.useState(false);
    const handleSetLoading = () => {
      setLoading(false)
    }
  
    const [playing, setPlaying] = useState(false);
  
    const audioRef = useRef(null)
  
    const play = () => {
      loadingBarRef.current.continuousStart()
  
      axios.post(websiteURL + 'api/v1/audio-profile/getmidisequence', {
        textID: uuidv4(), 
        textData: text,
        instructions: transformationsData
      })
    
      .then( res => { 
        //console.log("playing audio file: " + s3URL + res.data.audioLink)
        console.log("midi sequence: " + res.data)
    
        // Finish loading bar
        loadingBarRef.current.complete()
    
        //PlayAudio(audio)
        audioRef.current = new Audio(res.data)
        setPlaying(true);
        audioRef.current.play();
    
        // Enable play button again
        handleSetLoading()
      });
    };
  
    const pause = () => {
      setPlaying(false);
      audioRef.current.pause();
    };
  
    const ended = () => {
      setPlaying(false);
    }
  
    return (
      <Box>
        <LoadingBar color="#f11946" ref={loadingBarRef} shadow={true} height={3} />
  
        <IconButton 
          size="small"
          color="secondary" 
          className='button' 
          onClick={playing ? pause : play}
          disabled={loading}
        >
          {playing ? <StopIcon /> : <PlayArrowIcon />} 
        </IconButton>
      </Box>
    )
}

export default ButtonPlay;
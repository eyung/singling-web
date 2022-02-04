import React, {Component, useState, useEffect, useRef, useCallback} from "react";
import ReactDOM from 'react-dom';
import { TextField } from "@mui/material";
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { IconButton } from "@mui/material";
import AnimationIcon from '@mui/icons-material/Animation';
import { PlayArrowOutlined, PlayArrowRounded, StayCurrentLandscapeOutlined } from "@material-ui/icons";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';
import Stack from "@mui/material/Stack";
import './App.css';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import LoadingBar from 'react-top-loading-bar';

// Config
//const websiteURL = "http://localhost:3000/"
const websiteURL = "http://3.99.30.184:8080/"
const s3URL = "https://effiam-bucket.s3.ca-central-1.amazonaws.com/audio/"

var mydata = 
{
  instructions: {
    mod: 'WORDTYPE',
    modValue: '11',
    soundMod: 'INSTRUMENT',
    soundModValue: 'APPLAUSE',
    modOperator: 'EQUALTO',
    changeMode: 'SET',
    sentimentType: 'POSITIVESENTIMENT'
  }
}

var mydata2 =
{
  instructions: {
    mod: 'WORDLENGTH',
    modValue: '5',
    soundMod: 'INSTRUMENT',
    soundModValue: 'GUNSHOT',
    modOperator: 'EQUALTO',
    changeMode: 'SET',
    sentimentType: 'POSITIVESENTIMENT'
  }
}

var mydata3 = 
{
  instructions: {
      mod: 'LGC',
      modValue: '3',
      soundMod: 'OCTAVE',
      soundModValue: '8',
      modOperator: 'EQUALTO',
      changeMode: 'SET',
      sentimentType: 'POSITIVESENTIMENT'
  }
}

var transformationArray = [mydata];

// Header stuff
const Header = () => {
  return (
    //{ <div className='top-bar' style={{backgroundColor: this.state.bgColour}}> }
    <div className='top-bar'>
      <h1>Build</h1>
    </div>
  )
}

// The Editor component receives the value and the change function as props
const Editor = React.memo(({value, handleTextChange}) => {
  const onChange = e => handleTextChange(e.target.value)
  return (
        <TextField
            id="userTextArea"
            variant="outlined"
            multiline
            rows={4}
            value={value}
            onChange={e => handleTextChange(e.target.value)}
        />
  );
});

// Play button component receives value from textarea
const ButtonPlay = (props) => {
  const loadingBarRef = useRef(null);
  const [loading, setLoading] = React.useState(false);
  const handleSetLoading = () => {
    setLoading(false)
  }

  return (
    <div>
      <LoadingBar color="#f11946" ref={loadingBarRef} shadow={true} height={3} />

      <Button 
        size="small"
        color="primary" 
        className='button' 
        startIcon={<PlayArrowOutlined/>}
        onClick={ () => {
            setLoading(true)
            ProcessText(props.text, loadingBarRef, handleSetLoading)
          }
        }
        disabled={loading}
      >
        Play
      </Button>
    </div>
  )
}

const ProcessText = (text, loadingBarRef, handleSetLoading) => {
  console.log("Processing text: " + text)

  // Loading bar start 
  loadingBarRef.current.continuousStart()

  //test
  const mergedata = [
      mydata.instructions,
      mydata2.instructions,
      mydata3.instructions
  ]
  console.log(mergedata)

  //axios.post(websiteURL + 'api/v1/audio-profile/processtext', 
  axios.post(websiteURL + 'api/v1/audio-profile/testjsonPOST', {
    textID: uuidv4(), 
    textData: text,
    instructions: mergedata
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

const ButtonAddTransformation = ({transformationsData, setTransformationsData}) => {
  return (
    <Button 
        size="small"
        color="secondary" 
        className='button' 
        onClick={ () => {
          setTransformationsData(transformationsData => [...transformationsData, mydata2])
          console.log(transformationsData)
          }
        }
      >
        Add Transformation
      </Button>
  )
}

const TransformationItem = ({transformationsData, onTransformationAdd}) => {
  const [transformationText, setTransformationText] = React.useState("")
  const handleTransformationAdd = useCallback(e => {
    onTransformationAdd(e.target.value)
  }, [onTransformationAdd])

  return (
    <h1>{JSON.stringify(transformationsData)}</h1>
  )
}

const TransformationList = () => {
  return (
    <div className="grid" id="grid">
      <Grid item xs={12} md={6}>
      </Grid> 
    </div>
  )
}

export default function App() {
  
  const [text, setText] = React.useState("")
  const [transformationsData, setTransformationsData] = React.useState(transformationArray);

  return (
      <div className="App">

          <Header />

          <div className="App-body main-container">

            <Editor handleTextChange={setText} />

            <ButtonPlay text={text} />

            <TransformationList />

            <TransformationItem transformationsData={transformationsData} onTransformationAdd={setTransformationsData} />

            <ButtonAddTransformation transformationsData={transformationsData} setTransformationsData={setTransformationsData} />
          
          </div>

      </div>
  );
}
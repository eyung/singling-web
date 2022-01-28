import React, {Component, useState, useEffect, useRef} from "react";
import { TextField } from "@mui/material";
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { IconButton } from "@mui/material";
import AnimationIcon from '@mui/icons-material/Animation';
import { PlayArrowOutlined, PlayArrowRounded, StayCurrentLandscapeOutlined } from "@material-ui/icons";
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

// The `Editor` component receives the value and the change function as props. 
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

// Header stuff
const Header = () => <div>New build</div>;

const ProcessText = (text, loadingBarRef) => {

  //const [text, setText] = React.useState("");
  //const [loading, setLoading] = React.useState(false);
  
  console.log("Processing text: " + text)

  //this.setState({progress:10})
  //this.setState({ loading: true })
  //setLoading(true)
  //const loadingBarRef = useRef(null);
  loadingBarRef.current.continuousStart()

  //test
  const mergedata = [
      mydata.instructions,
      mydata2.instructions
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

    //this.setState({progress:80})
    loadingBarRef.current.complete()

    const audio = new Audio(s3URL + res.data.audioLink)
    audio.load()
    playAudio(audio)

    //setLoading(false)
  });
}

const playAudio = (audio) => {
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

// Main function
export default function App() {
  
  //const [progress, setProgress] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [text, setText] = React.useState("test")
  const loadingBarRef = useRef(null);
  //ref.current.continuousStart();

  return (
      <div className="App">
          <Header />
          <div className="App-body">

              <LoadingBar color="#f11946" ref={loadingBarRef} shadow={true} height={3} />  


              <Editor handleTextChange={setText} />

              

              <Button 
                size="small"
                color="primary" 
                className='button' 
                startIcon={<PlayArrowOutlined/>}
                //loading={this.loading}
                onClick={ () => ProcessText(text, loadingBarRef)}
                disabled={loading}
              >
                Play
              </Button>
              </div>
      </div>
  );
}
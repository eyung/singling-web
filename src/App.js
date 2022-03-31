import React, {Component, useState, useEffect, useRef, useCallback} from "react";
import { TextField } from "@mui/material";
import { IconButton } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import AddIcon from '@mui/icons-material/Add';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Grid from '@mui/material/Grid';
import { Paper } from "@mui/material";
import './App.css';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { nanoid } from 'nanoid';
import LoadingBar from 'react-top-loading-bar';
import BottomNavigation from '@mui/material/BottomNavigation';
import Box from '@mui/material/Box';
import { SpeedDial } from "@mui/material";
import { SpeedDialAction } from "@mui/material";
import { SpeedDialIcon } from "@mui/material";
import AbcIcon from '@mui/icons-material/Abc';
import DownloadIcon from '@mui/icons-material/Download';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';

// Config
//const websiteURL = "http://localhost:3000/"
const websiteURL = "http://3.99.30.184:8080/"
const s3URL = "https://effiam-bucket.s3.ca-central-1.amazonaws.com/audio/"

var mydata = 
{

    mod: 'WORDTYPE',
    modValue: '11',
    soundMod: 'INSTRUMENT',
    soundModValue: 'APPLAUSE',
    modOperator: 'EQUALTO',
    changeMode: 'SET',
    sentimentType: 'POSITIVESENTIMENT'
  
}

var mydata2 =
{

    mod: 'WORDLENGTH',
    modValue: '5',
    soundMod: 'INSTRUMENT',
    soundModValue: 'GUNSHOT',
    modOperator: 'EQUALTO',
    changeMode: 'SET',
    sentimentType: 'POSITIVESENTIMENT'
  
}

var mydata3 = 
{
  //instructions: {
      mod: 'LGC',
      modValue: '3',
      soundMod: 'OCTAVE',
      soundModValue: '8',
      modOperator: 'EQUALTO',
      changeMode: 'SET',
      sentimentType: 'POSITIVESENTIMENT'
  //}
}

var transformationArray = [];


// Header stuff
const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Build
          </Typography>

          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

        </Toolbar>
      </AppBar>
    </Box>
  )
}

const BottomNav = ({text, transformationsData, addHandler, data}) => {
  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, pt: "1rem" }} elevation={3}>
      <BottomNavigation>
        <Grid container maxWidth="sm">
          <Grid item xs={6} md={6}>
            <Box display="flex" justifyContent="flex-start">
              <ButtonPlay text={text} transformationsData={transformationsData} />
            </Box>
          </Grid>
       
          <Grid item xs={6} md={6}>
            <Box display="flex" justifyContent="flex-end">
              <IconButton>
                <DownloadIcon />
              </IconButton>
            </Box>
          </Grid>
          
        </Grid>
      </BottomNavigation>
    </Paper>
  );
}

// The Editor component receives the value and the change function as props
const Editor = React.memo(({value, handleTextChange}) => {
  return (
        <TextField
            id="textfield"
            variant="standard"
            InputProps = {{disableUnderline: true}}
            multiline
            rows={10} 
            autoFocus 
            value={value}
            onChange={e => handleTextChange(e.target.value)}
        />
  );
});

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

const ProcessText = (text, transformationsData, loadingBarRef, handleSetLoading) => {
  //console.log("Processing text: " + text)

  // Loading bar start 
  loadingBarRef.current.continuousStart()

  //test
  const mergedata = [
      mydata.instructions,
      mydata2.instructions,
      mydata3.instructions
  ]

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

    axios.post(websiteURL + 'api/v1/audio-profile/testjsonPOST', {
      textID: uuidv4(), 
      textData: text,
      instructions: transformationsData
    })
  
    .then( res => { 
      console.log("playing audio file: " + s3URL + res.data.audioLink)
  
      // Finish loading bar
      loadingBarRef.current.complete()
  
      //const audio = new Audio(s3URL + res.data.audioLink)
      //audio.load()
      //PlayAudio(audio)
      audioRef.current = new Audio(s3URL + res.data.audioLink)

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

const ButtonAddTransformation = ({addHandler, data}) => {
  return (
    <div>
      <IconButton 
        size="large"
        color="secondary"
        className='button'
        onClick={ () => {
          addHandler(data)
          }
        }
      >
        <AddIcon />
      </IconButton>
    </div>
  )
}

const FABAddTransformation = ({addHandler, data}) => {

  const actions = [
    { icon: (
        <AbcIcon 
          style={{ fill: '#208AAE' }}
          onClick = {() => addHandler(data)}
        />
      ),
      name: 'Part of speech' },
    { icon: (
        <AbcIcon 
          style={{ fill: '#208AAE ' }}
          onClick = {() => addHandler(data)}
        />
      ),
      name: 'Word length' },
    { icon: (
        <AbcIcon 
          style={{ fill: '#208AAE' }}
          onClick = {() => addHandler(data)}
        />
      ),
      name: 'LGC' },
    { icon: (
        <AbcIcon 
          style={{ fill: '#208AAE' }}
          onClick = {() => addHandler(data)}
        />
      ),
      name: 'Punctuation' }
  ];

  return (
    <Box>

      <SpeedDial
        ariaLabel="Add transformation"
        sx={{ 
          position: "fixed",
          bottom: (theme) => theme.spacing(12),
          right: (theme) => theme.spacing(2)
        }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>

    </Box>
  )
}

const TransformationItem = ({transformationsData, onTransformationAdd, data, deleteHandler}) => {
 
  const handleTransformationAdd = useCallback(e => {
    onTransformationAdd(e.target.value)
  }, [onTransformationAdd])

  return (
    
      <ListItem className="TransformationListItem"
        secondaryAction={
          <IconButton edge="end" onClick={deleteHandler}>
            <DeleteOutlineIcon />
          </IconButton>
        }
      >
        <ListItemText
          //primary= {JSON.stringify(transformationsData)}
          primary = {`CHANGE ${data.soundMod} TO ${data.soundModValue} WHEN ${data.mod} IS ${data.modOperator} ${data.modValue}`}
        />
      </ListItem>
    
    
  )
}

export default function App() {
  
  const [text, setText] = React.useState("")
  const [transformationsData, setTransformationsData] = React.useState(transformationArray);
  const [ids, setIds] = React.useState([])

  // TODO: Transformation to add
  let data = mydata2

  // Add transformation
  const addHandler = (data) => {
    const newId = nanoid()
    setIds(ids => [...ids, newId])

    setTransformationsData(transformationsData => [...transformationsData, data])
  }

  // Delete transformation 
  const deleteHandler = (removeId) => {
    setIds(ids => ids.filter(id => id !== removeId))

    const reducedArr = [...transformationsData]
    reducedArr.splice(removeId, 1)
    setTransformationsData(reducedArr)
  }

  //console.log(transformationsData)

  return (
      <Box className="App">

          <Header />

          <Box className="App-body main-container">

            <Editor handleTextChange={setText} />

            {/* <TransformationList /> */}
            <Box className="grid" id="grid">
              <Grid container spacing={2}>
                  <Grid item xs={12} md={12}>
                      <List>

                        { ids.map(id => <TransformationItem transformationsData={transformationsData} onTransformationAdd={setTransformationsData} data={data} key={id} deleteHandler={() => deleteHandler(id)} />) } 
                          
                      </List>
                  </Grid>
                </Grid>
            </Box>  

          </Box>

          <FABAddTransformation addHandler={addHandler} data={data} />

          <BottomNav text={text} transformationsData={transformationsData} addHandler={addHandler} data={data} />

      </Box>
  );
}
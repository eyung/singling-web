import React, {Component, useState, useEffect, useRef, useCallback} from "react";
import { TextField } from "@mui/material";
import Button from '@material-ui/core/Button';
import { IconButton } from "@mui/material";
import { PlayArrowOutlined, PlayArrowRounded, StayCurrentLandscapeOutlined } from "@material-ui/icons";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import RemoveIcon from '@mui/icons-material/Remove';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import Grid from '@mui/material/Grid';
import { Paper } from "@mui/material";
import './App.css';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { nanoid } from 'nanoid';
import LoadingBar from 'react-top-loading-bar';

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
    //{ <div className='top-bar' style={{backgroundColor: this.state.bgColour}}> }
    <div className='top-bar'>
      <h1>Build</h1>
    </div>
  )
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
    <div>
      <LoadingBar color="#f11946" ref={loadingBarRef} shadow={true} height={3} />

      <Button 
        size="small"
        color="primary" 
        className='button' 
        startIcon={<PlayArrowIcon/>}
        onClick={ () => {
            setLoading(true)
            ProcessText(text, transformationsData, loadingBarRef, handleSetLoading)
          }
        }
        disabled={loading}
      >
        Play
      </Button>
    </div>
  )
}

const ProcessText = (text, transformationsData, loadingBarRef, handleSetLoading) => {
  console.log("Processing text: " + text)

  // Loading bar start 
  loadingBarRef.current.continuousStart()

  //test
  const mergedata = [
      mydata.instructions,
      mydata2.instructions,
      mydata3.instructions
  ]

  console.log(JSON.stringify(transformationsData))

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

const ButtonAddTransformation = ({addHandler, data}) => {
  return (
    <div>
      <Button 
        size="small"
        color="secondary"
        className='button'
        startIcon={<AddIcon/>}
        onClick={ () => {
          addHandler(data)
          }
        }
      >
        Transformation
      </Button>
    </div>
  )
}

const TransformationItem = ({transformationsData, onTransformationAdd, data, deleteHandler}) => {
 
  const handleTransformationAdd = useCallback(e => {
    onTransformationAdd(e.target.value)
  }, [onTransformationAdd])

  return (
    
      <ListItem className="TransformationListItem"
        secondaryAction={
          <IconButton edge="end" aria-label="delete" onClick={deleteHandler}>
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
      <div className="App">

          <Header />

          <div className="App-body main-container">

            <Editor handleTextChange={setText} />

            <ButtonPlay text={text} transformationsData={transformationsData} />

            <ButtonAddTransformation addHandler={addHandler} data={data} />

            {/* <TransformationList /> */}
            <div className="grid" id="grid">
              <Grid container spacing={2}>
                  <Grid item xs={12} md={12}>
                      <List>

                        { ids.map(id => <TransformationItem transformationsData={transformationsData} onTransformationAdd={setTransformationsData} data={data} key={id} deleteHandler={() => deleteHandler(id)} />) } 
                          
                      </List>
                  </Grid>
                </Grid>
            </div>  

            
          </div>

      </div>
  );
}
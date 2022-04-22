import React, {Component, useState, useEffect, useRef, useCallback} from "react";
import './App.css';
import { IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { nanoid } from 'nanoid';
import Dictaphone from "./Dictaphone";
import Header from "./Header";
import BottomNav from "./BottomNav";
import FABAddTransformation from "./FABAddTransformation";

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

            <Dictaphone handleTextChange={setText} />

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
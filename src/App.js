import React, {useCallback} from "react";
import './App.css';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { nanoid } from 'nanoid';
import Editor from "./Editor";
import Header from "./Header";
import BottomNav from "./BottomNav";
import FABAddTransformation from "./FABAddTransformation";
import TransformationCard from "./TransformationCard";

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

export default function App() {
  
  const [text, setText] = React.useState("")
  const [transformationsData, setTransformationsData] = React.useState(transformationArray);
  const [ids, setIds] = React.useState([])

  // TODO: Transformation to add
  let data = mydata2

  // Add transformation to UI
  const addHandler = (data) => {
    const newId = nanoid()
    setIds(ids => [...ids, newId])

    // Should be implemented in TransformationItem component
    setTransformationsData(transformationsData => [...transformationsData, data])
  }

  // Delete transformation 
  const deleteHandler = (removeId) => {
    setIds(ids => ids.filter(id => id !== removeId))

    // Should be implemented in TransformationItem component
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

            <Box className="grid" id="grid">
              <Grid container spacing={2}>
                  <Grid item xs={12} md={12}>
                      <List>

                        { ids.map(id => <TransformationCard transformationsData={transformationsData} onTransformationAdd={setTransformationsData} data={data} key={id} deleteHandler={() => deleteHandler(id)} />) } 
                          
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
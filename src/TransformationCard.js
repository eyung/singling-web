import React, {useEffect, useCallback} from "react";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import { Box } from "@mui/system";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const TransformationCard = ({transformationsData, data, listId, deleteHandler, deleteTransformationHandler, addTransformationHandler}) => {

  var instructionTest = {
    id: listId,
    mod: 'WORDLENGTH',
    modValue: '5',
    soundMod: 'INSTRUMENT',
    soundModValue: 'GUNSHOT',
    modOperator: 'EQUALTO',
    changeMode: 'SET',
    sentimentType: 'POSITIVESENTIMENT'
  }

  var instructionsArray = [];

  const [instruction, setInstruction] = React.useState({
    id: listId,
    mod: 'WORDLENGTH',
    modValue: '',
    soundMod: '',
    soundModValue: '',
    modOperator: 'EQUALTO',
    changeMode: 'SET',
    sentimentType: 'POSITIVESENTIMENT'
  });

  const [instrument, setInstrument] = React.useState('piano');
  const [octave, setOctave] = React.useState(2);

  const handleChangeInstrument = (event) => {
    setInstrument(event.target.value);

    //data.soundMod = 'instrument';
    //data.soundModValue = event.target.value;

    instructionTest.soundMod = 'instrument';
    instructionTest.soundModValue = event.target.value;

    setInstruction({soundMod:'instrument', soundModValue:event.target.value});
  };

  const handleChangeOctave = (event) => {
    setOctave(event.target.value);
  };
 
  // On component mount, add data to transformationsData array and delete the previous one (?)
  useEffect(() => {
    
    console.log("mount:" + listId)
    //console.log('CHANGE ' + data.soundMod + ' TO ' + data.soundModValue + ' WHEN ' + data.mod + ' IS ' + data.modOperator + ' ' + data.modValue);
    //onTransformationAdd((transformationsData => [...transformationsData, data]))
    
    return () => {
      // cleaning up here
    }
  }, []);

  useEffect(() => {
    
    console.log(instruction)
    
    
    return () => {
      // cleaning up here
    }
  }, [instruction]);

  //const handleTransformationAdd = useCallback(e => {
  //  onTransformationAdd(e.target.value)
  //}, [onTransformationAdd])

  return (
    <Card sx={{ display: 'flex', mb: '3px', boxShadow: 1 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent>
        {/* {`CHANGE ${data.soundMod} TO ${data.soundModValue} WHEN ${data.mod} IS ${data.modOperator} ${data.modValue}`} */}
          <IconButton edge="end" onClick={deleteHandler}>
            <DeleteOutlineIcon />
          </IconButton>
        </CardContent>
        
        <Box>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel>Instrument</InputLabel>
            <Select
              labelId="select-instrument-label"
              id="select-instrument"
              value={instrument}
              onChange={handleChangeInstrument}
              label="Instrument"
            >
              <MenuItem value={'piano'}>Piano</MenuItem>
              <MenuItem value={'guitar'}>Guitar</MenuItem>
              <MenuItem value={'gunshot'}>Gunshot</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel>Octave Range</InputLabel>
            <Select
              labelId="select-octave-label"
              id="select-octave"
              value={octave}
              onChange={handleChangeOctave}
              label="Octave"
            >
              <MenuItem value={'1'}>1 Octave</MenuItem>
              <MenuItem value={'2'}>2 Octaves</MenuItem>
              <MenuItem value={'3'}>3 Octaves</MenuItem>
              <MenuItem value={'4'}>4 Octaves</MenuItem>
              <MenuItem value={'5'}>5 Octaves</MenuItem>
              <MenuItem value={'6'}>6 Octaves</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
    </Card>
  );
}
export default TransformationCard;
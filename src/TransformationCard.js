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

const TransformationCard = ({cardId, transformationsData, deleteHandler, deleteTransformationHandler, addTransformationHandler}) => {

  const [instrument, setInstrument] = React.useState({
    cardId: cardId,
    id: 1,
    mod: 'WORDLENGTH',
    modValue: '5',
    soundMod: 'INSTRUMENT',
    soundModValue: 'PIANO',
    modOperator: 'EQUALTO',
    changeMode: 'SET',
    sentimentType: 'POSITIVESENTIMENT'
  });

  const [octave, setOctave] = React.useState({
    cardId: cardId,
    id: 1,
    mod: 'WORDLENGTH',
    modValue: '5',
    soundMod: 'OCTAVE',
    soundModValue: 2,
    modOperator: 'EQUALTO',
    changeMode: 'SET',
    sentimentType: 'POSITIVESENTIMENT'
  });

  const [instructionsList, setInstructionsList] = React.useState([])

  const [inputs, setInputs] = React.useState({});

  //const [instrument, setInstrument] = React.useState('piano');
  //const [octave, setOctave] = React.useState(2);

  const handleChangeInstrument = (event) => {

    // setInstrument(event.target.value);

    // const reducedArr = [...instructionsList]
    // reducedArr.splice(instruction.id, 1)
    // setInstructionsList(reducedArr)

    // setInstruction({
    //   id: instruction.id+1,
    //   mod: 'WORDLENGTH',
    //   modValue: '5',
    //   soundMod:'instrument',
    //   soundModValue:event.target.value,
    //   modOperator: 'EQUALTO',
    //   changeMode: 'SET',
    //   sentimentType: 'POSITIVESENTIMENT'
    // });

    // setInstructionsList(instructionsList => [...instructionsList, instruction])
    // console.log(instructionsList)
    //deleteTransformationHandler(instruction.instructionId)
    ///addTransformationHandler(instruction)
  };

  const handleChangeOctave = (event) => {
    //setOctave(event.target.value);
  };

  const handleChange = e => {
    setInputs(prevState => ({ ...prevState, [e.target.name]: e.target.value }))

    if (e.target.name === 'instrument') {
      setInstrument(instrument.soundModValue=e.target.value)
    } else if (e.target.name === 'octave') {
      setOctave(octave.soundModValue=e.target.value)
    }
    
    //handleRemove(e.target.name)

    setInstructionsList(instructionsList => [...instructionsList, instrument])
    setInstructionsList(instructionsList => [...instructionsList, octave])
    console.log(instructionsList)
  };

  const handleRemove = (soundMod) => {
    //console.log(soundMod)
    const newList = instructionsList.filter((instructionsList) => instructionsList.soundMod !== soundMod);
 
    //console.log(newList)
    setInstructionsList(newList);
  };
 
  // On component mount, add data to transformationsData array and delete the previous one (?)
  useEffect(() => {

    //addTransformationHandler((transformationsData => [...transformationsData, instruction]))
    
    //console.log(instruction)

    setInstructionsList(instructionsList => [...instructionsList, instrument])
    setInstructionsList(instructionsList => [...instructionsList, octave])
    console.log(instructionsList)
    
    return () => {
      // cleaning up here
    }
  }, []);

  useEffect(() => {
    
    //console.log(instruction)
    
    return () => {
      // cleaning up here
    }
  }, []);

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
              name="instrument"
              value={inputs.instrument || 'piano'}
              onChange={handleChange}
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
              name="octave"
              value={inputs.octave || 2}
              onChange={handleChange}
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
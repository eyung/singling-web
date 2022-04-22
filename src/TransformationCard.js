import React, {useCallback} from "react";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import { Box } from "@mui/system";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const TransformationCard = ({transformationsData, onTransformationAdd, data, deleteHandler}) => {

  const [instrument, setInstrument] = React.useState('');
  const [octave, setOctave] = React.useState('');

  const handleChangeInstrument = (event) => {
    setInstrument(event.target.value);
  };

  const handleChangeOctave = (event) => {
    setOctave(event.target.value);
  };
 
  const handleTransformationAdd = useCallback(e => {
    onTransformationAdd(e.target.value)
  }, [onTransformationAdd])

  return (
    <Card sx={{ display: 'flex', mb: '3px', boxShadow: 1, bgcolor: 'white', color: 'primary.main' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent>
          {`CHANGE ${data.soundMod} TO ${data.soundModValue} WHEN ${data.mod} IS ${data.modOperator} ${data.modValue}`}
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
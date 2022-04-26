import React, {useEffect} from 'react';
import { TextField } from "@mui/material";
import { createSpeechlySpeechRecognition } from '@speechly/speech-recognition-polyfill';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Button } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

const appId = 'd6c66b0d-1379-4020-ba4d-4b2359d2ea1c';
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);

const Editor = React.memo(({value, handleTextChange}) => {

  const {
    finalTranscript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const [text, setText] = React.useState("")

  const startListening = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true });
  }

  // Trigger on text input
  const onInputChange = (data) => {
    //console.log(data);

    setText(data);
    handleTextChange(data);
  }

  // Ignore interim transcript results when appending speech text to the editor
  useEffect(() => {
    //console.log(finalTranscript)
    onInputChange(text + finalTranscript);
  }, [finalTranscript]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (

    // The Editor component receives the value and the change function as props
    <Card>
      <Box id="editor">
        <TextField
            id="textfield"
            variant="standard"
            InputProps = {{disableUnderline: true}}
            multiline
            rows={10} 
            autoFocus 
            value={text}
            onChange={e => onInputChange(e.target.value)}
        />
      </Box>
      
      <Box id="microphone" className={listening ? 'green' : 'white'}>
        <Button 
          onTouchStart={startListening}
          onMouseDown={startListening}
          onTouchEnd={SpeechRecognition.stopListening}
          onMouseUp={SpeechRecognition.stopListening}
          disableRipple
          sx={{
            ml: 1,
            "&.MuiButtonBase-root:hover": {
              bgcolor: "transparent"
            }
          }}
          endIcon={<MicIcon />}>
          Hold to talk
        </Button>
        
      </Box>

    </Card>
  );
});

export default Editor;
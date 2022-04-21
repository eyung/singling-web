import React, {useEffect} from 'react';
import { TextField } from "@mui/material";
import { createSpeechlySpeechRecognition } from '@speechly/speech-recognition-polyfill';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { IconButton } from "@mui/material";
import MicIcon from '@mui/icons-material/Mic';

const appId = 'd6c66b0d-1379-4020-ba4d-4b2359d2ea1c';
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);

const Dictaphone = React.memo(({value, handleTextChange}) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const [text, setText] = React.useState("")

  const startListening = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true });
  }

  const onInputChange = (data) => {
    //console.log(data);

    setText(data);

    handleTextChange(data);
  }

  React.useEffect(() => {
    //console.log(transcript)
    onInputChange(text + transcript);
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (

    <div>
      <div class="editor">
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
      </div>
      <p>Microphone: {listening ? <span class="circle-green" /> : <span class="circle-red" />}</p>
      <IconButton className={listening ? 'green' : 'red'} aria-label="talk" onMouseDown={startListening} onMouseUp={SpeechRecognition.stopListening}>
        <MicIcon />
      </IconButton>
    </div>
  );
});

export default Dictaphone;
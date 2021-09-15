import React, {Component, useState, useEffect} from "react";
import Button from '@material-ui/core/Button';
import './App.css';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const UserProfiles = () => {

  const [userProfiles, setUserProfiles] = useState([]);
  
  const fetchUserProfiles = () => {
    axios.get("http://localhost:8080/api/v1/user-profile").then(res => {
      console.log(res);

      const data = res.data;
      setUserProfiles(res.data);
    });
  }

  useEffect(() => {
    fetchUserProfiles();
  }, []);

  return userProfiles.map((userProfile, index) => {
    return (
      <div key={index}>
        <h1>{userProfile.username}</h1>
        <p>{userProfile.userProfileId}</p>
      </div>
    )
  });

}

const websiteURL = "http://localhost:3000/"
//const websiteURL = "http://3.99.30.184:8080/"
const s3URL = "https://effiam-bucket.s3.ca-central-1.amazonaws.com/audio/"

class App extends Component {

  constructor () {
    super()

    this.state = {
      inputValue: ''
    };

    this.updateInputValue = this.updateInputValue.bind(this);
    this.handleClick = this.handleClick.bind(this)
    this.processText = this.processText.bind(this)
    this.processTextPreset1 = this.processTextPreset1.bind(this)
    this.processTextPreset2 = this.processTextPreset2.bind(this)
  }

  handleClick () {
    console.log('Success!')

    const testData = 
      { audioID: uuidv4(), audioLink: 'this is a test' }
    ;

    axios.get(websiteURL + 'api/v1/audio-profile/test')
    .then(
      res => { console.log(res.data)
    });
  }

  processText () {
    
    console.log("Processing text: " + this.state.inputValue)

    axios.post(websiteURL + 'api/v1/audio-profile/processtext', { 
      textID: uuidv4(), textData: this.state.inputValue })
    .then( res => { 
      //console.log(res.data.audioLink)
      console.log("playing audio file: " + s3URL + res.data.audioLink)
      this.audio = new Audio(s3URL + res.data.audioLink)
      this.audio.load()
      this.playAudio()
    });
  }

  processTextPreset1() {

    console.log("Processing text: " + this.state.inputValue)

    axios.post(websiteURL + 'api/v1/audio-profile/processTextPreset1', { 
      textID: uuidv4(), textData: this.state.inputValue })
    .then( res => { 
      //console.log(res.data.audioLink)
      console.log("playing audio file: " + s3URL + res.data.audioLink)
      this.audio = new Audio(s3URL + res.data.audioLink)
      this.audio.load()
      this.playAudio()
    });
  }

  processTextPreset2() {

    console.log("Processing text: " + this.state.inputValue)

    axios.post(websiteURL + 'api/v1/audio-profile/processTextPreset2', { 
      textID: uuidv4(), textData: this.state.inputValue })
    .then( res => { 
      //console.log(res.data.audioLink)
      console.log("playing audio file: " + s3URL + res.data.audioLink)
      this.audio = new Audio(s3URL + res.data.audioLink)
      this.audio.load()
      this.playAudio()
    });
  }

  playAudio() {
    const audioPromise = this.audio.play()
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

  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value 
    });
  }
  
  
  render () {
    return (
      <div className='app'>

        <div class='top-bar'>
          <h1>Singling Web</h1>
        </div>
          
        
        <div class='main-container'>

          <textarea id='userTextArea' value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)}/>
          
          <Button 
            variant="contained" 
            color="primary" 
            className='button' 
            onClick={this.processText}
          >
            Play
          </Button>

          <Button 
            variant="contained" 
            color="secondary" 
            className='button' 
            onClick={this.processTextPreset1}
          >
            Preset 1 (LEN=3 -> KOTO)
          </Button>

          <Button 
            variant="contained" 
            color="secondary" 
            className='button' 
            onClick={this.processTextPreset2}
          >
            Preset 2 (NOUN -> BIRD TWEET)
          </Button>

         
          

        </div>

      </div>
    )
  }

}

export default App;

import React from 'react';
import { Button, View, Image, TouchableHighlight, StyleSheet, Text, Alert, Linking, ScrollView } from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe";
import {getYoutubeMeta} from 'react-native-youtube-iframe';
import { Dimensions } from 'react-native';
import { AsyncStorage } from 'react-native';
import { useState } from "react";
import ProgressBar from 'react-native-progress/Bar';
import AdjustableText from "../components/AdjustableText.js";
import ShowMoreText from "../components/ShowMoreText.js";
import LoadingThumbnail from "../components/LoadingThumbnail.js";
import RoundedButton from "../components/RoundedButton.js";
import { styles } from '../scripts/constants.js'
import moment from "moment";

// Props include
//   videoId : String      - youtube identifier to fetch the video
//   duration : String     - ISO 8601 string corresponding to the duration of the video
//   title : String        - title of the video
//   display : Object      - object describing what parts of the title should be highlighted
//   description : String  - the youtube video's description. Could be used to encode data instead of a database 
//   link : String         - the youtube video's worksheet google drive folder link 
//   date : Date           - video's date
class RainbowVideo extends React.Component {
  constructor(props) {
    super(props);

    // Variables to store the reference to the YoutubePlayer component and the interval which the component will attempt to save the latest video time in local storage
    this.playerRef = null;
    this.saveTime = null;

    // Initializes the youtube player reference
    this.setPlayerRef = element => {
      this.playerRef = element;
    };

    /* State stores the following variables
      playing : bool - controls whether the youtube player is playing
      shouldSave : bool - controls whether the video should save. Subtly different from state.playing 
      finished : bool - corresponds to whether the video is at its end
      inProgress : bool - this stores whether the user is part way through the video (used for showing the green play button instead of the white one, but that's a bit unnecessary now that we have a progress bar)
      isBuffering : bool - stores whether the video should show the loading thumbnail
      unplayed : bool - stores if the video was just loaded and has yet to be played. This lets us know to show the placeholder thumbnail rather than load the youtube player.
      thumbnail : String? - Either null (the initial value) or a string giving the url where the video's thumbnail can be retrieved
      progressFraction : Number - Fraction of the video that has been watched
      once : Int - For some reason onStateChange was firing with the state "unstarted" multiple times when the video was first loaded, so I introduced a debugging variable to only count the first time unstarted plays. Really should be a bool. 
      */
    this.state = {
      playing: true,
      shouldSave : false,
      finished: false,
      inProgress : false,
      isBuffering : false,
      unplayed : true,
      thumbnail : null,
      progressFraction: 0,
      once: 0
    };

    // bind methods
    this.onStateChange = this.onStateChange.bind(this);
    this.thumbnailClicked = this.thumbnailClicked.bind(this);
    this.getPauseImage = this.getPauseImage.bind(this);
    this.reloadInfo = this.reloadInfo.bind(this);
    this.resetOriginals = this.resetOriginals.bind(this);
  }

  async onStateChange(state) {
    // variables storing the local storage keys for time (in {videoID}.playingTime) and whether the video has been finished (in {videoID}.finished)
    let storageTime = this.props.videoId + '.playingTime';
    // let storageFinished = this.props.videoId + '.finished';

    // Sets state.shouldSave to be true whenever the video is playing
    if (state === "playing"){
      this.setState({shouldSave: true, isBuffering: false});
    } else {
      this.setState({shouldSave: false});
    }

    // Event that fires once when the video is first loaded and about to play. Tells the video to resume at the last saved time from local storage and queries the youtube API for the video duration.
    if (state === "unstarted"){
      if(this.state.once === 0){
        let storedTime = await AsyncStorage.getItem(storageTime);
        if(storedTime !== null && storedTime != "atEnd"){
          let curTime = parseInt(storedTime)
          console.log(storedTime);
          await this.playerRef.seekTo(curTime);
        }
      }
      this.setState({once: 1});
    }

    // Event that fires when the video finishes. Updates states and stores in local storage that the video has been finished and a special "atEnd" state for the time
    if (state === "ended") {
      this.setState({playing : false, finished : true, progressFraction : 1.0});
      try {
        // await AsyncStorage.setItem(
        //   storageFinished,
        //   "true"
        // );
        await AsyncStorage.setItem(
          storageTime,
          "atEnd"
        );
      } catch (error) {
        Alert.alert("Error saving status")
      }
    }
  }

  // Function that plays when thumbnail's icon is clicked. Start/restarts the video
  async thumbnailClicked() {
    this.setState({playing:true, finished:false, unplayed : false, isBuffering : true});
  }

  // Records the current time in local storage
  async recordTime(pRef){
    let storageTime = this.props.videoId + '.playingTime';
    let elapsed_time = await pRef.getCurrentTime();
    let elapsed_sec = Math.floor(elapsed_time)
    try {
      await AsyncStorage.setItem(
        storageTime,
        elapsed_sec.toString()
      );
    } catch (error) {
      Alert.alert("Error saving time")
    }
  }

  // Returns the thumbnail icon. Either a check if the video is finished, a green array if the user's made some progress into the video, or a white arrow if the video has no stored time.
  getPauseImage(){
    if(this.state.finished){
      return require('../assets/images/check.png');
    } else {
      if (this.state.inProgress){
        return require('../assets/images/green-play.png');
      } else {
        return require('../assets/images/white-play.png');
      }
    }
  }
  
  // Converts and ISO 8601 duration into seconds. Used for the progress bar
  parseDuration(){
    return moment.duration(this.props.duration, moment.ISO_8601).asSeconds();
  }

  // Checks if the video was published within the last day and, if so, gives it a special "New" tag
  isRecent(){
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 10);
    if(this.props.date > yesterday){
      return (<Text style={styles.new_highlight}>New:&nbsp;</Text>)
    } else {
      return null
    }
  }

  // If the video goes from not playing to playing, starts an interval that records the time every second. If the video goes from playing to not playing, cancels the interval
  componentDidUpdate(prevProps, prevState, snapshot){
    if(prevProps.videoId != this.props.videoId){
      clearInterval(this.saveTime);
      this.resetOriginals().then(() => {
        this.reloadInfo().then(() => {
          this.thumbnailClicked();
        });
      });
    }
    if(prevState.shouldSave === false && this.state.shouldSave === true){
      this.saveTime = setInterval(
        () => this.recordTime(this.playerRef),
        1000
      );
    }
    if(prevState.shouldSave === true && this.state.shouldSave === false){
      if(this.saveTime != null){
        clearInterval(this.saveTime);
      }
    }
  }
  
  // Cancels the save interval if the component is about to unmount
  componentWillUnmount(){
    if(this.saveTime != null){
      clearInterval(this.saveTime);
    }
  }
  
  async reloadInfo(){
    // let storageFinished = this.props.videoId + '.finished';
    let storageTime = this.props.videoId + '.playingTime';
    AsyncStorage.getItem(storageTime).then(storedTime => {
      if(storedTime == null || (storedTime != "atEnd" && parseInt(storedTime) == 0)){
        this.setState({inProgress : false});
      } else if(storedTime != "atEnd"){
        let curTime = parseInt(storedTime);
        var progressFraction =  curTime / this.parseDuration();
        this.setState({inProgress : true, progressFraction : progressFraction});
      } else if(storedTime == "atEnd"){
        this.setState({finished : true, progressFraction : 1.0})
      }
    });
    getYoutubeMeta(this.props.videoId).then(meta => {
        this.setState({thumbnail : meta.thumbnail_url});
    });
  }

  // Loads information from local storage once the component mounts and sets the state appropriately. Also queries the youtube API for the thumbnail URL
  async componentDidMount(){
    await this.reloadInfo();
    this.thumbnailClicked();
  }
  
  async resetOriginals(){
    this.setState({
      playing: true,
      shouldSave : false,
      finished: false,
      inProgress : false,
      isBuffering : false,
      unplayed : true,
      thumbnail : null,
      progressFraction: 0,
      once: 0
    });
  }

  render() {
    return (
      <View style={{width: 340, height: 260}}>
        <View style={{height: 60}}>
          <AdjustableText
            fontSize={30}
            text=<Text>{this.isRecent()} {this.props.title}</Text>
            style={styles.videoTitleText}
            maxHeight={60}
          />
        </View>
        <View style={{flexGrow: 1, alignItems: 'center'}} >
            {this.state.finished || this.state.unplayed ? (
              <View style={{height: 240,
                  top: 0,
                  width: 288,
                  alignItems: 'center'}}>
                {this.state.thumbnail === null ? (<View style={{height: "67%", width: '100%', backgroundColor: 'black'}} />) : (<Image style={{height: "67%", width: '100%'}} source={{uri : this.state.thumbnail}}/>)
                }
                <TouchableHighlight style={{height: "45%",
                            bottom: "58%",
                            width: "36%",
                            alignItems: 'center'}}
                  onPress={() => this.thumbnailClicked()}>
                    <Image
                      style={{width: "100%", height: "100%"}}
                      source={this.getPauseImage()}
                    />
                </TouchableHighlight>
                <View style={{bottom: "55%", elevation:1, backgroundColor : "#FFFFFF"}}>
                  <ProgressBar
                    progress={this.state.progressFraction}
                    width={259}
                    color={"black"}
                  />
                </View>
              </View>
            ) : <YoutubePlayer
              height={200}
              width={288}
              play={this.state.playing}
              videoId={this.props.videoId}
              onChangeState={this.onStateChange}
              ref={this.setPlayerRef}
            />}
            <View style={{height: 240 * 0.67, width: 288, position: "absolute"}}>
              { this.state.isBuffering ? <LoadingThumbnail /> : null}
            </View>
            { this.props.link != null ? <View style={{height: 40, position: "absolute", bottom:160}}>
              <RoundedButton
                  onPress={() => Linking.openURL(this.props.link)}
                  buttonStyle={styles.buttonStyle}
                  textStyle={styles.baseText}
                  text= "See video worksheet"                       
                />
            </View> : null }
            <View style={{height: 20}} />
            <ShowMoreText text={this.props.description} />
        </View>
      </View>);
  }
}

export default RainbowVideo;
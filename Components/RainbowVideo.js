import React from 'react';
import { Button, View, Image, TouchableHighlight, StyleSheet, Text, Alert } from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe";
import {getYoutubeMeta} from 'react-native-youtube-iframe';
import { Dimensions } from 'react-native';
import { AsyncStorage } from 'react-native';
import { useState } from "react";
import ProgressBar from 'react-native-progress/Bar';
import AdjustableText from "../components/AdjustableText.js";
import LoadingThumbnail from "../components/LoadingThumbnail.js";
import { styles } from '../scripts/constants.js'
import moment from "moment";

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
      fiinished : bool - corresponds to whether the video is at its end
      inProgress : bool - this stores whether the user is part way through the video (used for showing the green play button instead of the white one, but that's a bit unnecessary now that we have a progress bar)
      isBuffering : bool - stores whether the video should show the loading thumbnail
      unplayed : bool - stores if the video was just loaded and has yet to be played. This lets us know to show the placeholder thumbnail rather than load the youtube player.
      thumbnail : String? - Either null (the initial value) or a string giving the url where the video's thumbnail can be retrieved
      progressFraction : Number - Fraction of the video that has been watched
      once : Int - For some reason onStateChange was firing with the state "unstarted" multiple times when the video was first loaded, so I introduced a debugging variable to only count the first time unstarted plays. Really should be a bool. 
      */
    this.state = {
      playing: false,
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
  }

  async onStateChange(state) {
    // variables storing the local storage keys for time (in {videoID}.playingTime) and whether the video has been finished (in {videoID}.finished)
    let storageTime = this.props.videoId + '.playingTime';
    let storageFinished = this.props.videoId + '.finished';

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
        await AsyncStorage.setItem(
          storageFinished,
          "true"
        );
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
      return require('../images/check.png');
    } else {
      if (this.state.inProgress){
        return require('../images/green-play.png');
      } else {
        return require('../images/white-play.png');
      }
    }
  }

  // If the video goes from not playing to playing, starts an interval that records the time every second. If the video goes from playing to not playing, cancels the interval
  componentDidUpdate(prevProps, prevState, snapshot){
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

  parseDuration(){
    return moment.duration(this.props.duration, moment.ISO_8601).asSeconds();
  }

  // Loads information from local storage once the component mounts and sets the state appropriately. Also queries the youtube API for the thumbnail URL
  async componentDidMount(){
    let storageFinished = this.props.videoId + '.finished';
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

  render() {
    return (
      <View style={{width: 340 }}>
        <View style={{height: 60}}>
          <AdjustableText
            fontSize={20}
            text=<Text>{this.props.display !== undefined ? this.props.display["title"].map(s =>
                    s.mark ? <Text style={styles.search_highlight}>{s.seg}</Text> : <Text>{s.seg}</Text>) : this.props.title}
                    &nbsp;-&nbsp;
                    {this.props.display !== undefined ? this.props.display["dateString"].map(s =>
                    s.mark ? <Text style={styles.search_highlight}>{s.seg}</Text> : <Text>{s.seg}</Text>) : this.props.title}
                  </Text>
            style={styles.videoTitleText}
            maxHeight={60}
          />
        </View>
        <View style={{flexGrow: 1, alignItems: 'center'}}>
            {this.state.finished || this.state.unplayed ? (
              <View style={{height: 240,
                  top: 0,
                  width: 288,
                  alignItems: 'center'}}>
                {this.state.thumbnail === null ? (<View style={{height: "67%", width: '100%', backgroundColor: 'black'}} />) : (<Image style={{height: "67%", width: '100%'}} source={{uri : this.state.thumbnail}}/>)
                }
                <TouchableHighlight style={{height: "75%",
                            bottom: "58%",
                            width: "60%",
                            alignItems: 'center'}}
                  onPress={() => this.thumbnailClicked()}>
                    <Image
                      style={{width: "60%", height: "60%"}}
                      source={this.getPauseImage()}
                    />
                </TouchableHighlight>
                <ProgressBar
                  progress={this.state.progressFraction}
                  width={259}
                  color={"green"}
                  style={{bottom: "83%"}}
                />
              </View>
            ) : <YoutubePlayer
              height={240}
              width={288}
              play={this.state.playing}
              videoId={this.props.videoId}
              onChangeState={this.onStateChange}
              ref={this.setPlayerRef}
            />}
            <View style={{height: 240 * 0.67, width: 288, position: "absolute"}}>
              { this.state.isBuffering ? <LoadingThumbnail /> : null}
            </View>
          </View>
        </View>
      );
  }
}

export default RainbowVideo;
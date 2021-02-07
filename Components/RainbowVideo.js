import React from 'react';
import { Button, View, Image, TouchableHighlight, StyleSheet, Alert, Text } from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe";
import {getYoutubeMeta} from 'react-native-youtube-iframe';
import { Dimensions } from 'react-native';
import { AsyncStorage } from 'react-native';
import { useState } from "react";
import ProgressBar from 'react-native-progress/Bar';

var styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Cochin',
    textAlign: 'center',
    color: 'rgb(255, 255, 255)',
    // fontSize: 20,
    // flexWrap: 'wrap',
    width: Dimensions.get('window').width * 0.9
  }
});

class RainbowVideo extends React.Component {
  constructor(props) {
    super(props);
    this.playerRef = null;
    this.saveTime = null;

    this.setPlayerRef = element => {
      this.playerRef = element;
    };

    this.state = {
      playing: false,
      shouldSave : false,
      finished: false,
      thumbnail : null,
      watching : false,
      atStart : true,
      progressFraction: 0,
      duration : null,
      once: 0
    };

    // bind methods
    this.onStateChange = this.onStateChange.bind(this);
    this.thumbnailClicked = this.thumbnailClicked.bind(this);
    this.recordTime = this.recordTime.bind(this);
    this.getPauseImage = this.getPauseImage.bind(this);
    this.adjustTitle = this.adjustTitle.bind(this);
  }

  async onStateChange(state) {
    const storageTime = this.props.videoId + '.playingTime';
    const storageFinished = this.props.videoId + '.finished';

    if (state === "playing"){
      this.setState({shouldSave: true});
    } else {
      this.setState({shouldSave: false});
    }

    if (state === "unstarted"){
      if(this.state.once === 0){
        const storedTime = await AsyncStorage.getItem(storageTime);
        if(storedTime !== null && storedTime != "atEnd"){
          const curTime = parseInt(storedTime.split(" ")[0])
          await this.playerRef.seekTo(curTime);
        }
        const duration = Math.floor(await this.playerRef.getDuration());
        this.setState({duration : duration});
      }
      this.setState({once: 1});
    }
    if (state === "ended") {
      this.setState({playing : false, finished : true, progressFraction : 1.0});
      // Alert.alert("video has finished playing!");
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

  async thumbnailClicked() {
    if(this.state.finished){
      this.setState({playing:true, finished:false, atStart : false});
    } else {
      this.setState({playing:true, atStart : false});
    }
  }

  async recordTime(pRef){
    const storageTime = this.props.videoId + '.playingTime';
    const elapsed_time = await pRef.getCurrentTime();
    const elapsed_sec = Math.floor(elapsed_time)
    try {
      await AsyncStorage.setItem(
        storageTime,
        elapsed_sec.toString() + " " + (this.state.duration !== null ? this.state.duration : "")
      );
    } catch (error) {
      Alert.alert("Error saving time!")
    }
  }

  getPauseImage(){
    if(this.state.finished){
      return (<Image
                style={{width: "60%", height: "60%"}}
                source={require('../images/check.png')}
              />);
    } else {
      if (this.state.watching){
         return (<Image
              style={{width: "60%", height: "60%"}}
              source={require('../images/green-play.png')}
            />)
      } else {
          return (<Image
              style={{width: "60%", height: "60%"}}
              source={require('../images/white-play.png')}
            />);
      }
    }
  }

  adjustTitle (fontSize, text, style, maxHeight) {
    var currentFont = fontSize;
    return (
      <Text
        adjustsFontSizeToFit
        style={ [style, { fontSize: currentFont }] }
        onTextLayout={ (e) => {
          const { lines } = e.nativeEvent;
          if (lines.map(line => {lines.height}).reduce((a, b) => a + b, 0) > maxHeight) {
            currentFont = currentFont - 1;
          }
        } }
      >
        { text }
      </Text>
    );
  }

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

  async componentDidMount(){
    const storageFinished = this.props.videoId + '.finished';
    const storageTime = this.props.videoId + '.playingTime';
    // AsyncStorage.getItem(storageFinished).then(alreadyWatched => {
    //   if(alreadyWatched === "true"){
    //     this.setState({finished : true})
    //   }
    // });
    AsyncStorage.getItem(storageTime).then(storedTime => {
      if(storedTime == null || (storedTime != "atEnd" && parseInt(storedTime.split(" ")[0]) == 0)){
        this.setState({watching : false});
      } else if(storedTime != "atEnd"){
        const curTime = parseInt(storedTime.split(" ")[0]);
        const duration = parseInt(storedTime.split(" ")[1]);
        this.setState({watching : true, progressFraction : (curTime / duration)});
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
      <View style={{flex: 1, flexDirection: 'column'}}>
      <View style={{height: 60}}>
      {this.adjustTitle(20, this.props.title + " - " + this.props.date, styles.baseText, 60)}
      </View>
      <View style={{flexGrow: 1, alignItems: 'center'}}>
          {this.state.finished || this.state.atStart ? (
            <View style={{height: 240,
                top: 0,
                width: Dimensions.get('window').width * 0.8,
                alignItems: 'center'}}>
              {this.state.thumbnail === null ? (<View style={{height: "67%", width: '100%', backgroundColor: 'black'}} />) : (<Image style={{height: "67%", width: '100%'}} source={{uri : this.state.thumbnail}}/>)
              }
              <TouchableHighlight style={{height: "75%",
                          bottom: "58%",
                          width: "60%",
                          alignItems: 'center'}}
                onPress={() => this.thumbnailClicked()}>
                  {this.getPauseImage()}
              </TouchableHighlight>
              <ProgressBar
                progress={this.state.progressFraction}
                width={Dimensions.get('window').width * 0.72}
                color={"green"}
                style={{bottom: "83%"}}
              />
            </View>
          ) : <YoutubePlayer
            height={240}
            width={Dimensions.get('window').width * 0.8}
            play={this.state.playing}
            videoId={this.props.videoId}
            onChangeState={this.onStateChange}
            ref={this.setPlayerRef}
          />}
        </View>
        </View>
      );
  }
}

export default RainbowVideo;
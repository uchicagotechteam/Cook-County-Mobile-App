import React from 'react';
import { Button, View, Image, TouchableHighlight, StyleSheet, Alert, Text } from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe";
import {getYoutubeMeta} from 'react-native-youtube-iframe';
import { Dimensions } from 'react-native';
import { AsyncStorage } from 'react-native';

var styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Cochin',
    textAlign: 'center',
    color: 'rgb(255, 255, 255)',
    fontSize: 20,
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
      once: 0
    };

    // bind methods
    this.onStateChange = this.onStateChange.bind(this);
    this.thumbnailClicked = this.thumbnailClicked.bind(this);
    this.recordTime = this.recordTime.bind(this);
    this.getPauseImage = this.getPauseImage.bind(this);
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
        const curTime = await AsyncStorage.getItem(storageTime);
        if(curTime !== null && curTime != "atEnd"){
          await this.playerRef.seekTo(parseInt(curTime));
        }
      }
      this.setState({once: 1});
    }
    if (state === "ended") {
      this.setState({playing : false, finished : true});
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
        elapsed_sec.toString()
      );
    } catch (error) {
      Alert.alert("Error saving time!")
    }
  }

  getPauseImage(){
    if(this.state.finished){
      return (<Image
                style={{width: "70%", height: "70%"}}
                source={require('../images/check.png')}
              />);
    } else {
      if (this.state.watching){
         return (<Image
              style={{width: "70%", height: "70%"}}
              source={require('../images/green-play.png')}
            />)
      } else {
          return (<Image
              style={{width: "70%", height: "70%"}}
              source={require('../images/white-play.png')}
            />);
      }
    }
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
    AsyncStorage.getItem(storageTime).then(curTime => {
      if(curTime == null || (curTime != "atEnd" && parseInt(curTime) == 0)){
        this.setState({watching : false});
      } else if(curTime != "atEnd"){
        this.setState({watching : true});
      } else if(curTime == "atEnd"){
        this.setState({finished : true})
      }
    });
    getYoutubeMeta(this.props.videoId).then(meta => {
        this.setState({thumbnail : meta.thumbnail_url});
    });
  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
      <Text style={styles.baseText}> {this.props.title} - {this.props.date} </Text>
      <View style={{flexGrow: 1, alignItems: 'center'}}>
          {this.state.finished || this.state.atStart ? (
            <View style={{height: 240,
                top: 0,
                width: '80%',
                alignItems: 'center'}}>
              {this.state.thumbnail === null ? (<View style={{height: "78%", width: '100%', backgroundColor: 'black'}} />) : (<Image style={{height: "78%", width: '100%'}} source={{uri : this.state.thumbnail}}/>)
              }
              <TouchableHighlight style={{height: "75%",
                          bottom: "67%",
                          width: "55%",
                          alignItems: 'center'}}
                onPress={() => this.thumbnailClicked()}>
                  {this.getPauseImage()}
              </TouchableHighlight>
            </View>
          ) : <YoutubePlayer
            height={240}
            width={"80%"}
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
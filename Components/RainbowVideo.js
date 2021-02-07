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
      once: 0
    };

    // bind methods
    this.onStateChange = this.onStateChange.bind(this);
    this.replayClicked = this.replayClicked.bind(this);
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
        if(curTime !== null){
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
      } catch (error) {
        Alert.alert("Error saving status")
      }
    }
  }

  async replayClicked() {
    this.setState({playing:true, finished:false});
    await this.playerRef.seekTo(0);
  }

  async recordTime(pRef){
    const storageTime = this.props.videoId + '.playingTime';
    const elapsed_time = await pRef.getCurrentTime();
    const elapsed_sec = Math.floor(elapsed_time)

    if(elapsed_sec > 1){
      try {
        await AsyncStorage.setItem(
          storageTime,
          elapsed_sec.toString()
        );
      } catch (error) {
        Alert.alert("Error saving time!")
      }
    }
  }

  getPauseImage(){
    if(this.state.watching){
      return (<Image
              style={{width: "100%", height: "100%"}}
              source={require('../images/green-play.png')}
            />);
    } else {
      return (<Image
                style={{width: "100%", height: "100%"}}
                source={require('../images/check.png')}
              />);
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
    AsyncStorage.getItem(storageFinished).then(alreadyWatched => {
      if(alreadyWatched === "true"){
        this.setState({finished : true})
      }
    });
    AsyncStorage.getItem(storageTime).then(curTime => {
      if(curTime !== null){
        // Alert.alert("I'm watching!" + curTime);
        this.playerRef.getDuration().then(duration => {
          // Alert.alert("Watch time: " + curTime + " Duration: " + (Math.floor(duration) - 1));
          if(parseInt(curTime) <= Math.floor(duration) - 1){
            this.setState({watching : true})
          }
        });
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
          <YoutubePlayer
          height={240}
          width={"80%"}
          play={this.state.playing}
          videoId={this.props.videoId}
          onChangeState={this.onStateChange}
          ref={this.setPlayerRef}
        />
          {this.state.finished ? (
            <View style={{height: Dimensions.get('window').width * 0.55,
                position: 'absolute',
                top: 0,
                width: '80%',
                alignItems: 'center'}}>
              {this.state.thumbnail === null ? (<View style={{height: "100%", width: '100%', backgroundColor: 'black'}} />) : (<Image style={{height: "100%", width: '100%'}} source={{uri : this.state.thumbnail}}/>)
              }
              <TouchableHighlight style={{height: "90%",
                          bottom: "95%",
                          width: "55%"}}
                onPress={() => this.replayClicked()}>
                  {this.getPauseImage()}
              </TouchableHighlight>
            </View>
          ) : null}
        </View>
        </View>
      );
  }
}

export default RainbowVideo;
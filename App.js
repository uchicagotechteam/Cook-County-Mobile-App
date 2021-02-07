import * as React from 'react';
import { useEffect, useState, useCallback, useRef } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, View, Alert, Text, Image, ImageBackground, ScrollView, TouchableHighlight, StyleSheet} from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe";
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { Dimensions } from 'react-native';
import RainbowChannel from "./Components/RainbowChannel.js";


var styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Cochin',
    textAlign: 'center',
    color: 'rgb(255, 255, 255)',
    fontSize: 20,
  },
  titleText: {
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 45,
    color: 'rgb(255, 255, 255)',
  },
  // Intro page
  mainLogo: {
    width: 200,
    height: 200,
  },
  // Child page
  regLogo: {
    width: 410,
    height: 300,
  },
  // Adult page
  wideLogo: {
    width: 250,
    height: 155,
  },
  // Background logo
  bgLogo: {
    width: 300,
    height: 200,
    alignItems: 'center',
  }
});

const MyTheme = {
  dark: false,
  colors: {
    primary: 'rgb(255, 0, 0)',
    background: 'rgb(0, 0, 242)',
  },
};

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ImageBackground style={styles.bgLogo} source={require('./images/simple_rainbow.png')}>
      <Image
        style={styles.mainLogo}
        source={require('./images/cook_county_seal.png')}
      />
      </ImageBackground>
      <Text style={styles.titleText}>
        Welcome to Project Rainbow! {"\n"} I am a:
      </Text>
      <View style={{margin:20}}>
      <Button
        title="Teacher"
        onPress={() => navigation.navigate('Adult Page')}
      />
      </View>
      <Button
        title="Student"
        onPress={() => navigation.navigate('Child Page')}
      />
    </View>
  );
}

function ChildScreen({ navigation }) {

    // logic to maintain state of video play status
    const [playing, setPlaying] = useState(false);
    const [finished, setFinished] = useState(false);
    const playerRef = useRef();
    const [elapsed, setElapsed] = useState(0);
    const [once, setOnce] = useState(0);
    const [videoArray, setVideoArray] = useState([]);

    // logic to send alert when video ends
    // logic to send alert when video ends
    const onStateChange = useCallback(async (state) => {
      if (state === "unstarted"){
        if(once === 0){
          const curTime = await AsyncStorage.getItem('playingTime');
          if(curTime !== null){
            playerRef.current.seekTo(parseInt(curTime));
          }
        }
        setOnce(1)
      }
      if (state === "ended") {
        const done = await AsyncStorage.getItem('finished');
        var times = 0;
        if(done !== null){
          times = parseInt(done) + 1;
        }
        if (done !== null) {
          Alert.alert("video has finished playing. Times: " + done);
        } else {
          Alert.alert("video has finished playing for the first time!");
        }
        setPlaying(false);
        setFinished(true);
        // Alert.alert("video has finished playing!");
        try {
          await AsyncStorage.setItem(
            'finished',
            times.toString()
          );
        } catch (error) {
          Alert.alert("Error saving status")
        }
      }
    }, []);

    const onTimeChange = useCallback((currentTime) => {
      Alert.alert("Time changed")
    }, [])

    // logic for play/pause button
    const togglePlaying = useCallback(() => {
      setPlaying((prev) => !prev);
    }, []);

    const replayClicked = useCallback(() => {
      setPlaying(true);
      setFinished(false);
      playerRef.current.seekTo(0);
    }, []);

    // logic to maintain state of request to youtube API
    let [responseData, setResponseData] = useState('');

    // TODO: set up env vars with expo so that we can store API KEY in .env file
    // but we do need to see if there's a safer way to store the API key
    // since env variables are bundled into the app's build and thus can be exposed to clients after the app is shipped
    // more info here: https://docs.expo.io/guides/environment-variables/
    // const API_KEY = process.env.EXPO_CCMA_YT_API_KEY;
    const API_KEY = "hello world"; // dummy value to build

    // TODO: right now the url passed into axios just gets basic stats of the channel by username
    // read Youtube Data API docs to find what methods we need to list the channel's playlists and list videos for a playlist
    // we need a video ID to be able to render that video in the IFrame
    // docs here: https://developers.google.com/youtube/v3/docs/channels/list

    // logic to fetch data from youtube api
    const fetchData = useCallback(() => {
      axios({
        "method": "GET",
        "url": "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=50&playlistId=PLydZ2Hrp_gPTfidzAvRI524ZM0S2ZefF7&key=" + API_KEY // `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&forUsername=GoogleDevelopers&key=${API_KEY}`
        
      })
      .then((response) => {
        setResponseData(response.data)
        setVideoArray(response.data.items.map(video => ({
          videoId: video.contentDetails.videoId,
          title: video.snippet.title,
          date : video.snippet.publishedAt
        })));
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
    }, [])

    // useEffect function runs when function initially loads
    // and runs again whenever there is a change to data in second argument array (fetchData)
    // beware of infinite loops
    useEffect(() => {
      fetchData()
      const interval = setInterval(async () => {
        if(!playing){
          const elapsed_time = await playerRef.current.getCurrentTime(); // this is a promise. dont forget to await
          const elapsed_sec = Math.floor(elapsed_time)

          if(elapsed_sec > 1){
            try {
              await AsyncStorage.setItem(
                'playingTime',
                elapsed_sec.toString()
              );
            } catch (error) {
              Alert.alert("Error saving time!")
            }
          }
          setElapsed(elapsed_sec.toString());
        }
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }, [fetchData])

  return (
    <ScrollView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {/* Vertical padding */}
      <View style={{ height: 1050 + (300 * videoArray.length) }} />

      <RainbowChannel videoArray={videoArray} />

      <View style={{flexGrow: 1, alignItems: 'center'}}>
        <YoutubePlayer
          height={300}
          width={"80%"}
          play={playing}
          videoId={"iee2TATGMyI"}
          onChangeState={onStateChange}
          ref={playerRef}
        />
        {finished ? (
          <View style={{height: Dimensions.get('window').width * 0.45,
              position: 'absolute',
              top: 0,
              width: '80%',
              alignItems: 'center'}}>
            <View style={{height: "100%", width: '100%', backgroundColor: 'black'
            }} />
            <TouchableHighlight style={{height: "100%",
                        bottom: "95%",
                        width: "45%"}}
              onPress={() => replayClicked()}>
                <Image
                  style={{width: "100%", height: "100%"}}
                  source={require('./images/replay.png')}
                />
            </TouchableHighlight>
          </View>
        ) : null}
        <Text style={styles.titleText}>{elapsed}</Text>
      </View>
      <Button title={playing ? "pause" : "play"} onPress={togglePlaying} />

      <Image
        style={styles.regLogo}
        source={require('./images/rainbow.jpg')}
      />
      <View style={{ height: 20, }} />

      <Text style={styles.titleText}> Child View </Text>

      {/* Vertical padding */}
      <View style={{ height: 60, }} />

      <Image
        style={{width: 380, height: 410, alignItems: 'center', justifyContent: 'center'}}
        source={require('./images/nav_layout.png')}
      />
      <Text style={styles.baseText}> * Need to replace the above image with a similar layout navigation bar, with videos ordered by date and title </Text>

      {/* Vertical padding */}
      <View style={{ height: 60, }} />

      {/* Download video button */}
      <Text style={styles.titleText}> Download Today's {"\n"} Video! </Text>
      {/* Vertical padding */}
      <View style={{ height: 20, }} />
      <TouchableHighlight
        onPress={() => alert('Button clicked (change later)')}
        style={{alignItems: 'center',}}>
          <Image
            style={{width: 100, height: 125, transform: [{ rotate: '180deg' }]}}
            source={require('./images/up_arrow.png')}
          />
      </TouchableHighlight>
    </ScrollView>
  );
}

function AdultScreen({ navigation }) {
  return (
    <ScrollView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {/* Vertical padding */}
      <View style={{ height: 150, }} />
      <Image
        style={styles.wideLogo}
        source={require('./images/documents.png')}
      />
      <View style={{ height: 20, }} />

      <Text style={styles.titleText}> Adult View </Text>
      {/* Vertical padding */}
      <View style={{ height: 35, }} />

      {/* Button layout */}
      <Button
        title="Download Documents"
        onPress={() => alert('Button clicked (change later)')}
      />
      {/* Vertical padding */}
      <View style={{ height: 35, }} />
      <Button
        title="Upload Documents"
        onPress={() => alert('Button clicked (change later)')}
      />

      {/* Vertical padding */}
      <View style={{ height: 60, }} />

      {/* Upload video button */}
      <Text style={styles.titleText}> Upload Video: </Text>
      {/* Vertical padding */}
      <View style={{ height: 20, }} />
      <TouchableHighlight
        onPress={() => alert('Button clicked (change later)')}
        style={{alignItems: 'center',}}>
          <Image
            style={{width: 100, height: 125,}}
            source={require('./images/up_arrow.png')}
          />
      </TouchableHighlight>
    </ScrollView>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{title:'Project Rainbow'}} />
        <Stack.Screen name="Child Page" component={ChildScreen} />
        <Stack.Screen name="Adult Page" component={AdultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;





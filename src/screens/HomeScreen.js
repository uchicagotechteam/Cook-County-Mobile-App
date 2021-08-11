import * as React from 'react';
import { useEffect, useState, useCallback, useRef } from "react";
import axios from 'axios';
import { TouchableOpacity, View, Text, Image, ImageBackground, StyleSheet,
          ScrollView, Animated, Dimensions, StatusBar
      } from 'react-native';
import { styles, theme, PALETTE, RATIOS, api_key, FOOTER_HEIGHT } from '../scripts/constants.js'
import RoundedButton from '../components/RoundedButton.js'
import Footer from '../components/Footer.js'

// The components used in the Homescreen
import HeaderLogo from  '../components/HeaderLogo.js';
import SponsorBanner  from '../components/SponsorBanner.js'
import FeaturedBanner from '../components/FeaturedBanner.js'
import { SearchBar } from 'react-native-elements';
import ChannelCollection from "../components/ChannelCollection.js";
import DividerLine from "../components/DividerLine.js";

import { setTestID } from '../utils/testUtils.js';

function HomeScreen({ navigation }) {

  // Logic to maintain state of search text
  // const [isBusy, setBusy] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [dateInfo, setDateInfo] = useState({
    dateRestriction : "Anytime",
    afterDate : null,
    beforeDate : null
  });
  //logic to handle individual channel api requests
  const [videoArrays, setVideoArrays] = useState([]);

  let [responseData, setResponseData] = useState('');
  
  let [channelNum, setChannelNum] = useState(0);
  
  // Logic to handle the youtube API request for playlists
  let [playlistResponseData, setPlaylistResponseData] = useState('');
  
  // Logic to maintain the channels returned by the API
  let [channels, setChannels] = useState([]);

  // Function to update the search results
  const updateSearch = useCallback((search) => {
    setSearchText(search);
  }, []);

    // // Array of objects containing the information needed to populate a channel (TODO: figure out if this is okay to hardcode)
 const channelArray = [
    { channelTitle : "Brookfield Zoo",
       channelImage : require('../assets/images/BrookfieldZoo.png'),
       playlistId : "PL8GKxgb3LyNcB01ujLEDS1NH27YqYsOmD",
    },
    {  channelTitle : "Chicago Children's Museum",
       channelImage : require('../assets/images/ChildrensMuseum.png'),
       playlistId : "PL8GKxgb3LyNfoqt77eaW6N6smu75evr5Q",
    },
    {  channelTitle : "Forest Preserves of Cook County",
       channelImage : require('../assets/images/ForestPreserves.png'),
       playlistId : "PL8GKxgb3LyNc82LsEdPhrK96Kj704RQ8k",
    },
    {  channelTitle : "National Museum of Mexican Art",
       channelImage : require('../assets/images/MuseumofMexicanArt.png'),
       playlistId : "PL8GKxgb3LyNfBnnwR6pc6JHZUIFLlg-rK",
    },
    {  channelTitle : "Project Rainbow",
       channelImage : require('../assets/images/PR_logo_name.png'),  
       playlistId : "PL8GKxgb3LyNez6eQhoJCu5sJX5xDCkMQt",
    },
    {  channelTitle : "Negaunee Music Institute at the Chicago Symphony Orchestra",
       channelImage : require('../assets/images/ChicagoSymphony.png'),
       playlistId : "PL8GKxgb3LyNfmdA1XmlTf24ZWj7Hwe52S",
    },
    {  channelTitle : "Chicago Botanic Garden",
       channelImage : require('../assets/images/BotanicGarden.png'),
       playlistId : "PL8GKxgb3LyNcBU5mOtyhyhpWlXkP-iHxI",
    },
    {  channelTitle : "Museum of Contemporary Art Chicago",
       channelImage : require('../assets/images/mca.jpg'),
       playlistId : "PL8GKxgb3LyNfQ8wz4GaXKXc8qhn0qthx_",
    }
  ];

  const image_ids = [
    require('../assets/images/BrookfieldZoo.png'),
    require('../assets/images/ChildrensMuseum.png'),
    require('../assets/images/ForestPreserves.png'),
    require('../assets/images/MuseumofMexicanArt.png'),
    require('../assets/images/PR_logo_name.png'),
    require('../assets/images/ChicagoSymphony.png'),
    require('../assets/images/BotanicGarden.png'),
    require('../assets/images/mca.jpg')
  ];
  
  // Channel id for the CCB user's channel 
  const ccbChannel = "UCLcTO4BeO0tlZFeMS8SKLSg";

  useEffect(() => {
    setChannels(channelArray);
    }, [])
  /*
  useEffect(() => {
    // logic to fetch data from youtube api
    const fetchChannels = function(channelId) {
      //console.log("Playlists from https://www.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&maxResults=50&channelId=" + channelId + "&key=" + api_key);
      axios({
        "method": "GET",
        "url": "https://www.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&maxResults=50&channelId=" + channelId + "&key=" + api_key
      })
      .then((response) => {
        setPlaylistResponseData(response.data)

        // Maps the youtube API response to an array of objects with the information necessary to prepare a video, and then sorts the videos by date (from latest to oldest)
        let playlistArray = response.data.items.map(playlist => {
          return {
            playlistId: playlist.id,
            channelTitle: playlist.snippet.title,
            channelImage : playlist.snippet.description
          }
        });
        //console.log(playlistArray);
        setChannels(playlistArray);
        console.log("CHANNEL START")
        console.log(channels);
        console.log("CHANNEL END")
        setBusy(false);
      })
      .catch((error) => {
        console.log("Axios error");
        console.log(error);
      })
    }
    
    fetchChannels(ccbChannel);
  }, []) */

  useEffect(() => {
    // logic to fetch data from youtube api
    const fetchData = function(playlistId, index, localVideoArrays, pageToken) {
      // console.log(playlistId);
      // console.log(api_key);
      var token_text = (pageToken == null ? "" : "&pageToken=" + pageToken);
      //console.log(token_text);
      axios({
        "method": "GET",
        "url": "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,status%2CcontentDetails&maxResults=50&playlistId=" + playlistId + "&key=" + api_key + token_text
      })
      .then((response) => {
        setResponseData(response.data)
        var nextPageToken = null;
        if(response.data.nextPageToken != undefined && response.data.nextPageToken != null){
          nextPageToken = response.data.nextPageToken;
        }

        // Maps the youtube API response to an array of objects with the information necessary to prepare a video, and then sorts the videos by date (from latest to oldest)
        let videoArray = response.data.items
        .filter(video => {
          // Filter out private and deleted videos
          return video.status.privacyStatus != "private" && video.status.privacyStatus != "privacyStatusUnspecified";
        })
        .map(video => {
          let date = new Date(video.contentDetails.videoPublishedAt);
          // Store the description because that could help with the curriculum
          var full_description = video.snippet.description;
          var description = ""
          var link = null
          
          var lines = full_description.split("\n");
          for (var i = 0; i < lines.length; i++){
            var words = lines[i].split(" ");
            if(words.length > 0 && words[0] == "LINK:"){
              link = lines[i].substring(lines[i].indexOf(' ')+1)
            } else {
              description += lines[i] + "\n"
            }
          }
          // console.log("Link: " + link)
          // console.log("Description: " + description)

          // Get info for highest available thumbnail
          const res = ["maxres", "high", "standard", "medium", "default"];
          let thumbnail = {};
          for (let i = 0; i < res.length; i++) {
            let item = video.snippet.thumbnails[res[i]];
            if (item != undefined || i == res.length - 1) {
              thumbnail = {...item, resolution: res[i]};
              break;
            }
          }

          return {
            videoId: video.contentDetails.videoId,
            title: video.snippet.title,
            date : date,
            dateString : date.toLocaleDateString("en-US"),
            description : description,
            link : link,
            thumbnail: thumbnail,
          }
        })

        // Joins all the ids in the channel to make a query for the video durations.
        // IMPORTANT: The API is limited to 50 videoIds per query (according to stack overflow, haven't tried it myself), so so if channels can have more than 50 videos, we would need to do this in batches of 50.
        let ids = videoArray.map(video => video.videoId).join(',');

        axios({
          "method": "GET",
          "url": "https://www.googleapis.com/youtube/v3/videos?id=" + ids + "&part=contentDetails&key=" + api_key
        })
        .then((durationResponse) => {

          let durations = durationResponse.data.items.map(video => {
            let duration = video.contentDetails.duration;
            return duration;
          })

          if(durations.length == videoArray.length){
            for(var i = 0; i < videoArray.length ; i++){
              videoArray[i]["duration"] = durations[i];
            }
          }
          var newVideoArrays = [];
          // Adds the video array to newVideoArrays, which accumulates objects with the index of the channel and the video array
          if(pageToken == null){
            newVideoArrays = [...localVideoArrays, {index, videoArray}];
          } else {
            localVideoArrays[index].videoArray.push(...videoArray);
            newVideoArrays = localVideoArrays;
          }
          if(nextPageToken == null){
            newVideoArrays[index].videoArray.sort();
          }
          if(index + 1 < channels.length){
            if(nextPageToken == null){
              fetchData(channels[index+1].playlistId, index+1, newVideoArrays, null);
            } else {
              fetchData(channels[index].playlistId, index, newVideoArrays, nextPageToken);
            }
          } else {
            // Once all the fetches have been accumulated, set the array of video arrays in state.
            // Note: I tried to do run the fetchdata requests in parallel for a bit, but it got pretty ugly and changed things so the next request would only start once the previous one finished. I might return and try parallel requests again later though
            setVideoArrays(newVideoArrays); 
            // console.log("VID arrays")
            // console.log(videoArrays);
            // console.log("New video array " + JSON.stringify(newVideoArrays));
          }
        })
        .catch((error) => {
        console.log(error)
        })
      })
      .catch((error) => {
        console.log(error)
      })
    }
    // If there are any channels, begin fetching from the channel at index 0
    if(channels.length > 0){
      fetchData(channels[0].playlistId, 0, [], null);
    }
  }, [channels])



  // Get the dimensions of the screen
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('screen')

  // Set the height of the header when expanded and when collapsed
  const HEADER_EXP_HEIGHT = 180;
  const HEADER_COL_HEIGHT = 50;

  // Compute the height of the top section - the big logo, sponsor bar, and featured videos
  const TOP_SECTION_HEIGHT =
    SCREEN_HEIGHT - HEADER_EXP_HEIGHT + HEADER_COL_HEIGHT - FOOTER_HEIGHT

  // Create a new variable that will track how far the user has scrolled
  const scroll_y = new Animated.Value(0);

  // Get the range of values between when the header is expanded and collapsed
  // This is the range we will interpolate the animated values on
  // i.e. once the screen has scrolled this much, the header is completely closed
  const range = HEADER_EXP_HEIGHT - HEADER_COL_HEIGHT;

  // Animate the height of the header
  const headerHeight = scroll_y.interpolate({
    inputRange:  [0, range],
    outputRange: [HEADER_EXP_HEIGHT, HEADER_COL_HEIGHT],
    extrapolate: 'clamp'
  });

  // Set the collapsed header to start becoming visible halfway into the scroll
  const headerColOpacity = scroll_y.interpolate({
    inputRange:  [range/2, range],
    outputRange: [0, 1],
    extrapolate: 'clamp'
  });

  // Set the expanded header to become invisible halfway into the scroll
  const headerExpOpacity = scroll_y.interpolate({
    inputRange:  [0, range/2],
    outputRange: [1, 0],
    extrapolate: 'clamp'
  });

  // Create state variables to track and control scrolling
  let [isScrolling,   setScrolling]     = useState(false);
  let [scrollEnabled, setScrollEnabled] = useState(true);

  // Callbacks to temporarily disable vertical scrolling on the homepage
  const onGrab = () => {
    if (!isScrolling) setScrollEnabled(false);
  }
  const onRelease = () => {
    setScrollEnabled(true);
  }

  // Callbacks to track whether the screen is actvely scrolling
  const startScroll = () => {
    setScrollEnabled(true);
    setScrolling(true);
  }
  const endScroll = () => {
    setScrolling(false);
  }



  return (
    <View style={[ styles.centerColumn ]}>

      <StatusBar
        animated={true}
        backgroundColor={PALETTE.back.light}
        barStyle={'dark-content'}
      />

      {/* The collapsing header component */}
      <Animated.View style={{
        height: headerHeight, width: SCREEN_WIDTH,
        position: 'absolute', top: 0, left: 0,
        backgroundColor: PALETTE.back.light,
        // borderBottomWidth: 5, borderColor: PALETTE.green.dark,
      }}>

        {/* The collapsed header */}
        <Animated.View style={{
          opacity: headerColOpacity, height: headerHeight,
          position: 'absolute', top: 0, //left: 0,
          flex: 1, alignItems: 'center', justifyContent: 'center',
        }}>
          <View style={[styles.centerColumn, {width: SCREEN_WIDTH}]}>
            <HeaderLogo />
          </View>
        </Animated.View>

        {/* The expanded header */}
        <Animated.View style={{
          opacity: headerExpOpacity,
          // height: headerHeight,
          flex: 1, alignItems: 'center', justifyContent: 'center',
        }}>
          <Image
            source={require("../assets/images/PR_logo_horizontal.png")}
            style={{ width: SCREEN_WIDTH * 2/3 }}
            resizeMode={"contain"}
          />
        </Animated.View>

      </Animated.View>

      {/* Body */}
      <ScrollView
        style={{
          width: "100%", height: SCREEN_HEIGHT - HEADER_COL_HEIGHT,
          marginTop: HEADER_COL_HEIGHT,
          zIndex: -1,
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scroll_y } } }],
          { useNativeDriver: false }
        )}
        onScrollBeginDrag={startScroll}
        onMomentumScrollEnd={endScroll}
        scrollEventThrottle={16}
        snapToOffsets={[ TOP_SECTION_HEIGHT ]}
        decelerationRate={"fast"}
        snapToEnd={false}
        scrollEnabled={scrollEnabled}
      > 

        {/* The components at the top, which should take up one screen height for the landing page */}
        <View style={{ height: TOP_SECTION_HEIGHT }}>

          {/* Spacer component that gets hidden behind the header */}
          <View style={{ height: HEADER_EXP_HEIGHT - HEADER_COL_HEIGHT }} />

          {/* Banner showing the logo for each sponsor */}
          <View>
            <Text style={[styles.subheader_text, {textAlign: 'center'}]}>Partners:</Text>
            <SponsorBanner
              image_ids={image_ids}
              channels={channelArray}
              navigation={navigation}
              shuffle={true}
              style={{marginHorizontal: 5}}
              onGrab={onGrab}
              onRelease={onRelease}
              parentScrolling={isScrolling}
              imageRatio={RATIOS.sponsors}
            />
            <View style={{ paddingRight: 25, width: "100%" }}>
              <TouchableOpacity
                activeOpacity = {0.5}
                onPress={() => navigation.navigate('Logo Screen', { /*image_ids,*/ channels })}
                {...setTestID("home_viewAllLogos")}
              >
                <Text
                  style={[styles.body_text, { width: "100%", textAlign: "right" }]}
                  {...setTestID("home_viewAllLogosText")}
                >
                  View All {"\u00BB"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/*<DividerLine color="blue" style={{ marginVertical: 0 }} />*/}

          {/* Banner showing featured videos */}
          <FeaturedBanner imageRatio={RATIOS.featured} navigation={navigation} /> 

        </View>

        <DividerLine color="blue" style={{ marginVertical: 0 }} />

        {/* The search bar for the channels */}
        <SearchBar
          containerStyle={{ margin: 15, borderRadius: 25 }}
          placeholder="Search title or date"
          onChangeText={updateSearch}
          value={searchText}
          platform={"android"}
          round={true}
        />

        <DividerLine color="blue" style={{ marginTop: 0 }} />

        {/* The list of channels themselves */}
        <ChannelCollection
          navigation={navigation}
          channels={channels}
          videoArrays={videoArrays}
          searchText={searchText}
          dateInfo={dateInfo}
          itemsPerInterval={2}
          imageRatio={RATIOS.channels}
        />
      </ScrollView>
      <Footer navigation={navigation}/>
    </View>
  );
}

export default HomeScreen;
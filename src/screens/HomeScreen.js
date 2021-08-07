import * as React from 'react';
import { useEffect, useState, useCallback, useRef } from "react";
import axios from 'axios';
import { TouchableOpacity, View, Text, Image, ImageBackground, StyleSheet,
          ScrollView, Animated, Dimensions, StatusBar
      } from 'react-native';
import { styles, theme, PALETTE, RATIOS, api_key } from '../scripts/constants.js'
import RoundedButton from '../components/RoundedButton.js'

// The components used in the Homescreen
import SponsorBanner  from '../components/SponsorBanner.js'
import FeaturedBanner from '../components/FeaturedBanner.js'
import { SearchBar } from 'react-native-elements';
import ChannelCollection from "../components/ChannelCollection.js";
import DividerLine from "../components/DividerLine.js";

function HomeScreen({ navigation }) {

  // Logic to maintain state of search text
  const [isBusy, setBusy] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [dateInfo, setDateInfo] = useState({
    dateRestriction : "Anytime",
    afterDate : null,
    beforeDate : null
  });
  
  // Logic to handle the youtube API request for playlists
  let [playlistResponseData, setPlaylistResponseData] = useState('');
  
  // Logic to maintain the channels returned by the API
  let [channels, setChannels] = useState([]);

  // Function to update the search results
  const updateSearch = useCallback((search) => {
    setSearchText(search);
  }, []);
  
  // Channel id for the CCB user's channel 
  const ccbChannel = "UCLcTO4BeO0tlZFeMS8SKLSg";
  
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
  }, [])

  // // Array of objects containing the information needed to populate a channel (TODO: figure out if this is okay to hardcode)
  // const channels = [
  //   { channelTitle : "WTTW Chicago",
  //     channelImage : "music",
  //     playlistId : "PLWgiRpr4E_tV2_sL7r-6eGxVDN8EJBkkZ",
  //   },
  //   { channelTitle : "Test Channel 2",
  //     channelImage : "music",
  //     playlistId : "PLsPUh22kYmNCzNFNDwxIug8q1Zz0Mj60H",
  //   },
  //   { channelTitle : "Test Channel 3",
  //     channelImage : "music",
  //     playlistId : "PLWgiRpr4E_tV2_sL7r-6eGxVDN8EJBkkZ",
  //   },
  //   { channelTitle : "Test Channel 4",
  //     channelImage : "music",
  //     playlistId : "PLWgiRpr4E_tV2_sL7r-6eGxVDN8EJBkkZ",
  //   },
  // ];

  // Get the dimensions of the screen
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('screen')

  // Set the height of the header when expanded and when collapsed
  const HEADER_EXP_HEIGHT = 180;
  const HEADER_COL_HEIGHT = 50;

  // Compute the height of the top section - the big logo, sponsor bar, and featured videos
  const TOP_SECTION_HEIGHT = SCREEN_HEIGHT - HEADER_EXP_HEIGHT + HEADER_COL_HEIGHT  - 40

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

  const image_ids = [
    "190NCHKJNKfsIkVJjwStxLOhSjRodwTXY",
    "1uO5JM4dFdrG_da6WWIV_zAKpj-Oq9OHI",
    "14CI6-BLCK8rN88q1E8_HzAJX2O4N8liH",
    "13MR-zF0RgRApeAD-RNY-nTZATzrhUoH0",
    "18or-3ae4GWE1t8L8V0HrwQ2TsEuTYmM5",
    "1EROOFcwtSbzt9OixaLV8fbWJYsqygSa5",
    "1Zzpn53KafJ-vjRpqOB-1rKM_BFtagiOt",
    "1Y36qzXx2QIggHufzDWr_7sWWKGLfYmkD",
    "1yFKx0qh7f6BUPirSOfrWLl6MOiMS76Si",
    "1gILEl3TfYAHRyzWsXqDTso5_rk7wNMk6",
    "1bKjY7EvQaR893QnZ8VsOn3AFSB0lsK5F",
    "1BBuvgZG6lzSkOhUk3Jg8OJPtnKxhIr_F",
    "1uJaJWP6ZL24ABLvz-jc7hbbUibfuH03V",
    "1ew7_49xa4m_HkaccuoFFtz3Nd533NqTs",
    "1AIwIhSw68x7HFd7M7uTXmhSjN1t3UvJ1",
  ];


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
            <Image
              source={require("../assets/images/PR_logo.png")}
              style={{width: 35, height: 35}}
              resizeMode={"contain"}
            />
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
            <Text style={[styles.subheader_text, {textAlign: 'center'}]}>in collaboration with</Text>
            {isBusy ? (<View/>) : (
            <SponsorBanner
              image_ids={image_ids}
              channels={channels}
              navigation={navigation}
              shuffle={true}
              style={{marginHorizontal: 5}}
              onGrab={onGrab}
              onRelease={onRelease}
              parentScrolling={isScrolling}
              imageRatio={RATIOS.sponsors}
            /> )}
            <View style={{ paddingRight: 25, width: "100%" }}>
              <TouchableOpacity
                activeOpacity = {0.5}
                onPress={() => navigation.navigate('Logo Screen', { image_ids })}
              >
                <Text style={[styles.body_text, { width: "100%", textAlign: "right" }]} >
                  View All {"\u00BB"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/*<DividerLine color="blue" style={{ marginVertical: 0 }} />*/}
          <View style={{height: 10}} />

          {/* Banner showing featured videos */}
          <FeaturedBanner imageRatio={RATIOS.featured} /> 

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
          searchText={searchText}
          dateInfo={dateInfo}
          itemsPerInterval={2}
          imageRatio={RATIOS.channels}
        />
      </ScrollView>
    </View>
  );
}

export default HomeScreen;
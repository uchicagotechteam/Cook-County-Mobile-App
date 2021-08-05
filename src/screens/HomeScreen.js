import * as React from 'react';
import { useEffect, useState, useCallback, useRef } from "react";
import axios from 'axios';
import { TouchableOpacity, View, Text, Image, ImageBackground, StyleSheet,
          ScrollView, Animated, Dimensions, StatusBar
      } from 'react-native';
import { styles, theme, PALETTE, api_key } from '../scripts/constants.js'
import RoundedButton from '../components/RoundedButton.js'

// The components used in the Homescreen
import SponsorBanner  from '../components/SponsorBanner.js'
import FeaturedBanner from '../components/FeaturedBanner.js'
import { SearchBar } from 'react-native-elements';
import ChannelCollection from "../components/ChannelCollection.js";
import DividerLine from "../components/DividerLine.js";

function HomeScreen({ navigation }) {

  // Logic to maintain state of search text
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
      console.log("Playlists from https://www.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&maxResults=50&channelId=" + channelId + "&key=" + api_key);
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
        console.log(playlistArray);
        setChannels(playlistArray);
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

  // Set the height of the header when expanded and when collapsed
  const HEADER_EXP_HEIGHT = 180;
  const HEADER_COL_HEIGHT = 50;

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

  // Get the dimensions of the screen
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('screen')

  // return (
  //   <View style={{flex: 1}}>
  //     <Animated.View style={{
  //       height: headerHeight, width: SCREEN_WIDTH,
  //       position: 'absolute', top: 0, left: 0
  //     }}/>
  //       <ScrollView
  //         contentContainerStyle={{ padding: 16, paddingTop: HEADER_EXP_HEIGHT }}
  //         onScroll={Animated.event(
  //           [{ nativeEvent: { contentOffset: { y: scroll_y } } }],
  //           { useNativeDriver: false }
  //         )}
  //         scrollEventThrottle={16}
  //       >
  //         <Text style={{fontSize: 24, marginVertical: 16}}>This is Title</Text>
  //         <Text>
  //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse id purus nec sapien semper bibendum vel commodo nulla. Integer vel fermentum mi. Nullam rutrum elit et nisi scelerisque, at dictum sem sagittis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ornare dui in nunc pretium, ut elementum est porta. Proin et mollis tortor, vel pulvinar mauris. Nam fringilla, erat sit amet lobortis euismod, purus magna faucibus erat, a bibendum dui neque sit amet magna. Aenean ultricies, ipsum ac tincidunt mattis, augue libero vestibulum urna, et dignissim urna mauris ac tellus. Suspendisse luctus risus sed accumsan porttitor. Cras pretium scelerisque nibh vel aliquet.
  //           In hac habitasse platea dictumst. Quisque tempor ut nibh quis elementum. Mauris dignissim purus ut luctus mattis. Nulla facilisi. Praesent convallis ornare eros, a aliquam magna facilisis a. Vivamus a ligula velit. Pellentesque bibendum nunc vel urna rutrum rhoncus. Aliquam blandit, purus quis suscipit euismod, ipsum arcu egestas nunc, ut lacinia massa dolor sed leo. Donec eget tincidunt odio. Nunc convallis sem dui, nec ullamcorper tellus sodales non. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris cursus convallis urna, id tempus magna pretium nec.
  //           Aliquam non lorem leo. Curabitur molestie non sapien ac facilisis. Donec eleifend porttitor viverra. Proin ut porttitor erat. Vivamus dapibus nunc eget ipsum euismod, facilisis porta enim vulputate. Aenean et purus sit amet mi tincidunt lacinia. Aliquam erat volutpat. Integer a purus ullamcorper dui auctor fermentum. Suspendisse porta, quam at iaculis gravida, mauris dui pretium erat, quis volutpat purus risus ac nisl. Integer quam nibh, lacinia sit amet risus ultrices, bibendum faucibus arcu. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut porta et neque a varius. Nunc sed facilisis mi, quis molestie felis. Nunc vel massa at quam pretium posuere ac sit amet quam. Proin ullamcorper gravida ante sed fringilla. Nullam maximus dui quis velit lobortis, ac molestie mauris pulvinar.
  //           Maecenas scelerisque laoreet purus ac sodales. In fermentum quam et lectus ultricies, vel pulvinar magna molestie. Integer porttitor velit nulla. Vestibulum dapibus consectetur enim ac placerat. Etiam aliquet, libero et feugiat commodo, leo quam accumsan magna, in vulputate justo ex eu quam. Proin in diam non eros facilisis sodales sed sit amet odio. Donec in viverra est. Curabitur lacus urna, tincidunt ac augue vel, molestie efficitur dui.
  //           Duis cursus ante id placerat tincidunt. In vel orci velit. Donec iaculis ac elit ut interdum. Fusce non tristique nisi, vitae laoreet augue. Praesent semper, ex sit amet tincidunt tristique, nunc massa condimentum libero, vitae interdum ex lorem ac augue. Maecenas porta non diam in elementum. Quisque mattis efficitur libero, in pulvinar tellus posuere non. Nunc turpis mi, eleifend at felis non, placerat volutpat arcu. Quisque bibendum in velit a pharetra. Nulla facilisi. Fusce convallis felis massa.
  //         </Text>
  //       </ScrollView>
  //   </View>
  // );




  // return (
  //   <View style={[ styles.centerColumn ]}>

  //     {/* The collapsing header component */}
  //     <View style={{ height: 300 }}>

  //       {/* TODO: Featured videos banner */}

  //       {/* The banner showing the logo for each sponsor */}
  //       <SponsorBanner
  //         // image_ids={[ "19Y4tCXEbft3isAWAT-4l34t8fRiZzpWE" ]}
  //         image_ids={[
  //           "19Y4tCXEbft3isAWAT-4l34t8fRiZzpWE",
  //           "19Y4tCXEbft3isAWAT-4l34t8fRiZzpWE",
  //           "19Y4tCXEbft3isAWAT-4l34t8fRiZzpWE",
  //           "19Y4tCXEbft3isAWAT-4l34t8fRiZzpWE",
  //           "19Y4tCXEbft3isAWAT-4l34t8fRiZzpWE",
  //           "19Y4tCXEbft3isAWAT-4l34t8fRiZzpWE",
  //           "19Y4tCXEbft3isAWAT-4l34t8fRiZzpWE",
  //           "19Y4tCXEbft3isAWAT-4l34t8fRiZzpWE",
  //         ]}
  //         navigation={navigation}
  //         shuffle={true}
  //         style={{ marginVertical: 40 }}
  //       />

  //     </View>

  //     { The shelf view for the Rainbow Channels }
  //     <ScrollView
  //       style={{ width: "100%", height: 300 }}
  //       contentContainerStyle={{  }}
  //       onScroll={Animated.event(
  //         [{ nativeEvent: { contentOffset: { y: scroll_y } } }],
  //         { useNativeDriver: false }
  //       )}
  //       scrollEventThrottle={16}
  //       stickyHeaderIndices={[0]}
  //     >

  //       {/* The search bar for the channels */}
  //       <SearchBar
  //         placeholder="Search title or date"
  //         onChangeText={updateSearch}
  //         value={searchText}
  //         platform={"android"}
  //         round={true}
  //       />

  //       {/* The list of channels themselves */}
  //       <ChannelCollection
  //         navigation={navigation}
  //         channels={channels}
  //         searchText={searchText}
  //         dateInfo={dateInfo}
  //         isAdult={true}
  //       />
  //     </ScrollView>
  //   </View>
  // );





  let [isScrolling,   setScrolling]     = useState(false);
  let [scrollEnabled, setScrollEnabled] = useState(true);

  const onGrab = () => {
    if (!isScrolling) setScrollEnabled(false);
  }
  const onRelease = () => {
    setScrollEnabled(true);
  }

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
              style={{width: 25, height: 25}}
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
          width: "100%", height: SCREEN_HEIGHT - HEADER_COL_HEIGHT - 20,
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
        snapToOffsets={[ SCREEN_HEIGHT - HEADER_EXP_HEIGHT + HEADER_COL_HEIGHT ]}
        decelerationRate={"fast"}
        snapToEnd={false}
        scrollEnabled={scrollEnabled}
      >

        {/* The components at the top, which should take up one screen height for the landing page */}
        <View style={{ height: SCREEN_HEIGHT - HEADER_EXP_HEIGHT + HEADER_COL_HEIGHT }}>

          {/* Spacer component that gets hidden behind the header */}
          <View style={{
            height: HEADER_EXP_HEIGHT - HEADER_COL_HEIGHT,
            backgroundColor: theme.colors.background,
            marginBottom: 20,
          }} />

          <DividerLine color="blue" style={{ marginVertical: 0 }} />

          {/* Banner showing featured videos */}
          <FeaturedBanner />

          <DividerLine color="blue" style={{ marginVertical: 0 }} />

          {/* Banner showing the logo for each sponsor */}
          <View>
            <Text style={[styles.subheader_text, {textAlign: 'center'}]}>in collaboration with</Text>
            <SponsorBanner
              image_ids={image_ids}
              navigation={navigation}
              shuffle={true}
              style={{marginHorizontal: 5}}
              onGrab={onGrab}
              onRelease={onRelease}
              parentScrolling={isScrolling}
            />
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
          isAdult={true}
        />
      </ScrollView>
    </View>
  );
}

export default HomeScreen;
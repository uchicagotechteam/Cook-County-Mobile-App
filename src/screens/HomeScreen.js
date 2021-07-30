import * as React from 'react';
import { useEffect, useState, useCallback, useRef } from "react";
import axios from 'axios';
import { TouchableOpacity, View, Text, Image, ImageBackground, StyleSheet,
          ScrollView, Animated, Dimensions
      } from 'react-native';
import { styles, theme, PALETTE, api_key } from '../scripts/constants.js'
import RoundedButton from '../components/RoundedButton.js'

// The components used in the Homescreen
import SponsorBanner from '../components/SponsorBanner.js'
import { SearchBar } from 'react-native-elements';
import ChannelCollection from "../components/ChannelCollection.js";

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

  // Array of objects containing the information needed to populate a channel (TODO: figure out if this is okay to hardcode)
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

  // return (
  //   <View>
  //     <Text>Hello world</Text>
  //   </View>
  // );

  const HEADER_EXP_HEIGHT = 300;
  const HEADER_COL_HEIGHT = 0;

  // Create a new variable that will track the object's opacity
  // const scroll_y = useRef(new Animated.Value(0.01)).current;
  const scroll_y = new Animated.Value(0);



  const headerHeight = scroll_y.interpolate({
    inputRange:  [0, HEADER_EXP_HEIGHT - HEADER_COL_HEIGHT],
    outputRange: [HEADER_EXP_HEIGHT, HEADER_COL_HEIGHT],
    extrapolate: 'clamp'
  });

  const bannerMargin = scroll_y.interpolate({
    inputRange:  [0, HEADER_EXP_HEIGHT - HEADER_COL_HEIGHT],
    outputRange: [50, 0],
    extrapolate: 'clamp'
  });

  const headerTitleOpacity = scroll_y.interpolate({
    inputRange:  [0, HEADER_EXP_HEIGHT - HEADER_COL_HEIGHT],
    outputRange: [0, 1],
    extrapolate: 'clamp'
  });

  const heroTitleOpacity = scroll_y.interpolate({
    inputRange:  [0, HEADER_EXP_HEIGHT - HEADER_COL_HEIGHT],
    outputRange: [1, 0],
    extrapolate: 'clamp'
  });

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










  return (
    <View style={[ styles.centerColumn ]}>

      {/* The collapsing header component */}
      <Animated.View style={{
        height: headerHeight, width: SCREEN_WIDTH,
        position: 'absolute', top: 0, left: 0,
      }}>

        {/* The expanded header */}
        <Animated.View style={{
          opacity: heroTitleOpacity,
          position: 'absolute', top: 0, left: 0, height: headerHeight,
          flex: 1, alignItems: 'center', justifyContent: 'center',
        }}>

          {/* TODO: Featured videos banner */}

          {/* The banner showing the logo for each sponsor */}
          {/*<SponsorBanner
            // image_ids={[ "19Y4tCXEbft3isAWAT-4l34t8fRiZzpWE" ]}
            image_ids={[
              "19Y4tCXEbft3isAWAT-4l34t8fRiZzpWE",
              "19Y4tCXEbft3isAWAT-4l34t8fRiZzpWE",
              "19Y4tCXEbft3isAWAT-4l34t8fRiZzpWE",
              "19Y4tCXEbft3isAWAT-4l34t8fRiZzpWE",
              "19Y4tCXEbft3isAWAT-4l34t8fRiZzpWE",
              "19Y4tCXEbft3isAWAT-4l34t8fRiZzpWE",
              "19Y4tCXEbft3isAWAT-4l34t8fRiZzpWE",
              "19Y4tCXEbft3isAWAT-4l34t8fRiZzpWE",
            ]}
            navigation={navigation}
            shuffle={true}
            // style={{ marginVertical: bannerMargin }}
          />*/}
        </Animated.View>

        {/* The collapsed header */}
        <Animated.View style={{
          opacity: headerTitleOpacity,
          position: 'absolute', top: 0, left: 0, height: headerHeight, width: "100%"
        }}>
          <Text>Hello</Text>
        </Animated.View>
      </Animated.View>

      {/* The shelf view for the Rainbow Channels */}
      <ScrollView
        style={{
          width: "100%", paddingTop: HEADER_COL_HEIGHT, height: 300,
          borderTop: PALETTE.red.normal,
          // backgroundColor: RAINBOW_COLORS.yellow,
          zIndex: -1,
        }}
        // contentContainerStyle={{ paddingTop: HEADER_EXP_HEIGHT }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scroll_y } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        stickyHeaderIndices={[1]}
      >
        <View style={{ height: HEADER_EXP_HEIGHT, backgroundColor: theme.colors.background }} />

        {/* The search bar for the channels */}
        <SearchBar
          containerStyle={{ margin: 15, borderRadius: 25 }}
          placeholder="Search title or date"
          onChangeText={updateSearch}
          value={searchText}
          platform={"android"}
          round={true}
        />
        <View style={{
          borderWidth: 2,
          borderColor: PALETTE.blue.normal,
          margin: 20, marginTop: 0,
        }} />

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
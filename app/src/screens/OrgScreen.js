import React, { useContext } from 'react';
import { useEffect, useState, useCallback, useRef } from "react";
import axios from 'axios';
import { Button, View, Text, Image, ImageBackground, StyleSheet, ScrollView, Animated, TouchableHighlight, AsyncStorage, Dimensions} from 'react-native';
import { styles, api_key, PALETTE, FOOTER_HEIGHT  } from '../scripts/constants.js'
import LogoImage from '../components/LogoImage.js';
//import LogoTitle from '../components/LogoTitle.js';
import ChannelCollectionOrg from "../components/ChannelCollectionOrg.js";
//import RainbowChannel from "../components/RainbowChannel.js";
import AdjustableText from "../components/AdjustableText.js";
import Footer from '../components/Footer.js'
//import RoundedButton from "../components/RoundedButton.js";

//import { DataContext } from '../App';


//props needed: image id (from google drive), organization name, link to worksheet google drive, playlist id

function OrgScreen({ route, navigation }) {

//console.log(channelHardCode);

var channel = route.params.channel;
//const index = route.params.index;
//var orgIdx = index > orgChannels.length ? index % orgChannels.length : index;
//channel= channel[orgIdx];

  // console.log("FINALLY!!!");
  // console.log(channel);
  const [isBusy, setBusy] = useState(true);


  let [playlistResponseData, setPlaylistResponseData] = useState('');
  let [channelResponseData, setChannelResponseData] = useState('');
  let [channels, setChannels] = useState([]);
  let [bannerDescription, setBannerDescription] = useState('');

  // Array of objects containing the information needed to populate a channel (TODO: figure out if this is okay to hardcode)
  const ccbChannel = "UCLcTO4BeO0tlZFeMS8SKLSg";

//constants for animated header
const HEADER_EXP_HEIGHT = 180;
const HEADER_COL_HEIGHT = 50;
const scroll_y = new Animated.Value(0);
const range = HEADER_EXP_HEIGHT - HEADER_COL_HEIGHT;
// Get the dimensions of the screen
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('screen')

  // Set the height of the header when expanded and when collapsed
  const FOOTER_ROOM = 300;
const TOP_SECTION_HEIGHT =
    SCREEN_HEIGHT - HEADER_EXP_HEIGHT + HEADER_COL_HEIGHT - FOOTER_HEIGHT

const headerHeight = scroll_y.interpolate({
    inputRange:  [0, range],
    outputRange: [HEADER_EXP_HEIGHT, HEADER_COL_HEIGHT],
    extrapolate: 'clamp'
  });

const headerColOpacity = scroll_y.interpolate({
    inputRange:  [range/2, range],
    outputRange: [0, 1],
    extrapolate: 'clamp'
  });

const headerExpOpacity = scroll_y.interpolate({
    inputRange:  [0, range/2],
    outputRange: [1, 0],
    extrapolate: 'clamp'
  });

  let [isScrolling,   setScrolling]     = useState(false);
  let [scrollEnabled, setScrollEnabled] = useState(true);

  const startScroll = () => {
    setScrollEnabled(true);
    setScrolling(true);
  }

  const endScroll = () => {
    setScrolling(false);
  }

useEffect(() => {
  setChannels([channel]);
 }, [])

const getChannel = useCallback(() =>{
    //console.log("Getting the child screen with channel length: " + channels.length);
    // console.log(channels)
    return (
      <ChannelCollectionOrg
        channels={channels}
				channelTitle={channel.channelTitle}
        navigation={navigation}
      />
    )
  }, [channels]);



  return (
    <View style={[ styles.centerColumn ]}>

      {/* The collapsing header component */}
      <Animated.View style={{
        height: headerHeight, width: SCREEN_WIDTH,
        position: 'absolute', top: 0, left: 0,
        backgroundColor: PALETTE.back.light,
        //borderBottomWidth: 5, borderTopWidth: 5, borderColor: PALETTE.green.dark,
      }}>

        {/* The collapsed header */}
        <Animated.View style={{
          opacity: headerColOpacity, height: headerHeight,
          position: 'absolute', top: 0, //left: 0,
          flex: 1, alignItems: 'center', justifyContent: 'center',
        }}>
          <View style={[styles.centerColumn, {width: SCREEN_WIDTH}]}>
            <LogoImage source={channel.channelImage} width={SCREEN_WIDTH * 1/4} clickable={false} />
          </View>
        </Animated.View>

        {/* The expanded header */}
        <Animated.View style={{
          opacity: headerExpOpacity,
          // height: headerHeight,
          flex: 1, alignItems: 'center', justifyContent: 'center',
        }}>
          <LogoImage source={channel.channelImage} width={SCREEN_WIDTH * 1/2} clickable={false} />
        
        </Animated.View>

      </Animated.View>

      {/* Body Component - channel videos */}
      <View style={{ height: 20 }} />
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

      {/* Spacer component that gets hidden behind the header */}
      <View style={{ height: HEADER_EXP_HEIGHT - HEADER_COL_HEIGHT }} />
     
        <View style={{ height: 10 }} />
        { getChannel() }
      </ScrollView>

      {/* Standard Footer */}
      <Footer navigation={navigation}/>
    </View>
  );

}

export default OrgScreen;
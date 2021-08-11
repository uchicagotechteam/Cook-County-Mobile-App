import React, { useContext } from 'react';
import { useEffect, useState, useCallback, useRef } from "react";
import axios from 'axios';
import { Button, View, Text, Image, ImageBackground, StyleSheet, ScrollView, TouchableHighlight, AsyncStorage, Dimensions} from 'react-native';
import { styles, api_key } from '../scripts/constants.js'
import LogoImage from '../components/LogoImage.js';
//import LogoTitle from '../components/LogoTitle.js';
//import SearchArea from '../components/SearchArea';
import ChannelCollectionOrg from "../components/ChannelCollectionOrg.js";
//import RainbowChannel from "../components/RainbowChannel.js";
import ToggleSearch from "../components/ToggleSearch.js";
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
  // const [searchText, setSearchText] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [dateInfo, setDateInfo] = useState({dateRestriction : "Anytime", afterDate : null, beforeDate : null});


  let [playlistResponseData, setPlaylistResponseData] = useState('');
  let [channelResponseData, setChannelResponseData] = useState('');
  let [channels, setChannels] = useState([]);
  let [bannerDescription, setBannerDescription] = useState('');

  // Array of objects containing the information needed to populate a channel (TODO: figure out if this is okay to hardcode)
  const ccbChannel = "UCLcTO4BeO0tlZFeMS8SKLSg";

  // Function to update the text search results
  /*
  const updateSearch = useCallback((search) => {
    setSearchText(search);
  }, []);
  */

  // Function to update the date search results
  const updateDates = useCallback((dateRestriction, afterDate, beforeDate) => {
    console.log("New restriction: " + dateRestriction);
    setDateInfo({dateRestriction, afterDate, beforeDate});
  }, []);

/*
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <ToggleSearch onPress={active => {setSearchActive(active);}} />
      ),
    });
  }, [navigation]);

*/

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

	// Get the dimensions of the screen
	const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('screen')

	// Set the height of the header when expanded and when collapsed
	const FOOTER_ROOM = 300;

  return (
    <View>

    
  <View style = {{alignItems: 'center',justifyContent: 'center', padding: 15,}}>
    <LogoImage source={channel.channelImage} width={175} clickable={false} />
    <View style={{ height: 10 }} />
    <AdjustableText
      fontSize={28}
      text=<Text>{channel.channelTitle}</Text>
      style={styles.org_title}
    />
    </View>
		
    <ScrollView
			style={{width: "100%", height: SCREEN_HEIGHT - FOOTER_ROOM}}
		>

      <View style={{ height: 10 }} />

      {getChannel()}

    </ScrollView>
		<Footer navigation={navigation}/>
    </View>
  );

}

export default OrgScreen;
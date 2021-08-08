import React, { useContext } from 'react';
import { useEffect, useState, useCallback, useRef } from "react";
import axios from 'axios';
import { Button, View, Text, Image, ImageBackground, StyleSheet, ScrollView, TouchableHighlight, AsyncStorage} from 'react-native';
import { styles, api_key } from '../scripts/constants.js'
import LogoTitle from '../components/LogoTitle.js';
import SearchArea from '../components/SearchArea';
import ChannelCollectionOrg from "../components/ChannelCollectionOrg.js";
//import RainbowChannel from "../components/RainbowChannel.js";
import ToggleSearch from "../components/ToggleSearch.js";
import RoundedButton from "../components/RoundedButton.js";
//import { DataContext } from '../App';


//props needed: image id (from google drive), organization name, link to worksheet google drive, playlist id

function OrgScreen({ route, navigation }) {

  const channelHardCode = {
    channelTitle : "Partner TEST NAME",
    channelImage : "golden",
    playlistId : "PL8jD_SDw-fZqzl-nvDm_j-rkgftFwsy0V",
    image_id: "1IuCEcIGstbYhj22wZqcn2HBMO600bCHm",
  }; 
//console.log(channelHardCode);

const channel = route.params.orgChannel;
//channel= channel.channels[0];
console.log("FINALLY!!!");
console.log(channel);
const [isBusy, setBusy] = useState(true);
	const [searchText, setSearchText] = useState("");
  	const [searchActive, setSearchActive] = useState(false);
  	const [dateInfo, setDateInfo] = useState({dateRestriction : "Anytime", afterDate : null, beforeDate : null});


  let [playlistResponseData, setPlaylistResponseData] = useState('');
  let [channelResponseData, setChannelResponseData] = useState('');
  let [channels, setChannels] = useState([]);
  let [bannerDescription, setBannerDescription] = useState('');

  // Array of objects containing the information needed to populate a channel (TODO: figure out if this is okay to hardcode)
  const ccbChannel = "UCLcTO4BeO0tlZFeMS8SKLSg";
  

  // Function to update the text search results
  const updateSearch = useCallback((search) => {
    setSearchText(search);
  }, []);

  // Function to update the date search results
  const updateDates = useCallback((dateRestriction, afterDate, beforeDate) => {
    console.log("New restriction: " + dateRestriction);
    setDateInfo({dateRestriction, afterDate, beforeDate});
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <ToggleSearch onPress={active => {setSearchActive(active);}} />
      ),
    });
  }, [navigation]);

useEffect(() => {
  setChannels([channel]);
 }, [])

const getChannel = useCallback(() =>{
    //console.log("Getting the child screen with channel length: " + channels.length);
    console.log(channels)
    return (
      <ChannelCollectionOrg
        channels={channels}
        navigation={navigation} 
      />
    )
  }, [channels]);


  
  return (
    <View>
    <SearchArea
      updateSearch={updateSearch}
      updateDates={updateDates}
      searchText={searchText}
      active={searchActive}
    />
    
    <LogoTitle channel={channel}/>

    <RoundedButton
          onPress={() => alert('Button clicked (change later)')}
          buttonStyle={styles.buttonStyle}
          textStyle={styles.baseText}
          text= "See All Channel Worksheets"                       
        />

    <ScrollView>

      <View style={{ height: 10 }} />
      
      
        {getChannel()}
      

    </ScrollView>
      

    </View>
  );

}

export default OrgScreen;
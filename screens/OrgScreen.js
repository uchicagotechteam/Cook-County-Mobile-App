import * as React from 'react';
import { useEffect, useState, useCallback, useRef } from "react";
import { Button, View, Text, Image, ImageBackground, StyleSheet, ScrollView, TouchableHighlight} from 'react-native';
//import RainbowTheater from "../components/RainbowTheater.js";
import { styles } from '../scripts/constants.js'
import LogoTitle from '../components/LogoTitle.js';
import RainbowChannel from "../components/RainbowChannel.js";
import SearchArea from '../components/SearchArea';
import ChannelCollection from "../components/ChannelCollection.js";
import ToggleSearch from "../components/ToggleSearch.js";
import RoundedButton from "../components/RoundedButton.js";

//screen for each separate channel/organization, includes logo & org name as header, horizontal scroll of org videos, button to access org worksheets
//line 63
/*
       <RainbowTheater
        channels={channels}
        isAdult={false}
        navigation={navigation}
      /> */

/*
//<LogoTitle channel={channel}/> add to line 65
*/ 
function OrgScreen({ navigation }) {
	const [searchText, setSearchText] = useState("");
  	const [searchActive, setSearchActive] = useState(false);
  	const [dateInfo, setDateInfo] = useState({dateRestriction : "Anytime", afterDate : null, beforeDate : null});

	const channel = {
    channelTitle : "Golden Apples",
    channelImage : "../images/golden_channel.jpeg",
    playlistId : "PL4fGSI1pDJn6O1LS0XSdF3RyO0Rq_LDeI",
  };

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


  return (
    <View>
    <SearchArea
      updateSearch={updateSearch}
      updateDates={updateDates}
      searchText={searchText}
      active={searchActive}
    />

    <LogoTitle channel={channel}/>

    <ScrollView>
      <View style={{ height: 5, }} />
      <View style={{ height: 20, }} />


      <View style={{ height: 10, }} />
      <View style={{backgroundColor: '#00C4C2', flex:1}} > //add blue background to video area
      <ScrollView horizontal={true} style={{height: styles.regLogo2.height+40, }} contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }} >
	      
	      <Image 
	        style={styles.regLogo2} 
	        source={require('../images/rainbow.jpg')} //{props.channel.channelImage}
	      />
	      <Image 
	        style={styles.regLogo2} 
	        source={require('../images/rainbow.jpg')} //{props.channel.channelImage}
	      />
	      
      </ScrollView>
      </View>
      <View style={{ height: 50, }} />
      <RoundedButton
          onPress={() => alert('Button clicked (change later)')}
          buttonStyle={styles.buttonStyle}
          textStyle={styles.baseText}
          text= "See all channel worksheets"                       //`See all ${channels.channelTitle} worksheets`
        />
      <View style={{ height: 60, }} />
    </ScrollView>
    </View>
  );

}

export default OrgScreen;
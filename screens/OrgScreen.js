import * as React from 'react';
import { useEffect, useState, useCallback, useRef } from "react";
import { Button, View, Text, Image, ImageBackground, StyleSheet, ScrollView, TouchableHighlight} from 'react-native';
import RainbowTheater from "../components/RainbowTheater.js";
import { styles } from '../scripts/constants.js'
import LogoTitle from '../components/LogoTitle.js';
import RainbowChannel from "../components/RainbowChannel.js";
import SearchArea from '../components/SearchArea';
import ChannelCollection from "../components/ChannelCollection.js";
import ToggleSearch from "../components/ToggleSearch.js";
import RoundedButton from "../components/RoundedButton.js";

//screen for each separate channel/organization, includes logo & org name as header, horizontal scroll of org videos, button to access org worksheets

function OrgScreen({ navigation }) {
	const [searchText, setSearchText] = useState("");
  	const [searchActive, setSearchActive] = useState(false);
  	const [dateInfo, setDateInfo] = useState({dateRestriction : "Anytime", afterDate : null, beforeDate : null});

	const channels = [{
    channelTitle : "Golden Apples",
    channelImage : "golden",
    playlistId : "PL4fGSI1pDJn6O1LS0XSdF3RyO0Rq_LDeI",
  }];

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

    <LogoTitle />

    <ScrollView>
      <View style={{ height: 5, }} />
      <View style={{ height: 20, }} />


      <View style={{ height: 20, }} />
      
      
       <RainbowTheater
        channels={channels}
        isAdult={false}
        navigation={navigation}
      />
       
      <RoundedButton
          onPress={() => alert('Button clicked (change later)')}
          buttonStyle={styles.buttonStyle}
          textStyle={styles.baseText}
          text={`See all ${channels.channelTitle} worksheets`}
        />
      <View style={{ height: 60, }} />
    </ScrollView>
    </View>
  );

}

export default OrgScreen;


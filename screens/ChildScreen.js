import * as React from 'react';
import { useEffect, useState, useCallback, useRef } from "react";
import { Button, View, Text, Image, ImageBackground, StyleSheet, ScrollView, TouchableHighlight} from 'react-native';
import SearchArea from '../components/SearchArea';
import ChannelCollection from "../components/ChannelCollection.js";
import ToggleSearch from "../components/ToggleSearch.js";
import { styles } from '../scripts/constants.js'

function ChildScreen({ navigation }) {
  // logic to maintain state of search area
  const [searchText, setSearchText] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [dateInfo, setDateInfo] = useState({dateRestriction : "Anytime", afterDate : null, beforeDate : null});

  // Array of objects containing the information needed to populate a channel (TODO: figure out if this is okay to hardcode)
  const channels = [{
    channelTitle : "Golden Apples",
    channelImage : "golden",
    playlistId : "PLydZ2Hrp_gPTfidzAvRI524ZM0S2ZefF7",
  },
  {
    channelTitle : "Music Channel",
    channelImage : "music",
    playlistId : "PLydZ2Hrp_gPRpfRjuzArwtmlD5TDGIUql",
  },
  ];

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
    <ScrollView>
      <View style={{ height: 5, }} />
      <View style={styles.centerColumn}>
        <Image
          style={styles.miniLogo}
          source={require('../images/PR_logo.png')}
        />
      </View>
      <View style={{ height: 20, }} />

      {/* <Text style={styles.titleText}> Student Page </Text> */}

      <View style={{ height: 20, }} />
      
      <ChannelCollection
        channels={channels}
        searchText={searchText}
        dateInfo={dateInfo}
        isAdult={false}
      />

      <Image
        style={styles.regLogo}
        source={require('../images/rainbow.jpg')}
      />
      <View style={{ height: 60, }} />
      <Image
        style={{width: 380, height: 410, alignItems: 'center', justifyContent: 'center'}}
        source={require('../images/nav_layout.png')}
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
            source={require('../images/up_arrow.png')}
          />
      </TouchableHighlight>
    </ScrollView>
    </View>
  );
}

export default ChildScreen;
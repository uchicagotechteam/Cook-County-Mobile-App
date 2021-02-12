import * as React from 'react';
import { useEffect, useState, useCallback, useRef } from "react";
import { Button, View, Text, Image, ImageBackground, StyleSheet, ScrollView, TouchableHighlight} from 'react-native';
import { SearchBar } from 'react-native-elements';
import ChannelCollection from "../components/ChannelCollection.js";
import { styles } from '../scripts/constants.js'

function ChildScreen({ navigation }) {
    // logic to maintain state of search text
    const [searchText, setSearchText] = useState("");

    // Array of objects containing the information needed to populate a channel (TODO: figure out if this is okay to hardcode)
    const channels = [{
      channelTitle : "Golden Hours",
      channelImage : "golden",
      playlistId : "PLydZ2Hrp_gPTfidzAvRI524ZM0S2ZefF7",
    },
    {
      channelTitle : "Music Channel",
      channelImage : "music",
      playlistId : "PLydZ2Hrp_gPRpfRjuzArwtmlD5TDGIUql",
    },
    ];

    // Function to update the search results
    const updateSearch = useCallback((search) => {
      setSearchText(search);
    }, []);

  return (
    <View>
    <SearchBar
        placeholder="Search title or date"
        onChangeText={updateSearch}
        value={searchText}
        platform={"android"}
        round={true}
      />
    <ScrollView>
      <View style={{ height: 5, }} />
      <Image
        style={styles.flatLogo}
        source={require('../images/simple_rainbow.png')}
      />
      <View style={{ height: 20, }} />

      <Text style={styles.titleText}> Child View </Text>

      <View style={{ height: 20, }} />
      
      <ChannelCollection
        channels={channels}
        searchText={searchText}
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
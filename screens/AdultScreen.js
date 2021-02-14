import * as React from 'react';
import { useEffect, useState, useCallback, useRef } from "react";
import { Button, View, Text, Image, ImageBackground, StyleSheet, ScrollView, TouchableHighlight} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { styles } from '../scripts/constants.js'
import ChannelCollection from "../components/ChannelCollection.js";

function AdultScreen({ navigation }) {
  // logic to maintain state of search text
  const [searchText, setSearchText] = useState("");
  const [dateInfo, setDateInfo] = useState({dateRestriction : "Anytime", afterDate : null, beforeDate : null});

  // Array of objects containing the information needed to populate a channel (TODO: figure out if this is okay to hardcode)
  const channels = [{
    channelTitle : "Download Test",
    channelImage : "music",
    playlistId : "PLWgiRpr4E_tV2_sL7r-6eGxVDN8EJBkkZ",
  }
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
      <View style={{height:20}} />
      <Image
        style={styles.wideLogo}
        source={require('../images/documents.png')}
      />
      <View style={{ height: 20, }} />

      <Text style={styles.titleText}> Adult View </Text>
      {/* Vertical padding */}
      <View style={{ height: 35, }} />
      <ChannelCollection
        channels={channels}
        searchText={searchText}
        dateInfo={dateInfo}
        isAdult={true}
      />

      {/* Button layout */}
      <Button
        title="Download Documents"
        onPress={() => alert('Button clicked (change later)')}
      />
      {/* Vertical padding */}
      <View style={{ height: 35, }} />
      <Button
        title="Upload Documents"
        onPress={() => alert('Button clicked (change later)')}
      />

      {/* Vertical padding */}
      <View style={{ height: 60, }} />

      {/* Upload video button */}
      <Text style={styles.titleText}> Upload Video: </Text>
      {/* Vertical padding */}
      <View style={{ height: 20, }} />
      <TouchableHighlight
        onPress={() => alert('Button clicked (change later)')}
        style={{alignItems: 'center',}}>
          <Image
            style={{width: 100, height: 125,}}
            source={require('../images/up_arrow.png')}
          />
      </TouchableHighlight>
    </ScrollView>
    </View>
  );
}

export default AdultScreen;
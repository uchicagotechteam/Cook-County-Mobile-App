import * as React from 'react';
import { useEffect, useState, useCallback, useRef } from "react";
import { View, Image } from 'react-native';
import ChannelCollection from "../components/ChannelCollection.js";
import RainbowVideo from "../components/RainbowVideo.js";
import SearchArea from '../components/SearchArea';
import ToggleSearch from "../components/ToggleSearch.js";
import { styles } from '../scripts/constants.js'

function RainbowTheater(props) {
  // logic to maintain state of search area
  const [searchText, setSearchText] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [dateInfo, setDateInfo] = useState({dateRestriction : "Anytime", afterDate : null, beforeDate : null});
  
  // logic to maintain state of what video should be playing in the theatre
  const [activeProps, setActiveProps] = useState(null);
  
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
    props.navigation.setOptions({
      headerRight: () => (
        <ToggleSearch onPress={active => {setSearchActive(active);}} />
      ),
    });
  }, [props.navigation]);
  
  const broadcastActiveVideo = useCallback((videoProps)=> {
    setActiveProps(videoProps)
  }, []);
  
  return (
    <View>
      <SearchArea
        updateSearch={updateSearch}
        updateDates={updateDates}
        searchText={searchText}
        active={searchActive}
      />
      <View style={{alignItems:"center"}}>
        {activeProps == null ?
          <View style={{height: 260, width:340}}>
            <Image
              style={styles.regLogo}
              source={require('../images/rainbow.jpg')}
            />
          </View>
          : <RainbowVideo videoId={activeProps.videoId}
          title={activeProps.title}
          date={activeProps.date}
          duration={activeProps.duration}
          display={activeProps.display}
          isAdult={activeProps.isAdult}
          description={activeProps.description}
        />}
        <View style={{height: 30}} />
        <ChannelCollection
          channels={props.channels}
          searchText={searchText}
          dateInfo={dateInfo}
          isAdult={props.isAdult}
          broadcastActiveVideo={broadcastActiveVideo}
        />
      </View>
    </View>
  );
}

export default RainbowTheater;
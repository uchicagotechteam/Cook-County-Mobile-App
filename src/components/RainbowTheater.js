import * as React from 'react';
import { useEffect, useState, useCallback, useRef } from "react";
import { View, Image, ScrollView } from 'react-native';
import RainbowChannel from "../components/RainbowChannel.js";
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
      title: props.channelTitle,
    });
  }, [props.navigation]);

  const broadcastActiveVideo = useCallback((videoProps)=> {
    props.addRecentVideo(videoProps)
    setActiveProps(videoProps)
  }, []);
  
  useEffect(() => {
    setActiveProps(props.startingVideo)
  }, [])

  return (
    <View>
      <SearchArea
        updateSearch={updateSearch}
        updateDates={updateDates}
        searchText={searchText}
        active={searchActive}
      />
      <ScrollView>
        <View style={{alignItems: 'center'}}>
          { activeProps == null ?
            <View style={{height: 260, width: 340}}>
              <Image
                style={styles.regLogo}
                source={require('../assets/images/rainbow.jpg')}
              />
            </View>
            : <RainbowVideo videoId={activeProps.videoId}
            title={activeProps.title}
            date={activeProps.date}
            duration={activeProps.duration}
            display={activeProps.display}
            description={activeProps.description}
            link={activeProps.link}
          />  }
          <View style={{height: 170}} />
          <View style={{...styles.lineStyle, width: "90%"}} />
          <RainbowChannel
            videoArray={props.videoArray}
            channelTitle={props.channelTitle}
            channelImage={props.channelImage}
            currentSearch={searchText}
            dateInfo={
              {
                restriction : "",
                afterDate : null,
                beforeDate : null
              }
            }
            broadcastActiveVideo={broadcastActiveVideo}
            activeId={ activeProps == null ? "" : activeProps.videoId }
          />
        </View>
      </ScrollView>
    </View>
  );
}

export default RainbowTheater;
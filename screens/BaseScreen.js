import * as React from 'react';
import { useEffect, useState, useCallback, useRef } from "react";
import { Button, View, Text, Image, ImageBackground, StyleSheet, ScrollView, TouchableHighlight} from 'react-native';
import RainbowTheater from "../components/RainbowTheater.js";
import { styles, api_key } from '../scripts/constants.js'
import axios from 'axios';

function BaseScreen({ route, navigation }) {
  let [channels, setChannels] = useState([]);
  
  const { videoArray, channelTitle, channelImage } = route.params;
   
  const getRainbowTheatre = useCallback(() =>{
    console.log("Getting the child screen with channel length: " + channels.length);
    return (
      <RainbowTheater
        videoArray={videoArray}
        channelTitle={channelTitle}
        channelImage={channelImage}
        navigation={navigation}
      />
    )
  }, [channels]);

  return (
    <View>
      <View style={{ height: 20, }} />
      
      { getRainbowTheatre() }
      
    </View>
  );
}

export default BaseScreen;
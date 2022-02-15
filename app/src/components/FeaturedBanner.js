import * as React from 'react';
import { useEffect, useState, useCallback, useRef } from "react";
import { Dimensions } from 'react-native';

import { api_key } from "../scripts/constants.js";
import axios from 'axios';
import RainbowChannelIcons from "../components/RainbowChannelIcons.js";

// Import functions to retrieve props
import { getProp, getPropRequired, getPropDefault } from "../scripts/GetProps.js";

function FeaturedBanner(props) {

  // Get the dimensions of the screen
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('screen')

  // Get the image ratio, as a a fraction of width over height
  // Height to Width -> multiply
  // Width to Height -> divide
  const image_ratio = getPropDefault(props, "imageRatio", 5 / 4);

  const [videoArray, setVideoArray] = useState([]);

  const channel = {
    channelTitle : "Featured Videos",
    channelImage : null,
    playlistId : "PL8GKxgb3LyNfMyc2RdPDseNYZeyHF3CN8",
  };

  // Get the navigation item from the props
  const navigation = getPropRequired(props, "navigation", "FeaturedBanner");

  // logic to fetch data from youtube api
  const fetchData = function(playlistId, index, localVideoArrays, pageToken) {
    var token_text = (pageToken == null ? "" : "&pageToken=" + pageToken);
    axios({
      "method": "GET",
      "url": "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,status%2CcontentDetails&maxResults=50&playlistId=" + playlistId + "&key=" + api_key + token_text
    })
    .then((response) => {

      var nextPageToken = null;
      if(response.data.nextPageToken != undefined && response.data.nextPageToken != null){
        nextPageToken = response.data.nextPageToken;
      }

      // Maps the youtube API response to an array of objects with the information necessary to prepare a video, and then sorts the videos by date (from latest to oldest)
      let videoArray = response.data.items
      .filter(video => {
        // Filter out private and deleted videos
          return video.status.privacyStatus != "private" && video.status.privacyStatus != "privacyStatusUnspecified";
      })
      .map(video => {
        let date = new Date(video.contentDetails.videoPublishedAt);

        // Store the description because that could help with the curriculum
        var full_description = video.snippet.description;
        var description = ""
        var link = null
        
        var lines = full_description.split("\n");
        for (var i = 0; i < lines.length; i++){
          var words = lines[i].split(" ");
          if(words.length > 0 && words[0] == "LINK:"){
            link = lines[i].substring(lines[i].indexOf(' ')+1)
          } else {
            description += lines[i] + "\n"
          }
        }

        // Get info for highest available thumbnail
        const res = ["maxres", "high", "standard", "medium", "default"];
        let thumbnail = {};
        for (let i = 0; i < res.length; i++) {
          let item = video.snippet.thumbnails[res[i]];
          if (item != undefined || i == res.length - 1) {
            thumbnail = {...item, resolution: res[i]};
            break;
          }
        }

        return {
          videoId: video.contentDetails.videoId,
          title: video.snippet.title,
          date : date,
          dateString : date.toLocaleDateString("en-US"),
          description : description,
          link : link,
          thumbnail : thumbnail,
        }
      })

      setVideoArray(videoArray);
    })
    .catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    fetchData(channel.playlistId, 0, [], null);
  }, []);

  // Return the object
  return (
    <RainbowChannelIcons
      itemsPerInterval={1}
      channelTitle={"Featured Videos"}
      pagingEnabled={true}
      showViewAll={false}
      videoArray={videoArray}
      imageRatio={image_ratio}
      navigation={navigation}
      titleStyle={{fontSize: 20}}
      textStyle={{fontSize: 17}}
      cardSpacing={20}
    />
  );
}

export default FeaturedBanner;
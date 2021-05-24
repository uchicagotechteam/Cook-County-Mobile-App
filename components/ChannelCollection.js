import * as React from 'react';
import { useEffect, useState, useCallback, useRef } from "react";
import axios from 'axios';
import RainbowChannel from "../components/RainbowChannel.js";
import RoundedButton from '../components/RoundedButton.js'
import { styles, api_key } from '../scripts/constants.js'
import { View } from 'react-native';

// Props include
//   channels : Array    - array of objects that describe a channel. [{channelTitle : String, channelImage : String, playlistID : String}]
//   searchText : String - string typed into the search bar
//   isAdult : Bool      - if the channels should display extra content for the adult page
function ChannelCollection(props) {
  // logic to maintain state of array which maps each channel to its array of videos
  const [videoArrays, setVideoArrays] = useState([]);

  // logic to maintain state of request to youtube API
  let [responseData, setResponseData] = useState('');
  
  // logic to maintain state of which video is currently playing in the theatre
  let [activeId, setActiveId] = useState('');
  
  let [channelNum, setChannelNum] = useState(0);

  const getVideoArrayByIndex = useCallback((channel, index) =>{
    let arrayMatches = videoArrays.filter(videoObject => videoObject.index == index)
    if(arrayMatches.length > 0){
      let match = arrayMatches[0];
      return match.videoArray;
    } else {
      return [];
    }
  }, [videoArrays]);

  // useEffect function runs when function initially loads
  // and runs again whenever there is a change to data in second argument array (fetchData)
  // beware of infinite loops
  useEffect(() => {
    // logic to fetch data from youtube api
    const fetchData = function(playlistId, index, localVideoArrays, pageToken) {
      console.log(playlistId);
      console.log(api_key);
      var token_text = (pageToken == null ? "" : "&pageToken=" + pageToken);
      console.log(token_text);
      axios({
        "method": "GET",
        "url": "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=50&playlistId=" + playlistId + "&key=" + api_key + token_text
      })
      .then((response) => {
        setResponseData(response.data)
        var nextPageToken = null;
        if(response.data.nextPageToken != undefined && response.data.nextPageToken != null){
          nextPageToken = response.data.nextPageToken;
        }

        // Maps the youtube API response to an array of objects with the information necessary to prepare a video, and then sorts the videos by date (from latest to oldest)
        let videoArray = response.data.items.map(video => {
          let date = new Date(video.contentDetails.videoPublishedAt);
          // If the video will be in a channel for adults, store the description because that could help with the curriculum
          var description = "";
          if(props.isAdult){
            description = video.snippet.description;
          }
          return {
            videoId: video.contentDetails.videoId,
            title: video.snippet.title,
            date : date,
            dateString : date.toLocaleDateString("en-US"),
            description : description
          }
        })

        // Joins all the ids in the channel to make a query for the video durations.
        // IMPORTANT: The API is limited to 50 videoIds per query (according to stack overflow, haven't tried it myself), so so if channels can have more than 50 videos, we would need to do this in batches of 50.
        let ids = videoArray.map(video => video.videoId).join(',');

        axios({
          "method": "GET",
          "url": "https://www.googleapis.com/youtube/v3/videos?id=" + ids + "&part=contentDetails&key=" + api_key
        })
        .then((durationResponse) => {

          let durations = durationResponse.data.items.map(video => {
            let duration = video.contentDetails.duration;
            return duration;
          })

          if(durations.length == videoArray.length){
            for(var i = 0; i < videoArray.length ; i++){
              videoArray[i]["duration"] = durations[i];
            }
          }
          var newVideoArrays = [];
          // Adds the video array to newVideoArrays, which accumulates objects with the index of the channel and the video array
          if(pageToken == null){
            newVideoArrays = [...localVideoArrays, {index, videoArray}];
          } else {
            localVideoArrays[index].videoArray.push(...videoArray);
            newVideoArrays = localVideoArrays;
          }
          if(nextPageToken == null){
            newVideoArrays[index].videoArray.sort();
          }
          if(index + 1 < props.channels.length){
            if(nextPageToken == null){
              fetchData(props.channels[index+1].playlistId, index+1, newVideoArrays, null);
            } else {
              fetchData(props.channels[index].playlistId, index, newVideoArrays, nextPageToken);
            }
          } else {
            // Once all the fetches have been accumulated, set the array of video arrays in state.
            // Note: I tried to do run the fetchdata requests in parallel for a bit, but it got pretty ugly and changed things so the next request would only start once the previous one finished. I might return and try parallel requests again later though
            setVideoArrays(newVideoArrays);
            // console.log("New video array " + JSON.stringify(newVideoArrays));
          }
        })
        .catch((error) => {
        console.log(error)
        })
      })
      .catch((error) => {
        console.log(error)
      })
    }
    // If there are any channels, begin fetching from the channel at index 0
    if(props.channels.length > 0){
      fetchData(props.channels[0].playlistId, 0, [], null);
    }
  }, [props.channels])
  
  // Tells the component's parent when the active video has changed
  const broadcastActiveVideo = useCallback((videoProps)=> {
    props.broadcastActiveVideo(videoProps);
    setActiveId(videoProps.videoId);
  }, []);

  return (
    props.channels.map((channel, index) =>
      <View key={channel.playlistId}>
        <RainbowChannel
          videoArray={getVideoArrayByIndex(channel, index)}
          channelTitle={channel.channelTitle}
          channelImage={channel.channelImage}
          currentSearch={props.searchText}
          dateInfo={props.dateInfo}
          isAdult={props.isAdult}
          broadcastActiveVideo={broadcastActiveVideo}
          activeId={activeId}
        />
        <View style={styles.lineStyle} />
      </View>
  ));
}

/*
Old theatre return

<View style={{ flexDirection : "row", justifyContent: 'space-evenly', }}>
  { channelNum > 0 ? <RoundedButton
    onPress={() => setChannelNum(Math.max(channelNum - 1, 0))}
    buttonStyle={styles.buttonStyle}
    textStyle={styles.baseText}
    text={"Last Channel"}
  /> : null }
  { channelNum < videoArrays.length - 1 ? <RoundedButton
    onPress={() => setChannelNum(Math.min(channelNum + 1, videoArrays.length - 1))}
    buttonStyle={styles.buttonStyle}
    textStyle={styles.baseText}
    text={"Next channel"}
  /> : null }
</View>
<View style={{height: 20}} />
{ videoArrays.length > 0 ?
  <RainbowChannel
    videoArray={getVideoArrayByIndex(props.channels[channelNum], channelNum)}
    channelTitle={props.channels[channelNum].channelTitle}
    channelImage={props.channels[channelNum].channelImage}
    currentSearch={props.searchText}
    dateInfo={props.dateInfo}
    isAdult={props.isAdult}
    broadcastActiveVideo={broadcastActiveVideo}
    activeId={activeId}
  />
  : null} */

export default ChannelCollection;

import * as React from 'react';
import { useEffect, useState, useCallback, useRef } from "react";
import axios from 'axios';
import RainbowChannelOrg from "../components/RainbowChannelOrg.js";
import RoundedButton from '../components/RoundedButton.js'
import { styles, api_key } from '../scripts/constants.js'
import { View } from 'react-native';
import SearchArea from '../components/SearchArea';
import ToggleSearch from "../components/ToggleSearch.js";
import { getProp, getPropRequired, getPropDefault } from "../scripts/GetProps.js";

// Props include
//   channels : Array    - array of objects that describe a channel. [{channelTitle : String, channelImage : String, playlistID : String}]
//   searchText : String - string typed into the search bar
function ChannelCollection(props) {
  // logic to maintain state of array which maps each channel to its array of videos
  //this.navigation = getPropDefault(props, "navigation", "RainbowChannel");

  const [videoArrays, setVideoArrays] = useState([]);

  // logic to maintain state of request to youtube API
  let [responseData, setResponseData] = useState('');
  
  // logic to maintain state of which video is currently playing in the theatre
  let [activeId, setActiveId] = useState('');
  
  let [channelNum, setChannelNum] = useState(0);
  
  const [searchText, setSearchText] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [dateInfo, setDateInfo] = useState({dateRestriction : "Anytime", afterDate : null, beforeDate : null});

  const getVideoArrayByIndex = useCallback((channel, index) =>{
    let arrayMatches = videoArrays.filter(videoObject => videoObject.index == index)
    if(arrayMatches.length > 0){
      let match = arrayMatches[0];
      return match.videoArray;
    } else {
      return [];
    }
  }, [videoArrays]);
  
  // Function to update the text search results
  const updateSearch = useCallback((search) => {
    console.log("Searching: " + search);
    setSearchText(search);
  }, []);

  // Function to update the date search results
  const updateDates = useCallback((dateRestriction, afterDate, beforeDate) => {
    console.log("New restriction: " + dateRestriction);
    setDateInfo({dateRestriction, afterDate, beforeDate});
  }, []);

  // React.useLayoutEffect(() => {
  //   props.navigation.setOptions({
  //     headerRight: () => (
  //       <ToggleSearch onPress={active => {setSearchActive(active);}} />
  //     ),
  //   });
  // }, [props.navigation]);

  // useEffect function runs when function initially loads
  // and runs again whenever there is a change to data in second argument array (fetchData)
  // beware of infinite loops
  useEffect(() => {
    const fetchData = function(playlistId, index, localVideoArrays, pageToken) {
      //console.log(playlistId);
      //console.log(api_key);
      var token_text = (pageToken == null ? "" : "&pageToken=" + pageToken);
      // console.log(token_text);
      // console.log("API CALL cHannel collection")
      // console.log("https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=50&playlistId=" + playlistId + "&key=" + api_key + token_text)
      axios({
        "method": "GET",
        "url": "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,status%2CcontentDetails&maxResults=50&playlistId=" + playlistId + "&key=" + api_key + token_text
      })
      .then((response) => {
        setResponseData(response.data)
        //console.log("*****ITEMS*****")
        //console.log(response.data.items)
        var nextPageToken = null;
        if(response.data.nextPageToken != undefined && response.data.nextPageToken != null){
          nextPageToken = response.data.nextPageToken;
        }

        // Maps the youtube API response to an array of objects with the information necessary to prepare a video, and then sorts the videos by date (from latest to oldest)
        //console.log(response.data.items)
        let videoArray = response.data.items
        .filter(video => {
          // Filter out private and deleted videos
          return video.status.privacyStatus != "private" && video.status.privacyStatus != "privacyStatusUnspecified";
        })
        .map(video => {
          let date = new Date(video.contentDetails.videoPublishedAt);
          // If the video will be in a channel for adults, store the description because that could help with the curriculum
          var full_description = video.snippet.description;
          var description = "";
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

        
          return {
            videoId: video.contentDetails.videoId,
            title: video.snippet.title,
            date : date,
            dateString : date.toLocaleDateString("en-US"),
            description : description,
            link : link
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
            console.log("vid arrays org channel collection");
            console.log(videoArrays);
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
  

 

  return (
      <View key={props.channels.playlistId}>
        <SearchArea
          updateSearch={updateSearch}
          updateDates={updateDates}
          searchText={searchText}
          active={searchActive}
          isOrg={true}
        />
        <RainbowChannelOrg
          videoArray={getVideoArrayByIndex(props.channels, 0)}
          channelTitle={props.channelTitle}
          channelImage={props.channels.channelImage}
          currentSearch={searchText}
          dateInfo={
            {
              restriction : null,
              afterDate : null,
              beforeDate : null
            }
          }
          activeId={""}
          navigation={props.navigation}
         // activeId={activeId}
        />
        <View style={{height: 160}} />
      </View>
  );
}




export default ChannelCollection;

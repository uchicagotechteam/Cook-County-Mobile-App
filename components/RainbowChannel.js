import React from 'react';
import RainbowVideo from "../components/RainbowVideo.js";
import AdjustableText from "../components/AdjustableText.js";
import { Dimensions } from 'react-native';
import { View, ScrollView, StyleSheet, Image, Text } from 'react-native';
import {search} from '../scripts/Search.js';
import { styles } from '../scripts/constants.js'


class RainbowChannel extends React.Component {
  constructor(props) {
    super(props);

    // Constant hardcoding the keys in each video's object which will be targetted by the search
    this.searchVals = ["title", "dateString"];
  }

  // Returns an image for each channel, assuming that we know all the channels that the CCB will want in advance
  getChannelImage(){
    if(this.props.channelImage == "music"){
      return require('../images/music_channel.jpg');
    }
    else{ // if(this.props.channelThumbnail == "golden"){
      return require('../images/golden_channel.jpeg');
    }
  }

  // Function that looks at the videoArray and currentSearch in props and returns two objects – options which stores the videos that passed the search and displays which contains details on how to highlight the search results
  applySearch(){
    // Split search string into individual lowercase terms
    let terms = this.props.currentSearch.split(' ')
      .filter(s => s.length > 0)
      .map(s => s.toLowerCase());
    let num_terms = terms.length;

    if(this.props.videoArray == undefined){
      return {options: [], displays : new Object()}
    }

    // Variables to hold the options list and the corresponding display strings

    var options = this.props.videoArray;
    var displays = new Object();

    // Special case: If the search term is blank, match everything
    // Note that the search function can handle this too, but in this case
    // it's easier to just do this all at once
    if (num_terms === 0) {
        // Create the unmarked displays for each option, and return all options
        // Since there is no search, the Display fields will all be singleton arrays where the one element is an unmarked segment representing the whole string.
        options.forEach(opt => {
          let temp = {};
          Object.keys(opt).forEach(key => {
              temp[key] = [{seg: opt[key], mark: false}];
          });
          displays[opt["videoId"]] = temp;
        });
    }

    options = options.filter(option => {
        var valid = search(this.props.currentSearch, option, {
            fields: this.searchVals,
            remove_overlap: true,
        });

        // Special case - empty search term
        if (valid == true) {
            // Create the unmarked displays for each option, and return all options
            // Since there is no search, the Display fields will all be singleton arrays where the one element is an unmarked segment representing the whole string.
            let temp = {};
            Object.keys(option).forEach(key => {
                temp[key] = [{seg: option[key], mark: false}];
            });
            displays[option["videoId"]] = temp;

            return true;
        }

        // Option failed the search - remove it
        else if (valid == null || valid == false) {
            return false;
        }

        // Initialize a new object to store the display version of the option
        // The display version will be broken up to indicate where the matches are, so they can be highlighted
        // var opt_display = {};

        this.searchVals.forEach(key => {

            var indices = valid[key].concat([[option[key].length,0]]);
            var new_str = [];

            // Use indices to cut the field into marked and unmarked substrings.
            for (var i in indices) {

                // At the beginning, add an unmarked region from the start of the string to the current index
                if (i == 0) {
                    add_segment(0, indices[i][0], false);
                }

                // Otherwise, add a marked region starting at the previous index and extending for the length of the previous index, then add the remainder up to the current index as an unmarked region.
                // Note that because of the filtering above, we don't have to worry about the end of the marked region being larger than the current index.
                else {
                    let prev_index = indices[i-1][0];
                    let curr_index = prev_index + indices[i-1][1];
                    let next_index = indices[i][0];

                    add_segment(prev_index, curr_index, true);
                    add_segment(curr_index, next_index, false);
                }
            }

            // Set display value for this field to the cumulative new_str array.
            let id = option["videoId"];

            if (displays[id] == null) {
                displays[id] = {};
            }

            if (displays[id][key] == null) {
                displays[id][key] = new_str;
            }
            else {
                displays[id][key] = displays[id][key].concat(new_str);
            }

            // Helper function to take a slice of the field (which is the string version broken into individual accented characters) and mark it accordingly. Note that if the slice is blank, nothing needs to be added.
            // TODO: Write this more cleanly
            function add_segment(start, end, mark) {
                if (end - start > 0) {
                    new_str.push({
                        // seg: split[n].slice(start,end).map(c => c.char).join(""),
                        seg: option[key].substring(start,end),
                        mark
                    });
                }
            }
        });

        return true;
      });
      // Return the options and displays as one object
      return {options, displays};
  }

  // Returns the JSX needed to display each video which fits the search criteria
  getFilteredVideoArray(){
    if(this.props.videoArray == []){
      return (<Text style={styles.emptySearch}>Looks like there are no videos in this channel. Check back later.</Text>)
    }
    let searchResults = this.applySearch();
    let options = searchResults.options
    let displays = searchResults.displays
    if(options.length <= 0){
      return (<Text style={styles.emptySearch}>No videos matches your search.</Text>)
    }
    return options.map(videoInfo =>
      <RainbowVideo videoId={videoInfo.videoId}
        title={videoInfo.title}
        date={videoInfo.date}
        duration={videoInfo.duration}
        display={displays[videoInfo.videoId]}
      />
    )
  }

  render() {

    return (
      <ScrollView horizontal={true} style={{ flex: 1 }}>
         {/* Horizontal padding */}
         <View style={{ width: 20, height:260}} />
        <View style={{width: 300, alignItems : "center"}}>
          <View style={{height: 60,}}>
            <AdjustableText
              fontSize={35}
              text={this.props.channelTitle  + " \u279E"}
              style={styles.channelTitleText}
              maxHeight={60}
            />
            <Image
              source={this.getChannelImage()}
              style={{width: 300, height : 200}}
            />
          </View>
        </View>
        { this.getFilteredVideoArray() }
        {/* Horizontal padding */}
         <View style={{ width: 20}} />
      </ScrollView>
      );
  }
}

export default RainbowChannel;

import React from 'react';
import RainbowThumbnail from "../components/RainbowThumbnail.js";
import RainbowVideoIcon from "../components/RainbowVideoIcon.js";
import AdjustableText from "../components/AdjustableText.js";
import ToggleSort from "../components/ToggleSort.js";
import { Dimensions } from 'react-native';
import { View, ScrollView, StyleSheet, Image, Text, Animated, TouchableOpacity } from 'react-native';
import {search} from '../scripts/Search.js';
import { styles, PALETTE } from '../scripts/constants.js'

// Import functions to retrieve props
import { getProp, getPropRequired, getPropDefault } from "../scripts/GetProps.js";

import { Icon } from 'react-native-elements';

// Props include
//   channelImage : String  - value that is mapped to a hardcoded image or a default image if no match is found
//   channelTitle : String  - the channels title
//   currentSearch : String - string typed into the search bar
//   videoArray : Array     - array of objects specifying a video. Follows the format [{videoId : String, title : String, date : Date, dateString : String, duration : String, description : String}, ...]
//   dateInfo : Object      - Object containing the info about the search date filter {restriction : String, afterDate: Date, beforeDate : Date}
//   activeId : String      - youtube identifier of the video actively playing in the theatre
//   broadcastActiveVideo : Func - tells the component's parent when the video becomes the active thumbnail
class RainbowChannel extends React.Component {
  constructor(props) {
    super(props);

    this.navigation = getPropDefault(props, "navigation", "RainbowChannel");

    // Constant hardcoding the keys in each video's object which will be targetted by the search
    this.searchVals = ["title", "dateString"];

    this.card_height = 200;
    this.card_width  = 150;

    // State includes
    //   forward : Bool - Stores whether the videos should be shown from newest to oldest (true) or oldest to newest
    this.state = {
      forward : true,
      scroll_x : new Animated.Value(0),
      full_width: 0,
    };

    // Bind self to functions
    this.setOrder = this.setOrder.bind(this);
    this.broadcastActiveVideo = this.broadcastActiveVideo.bind(this);
    this.renderVideo = this.renderVideo.bind(this);
    this.handleContentSizeChange = this.handleContentSizeChange.bind(this);
  }

  // Returns an image for each channel, assuming that we know all the channels that the CCB will want in advance
  getChannelImage(){

    return {uri: "https://drive.google.com/thumbnail?id=" + "19Y4tCXEbft3isAWAT-4l34t8fRiZzpWE" };

    if (this.props.channelImage == null) {
      return {uri: ""};
    }

    let re = /(http(?:s?):\/\/(?:www\.))?(drive.google.com?(.*))/
    let google_drive_link_match = this.props.channelImage.match(re);

    if (google_drive_link_match != null) {
      let google_drive_link = google_drive_link_match[0];
      let image_id = google_drive_link.split("/").slice(-2)[0];
      return {uri: "https://drive.google.com/thumbnail?id=" + image_id }
    }

    else {
      return {uri: ""};
    }
    // if(this.props.channelImage == "music"){
    //   return require('../images/cdefg.png');
    // }
    // else if(this.props.channelImage == "interview"){
    //   return require('../images/interview_channel.png');
    // }
    // else if(this.props.channelImage == "golden"){
    //   return require('../images/golden_channel.jpeg');
    // }
    // else if(this.props.channelImage == "forest"){
    //   return require('../images/tree.png');
    // }
    // else if(this.props.channelImage == "garden"){
    //   return require('../images/flower.png');
    // }
    // else { // if(this.props.channelImage == "zoo"){
    //   return require('../images/elephant.png');
    // }
  }

  // Function that looks at the videoArray and currentSearch in props and returns two objects – options which stores the videos that passed the search and displays which contains details on how to highlight the search results
  applySearch(dateVideoArray){
    // Split search string into individual lowercase terms
    let terms = this.props.currentSearch.split(' ')
      .filter(s => s.length > 0)
      .map(s => s.toLowerCase());
    let num_terms = terms.length;

    if(dateVideoArray == undefined){
      return {options: [], displays : new Object()}
    }

    // Variables to hold the options list and the corresponding display strings

    var options = dateVideoArray;
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
    // Returns message if the channel is empty
    if(this.props.videoArray == []){
      return (<Text style={styles.emptySearch}>No videos in this channel. Check back later</Text>)
    }
    var dateVideoArray = [];
    // Applies the sort order to the videos
    if(!this.state.forward){
      dateVideoArray = [...this.props.videoArray].reverse();
    } else {
      dateVideoArray = this.props.videoArray
    }
    
    // Filters the videos by date. Either after, before or between dates (inclusive)
    let restriction = this.props.dateInfo.dateRestriction;
    let afterDate = this.props.dateInfo.afterDate;
    let beforeDate = this.props.dateInfo.beforeDate;
    let afterNull = afterDate == null;
    let beforeNull = beforeDate == null;
    if(restriction == "After" && !afterNull){
      dateVideoArray = dateVideoArray.filter(videoInfo =>
        {
          return videoInfo.date > afterDate;
        })
    }
    if(restriction == "Before" && !beforeNull){
      dateVideoArray = dateVideoArray.filter(videoInfo =>
        {
          return videoInfo.date < beforeDate;
        });
      
    }
    if(restriction == "Between"&& !afterNull && !beforeNull){
      dateVideoArray = dateVideoArray.filter(videoInfo =>
        {
          return videoInfo.date < beforeDate && videoInfo.date > afterDate;
        });
    }
    
    // Applies the text search onto the remaining videos
    let searchResults = this.applySearch(dateVideoArray);
    let options = searchResults.options
    let displays = searchResults.displays
    if(options.length <= 0){
      return (<Text style={styles.emptySearch}>No videos match your search</Text>)
    }
    return options.map(videoInfo =>
      <RainbowThumbnail videoId={videoInfo.videoId}
        title={videoInfo.title}
        date={videoInfo.date}
        duration={videoInfo.duration}
        description={videoInfo.description}
        link={videoInfo.link}
        display={displays[videoInfo.videoId]}
        broadcastActiveVideo={this.broadcastActiveVideo}
        activeId={this.props.activeId}
        key={videoInfo.videoId}
      />
    )
  }

  // Changes the forward state when the sort icon is toggled
  setOrder(forward){
    console.log("IsForward: " + forward)
    this.setState({ forward : forward });
  }
  
  // Tells the component's parent when the active video has changed
  broadcastActiveVideo(videoProps){
    this.props.broadcastActiveVideo(videoProps);
  }

  testVideoArray() {
    var options = [
    { videoId: "181Nj060xMQ",
      title: "Test video 1",
      date: 1,
      duration: "1:00",
      description: "This is a test video"
    },
    { videoId: "oQLJqMquGEw",
      title: "Test video 2",
      date: 1,
      duration: "1:00",
      description: "This is another test video"
    },
    { videoId: "vgYQglmYU-8",
      title: "Test video 3",
      date: 1,
      duration: "1:00",
      description: "This is yet another test video"
    }];

    return options.map(this.renderVideo);
  }

  renderVideo(videoInfo, index) {

    return (
      <TouchableOpacity
        key={`${videoInfo.videoId} ${index}`}
        activeOpacity={.5}
        onPress={ () => this.navigation.navigate('Base Screen', {
          videoArray : [],
          channelTitle: null,
          channelImage: null,
        }) }
      >
        <RainbowVideoIcon
          videoId={videoInfo.videoId}
          title={videoInfo.title}
          date={videoInfo.date}
          duration={videoInfo.duration}
          // display={displays[videoInfo.videoId]}
          isAdult={this.props.isAdult}
          description={videoInfo.description}
          broadcastActiveVideo={this.broadcastActiveVideo}
          activeId={this.props.activeId}
          key={`${videoInfo.videoId} ${index}`}
          width={this.card_width}
          height={this.card_height}
          style={{ margin: 10 }}
        />
      </TouchableOpacity>
    );

    return (
      <TouchableOpacity activeOpacity = { .5 } onPress={ () => this.navigation.navigate('Org') }
        style={{ height: "100%", width: 150, margin: 10, borderRadus: 25, }}
      >
        <View style={{
          height: "100%", width: "100%",
          backgroundColor: PALETTE.red.normal, borderRadus: 25,
        }}>
          <Text>{videoInfo.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  handleContentSizeChange(new_size) {
    this.setState({ full_width: new_size });
  }

  render() {

    // Retrieve the screen width
    const screen_width = Dimensions.get('window').width;

    // Define heights
    const top_bar_height = 30;

    return (
      <View>
      {/* Header - Channel Title */}
      <Animated.View style={{
        width: screen_width * 0.6, height: top_bar_height, paddingLeft: 20,
      }}>
        <AdjustableText
          fontSize={20}
          text=<Text>{this.props.channelTitle}</Text>
          style={[styles.channelTitleText, {textAlign: "left"}]}
          maxHeight={50}
        />
      </Animated.View>

      {/* Header - View More */}
      <View style={{
        width: screen_width * 0.4, height: top_bar_height, paddingRight: 20,
        position: "absolute", right: 0, top: 0,
      }}>
        <TouchableOpacity
          style={{width: "100%"}} activeOpacity = { .5 }
          onPress={ () => this.navigation.navigate('Org') }
        >
          <AdjustableText
            fontSize={20} maxHeight={50}
            text=<Text>View All {"\u00BB"}</Text>
            style={[styles.channelTitleText, {textAlign: "right", width: "100%"}]}
          />
        </TouchableOpacity>
      </View>

      {/* Horizontal ScrollView holding the video icons */}
      <ScrollView
        horizontal={true}
        style={{ flex: 1 }}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20, paddingVertical: 10,
          alignItems: 'center',
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: this.state.scroll_x } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        onContentSizeChange={this.handleContentSizeChange}
      >

        {/* List of Videos */}
        {/*{ this.getFilteredVideoArray() }*/}
        { this.testVideoArray() }

        {/* End Card - View All */}
        <View style={{
          width: this.card_width, //height: this.card_height,
          marginLeft: 10,
          alignItems: 'center', justifyContent: 'center',
          backgroundColor: 'rgba(255,255,255,0.5)',
          borderWidth: 4, borderColor: "black", borderStyle: "solid",
          borderRadius: 15,
        }}>
          <TouchableOpacity
            activeOpacity = { .5 } onPress={ () => this.navigation.navigate('Org') }
            style={{width: "100%", height: "100%", alignItems: 'center', justifyContent: 'center'}}
          >
            <AdjustableText
              fontSize={20} maxHeight={50}
              text=<Text>View All</Text>
              style={styles.channelTitleText}
            />
            <Icon type="ionicon" name='chevron-forward-circle-outline' size={40} />
          </TouchableOpacity>
        </View>

      </ScrollView>

      </View>
      );
  }
}

export default RainbowChannel;



// <View style={{
//   width: "100%", height: top_bar_height,
//   display: "flex",
//   flex: 5, alignItems: 'center', justifyContent: 'flex-start',
// }}>
//   <View style={{flexGrow: 3}}>
//     <AdjustableText
//       fontSize={20}
//       text=<Text>{this.props.channelTitle}</Text>
//       style={styles.channelTitleText}
//       maxHeight={50}
//     />
//   </View>
//   <View style={{flexGrow: 2}}>
//     <AdjustableText
//       fontSize={20}
//       text=<Text>See More</Text>
//       style={styles.channelTitleText}
//       maxHeight={50}
//     />
//   </View>
// </View>

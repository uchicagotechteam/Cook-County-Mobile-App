import React from 'react';
import RainbowThumbnail from "../components/RainbowThumbnail.js";
import RainbowVideoIcon from "../components/RainbowVideoIcon.js";
import AdjustableText from "../components/AdjustableText.js";
import ToggleSort from "../components/ToggleSort.js";
import { Dimensions } from 'react-native';
import { View, ScrollView, StyleSheet, Image, Text, Animated, TouchableOpacity } from 'react-native';
import {search } from '../scripts/Search.js';
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
class RainbowChannelIcons extends React.Component {
  constructor(props) {
    super(props);

    // Get the dimensions of the screen
    const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('screen')

    // Get the channel this component should be displaying
    this.channel = getPropDefault(props, "channel", {});

    // Get the width of this component, defaulting to the full width of the screen
    this.width = getPropDefault(props, "width", SCREEN_WIDTH);

    // Get the navigation item from the props
    this.navigation = getPropRequired(props, "navigation", "RainbowChannelIcons");

    // Get whether there should be a "view all" option
    this.show_view_all = getPropDefault(props, "showViewAll", true);

    // Get whether to apply paging to ScrollView component
    this.pagingEnabled = getPropDefault(props, "pagingEnabled", false);

    // Get the padding value
    this.card_spacing = getPropDefault(props, "cardSpacing", 10);

    // Get the image ratio, as a a fraction of width over height
    // Height to Width -> multiply
    // Width to Height -> divide
    this.image_ratio = getPropDefault(props, "imageRatio", 5 / 4);

    // Get the number of items per interval, if applicable
    this.itemsPerInterval = getProp(props, "itemsPerInterval");

    // Use the items per interval to compute card width and padding values
    var dim;
    if (this.itemsPerInterval == undefined) {
      this.padding = 0
      dim = 150;
    }
    else {
      this.padding = (this.itemsPerInterval == 1) ? 0 : this.card_spacing;
      var whitespace = (this.card_spacing * 2 * this.itemsPerInterval) + (this.padding * 2)
      dim = (this.width - whitespace) / this.itemsPerInterval;
    }

    // Set the card dimensions
    // TODO: Experimentally, the text below the video image is about 80 in height,
    //       but this is a bad long-term solution!
    this.card_height = getPropDefault(props, "cardHeight", dim / this.image_ratio + 90);
    this.card_width  = getPropDefault(props, "cardWidth",  dim);

    this.text_style = getPropDefault(props, "textStyle", {});
    this.title_style = getPropDefault(props, "titleStyle", {});

    // Constant hardcoding the keys in each video's object which will be targetted by the search
    this.searchVals = ["title", "dateString"];

    // State includes
    //   forward : Bool - Stores whether the videos should be shown from newest to oldest (true) or oldest to newest
    this.state = {
      forward : true,
      scroll_x : new Animated.Value(0),
      full_width: 0,
    };

    // Bind self to functions
    this.setOrder                = this.setOrder.bind(this);
    this.broadcastActiveVideo    = this.broadcastActiveVideo.bind(this);
    this.renderVideo             = this.renderVideo.bind(this);
    this.handleContentSizeChange = this.handleContentSizeChange.bind(this);
  }

  // // Returns an image for each channel, assuming that we know all the channels that the CCB will want in advance
  // getChannelImage(){

  //   // if (this.props.channelImage == null) {
  //   //   return {uri: ""};
  //   // }

  //   let re = /(http(?:s?):\/\/(?:www\.))?(drive.google.com?(.*))/
  //   let google_drive_link_match = this.props.channelImage.match(re);

  //   if (google_drive_link_match != null) {
  //     let google_drive_link = google_drive_link_match[0];
  //     let image_id = google_drive_link.split("/").slice(-2)[0];
  //     return {uri: "https://drive.google.com/thumbnail?id=" + image_id }
  //   }

  //   else {
  //     return {uri: ""};
  //   }
  // }

  // Changes the forward state when the sort icon is toggled
  setOrder(forward){
    console.log("IsForward: " + forward)
    this.setState({ forward : forward });
  }
  
  // Tells the component's parent when the active video has changed
  broadcastActiveVideo(videoProps){
    this.props.broadcastActiveVideo(videoProps);
  }

  // Function that looks at the videoArray and currentSearch in props and returns two objects – options which stores the videos that passed the search and displays which contains details on how to highlight the search results
  applySearch(dateVideoArray) {

    if(this.props.currentSearch == undefined || this.props.currentSearch == null){
      return { options: dateVideoArray, displays: new Object() }
    }
    
    // Split search string into individual lowercase terms
    let terms = this.props.currentSearch.split(' ')
      .filter(s => s.length > 0)
      .map(s => s.toLowerCase());
    let num_terms = terms.length;

    if (dateVideoArray == undefined) {
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

  getFullVideoArray() {
    return this.props.videoArray.map(this.renderVideo);
  }

  // Returns the JSX needed to display each video which fits the search criteria
  getFilteredVideoArray() {

    // If channel is empty, return a text component
    if (this.props.videoArray == []) {
      return (<Text style={styles.emptySearch}>No videos in this channel. Check back later</Text>)
    }

    // Apply the sort order to the videos
    var dateVideoArray = this.state.forward
      ? this.props.videoArray
      : [...this.props.videoArray].reverse();

    // Filter the videos by date, if applicable
    // Either after, before or between dates (inclusive)
    if (this.props.dateInfo != undefined) {

      // Get filters
      let restriction = this.props.dateInfo.dateRestriction;
      let afterDate   = this.props.dateInfo.afterDate;
      let beforeDate  = this.props.dateInfo.beforeDate;
      let afterNull   = afterDate == null;
      let beforeNull  = beforeDate == null;

      // Run through each possible filter and remove videos if applicable
      if (restriction == "After" && !afterNull) {
        dateVideoArray = dateVideoArray.filter(videoInfo => {
            return videoInfo.date > afterDate;
          })
      }
      if (restriction == "Before" && !beforeNull) {
        dateVideoArray = dateVideoArray.filter(videoInfo => {
            return videoInfo.date < beforeDate;
          });
      }
      if (restriction == "Between" && !afterNull && !beforeNull) {
        dateVideoArray = dateVideoArray.filter(videoInfo => {
            return videoInfo.date < beforeDate && videoInfo.date > afterDate;
          });
      }
    }
    
    // Apply the text search onto the videos that passed the date filter
    let {options, displays} = this.applySearch(dateVideoArray);

    // If no videos passed all filters, return a filler text component
    if (options.length <= 0) {
      return (
        <Text style={[styles.emptySearch, { width: this.width - 2*this.padding }]}>
          No videos match your search
        </Text>
      );
    }

    // Save the display results into the options array
    for (var i = 0; i < options.length; i++) {
      let display = displays[options[i].videoId];
      if (display != undefined)
        options[i].display = display
    }

    // Map the rendering function over all the passing videos
    return options.map(this.renderVideo)
  }

  renderVideo(videoInfo, index) {

    return (
      <TouchableOpacity
        key={`${videoInfo.videoId} ${index}`}
        activeOpacity={.5}
        onPress={ () => this.navigation.navigate('Base Screen', {
          videoArray:   this.props.videoArray,
          channelTitle: this.props.channelTitle,
          channelImage: this.props.channelImage,
          startingVideo: videoInfo
        }) }
      >
        <RainbowVideoIcon
          videoId={videoInfo.videoId}
          title={videoInfo.title}
          date={videoInfo.date}
          duration={videoInfo.duration}
          display={videoInfo.display}
          description={videoInfo.description}
          broadcastActiveVideo={this.broadcastActiveVideo}
          activeId={this.props.activeId}
          key={`${videoInfo.videoId} ${index}`}
          width={this.card_width}
          height={this.card_height}
          style={{ margin: this.card_spacing }}
          imageRatio={this.image_ratio}
          thumbnail={videoInfo.thumbnail}
          textStyle={this.text_style}
        />
      </TouchableOpacity>
    );
  }

  handleContentSizeChange(new_size) {
    this.setState({ full_width: new_size });
  }

  render() {

    // Define heights
    const top_bar_height = 20;

    // Get the furthest possible scroll value
    const end_val = this.state.full_width - this.width;

    // Create an animated value for the opacity of the "View All" message
    // This makes it disappear when the end card comes on screen
    const view_all_opacity = this.state.scroll_x.interpolate({
      inputRange:  [end_val - this.card_width, end_val - (this.card_width / 2)],
      outputRange: [1, 0],
      extrapolate: 'clamp'
    });

    const orgChannel = this.props.channel;

    // Create the navigation function that both View All elements use
    const view_all_nav = () => this.navigation.navigate('Org', {channel: this.channel});

    return (
      <View>

      <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end"}}>

        {/* Header - Channel Title */}
        <View style={{
          width: this.width * 0.75, paddingLeft: 25,
        }}>
          <Text style={[styles.header_text, this.title_style]}>{this.props.channelTitle}</Text>
        </View>
        {/* Header - View More */}
        { this.show_view_all &&
          <Animated.View style={{
            width: this.width * 0.25, paddingRight: 25,
            // position: "absolute", right: 0, top: 0,
            opacity: view_all_opacity, 
          }}>
            <TouchableOpacity
              style={{width: "100%"}} activeOpacity = { .5 } onPress={ view_all_nav }
            >
              <Text style={[styles.subheader_text, {textAlign: "right", width: "100%"}]} >
                View All {"\u00BB"}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        }

      </View>

      {/* Horizontal ScrollView holding the video icons */}
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: this.padding,
          paddingVertical: 10,
          height: this.card_height,
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: this.state.scroll_x } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        onContentSizeChange={this.handleContentSizeChange}
        pagingEnabled={this.pagingEnabled}
      >

        {/* List of Videos */}
        { this.getFilteredVideoArray() }

        {/* End Card - View All */}
        { this.show_view_all &&
          <View style={{
            width: this.card_width, //height: this.card_height,
            margin: this.card_spacing,
            alignItems: 'center', justifyContent: 'center',
            backgroundColor: 'rgba(255,255,255,0.5)',
            borderWidth: 4, borderColor: "black", borderStyle: "solid",
            borderRadius: 15,
          }}>
            <TouchableOpacity
              activeOpacity = { .5 } onPress={ view_all_nav }
              style={{width: "100%", height: "100%", alignItems: 'center', justifyContent: 'center'}}
            >
              <Text style={styles.header_text}>View All</Text>
              <Icon type="ionicon" name='chevron-forward-circle-outline' size={35} />
            </TouchableOpacity>
          </View>
        }

      </ScrollView>

      </View>
      );
  }
}

export default RainbowChannelIcons;



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

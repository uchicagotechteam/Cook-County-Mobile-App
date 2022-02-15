import React from 'react';
import { useState } from "react";
import { Button, View, Image, TouchableHighlight, Text, Linking } from 'react-native';
import { Dimensions } from 'react-native';
import { getYoutubeMeta } from 'react-native-youtube-iframe';
import ProgressBar from 'react-native-progress/Bar';

import AdjustableText from "../components/AdjustableText.js";
import LoadingThumbnail from "../components/LoadingThumbnail.js";
import { styles, PALETTE } from '../scripts/constants.js'
import moment from "moment";

// Import functions to retrieve props
import { getProp, getPropRequired, getPropDefault } from "../scripts/GetProps.js";

// Props include
//   videoId : String            - youtube identifier to fetch the video
//   activeId : String           - youtube identifier of the video actively playing in the theatre
//   duration : String           - ISO 8601 string corresponding to the duration of the video
//   title : String              - title of the video
//   display : Object            - object describing what parts of the title should be highlighted
//   broadcastActiveVideo : Func - tells the component's parent when the video becomes the active thumbnail
//   date : Date                 - video's date
class RainbowVideoIcon extends React.Component {
  constructor(props) {
    super(props);

    /* State stores the following variables
      finished : bool - corresponds to whether the video is at its end
      inProgress : bool - this stores whether the user is part way through the video (used for showing the green play button instead of the white one, but that's a bit unnecessary now that we have a progress bar)
      thumbnail : String? - Either null (the initial value) or a string giving the url where the video's thumbnail can be retrieved
      progressFraction : Number - Fraction of the video that has been watched 
      */
    this.state = {
      thumbnail : null,
      progressFraction: 0,
    };

    // Get the dimensions for each card from the props
    this.width  = getPropDefault(props, "width",  150);
    // this.height = getPropDefault(props, "height", this.width * 4/5 + 80);

    // Get the image ratio, as a a fraction of width over height
    // Height to Width -> multiply
    // Width to Height -> divide
    this.image_ratio = getPropDefault(props, "imageRatio", 5 / 4);

    this.text_style = getPropDefault(props, "textStyle", {});

    // bind methods
    this.thumbnailClicked = this.thumbnailClicked.bind(this);
    this.getPauseImage = this.getPauseImage.bind(this);
  }

  // Function that plays when thumbnail's icon is clicked. Start/restarts the video
  async thumbnailClicked() {
    if(this.props.videoId != this.props.activeId){
      this.props.broadcastActiveVideo(this.props);
    }
  }

  // Returns the thumbnail icon. Either a check if the video is finished, a green array if the user's made some progress into the video, or a white arrow if the video has no stored time.
  getPauseImage(){
    if(this.state.finished){
      return require('../assets/images/check.png');
    } else {
      if (this.state.inProgress){
        return require('../assets/images/green-play.png');
      } else {
        return require('../assets/images/white-play.png');
      }
    }
  }
  
  // Converts and ISO 8601 duration into seconds. Used for the progress bar
  parseDuration(){
    return moment.duration(this.props.duration, moment.ISO_8601).asSeconds();
  }

  // Checks if the video was published within the last day and, if so, gives it a special "New" tag
  isRecent(){
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 10);
    if(this.props.date > yesterday){
      return (<Text style={styles.new_highlight}>New:&nbsp;</Text>)
    } else {
      return null
    }
  }
  
  // Gives a special green background to the thumbnail corresponding to the actively playing video
  getActiveBackground(){
    if(this.props.activeId == this.props.videoId){
      return {width: 340, backgroundColor : "#b9ffb7", borderRadius:20};
    } else {
      return {width: 340}
    }
  }

  // Loads information from local storage once the component mounts and sets the state appropriately. Also queries the youtube API for the thumbnail URL
  async componentDidMount(){

    let storageTime = this.props.videoId + '.playingTime';

    // AsyncStorage.getItem(storageTime).then(storedTime => {
    //   if(storedTime == null || (storedTime != "atEnd" && parseInt(storedTime) == 0)){
    //     this.setState({inProgress : false});
    //   } else if(storedTime != "atEnd"){
    //     let curTime = parseInt(storedTime);
    //     var progressFraction =  curTime / this.parseDuration();
    //     this.setState({inProgress : true, progressFraction : progressFraction});
    //   } else if(storedTime == "atEnd"){
    //     this.setState({finished : true, progressFraction : 1.0})
    //   }
    // });
  }
  
  // If the video goes from active to inactive (the user has clicked on another thumbnail)
  // then update the progress bar with the new duration which has been watched and set the
  // thumbnail to reflect if the video is finished
  componentDidUpdate(prevProps, prevState, snapshot){
    if(prevProps.activeId == this.props.videoId && this.props.activeId != this.props.videoId){
      let storageTime = this.props.videoId + '.playingTime';
      // AsyncStorage.getItem(storageTime).then(storedTime => {
      //   if(storedTime == null || (storedTime != "atEnd" && parseInt(storedTime) == 0)){
      //     this.setState({inProgress : false});
      //   } else if(storedTime != "atEnd"){
      //     let curTime = parseInt(storedTime);
      //     var progressFraction =  curTime / this.parseDuration();
      //     this.setState({inProgress : true, progressFraction : progressFraction});
      //   } else if(storedTime == "atEnd"){
      //     this.setState({finished : true, progressFraction : 1.0})
      //   }
      // });
    }
  }

  render() {
    // const width = Dimensions.get('window');
    // const 
    return (
      <View style={[
        { width: this.width
          // +20,
          // backgroundColor: PALETTE.purple.light,
          // padding: 10,
          // borderRadius: 10,
        },
        this.props.style
      ]}>
        <Image
          source={{ uri: this.props.thumbnail.url }}
          style={{
            width: this.width, height: this.width / this.image_ratio,
            borderRadius: 20,
            // boxShadow: "10px 10px 5px grey",
            shadowOffset: {
              width: 10,
              height: -10
            },
            shadowOpacity: 5,
            shadowRadius:  10,
            // elevation: 5,
          }}
          resizeMode={"cover"}
        />
        <View style={{marginHorizontal: 4, marginTop: 10, marginBottom: 0}}>
          {/*<Text style={[styles.subheader_text]}>{this.props.title}</Text>*/}
          <Text style={this.text_style}>
            {this.isRecent()}
            { this.props.display !== undefined
                ? this.props.display["title"].map((s, index) => s.mark
                  ? <Text key={index} style={styles.search_highlight}>{s.seg}</Text>
                  : <Text key={index}>{s.seg}</Text>)
                : this.props.title
            }
          </Text>
          {/*<Text style={styles.body_text}>{this.props.duration}</Text>*/}
        </View>
      </View>
    );
  }

  // render() {
  //   return (
  //     <View style={this.getActiveBackground()}>
  //       <View style={{height: 60}}>
  //         <AdjustableText
  //           fontSize={30}
  //           text=<Text>{this.isRecent()} {this.props.display !== undefined ? this.props.display["title"].map((s, index) =>
  //                   s.mark ? <Text style={styles.search_highlight} key={index}>{s.seg}</Text> : <Text key={index}>{s.seg}</Text>)
  //                 : this.props.title}
  //                 &nbsp;-&nbsp;
  //                 {this.props.display !== undefined ? this.props.display["dateString"].map((s, index) =>
  //                   s.mark ? <Text style={styles.search_highlight} key={index}>{s.seg}</Text> : <Text key={index}>{s.seg}</Text>)
  //                 : this.props.title}
  //                 </Text>
  //           style={styles.videoTitleText}
  //           maxHeight={60}
  //         />
  //       </View>
  //       <View style={{flexGrow: 1, alignItems: 'center'}} >
  //           <View style={{height: 240,
  //               top: 0,
  //               width: 288,
  //               alignItems: 'center'}}>
  //             {this.state.thumbnail === null ? (<View style={{height: "67%", width: '100%', backgroundColor: 'black'}} />) : (<Image style={{height: "67%", width: '100%'}} source={{uri : this.state.thumbnail}}/>)
  //             }
  //             <TouchableHighlight style={{height: "45%",
  //                         bottom: "58%",
  //                         width: "36%",
  //                         alignItems: 'center'}}
  //               onPress={() => this.thumbnailClicked()}>
  //                 <Image
  //                   style={{width: "100%", height: "100%"}}
  //                   source={this.getPauseImage()}
  //                 />
  //             </TouchableHighlight>
  //             <View style={{bottom: "55%", elevation:1, backgroundColor : "#FFFFFF"}}>
  //               <ProgressBar
  //                 progress={this.state.progressFraction}
  //                 width={259}
  //                 color={"black"}
  //               />
  //             </View>
  //           </View>
  //       </View>
  //     </View>);
  // }
}

export default RainbowVideoIcon;

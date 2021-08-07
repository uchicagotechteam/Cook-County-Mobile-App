import * as React from 'react';
import { Image, View, ScrollView, Text, TouchableOpacity, Dimensions } from 'react-native';
import { styles, SPONSOR_LOGO_SPACING, SPONSOR_AUTOSCROLL_DELAY } from '../scripts/constants.js'

import LoopCarousel from './LoopCarousel';

// Import functions to retrieve props
import { getProp, getPropRequired, getPropDefault } from "../scripts/GetProps.js";


// Function to shuffle the array of logos, if required
// Returns a shallow copy of the original array, with the elements in a random order
function shuffleLogos(array) {
  var array_copy = [...array]
  for (var i = array_copy.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array_copy[i];
    array_copy[i] = array_copy[j];
    array_copy[j] = temp;
  }
  return array_copy;
}

// Given the navigation item, create a function that will render an individual logo
function renderLogo(navigation, image_ratio, props) {
  const orgChannels = getPropRequired(props, "channels", "SponsorBanner");
  const orgChannel = orgChannels[1];
  return (image_id, index, width) => {
    console.log(index)
    //var orgChannel = orgChannels[index];
    //console.log("render")
  //console.log(orgChannel);
    // Get the URI
    var uri = "https://drive.google.com/thumbnail?id=" + image_id;

    // Compute the dimensions of each icon using the width and the spacing between them
    var dim = width - SPONSOR_LOGO_SPACING;

    // Return an image with the appropriate dimensions and source URL
    return (
      <View key={`${image_id} - ${index}`}>
        <TouchableOpacity activeOpacity = { .5 } onPress={ () => navigation.navigate('Org', {orgChannel,}) }>
          <Image
            style={[styles.sponsorLogo, {width: dim, height: dim / image_ratio}]}
            source={{ uri }}
            resizeMode={"contain"}
          />
        </TouchableOpacity>
      </View>
    );
  }
}


// Wrapper component for a rounded button 
// Props include
//   image_ids : [String]        - IDs to get the image links from Google Drive
function SponsorBanner(props) {

  // Retrieve props
  const image_ids  = getPropRequired(props, "image_ids", "SponsorBanner");
  const navigation = getPropRequired(props, "navigation", "SponsorBanner");
  const shuffle    = getPropDefault(props, "shuffle", false);
  const style      = getPropDefault(props, "style",   {});

  // Retrieve scrolling stuff
  const onGrab    = getPropDefault( props, "onGrab",    ()=>{} );
  const onRelease = getPropDefault( props, "onRelease", ()=>{} );
  const parentScrolling = getPropDefault(props, "parentScrolling", false);

  // Get the image ratio, as a a fraction of width over height
  // Height to Width -> multiply
  // Width to Height -> divide
  const image_ratio = getPropDefault(props, "imageRatio", 3 / 2);

  // Retrieve the screen width
  const SCREEN_WIDTH = Dimensions.get('window').width;

  return (
    <View style={ [styles.sponsorBannerContainer, style] }>
      <LoopCarousel
        itemsPerInterval={3}
        items={shuffle ? shuffleLogos(image_ids) : image_ids}
        renderItem={renderLogo(navigation, image_ratio, props)}
        autoscroll={true}
        autoscrollDelay={SPONSOR_AUTOSCROLL_DELAY}
        width={SCREEN_WIDTH - (SPONSOR_LOGO_SPACING * 2)}
        onGrab={onGrab}
        onRelease={onRelease}
        parentScrolling={parentScrolling}
      />
    </View>
  );
}

export default SponsorBanner;

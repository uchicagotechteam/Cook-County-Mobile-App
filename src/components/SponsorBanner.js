import * as React from 'react';
import { Image, View, ScrollView, Text, TouchableOpacity, Dimensions } from 'react-native';
import { styles, RATIOS, SPONSOR_LOGO_SPACING, SPONSOR_AUTOSCROLL_DELAY } from '../scripts/constants.js'

import LoopCarousel from './LoopCarousel';
import LogoImage from '../components/LogoImage.js';

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
function renderLogo(image_ratio) {
  return (image_id, index, width) => {

    // Compute the dimensions of each icon using the width and the spacing between them
    var dim = width - SPONSOR_LOGO_SPACING;

    // Return an image with the appropriate dimensions and source URL
    return (
      <View key={`${image_id} - ${index}`}>
        <LogoImage
          imageId={image_id} width={dim} imageRatio={image_ratio} style={styles.sponsorLogo}
          navParams={{}}
        />
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
  const image_ratio = getPropDefault(props, "imageRatio", RATIOS.sponsors);

  // Retrieve the screen width
  const SCREEN_WIDTH = Dimensions.get('window').width;

  return (
    <View style={ [styles.sponsorBannerContainer, style] }>
      <LoopCarousel
        itemsPerInterval={3}
        items={shuffle ? shuffleLogos(image_ids) : image_ids}
        renderItem={ renderLogo(image_ratio) }
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

import * as React from 'react';
import { Image, View, ScrollView, Text } from 'react-native';
import { styles, SPONSOR_LOGO_SPACING, SPONSOR_AUTOSCROLL_DELAY }  from '../scripts/constants.js'

import LoopCarousel from './LoopCarousel';

// Import functions to retrieve props
import { getProp, getPropRequired, getPropDefault } from "../scripts/GetProps.js";


// Function to shuffle the array of logos, if required
function shuffleLogos(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

// Render an individual logo
function renderLogo(item, index, width) {
  var image_id = item;

  // Compute the dimensions of each icon using the width and the spacing between them
  var dim = width - SPONSOR_LOGO_SPACING;

  // Return an image with the appropriate dimensions and source URL
  return (
    <View key={`${image_id} - ${index}`}>
      <Image
        style={[styles.sponsorLogo, {width: `${dim}px`, height: `${dim}px`}]}
        source={{uri: "https://drive.google.com/thumbnail?id=" + image_id }}
      />
    </View>
  );
}


// Wrapper component for a rounded button
// Props include
//   image_ids : [String]        - IDs to get the image links from Google Drive
function SponsorBanner(props) {

  // Retrieve props
  const image_ids = getPropRequired(props, "image_ids", "SponsorBanner");
  const shuffle   = getPropDefault(props, "shuffle", false);

  return (
    <View style={ styles.sponsorBannerContainer }>
      <LoopCarousel
        itemsPerInterval={5}
        items={shuffle ? shuffleLogos(image_ids) : image_ids}
        renderItem={renderLogo}
        autoscroll={true}
        autoscrollDelay={SPONSOR_AUTOSCROLL_DELAY}
      />
    </View>
  );
}

export default SponsorBanner;

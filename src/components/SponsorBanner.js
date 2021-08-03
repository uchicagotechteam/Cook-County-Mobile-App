import * as React from 'react';
import { Image, View, ScrollView, Text, TouchableOpacity } from 'react-native';
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

// Given the navigation item, create a function that will render an individual logo
function renderLogo(navigation) {
  return (item, index, width) => {
    var image_id = item;

    // Compute the dimensions of each icon using the width and the spacing between them
    var dim = width - SPONSOR_LOGO_SPACING;

    // Return an image with the appropriate dimensions and source URL
    return (
      <View key={`${image_id} - ${index}`}>
        <TouchableOpacity activeOpacity = { .5 } onPress={ () => navigation.navigate('Org') }>
          <Image
            style={[styles.sponsorLogo, {width: dim, height: dim}]}
            source={{uri: "https://drive.google.com/thumbnail?id=" + image_id }}
            resizeMode={"stretch"}
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

  return (
    <View style={ [styles.sponsorBannerContainer, style] }>
      {/* <LoopCarousel
        itemsPerInterval={5}
        items={shuffle ? shuffleLogos(image_ids) : image_ids}
        renderItem={renderLogo(navigation)}
        autoscroll={true}
        autoscrollDelay={SPONSOR_AUTOSCROLL_DELAY}
      /> */ }
    </View>
  );
}

export default SponsorBanner;

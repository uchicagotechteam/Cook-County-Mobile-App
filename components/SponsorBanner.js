import * as React from 'react';
import { Image, View, ScrollView, Text } from 'react-native';
import { styles, SPONSOR_LOGO_SPACING, SPONSOR_AUTOSCROLL_DELAY }  from '../scripts/constants.js'

import LoopCarousel from './LoopCarousel';


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

  return (
    <View style={{width: "100%"}}>
      <LoopCarousel
        itemsPerInterval={5}
        items={props.image_ids}
        renderItem={renderLogo}
        autoscroll={true}
        autoscrollDelay={SPONSOR_AUTOSCROLL_DELAY}
      />
    </View>
  );
}

export default SponsorBanner;

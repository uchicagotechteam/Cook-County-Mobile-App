import * as React from 'react';
import { Image, View, ScrollView, Text } from 'react-native';
import { styles } from '../scripts/constants.js'

import LoopCarousel from './LoopCarousel';


// Render an individual logo
function renderLogo(item, index, width) {
  var image_id = item
  return (
    <View key={image_id + index}>
      <Image
        style={[styles.sponsorLogo, {width: `${width-10}px`, height: `${width-10}px`}]}
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
      />
    </View>
  );
}

export default SponsorBanner;

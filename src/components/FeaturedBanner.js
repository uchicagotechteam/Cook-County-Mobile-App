import * as React from 'react';
import { Dimensions } from 'react-native';

import RainbowChannelIcons from "../components/RainbowChannelIcons.js";

// Import functions to retrieve props
import { getProp, getPropRequired, getPropDefault } from "../scripts/GetProps.js";

function FeaturedBanner(props) {

  // Get the dimensions of the screen
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('screen')

  // Get the image ratio, as a a fraction of width over height
  // Height to Width -> multiply
  // Width to Height -> divide
  const image_ratio = getPropDefault(props, "imageRatio", 5 / 4);

  // Return the object
  return (
    <RainbowChannelIcons
      itemsPerInterval={1}
      channelTitle={"Featured Videos"}
      pagingEnabled={true}
      showViewAll={false}
      videoArray={[]}
      imageRatio={image_ratio}
    />
  );
}

export default FeaturedBanner;
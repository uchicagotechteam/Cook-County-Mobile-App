import * as React from 'react';
import { Dimensions } from 'react-native';

import RainbowChannelIcons from "../components/RainbowChannelIcons.js";

function FeaturedBanner(props) {

  // Get the dimensions of the screen
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('screen')

  // Return the object
  return (
    <RainbowChannelIcons
      itemsPerInterval={1}
      channelTitle={"Featured Videos"}
      pagingEnabled={true}
      showViewAll={false}
      videoArray={[]}
    />
  );
}

export default FeaturedBanner;
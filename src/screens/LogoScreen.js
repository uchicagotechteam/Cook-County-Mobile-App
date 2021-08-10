import * as React from 'react';
import { TouchableOpacity, View, Image, ScrollView, Dimensions } from 'react-native';
import { styles, PALETTE, RATIOS } from '../scripts/constants.js'

import LogoImage from '../components/LogoImage.js';

import { setTestID } from '../utils/testUtils.js';


// The margin width for the elements in this screen
const MARGIN = 6;


// function renderLogo(navigation, route, width) {
// 	return (image_id, index) => {

// 	  // Get the URI
// 	  var uri = "https://drive.google.com/thumbnail?id=" + image_id;
// 	  const orgChannels = route.params.channels[1];
// 	  const orgChannel = orgChannels[1];
// 	  // Return an image with the appropriate dimensions and source URL
// 	  return (
// 	    <View key={`grid_item_${image_id}_${index}`} style={{marginVertical: MARGIN/2}}>
// 	      <TouchableOpacity activeOpacity = { .5 } onPress={ () => navigation.navigate('Org', {orgChannel},) }>
// 	        <Image
// 	          style={{width: width, height: width / RATIOS.sponsors}}
// 	          source={{ uri }}
// 	          resizeMode={"contain"}
// 	        />
// 	      </TouchableOpacity>
// 			</View>
// 	  );
// 	};
// }

// function renderLogo(navigation, route, width) {
// 	return (image_id, index) => {

// 	  // Get the URI
// 	  //var uri = "https://drive.google.com/thumbnail?id=" + image_id;
// 	  const orgChannels = route.params.channels;
// 	  var orgIdx = index > orgChannels.length ? index % orgChannels.length : index;
// 	  const orgChannel = orgChannels[orgIdx];
// 	  // Return an image with the appropriate dimensions and source URL
// 	  return (
// 	    <View key={`grid_item_${image_id}_${index}`} style={{marginVertical: MARGIN/2}}>
// 	      <TouchableOpacity activeOpacity = { .5 } onPress={ () => navigation.navigate('Org', {orgChannel},) }>
// 	        <Image
// 	          style={{width: width, height: width / RATIOS.sponsors}}
// 	          source={image_id}
// 	          resizeMode={"contain"}
// 	        />
// 	      </TouchableOpacity>
// 	    </View>
// 	  );
// 	};
// }

// Produces a mappable function that will render an image from its ID
function renderLogo(width) {
	return (channel, index) => {

	  // Return a wrapped LogoImage with the appropriate styling, dimensions, and source image
	  return (
	    <View key={`logo_grid_item_${index}`}
				style={{marginVertical: MARGIN/2}}
				{ ...setTestID(`logo_gridItem_${index}`) }
	    >
	      <LogoImage source={channel.channelImage} width={width} navParams={{channel}} />
	    </View>
	  );
	};
}


// Main rendering function for this screen
function LogoScreen({ route, navigation }) {

	// Get the dimensions of the screen
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('screen');

  // Get the width for each individual logo
  const item_width = SCREEN_WIDTH / 2 - (MARGIN * 2);

  // Return a scrollable list of all the logos
	return (
		<ScrollView
			style={{ height: SCREEN_HEIGHT, marginVertical: MARGIN }}
			{ ...setTestID("pageLogoScreen") }
		>
			<View style={styles.logoScreenContainer}>
				{ route.params.channels.map( renderLogo(item_width) ) }
			</View>
		</ScrollView>
	);
}

export default LogoScreen;
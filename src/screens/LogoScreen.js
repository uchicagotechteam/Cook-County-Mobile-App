import * as React from 'react';
import { TouchableOpacity, View, Image, ScrollView, Dimensions } from 'react-native';
import { styles, PALETTE, RATIOS } from '../scripts/constants.js'


// The margin width for the elements in this screen
const MARGIN = 6;


// Produces a mappable function that will render an image from its ID
function renderLogo(navigation, width) {
	return (image_id, index) => {

	  // Get the URI
	  var uri = "https://drive.google.com/thumbnail?id=" + image_id;

	  // Return an image with the appropriate dimensions and source URL
	  return (
	    <View key={`grid_item_${image_id}_${index}`} style={{marginVertical: MARGIN/2}}>
	      <TouchableOpacity activeOpacity = { .5 } onPress={ () => navigation.navigate('Org') }>
	        <Image
	          style={{width: width, height: width / RATIOS.sponsors}}
	          source={{ uri }}
	          resizeMode={"contain"}
	        />
	      </TouchableOpacity>
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
		<ScrollView style={{height: SCREEN_HEIGHT, marginVertical: MARGIN}}>
			<View style={styles.logoScreenContainer}>
				{ route.params.image_ids.map(renderLogo(navigation, item_width)) }
			</View>
		</ScrollView>
	);
}

export default LogoScreen;
import React, { useState, useEffect, useRef } from 'react'
import { View, ScrollView, Text, Dimensions } from 'react-native'

// Retrieve a prop value, allowing undefined values
function getProp(props, field) {
	return props[field];
}

// Retrieve a prop value, throwing an error if the prop is not provided
function getPropRequired(props, field) {
	if (props[field] === undefined) {
		throw "LoopCarousel component requires a \"" + field + "\" prop, but none was found.";
	}
	return props[field];
}

// Retrieve a prop value, using a default value if the prop is not provided
function getPropDefault(props, field, default_value) {
	return props[field] === undefined ? default_value : props[field];
}


// Default rendering function for an individual item in the carousel
function defaultRenderItem(item, index, width) {
	return (
	    <View key={item + " " + index} style={[{width: width}]}>
	      <Text>{item.toString()}</Text>
	    </View>
	  );
}

// The class definition
export const LoopCarousel = (props) => {

	// Retrieve the basic props from the props object
	const items = getPropRequired(props, "items");
	const style = getProp(props, "style");

	// Retrieve the optional props from the props object
	const itemsPerInterval = getPropDefault(props, "itemsPerInterval", 1);
	const renderItem       = getPropDefault(props, "renderItem",       defaultRenderItem);

	// Create a ref for the ScrollView component so we can access its scrollTo method
	const scroll_view_ref = useRef(null);

	// Compute the width of a single item in the carousel
	// TODO: This should probably update dynamically with the dimensions of the screen
	const itemWidth = Math.round(Dimensions.get('window').width / itemsPerInterval);

	// Define a state variable to track the width of the contents
	const [width, setWidth] = React.useState(0);

	// The list to use as the actual data for the ScrollView element - make a copy of the
	// elements on either side, so the user can scroll infinitely in either direction
	// For a more intensive list we might want to use a smaller/smarter selection,
	// but for a series of images this shouldn't noticeably affect performance
	const extended_items = items.concat(items).concat(items);

	// Set the upper and lower bounds for the scroll, and compute the distance between them
	// Used to keep the view on the center copy of the items
	const coord_lower_bound = items.length * itemWidth;
	const coord_upper_bound = items.length * itemWidth * 2;
	const coord_width       = coord_upper_bound - coord_lower_bound;

	// Init function to run any time the dimensions of the content change
	const init = (width) => {
		setWidth(width);
	}

	// On the scroll event, check if the offset is going past the boundaries, and adjust it if so
	const onScroll = (nativeEvent) => {

		// WARNING: contentSize not available on Android
		const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;

		// Initialize a variable to track how far the offset has to move to be in the proper range
		var adjustment = 0;

		// If above the upper bound, compute the adjustment needed to loop back around
		// to the lower bound, and vice versa
		while (contentOffset.x + adjustment > coord_upper_bound) {
			adjustment -= coord_width;
		}
		while (contentOffset.x + adjustment < coord_lower_bound) {
			adjustment += coord_width;
		}

		// If an adjustment is needed to bring the window back into the proper range, apply it
		if (adjustment != 0) {
			scroll_view_ref.current.scrollTo({x: contentOffset.x + adjustment, animated: false});
		}
	}

	// Return a ScrollView element, whose entries consist of the items array with renderItem
	// mapped over each item
	return (
		<View>
			<ScrollView ref={scroll_view_ref}
				horizontal={true}
				contentContainerStyle={{ width: `${itemWidth * extended_items.length}px` }}
				showsHorizontalScrollIndicator={false}
		        onContentSizeChange={(w, h) => init(w)}
		        scrollEventThrottle={16}
		        pagingEnabled
		        decelerationRate="fast"
		        onScroll={({nativeEvent}) => onScroll(nativeEvent)}
			>
				{extended_items.map( (item, idx) => renderItem(item, idx, itemWidth) )}
			</ScrollView>
		</View>
	)
}

export default LoopCarousel;
import React, { useState, useEffect, useRef } from 'react'
import { View, ScrollView, Text, Dimensions,
		 Animated, PanResponder, Component
	} from 'react-native'

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

export default class LoopCarousel extends React.Component {
	constructor(props) {
		super();

		// Retrieve the basic props from the props object
		this.items = getPropRequired(props, "items");
		this.style = getProp(props, "style");

		// Retrieve the optional props from the props object
		this.itemsPerInterval = getPropDefault(props, "itemsPerInterval", 1);
		this.renderItem       = getPropDefault(props, "renderItem",       defaultRenderItem);

		// Compute the width of a single item in the carousel
		// TODO: This should probably update dynamically with the dimensions of the screen
		this.itemWidth = Math.round(Dimensions.get('window').width / this.itemsPerInterval);

		// The list to use as the actual data for the ScrollView element - make a copy of the
		// elements on either side, so the user can scroll infinitely in either direction
		// For a more intensive list we might want to use a smaller/smarter selection,
		// but for a series of images this shouldn't noticeably affect performance
		this.extended_items = this.items.concat(this.items).concat(this.items);

		// Set the upper and lower bounds for the scroll, and compute the distance between them
		// Used to keep the view on the center copy of the items
		this.coord_lower_bound = this.items.length * this.itemWidth;
		this.coord_upper_bound = this.items.length * this.itemWidth * 2;
		this.coord_width       = this.coord_upper_bound - this.coord_lower_bound;

		// Create a ref for the ScrollView component so we can access its scrollTo method
		this.scroll_view_ref = React.createRef();

		// Track when the user starts and stops interacting with the carousel
		this.panResponder = PanResponder.create({
			onMoveShouldSetPanResponder: () => true,

			// When the user first grabs the carousel, cancel any existing timeout
			onPanResponderGrant: () => {
				if (this.state.curr_timeout !== null) {
					clearTimeout(this.state.curr_timeout);
					this.setState({ curr_timeout: null });
				}
			},

			// When the user lets go of the carousel, set a timeout to snap to an interval
			onPanResponderRelease: () => {
				this.state.curr_timeout = setTimeout(() => this.snap_to_interval(), 1000);
			},
		});

		// Store the variables we expect might change in the state
		this.state = {
			width: 0,
			interval: this.items.length,
			curr_timeout: null,
		};
	}

	// Init function to run any time the dimensions of the content change
	init(width) {
		this.setState({ width });

		// Start at the first element of the center copy
		this.scrollTo({ x: this.items.length * this.itemWidth, animated: false });
	}

	// Get the index in extended_items that the LoopCarousel currently has on the left edge
	// of the screen
	getAbsoluteInterval(offset) {
		for (let i = 1; i <= this.extended_items.length; i++) {
			if (offset < this.itemWidth * i) {
				return i;
			}
		}
		return this.extended_items.length;
	}

	// Get the index in items that the LoopCarousel currently has on the left edge of the screen
	getInterval(offset) {
		var interval = this.getAbsoluteInterval(offset);
		return this.items.length + ((interval - 1) % this.items.length);
	}

	setInterval(val) {
		this.setState({ interval: val });
	}

	// On the scroll event, check if the offset is going past the boundaries, and adjust it if so
	onScroll(nativeEvent) {

		// WARNING: contentSize not available on Android
		const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;

		// Initialize a variable to track how far the offset has to move to be in the proper range
		var adjustment = 0;

		// If above the upper bound, compute the adjustment needed to loop back around
		// to the lower bound, and vice versa
		while (contentOffset.x + adjustment > this.coord_upper_bound) {
			adjustment -= this.coord_width;
		}
		while (contentOffset.x + adjustment < this.coord_lower_bound) {
			adjustment += this.coord_width;
		}

		// If an adjustment is needed to bring the window back into the proper range, apply it
		if (adjustment != 0) {
			this.scrollTo({ x: contentOffset.x + adjustment, animated: false });
		}

		// Set the interval value
		this.setInterval(this.getInterval(contentOffset.x));
	}

	scrollTo(...args) {
		this.scroll_view_ref.current.scrollTo(...args);
	}

	snap_to_interval() {
		this.scrollTo({ x: this.state.interval * this.itemWidth, animated: true });
	}

	// Return a ScrollView element, whose entries consist of the items array with renderItem
	// mapped over each item
	render() {
		const itemWidth = this.itemWidth
		return (
			<Animated.View {...this.panResponder.panHandlers} >
				<ScrollView ref={this.scroll_view_ref}
					horizontal={true}
					contentContainerStyle={{ width: `${itemWidth * this.extended_items.length}px` }}
					showsHorizontalScrollIndicator={false}
					onContentSizeChange={(w, h) => this.init(w)}
					scrollEventThrottle={64}
					decelerationRate="fast"
					onScroll={({nativeEvent}) => this.onScroll(nativeEvent)}
				>
					{this.extended_items.map( (item, idx) => this.renderItem(item, idx, itemWidth) )}
				</ScrollView>
			</Animated.View>
		)
	}
}

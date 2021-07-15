import React, { useState, useEffect, useRef } from 'react'
import { View, ScrollView, Text, Dimensions,
		 Animated, PanResponder, Component
	} from 'react-native'

// Import functions to retrieve props
import { getProp, getPropRequired, getPropDefault } from "../scripts/GetProps.js";


// Default rendering function for an individual item in the carousel
function defaultRenderItem(item, index, width) {
	return (
		<View key={`${item} - ${index}`} style={
			{border: "5px solid black", width: width, padding: 10, textAlign: "center"}
		}>
			<Text>{item.toString()}</Text>
		</View>
	);
}


// The class definition
export default class LoopCarousel extends React.Component {
	constructor(props) {
		super();

		// Retrieve the basic props from the props object
		this.items = getPropRequired(props, "items", "LoopCarousel");
		this.style = getProp(props, "style");

		// Retrieve the optional props from the props object
		this.itemsPerInterval = getPropDefault(props, "itemsPerInterval", 1);
		this.renderItem       = getPropDefault(props, "renderItem",       defaultRenderItem);
		this.autoscroll       = getPropDefault(props, "autoscroll",       false);
		this.autoscrollDelay  = getPropDefault(props, "autoscrollDelay",  10000);

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

			// When the user grabs the carousel, cancel any existing snap check so it does not
			// fire while the user is moving the carousel
			onPanResponderGrant: () => {
				this.setState({ auto_scrolling: false });
				this.clear_snap_check();
				this.stop_autoscroll_timer();
			},

			// When the user lets go of the carousel, set a JS interval which will continually
			// check if the carousel has stopped moving, then snap it to a carousel interval
			// and delete itself
			// The use of the word interval for these two different concepts is a coincidence
			onPanResponderRelease: () => {
				this.state.snap_check = setInterval(() => {
					if (this.state.prev_x == this.state.curr_x) {
						this.snap_to_interval();
						this.clear_snap_check();
						if (this.autoscroll) {
							this.start_autoscroll_timer();
						}
					}
				}, 100);
			},
		});

		// Store the variables we expect might change in the state
		this.state = {

			// Content width
			width: 0,

			// Index of item currently at the left edge of the screen
			interval: this.items.length,

			// Previous and current offsets of the ScrollView
			prev_x: null,
			curr_x: null,

			// ID of the JS interval checking to see if motion has stopped
			// to snap to nearest interval
			snap_check: null,

			// ID of JS interval controlling autoscroll
			autoscroll_timer: null,

			// Boolean tracking whether carousel's most recent motion was due to autoscroll
			auto_scrolling: false,
		};

		// Start the autoscroll, if applicable
		if (this.autoscroll) {
			this.start_autoscroll_timer();
		}
	}

	// Init function to run any time the dimensions of the content change
	init(width) {
		this.setState({ width });

		// Start at the first element of the center copy
		this.scrollTo({ x: this.items.length * this.itemWidth, animated: false });
	}

	// Clear the interval which will snap to an interval once the carousel stops moving
	clear_snap_check() {
		if (this.state.snap_check !== null) {
			clearInterval(this.state.snap_check);
			this.setState({ snap_check: null });
		}
	}

	// Set a js interval for the autoscroll
	start_autoscroll_timer() {
		this.state.autoscroll_timer = setInterval(() => {

			// Mark this motion as autoscroll
			this.setState({ auto_scrolling: true });

			// Autoscroll to the next item not on screen
			var target_interval = this.state.interval + this.itemsPerInterval;

			// Check if we need to back up one array length to have enough items ahead
			// for the autoscroll
			if (target_interval * this.itemWidth >= this.coord_upper_bound) {
				this.scrollTo({
					x: (this.state.interval - this.items.length) * this.itemWidth,
					animated: false
				});
				target_interval -= this.items.length;
			}

			// Do the animated scroll on the next tick
			setImmediate(() => {
				this.scrollTo({ x: target_interval * this.itemWidth , animated: true });
			});

		// Perform the autoscroll based on the passed prop
		}, this.autoscrollDelay);
	}

	// Clear the js interval for the autoscroll
	stop_autoscroll_timer() {
		if (this.state.autoscroll_timer !== null) {
			clearInterval(this.state.autoscroll_timer);
			this.setState({ autoscroll_timer: null });
		}
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

		if (!this.state.auto_scrolling) {

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
		}

		// Set the interval value
		this.setInterval(this.getInterval(contentOffset.x));

		// Record the current and previous x coordinates
		// Used to check when the carousel has stopped moving
		this.setState({ prev_x: this.state.curr_x, curr_x: contentOffset.x });
	}

	scrollTo(...args) {
		this.scroll_view_ref.current.scrollTo(...args);
	}

	// Snap the carousel to the nearest interval
	snap_to_interval() {
		var pos_in_interval = this.state.curr_x - (this.state.interval * this.itemWidth);
		var target_interval = pos_in_interval < (this.itemWidth / 2)
			? this.state.interval
			: this.state.interval + 1

		this.scrollTo({ x: target_interval * this.itemWidth, animated: true });
	}

	// Return a ScrollView element, whose entries consist of the items array with renderItem
	// mapped over each item
	// We don't want to throttle the scroll event here - this helps make sure that it will fire
	// when the carousel finally stops moving, such that prev_x and curr_x will equal one another
	// and the repeating check will register that the carousel has stopped
	// (A throttle of 16 is the fastest possible)
	render() {
		const itemWidth = this.itemWidth
		return (
			<Animated.View {...this.panResponder.panHandlers} >
				<ScrollView ref={this.scroll_view_ref}
					horizontal={true}
					contentContainerStyle={{ width: itemWidth * this.extended_items.length }}
					showsHorizontalScrollIndicator={false}
					onContentSizeChange={(w, h) => this.init(w)}
					scrollEventThrottle={16}
					decelerationRate="fast"
					onScroll={({nativeEvent}) => this.onScroll(nativeEvent)}
				>
					{this.extended_items.map( (item, idx) => this.renderItem(item, idx, itemWidth) )}
				</ScrollView>
			</Animated.View>
		)
	}
}

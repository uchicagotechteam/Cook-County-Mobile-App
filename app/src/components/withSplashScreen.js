import React, { Component, useRef, useEffect } from 'react';
import { StyleSheet, View, Image, Animated, Dimensions } from 'react-native';
import { styles }           from '../scripts/constants.js'


// Create an animated View component that fades in and out over 3 seconds
// https://reactnative.dev/docs/animations
// For info on useNativeDriver, see:
// https://reactnative.dev/blog/2017/02/14/using-native-driver-for-animated#how-do-i-use-this-in-my-app
const FadeInOutView = (props) => {

	// Create a new variable that will track the object's opacity
	const fadeAnim = useRef(new Animated.Value(0)).current

	// Sequence together a fade-in and a fade-out animation
	// Total sequence should last 3 seconds
	React.useEffect(() => {
		Animated.sequence([

			// Fade-in animation lasting .75 seconds
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 750,
				useNativeDriver: true,
			}),

			// Fade-out animation lasting .75 seconds,
			// which doesn't start until 1.5 seconds later
			Animated.timing(fadeAnim, {
				toValue: 0,
				duration: 750,
				delay: 1500,
				useNativeDriver: true,
			})
		]).start()
	}, [fadeAnim]);

	// Return an animated View component with fadeAnim bound to the opacity property
	return (
		<Animated.View style={{
			...props.style,
			opacity: fadeAnim,
		}}>
			{props.children}
		</Animated.View>
	);
}


// Function to generate the logo screen
// Embedding the splash screen styling as a style element here is a bit 
function LoadingMessage() {

	// Get the screen dimensions
	const width  = Dimensions.get('window').width;
	const height = Dimensions.get('window').height;

	// Retrieve the image
	// Use screen dimensions to determine whether to use horizontal or vertical logo
	// Image name in 'require' must be given statically
	// See https://reactnative.dev/docs/images#static-image-resources
	const logo = width < height
		? require("../assets/images/PR_logo_vertical.png")
		: require("../assets/images/PR_logo_horizontal.png");
	const cookCountyLogo = require("../assets/images/Cook_County_Logo.png");

	return (
		// https://stackoverflow.com/questions/47203728/center-a-text-in-the-screen-with-react-native
		<FadeInOutView style={{
			position: 'absolute',
			top: 0, left: 0, right: 0, bottom: 0,
			justifyContent: 'center', alignItems: 'center',
		}}>
			<Image
				source={logo}
				style={styles.splashLogo}
				resizeMode={"contain"}
			/>
			<Image
				source={cookCountyLogo}
				style={styles.splashLogo}
				resizeMode={"contain"}			
			/>
		</FadeInOutView>
	)
}


// Function to create a new class from the App component which displays the logo screen
// for a few seconds when it first loads
function withSplashScreen(WrappedComponent) {
	return class extends Component {

		// Add a state field which starts off loading
		constructor(props) {
			super(props);
			this.state = { loading: true };
		}

		// Set a timeout so after a couple of seconds, the loading screen goes away
		async componentDidMount() {
			setTimeout(() => {
				this.setState({ loading: false });
			}, 3000)
		}

		// Show the logo screen if loading, and the normal app view if not
		render() {
			return (this.state.loading)
				? LoadingMessage()
				: <WrappedComponent {...this.props} />;
		}
	}
}


// Export the function
export default withSplashScreen;
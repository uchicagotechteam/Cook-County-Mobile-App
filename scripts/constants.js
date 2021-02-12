import { StyleSheet } from 'react-native';

// TODO: set up env vars with expo so that we can store API KEY in .env file
// but we do need to see if there's a safer way to store the API key
// since env variables are bundled into the app's build and thus can be exposed to clients after the app is shipped
// more info here: https://docs.expo.io/guides/environment-variables/
// const API_KEY = process.env.EXPO_CCMA_YT_API_KEY;
export const api_key = "hello world"; // dummy value to build

export const styles = StyleSheet.create({
  // Standard text for screens
  baseText: {
    fontFamily: 'Cochin',
    textAlign: 'center',
    color: 'rgb(255, 255, 255)',
    fontSize: 20,
  },
  // Title text for screens
  titleText: {
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 45,
    color: 'rgb(255, 255, 255)',
  },
  // Title text for channels
  channelTitleText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'rgb(255, 255, 255)',
    width: 300
  },
  // Title text for videos
  videoTitleText: {
    fontFamily: 'Cochin',
    textAlign: 'center',
    color: 'rgb(255, 255, 255)',
    width: 324
  },
  // Intro page
  mainLogo: {
    width: 200,
    height: 200,
  },
  // Child page
  regLogo: {
    width: 410,
    height: 300,
  },
  // Temporary flat logo for child page
  flatLogo: {
    width: 360,
    height: 60,
    resizeMode: 'center'
  },
  // Adult page
  wideLogo: {
    width: 250,
    height: 155,
  },
  // Background logo
  bgLogo: {
    width: 300,
    height: 200,
    alignItems: 'center',
  },
  // Highlighted text from a search
  search_highlight: {
      backgroundColor: "#FF5733",
      fontWeight: "bold",
  },
  emptySearch : {
    fontFamily: 'Cochin',
    textAlign: 'center',
    justifyContent : 'center',
    width: 250,
    color: 'rgb(255, 255, 255)',
    fontSize: 20,
  }
});
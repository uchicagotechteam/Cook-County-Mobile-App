import { StyleSheet } from 'react-native';

// TODO: set up env vars with expo so that we can store API KEY in .env file
// but we do need to see if there's a safer way to store the API key
// since env variables are bundled into the app's build and thus can be exposed to clients after the app is shipped
// more info here: https://docs.expo.io/guides/environment-variables/
// const API_KEY = process.env.EXPO_CCMA_YT_API_KEY;
export const api_key = "AIzaSyDjPXW02VUyBCE_NdYof8__iGIo8IoFJGQ"; // dummy value to build

// The spacing between two icons in the sponsor bar
export const SPONSOR_LOGO_SPACING = 10;

// The time the sponsor bar waits in between each autoscroll, in milliseconds
// (1000 ms = 1 second)
export const SPONSOR_AUTOSCROLL_DELAY = 10000;

// export const theme = {
//   dark: false,
//   colors: {
//     primary: 'rgb(255, 0, 0)',
//     background: 'rgb(0, 0, 242)',
//     text : 'rgb(255, 255, 255)'
//   },
// };
// 
// export const styles = StyleSheet.create({
//   // Standard text for screens
//   baseText: {
//     fontFamily: 'sans-serif',
//     textAlign: 'center',
//     color: 'rgb(255, 255, 255)',
//     fontSize: 20,
//   },
//   // Text which has been highlighted by a search
//   new_highlight: {
//     color: '#0BF90B',
//     fontWeight: 'bold',
//   },
//   // Title text for screens
//   titleText: {
//     fontSize: 35,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     lineHeight: 45,
//     color: 'rgb(255, 255, 255)',
//   },
//   // Title text for channels
//   channelTitleText: {
//     fontWeight: 'bold',
//     textAlign: 'center',
//     color: 'rgb(255, 255, 255)',
//     width: 300
//   },
//   // Title text for videos
//   videoTitleText: {
//     fontFamily: 'sans-serif',
//     textAlign: 'center',
//     color: 'rgb(255, 255, 255)',
//     width: 324
//   },
//   // Intro page
//   mainLogo: {
//     width: 320,
//     height: 150,
//   },
//   // Child page
//   regLogo: {
//     width: 410,
//     height: 300,
//   },
//   // Temporary flat logo for child page
//   miniLogo: {
//     width: 80,
//     height: 60,
//     resizeMode: 'center'
//   },
//   // Centers children in the component
//   centerColumn:{
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   // Adult page
//   wideLogo: {
//     width: 250,
//     height: 155,
//   },
//   // Background logo
//   bgLogo: {
//     width: 300,
//     height: 200,
//     alignItems: 'center',
//   },
//   // Highlighted text from a search
//   search_highlight: {
//       backgroundColor: "#FF5733",
//       fontWeight: "bold",
//   },
//   // Text saying that the search of a channel is empty 
//   emptySearch : {
//     fontFamily: 'sans-serif',
//     textAlign: 'center',
//     justifyContent : 'center',
//     width: 250,
//     color: 'rgb(255, 255, 255)',
//     fontSize: 20,
//   },
//   mainButtonStyle: {
//     marginTop:10,
//     paddingTop:15,
//     paddingBottom:15,
//     marginLeft:10,
//     marginRight:30,
//     backgroundColor:'#00BCD4',
//     borderRadius:20,
//     borderWidth: 1,
//     borderColor: '#fff',
//     width: 200,
//   },
//   mainButtonText: {
//     fontFamily: 'sans-serif',
//     textAlign: 'center',
//     color: 'rgb(255, 255, 255)',
//     fontSize: 25,
//   },
//   buttonStyle: {
//     paddingTop:5,
//     paddingBottom:5,
//     marginLeft:10,
//     marginRight:30,
//     backgroundColor:'#00BCD4',
//     borderRadius:20,
//     borderWidth: 1,
//     borderColor: '#fff',
//     paddingLeft:10,
//     paddingRight:10,
//     marginLeft:10,
//     marginRight:10,
//   },
//   icon : {
//     color: "#FFFFFF"
//   },
//   searchColor: {
//     backgroundColor: "#1390A0"
//   },
//  lineStyle:{
//        borderWidth: 0.5,
//        borderColor:'#FFFFFF',
//        margin:10,
//   }
// });

// Testing alternate light style scheme

export const theme = {
  dark: false,
  colors: {
    primary: 'rgb(255, 0, 0)',
    background: '#D6FDFD',
    text: '#000000',
  },
};
/* NAVY & WHITE 
export const styles = StyleSheet.create({
  // Standard text for screens
  baseText: {
    fontFamily: 'sans-serif',
    textAlign: 'center',
    fontSize: 20,
  },
  // Text which has been highlighted by a search
  new_highlight: {
    color: '#16981D',
    fontWeight: 'bold',
  },
  // Title text for screens
  titleText: {
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF',
    lineHeight: 45,
  },
  // Title text for channels
  channelTitleText: {
    fontWeight: 'bold',
    textAlign: 'center',
    width: 240
  },
  // Title text for videos
  videoTitleText: {
    fontFamily: 'sans-serif',
    textAlign: 'center',
    width: 324
  },
  // Intro page
  mainLogo: {
    width: 320,
    height: 150,
  },
  sponsorLogo: {
    width: 150,
    height: 150,
    margin: SPONSOR_LOGO_SPACING / 2,
    borderRadius: 15,
  },
  // Child page
  regLogo: {
    width: 340,
    height: 270,
  },
  // Temporary flat logo for child page
  miniLogo: {
    width: 80,
    height: 60,
    resizeMode: 'center'
  },
  // Centers children in the component
  centerColumn:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
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
  // Text saying that the search of a channel is empty 
  emptySearch : {
    fontFamily: 'sans-serif',
    textAlign: 'center',
    justifyContent : 'center',
    width: 250,
    fontSize: 20,
  },
  mainButtonStyle: {
    marginTop:10,
    paddingTop:15,
    paddingBottom:15,
    marginLeft:10,
    marginRight:30,
    backgroundColor:'#ADD8E6',
    borderRadius:20,
    borderWidth: 1,
    borderColor: '#ADD8E6', //#000
    width: 200,
  },
  mainButtonText: {
    fontFamily: 'sans-serif',
    textAlign: 'center',
    color: '#000000',
    fontSize: 25,
  },
  buttonStyle: {
    paddingTop:5,
    paddingBottom:5,
    marginLeft:10,
    marginRight:10,
    backgroundColor:'#00BCD4',
    borderRadius:20,
    borderWidth: 1,
    borderColor: '#000',
    paddingLeft:10,
    paddingRight:10,
  },
  icon : {
    color: "#000000"
  },
  searchColor: {
    backgroundColor: "#ADD8E6"
  },
  backColor: {
    backgroundColor: "#02075D"
  },
  lineStyle:{
        borderWidth: 0.5,
        borderColor:'grey',
        margin:10,
   }
}); */

export const styles = StyleSheet.create({
  // Standard text for screens
  baseText: {
    fontFamily: 'sans-serif',
    textAlign: 'center',
    fontSize: 20,
  },
  // Text which has been highlighted by a search
  new_highlight: {
    color: '#16981D',
    fontWeight: 'bold',
  },
  // Title text for screens
  titleText: {
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF',
    lineHeight: 45,
  },
  // Title text for channels
  channelTitleText: {
    fontWeight: 'bold',
    textAlign: 'center',
    width: 240
  },
  // Title text for videos
  videoTitleText: {
    fontFamily: 'sans-serif',
    textAlign: 'center',
    width: 324
  },
  // Intro page
  mainLogo: {
    width: 320,
    height: 150,
  },
  sponsorLogo: {
    width: 150,
    height: 150,
    margin: SPONSOR_LOGO_SPACING / 2,
    borderRadius: 15,
  },
  // Child page
  regLogo: {
    width: 340,
    height: 270,
  },
  regLogo2: {
    width: 340,
    height: 270,
    marginRight: 10,
    marginLeft: 10
  },
  // Temporary flat logo for child page
  miniLogo: {
    width: 80,
    height: 60,
    resizeMode: 'center'
  },
  // Centers children in the component
  centerColumn:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
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
  // Text saying that the search of a channel is empty 
  emptySearch : {
    fontFamily: 'sans-serif',
    textAlign: 'center',
    justifyContent : 'center',
    width: 250,
    fontSize: 20,
  },
  mainButtonStyle: {
    marginTop:10,
    paddingTop:15,
    paddingBottom:15,
    marginLeft:10,
    marginRight:30,
    backgroundColor:'#444454', //with blue gray background ADD8E6, blue gray color #6699CC
    borderRadius:20,
    borderWidth: 1,
    borderColor: '#444454', //#000
    width: 200,
  },
  mainButtonText: {
    fontFamily: 'sans-serif',
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 25,
  },
  buttonStyle: {
    paddingTop:5,
    paddingBottom:5,
    marginLeft:10,
    marginRight:10,
    backgroundColor:'#E30008',
    borderRadius:20,
    borderWidth: 1,
    borderColor: '#000',
    paddingLeft:10,
    paddingRight:10,
  },
  icon : {
    color: "#000000"
  },
  searchColor: {
    backgroundColor: "#008CD2" //#ADD8E6  
  },
  backColor: {
    backgroundColor: "#FFFFFF" //6699CC (blue gray)
  },
  lineStyle:{
        borderWidth: 0.5,
        borderColor:'grey',
        margin:10,
  },
  contentContainer: {
    paddingHorizontal: 20
  }
});
import { StyleSheet } from 'react-native';

// TODO: set up env vars with expo so that we can store API KEY in .env file
// but we do need to see if there's a safer way to store the API key
// since env variables are bundled into the app's build and thus can be exposed to clients after the app is shipped
// more info here: https://docs.expo.io/guides/environment-variables/
// const API_KEY = process.env.EXPO_CCMA_YT_API_KEY;
export const api_key = "AIzaSyBfWiQp0Lln7qqmxvMY_RStPcYRktIc8Tc"; // dummy value to build
// export const api_key = "AIzaSyAvJKBDG3iziQ-oyIG5gch4P6qPfDj69tg";  // dummy value to build

// The spacing between two icons in the sponsor bar
export const SPONSOR_LOGO_SPACING = 10;

// The time the sponsor bar waits in between each autoscroll, in milliseconds
// (1000 ms = 1 second)
export const SPONSOR_AUTOSCROLL_DELAY = 10000;


// The ratios for various images, each formatted as a a fraction of width over height
// To convert  height  to  width,   multiply by this value
// To convert  width   to  height,   divide  by this value
export const RATIOS = {
  featured: 5/4,
  channels: 3/2,
  sponsors: 3/2,
};


// An accessible color palette for the project
// Light values are designed to be paired with black text, and dark values are designed
// to be paired with white text
// Normal values are the colors used in the Project Rainbow logo(s)
// Black text on all of the light colors is WCAG AAA compliant
// White text on all of the dark colors is  WCAG AAA compliant
// Small text in all of the dark colors on a white background is WGAC AA compliant
export const PALETTE = {

  // Logo colors
  maroon: {
    normal: '#78054B',
    light:  '#F75EBD',
    dark:   '#6E0545',
  },
  red:    {
    normal: '#E30008',
    light:  '#FF6B70',
    dark:   '#B30006',
  },
  orange: {
    normal: '#FF8500',
    light:  '#FF8500',
    dark:   '#B35C00',
  },
  yellow: {
    normal: '#FCBF0F',
    light:  '#FCBF0F',
    dark:   '#926E02',
  },
  green:  {
    normal: '#00C4C2',
    light:  '#00C4C2',
    dark:   '#007A78',
  },
  blue:   {
    normal: '#008CD2',
    light:  '#00A3F5',
    dark:   '#007AB8',
  },
  purple: {
    normal: '#9E30B5',
    light:  '#CA76DB',
    dark:   '#862999',
  },

  // Basic colors (black & white)
  // These are defined this way so they can be used anywhere the logo colors above are
  white:  {
    normal: '#FFFFFF',
    light:  '#FFFFFF',
    dark:   '#FFFFFF',
  },
  black:  {
    normal: '#000000',
    light:  '#000000',
    dark:   '#000000',
  },

  // Text and background colors (black & white)
  // These are defined here to keep them conceptually separate from the standard black & white,
  // even if we want them to be the same underlying values
  text: {
    light: '#FFFFFF',
    dark:  '#000000',
    link:  '#C38C10',
  },
  back: {
    light: '#FFFFFF',
    dark:  '#000000',
  },
};

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
    primary:    PALETTE.red.normal,
    background: PALETTE.back.light,
    text:       PALETTE.text.dark,
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

  org_title: {
    // fontFamily: 'Montserrat, sans-serif',
    // fontFamily: 'Montserrat_700Regular, sans-serif',
    fontWeight: 'bold',
    fontSize: 28,
    color: PALETTE.text.dark,
    textAlign: 'center',
  },

  logo_org: {
    height: 100,
    width: 150,
    padding: 2,
  },

  header_text: {
    // fontFamily: 'Montserrat, sans-serif',
    // fontFamily: 'Montserrat_700Regular, sans-serif',
    fontWeight: 'bold',
    fontSize: 16,
    color: PALETTE.text.dark,
  },

  subheader_text: {
    // fontFamily: 'Montserrat, sans-serif',
    fontWeight: "500",
    fontSize: 14,
    color: PALETTE.text.dark,
  },

  body_text: {
    // fontFamily: 'Montserrat, sans-serif',
    fontWeight: 'normal',
    fontSize: 14,
    color: PALETTE.text.dark,
    lineHeight: 24,
  },

  link_text: {
    // fontFamily: 'Montserrat, sans-serif',
    fontWeight: 'normal',
    fontSize: 14,
    // textDecoration: 'underline',
    color: PALETTE.text.link,
  },


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
    width: "100%"
  },
  // Logo shown when app first starts
  splashLogo: {
    width:  "60%",
    height: "60%",
  },
  // Intro page
  mainLogo: {
    width: 320,
    height: 150,
  },
  headerLogo: {
    width: 35,
    height: 35,
  },
  sponsorLogo: {
    margin: SPONSOR_LOGO_SPACING / 2,
  },
  // Child page
  regLogo: {
    width: 340,
    height: 270,
    // alignItems: 'center'
  },
  regLogo2: {
    width: 340,
    height: 270,
    borderRadius:20,
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
  footerButtonStyle: {
    marginTop:5,
    paddingTop:7,
    paddingBottom:7,
    marginLeft:5,
    marginRight:15,
    marginBottom:5,
    backgroundColor:'#444454', //with blue gray background ADD8E6, blue gray color #6699CC
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#444454', //#000
    width: 120,
  },
  footerButtonText: {
    fontFamily: 'sans-serif',
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 12,
  },
  buttonStyle: {
    paddingTop:5,
    paddingBottom:5,
    marginLeft:10,
    marginRight:10,
    backgroundColor: PALETTE.red.light,
    // backgroundColor: PALETTE.blue.light,
    borderRadius:20,
    borderWidth: 0,
    borderColor: PALETTE.black.normal,
    paddingLeft:10,
    paddingRight:10,
  },
  icon : {
    color: PALETTE.black.normal
  },
  searchColor: {
    backgroundColor: PALETTE.back.light, //#ADD8E6
  },
  backColor: {
    backgroundColor: PALETTE.back.light //6699CC (blue gray)
  },
  lineStyle:{
    borderWidth: 2,
    margin:20,
  },
  contentContainer: {
    paddingHorizontal: 20
  },
  sponsorBannerContainer: {
    width: "100%",
    padding: SPONSOR_LOGO_SPACING / 2,
  },
  logoScreenContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
});
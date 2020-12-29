## Youtube API

### Status
1. When user opens the app, a hardcoded youtube video appears along with a play/pause button.
1. When the screen loads, we make an http request to Youtube Data API that dumps the response onto the page

Note that the Youtube Data API call won't work if you run it before inserting a real API key on line 33 of `App.js`

Reach out to Dallon on slack/email (dasnes@uchicago.edu)/FB for any questions or to get the api key

### Next steps
`TODOs` with more details are in `App.js` file

High Priority:
1. Modify query string of http request to Youtube Data API to pull down list of playlists for that channel as well as videoIds for videos in each playlist
1. Modify styling to match wireframe that Abbey posted in `youtube-api` slack channel
1. Extract spaghetti code into components/variables
1. Figure out to handle API key. Current questions are 1) how to embed API key in env variable, 2) is it even safe to put the API key in an .env file if that is exposed to client after build process and 3) should we make an org gmail acct/API key so that we stop using Rithvik's personal key?

Lower Priority:
1. Integrate expo build process with Docker
1. Add a unit test suite

### How to setup for local development

Use expo for development and testing in both iOS and Android

Note that:
1. Whenever you want to install a new package, you have to do `expo install <package-name>` instead of `yarn add ...` or `npm install ...` so that expo can manage the cross-device deps
1. Features such as webview (required for youtube iframe) do not work in web client, but they do work in iOS and Android

#### Install dependencies
Starting from a clean working directory
(assuming you've already installed node on your system)
1. yarn global add expo-cli
1. expo init name-of-project
1. cd name-of-project
1. expo install expo-constants
1. expo install react-native-webview
1. expo install react-native-youtube-iframe

#### Running on iOS
Note that you need a mac to run an iOS simulator
If you haven't developed in XCode with an iOS simulator before, you'll need to set up a simulator

run `yarn ios`

#### Running on Android
Likewise you'll need to make sure you have AndroidStudio installed and set up an Android Emulator

run `yarn android`

Docs for youtube iframe: https://lonelycpp.github.io/react-native-youtube-iframe/component-props

Based on these instructions:

https://reactnative.dev/docs/environment-setup

https://docs.expo.io/versions/latest/sdk/webview/

https://lonelycpp.github.io/react-native-youtube-iframe/


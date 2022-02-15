# Cook County Mobile App - Project Rainbow

A mobile app allowing parents and children affected by COVID-19 to access educational videos and materials created by the Cook County Board.

We are using expo at snack.expo.io for development and to emulate on Android.

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

We use expo for development and testing in both iOS and Android

1. Clone down this repo
1. Put in a real API key on line 33 of `App.js`
1. Run `yarn install` to install all the required modules
1. run `yarn ios` to run on iPhone emulator (requires Mac and iPhone emulator setup) or run `yarn android` to run on Android Emulator (requires AndroidStudio and AndroidEmulator setup)

Some things to note:
1. Whenever you want to install a new package, you have to do `expo install <package-name>` instead of `yarn add ...` or `npm install ...` so that expo can manage the cross-device deps
1. Features such as webview (required for youtube iframe) do not work in web client, but they do work in iOS and Android
1. If you haven't developed in XCode with an iOS simulator before, you'll need to set up a simulator
1. Likewise you'll need to make sure you have AndroidStudio installed and set up an Android Emulator


#### Misc documentation

Docs for youtube iframe: https://lonelycpp.github.io/react-native-youtube-iframe/component-props

Setup is based on these instructions:

https://reactnative.dev/docs/environment-setup

https://docs.expo.io/versions/latest/sdk/webview/

https://lonelycpp.github.io/react-native-youtube-iframe/


## We have shifted development workflow to snack.expo.io. See instructions below on how to open the project as an Expo snack. youtube-api and base-page branches have been merged.

## Alternatively,
you can run the project as a snack on snack.expo.io by (1) importing the git repository, (2) installing the 
necessary dependencies, and (3) running it on the provided Android emulator on snack.expo.io.

### (1) Importing the git repository
Go to snack.expo.io and click the 3 vertical dots directly to the right of "Project" on the left side 
of the page. Then click "Import git repository". In the given field, type in the URL of the git repository 
that you want to import as a snack (in this case, use "https://github.com/uchicagotechteam/Cook-County-Mobile-App/tree/base-page").

### (2) Installing the necessary dependencies
Once the git repository has been imported as a snack, at the bottom of the development environment there will be 
text in red recommended dependencies that are needed to run the project. Click on the text in red to install 
all the necessary dependencies until they are all installed.

### (3) Run the project on an Android emulator
On the right hand side of the page, click the "Android" button, followed by "Tap to play". Soon, the project 
should open on the Android emulator (you may have to wait in a queue for a bit).
If you want to see the uploaded sample video, click "STUDENT" and play the video at the top of the page.

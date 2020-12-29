## How to setup youtube iframe and run locally

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


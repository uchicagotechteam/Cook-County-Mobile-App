import { Platform } from 'react-native';

const getPlatformTestId = (id: string) => {
	return Platform.OS === 'ios' ? {testID: id} : {accessible: true, accessibilityLabel: id};
}

/**
  * Adds a testID to the views on Android and iOS in their specific ways. On Android,
  * this will result in a ContentDescription on Debug builds (and no changes on live builds).
  */
export function setTestID(id: string) {
	// console.log("Setting test ID...", __DEV__, __DEV__ ? getPlatformTestId(id) : {});
  	// return __DEV__ ? getPlatformTestId(id) : {};
  	return true ? getPlatformTestId(id) : {};
}

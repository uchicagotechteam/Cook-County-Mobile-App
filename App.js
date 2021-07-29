import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import BaseScreen from "./src/screens/BaseScreen.js";
import HomeScreen from "./src/screens/HomeScreen.js";
import OrgScreen  from "./src/screens/OrgScreen.js";

import { theme, styles } from './src/scripts/constants.js'
import withSplashScreen from './src/components/withSplashScreen';


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Org"         component={OrgScreen}  options={{headerStyle: styles.searchColor}} />
        <Stack.Screen name="Base Screen" component={BaseScreen} options={{headerStyle: styles.searchColor}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Wrap the App component using a function that adds the initial logo screen
export default withSplashScreen(App);
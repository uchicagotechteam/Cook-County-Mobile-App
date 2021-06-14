import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "./screens/HomeScreen.js";
import ChildScreen from "./screens/ChildScreen.js";
import AdultScreen from "./screens/AdultScreen.js";
import { theme, styles } from './scripts/constants.js'
import withSplashScreen from './components/withSplashScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}
          options={{ title:'Project Rainbow', headerStyle: styles.searchColor}}
        />
        <Stack.Screen name="Child Page" component={ChildScreen} options={{headerStyle: styles.searchColor}} />
        <Stack.Screen name="Adult Page" component={AdultScreen} options={{headerStyle: styles.searchColor}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Wrap the App component using a function that adds the initial logo screen
export default withSplashScreen(App);
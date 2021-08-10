import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, View } from 'react-native';

import BaseScreen from "./src/screens/BaseScreen.js";
import HomeScreen from "./src/screens/HomeScreen.js";
import OrgScreen  from "./src/screens/OrgScreen.js";
import LogoScreen from "./src/screens/LogoScreen.js";
import PrivacyPolicyScreen from "./src/screens/PrivacyPolicyScreen.js";
import LicenseAgreementScreen from "./src/screens/LicenseAgreementScreen.js";

import HeaderLogo from "./src/components/HeaderLogo.js";

import { theme, styles } from './src/scripts/constants.js'
import withSplashScreen from './src/components/withSplashScreen';


const Stack = createStackNavigator();
/*
function App() {
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator initialRouteName="Newhome">
        <Stack.Screen name="Newhome" component={NewhomeScreen}
          options={{ title:'', headerStyle: styles.searchColor, cardStyle: styles.backColor}}
        />
        <Stack.Screen name="Org" component={OrgScreen}
          options={{ title:'', headerStyle: styles.searchColor, cardStyle: styles.backColor}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
*/



function App() {

  // Create the default header options with the Project Rainbow logo in the header
  const header_options = {
    headerTitle: <HeaderLogo />,
    headerTitleAlign: 'center'
  };

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator>
        <Stack.Screen name="Home"
          component={HomeScreen} options={{ headerShown: false }}
        />
        <Stack.Screen name="Org"
          component={OrgScreen}  options={header_options}
        />
        <Stack.Screen name="Base Screen"
          component={BaseScreen} options={header_options}
        />
        <Stack.Screen name="Logo Screen"
          component={LogoScreen} options={header_options}
        />
        <Stack.Screen name="Privacy Screen"
          component={PrivacyPolicyScreen} options={header_options}
        />
        <Stack.Screen name="License Screen"
          component={LicenseAgreementScreen} options={header_options}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Wrap the App component using a function that adds the initial logo screen
export default withSplashScreen(App);

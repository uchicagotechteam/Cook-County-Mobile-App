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
        <Stack.Screen name="Org"         component={OrgScreen}
        options={{ headerTitleAlign: 'center', headerTitle: () => <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <Image
              style={{ width: 22, height: 30}}
              source={require('./src/assets/images/PR_logo.png')}
        />
        </View>, headerStyle: styles.searchColor, cardStyle: styles.backColor}}
       />
        <Stack.Screen name="Base Screen" component={BaseScreen} options={{ headerTitleAlign: 'center', headerTitle: () => <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <Image
              style={{ width: 22, height: 30}}
              source={require('./src/assets/images/PR_logo.png')}
        />
        </View>, headerStyle: styles.searchColor, cardStyle: styles.backColor}}
        />
        <Stack.Screen name="Logo Screen" component={LogoScreen} options={{ headerTitleAlign: 'center', headerTitle: () => <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <Image
              style={{ width: 22, height: 30}}
              source={require('./src/assets/images/PR_logo.png')}
        />
        </View>, headerStyle: styles.searchColor, cardStyle: styles.backColor}}
        />
        <Stack.Screen name="Privacy Screen" component={PrivacyPolicyScreen} options={{ headerTitleAlign: 'center', headerTitle: () => <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <Image
              style={{ width: 22, height: 30}}
              source={require('./src/assets/images/PR_logo.png')}
        />
        </View>, headerStyle: styles.searchColor, cardStyle: styles.backColor}}
        />
        <Stack.Screen name="License Screen" component={LicenseAgreementScreen} options={{ headerTitleAlign: 'center', headerTitle: () => <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <Image
              style={{ width: 22, height: 30}}
              source={require('./src/assets/images/PR_logo.png')}
        />
        </View>, headerStyle: styles.searchColor, cardStyle: styles.backColor}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Wrap the App component using a function that adds the initial logo screen
export default withSplashScreen(App);

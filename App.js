import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import BaseScreen from "./src/screens/BaseScreen.js";
import HomeScreen from "./src/screens/HomeScreen.js";
import OrgScreen  from "./src/screens/OrgScreen.js";
import LogoScreen from "./src/screens/LogoScreen.js";
// import NewhomeScreen from "./screens/NewhomeScreen.js";

import { Image, View } from 'react-native';
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



function header_title() {

  return (
    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
      <Image 
        style={{ width: 22, height: 30}}
        source={require('./src/assets/images/PR_logo.png')} 
      />
    </View>
  );

  return (
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
      <Image
        style={{ width: 30, height: 30 }} 
        source={require('./src/assets/images/PR_logo.png')} 
      /> 
    </View>
  );
}


function App() {
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}
          options={{
            headerShown: false,
            // headerTitle: header_title(),
          }}
        />
        <Stack.Screen name="Org"         component={OrgScreen}  options={{headerStyle: styles.searchColor}} />
        <Stack.Screen name="Base Screen" component={BaseScreen} options={{headerStyle: styles.searchColor}} />
        <Stack.Screen name="Logo Screen" component={LogoScreen} options={{headerStyle: styles.searchColor}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Wrap the App component using a function that adds the initial logo screen
export default withSplashScreen(App);
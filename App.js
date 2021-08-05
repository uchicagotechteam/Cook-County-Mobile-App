import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OrgScreen from "./screens/OrgScreen.js";
import NewhomeScreen from "./screens/NewhomeScreen.js";
import { Image, View } from 'react-native';
import { theme, styles } from './scripts/constants.js';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator initialRouteName="Newhome">
        <Stack.Screen name="Newhome" component={NewhomeScreen}
          options={{ title:'', headerStyle: styles.searchColor, cardStyle: styles.backColor}}
        />
        <Stack.Screen name="Org" component={OrgScreen}
          options={{ headerTitleAlign: 'center', headerTitle: () => <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <Image 
              style={{ width: 22, height: 30}}
              source={require('./images/PR_logo.png')} 
        />
        </View>, headerStyle: styles.searchColor, cardStyle: styles.backColor}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


//***********************USE THIS TO GET RAINBOW LOGO***********************
/*
function App() {
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator>
        <Stack.Screen name="Org" component={OrgScreen}
          options={{ headerTitleAlign: 'center', headerTitle: () => <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <Image 
              style={{ width: 22, height: 30}}
              source={require('./images/PR_logo.png')} 
        />
        </View>, headerStyle: styles.searchColor, cardStyle: styles.backColor}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
*/
/*
function App() {
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}
          options={{ headerTitle: <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%'}}> 
          <Image
              style={{ width: 30, height: 30 }} 
              source={require('./images/PR_logo.png')} 
        /> 
        </View> , 
        headerStyle: styles.searchColor, cardStyle: styles.backColor}}
        />
        <Stack.Screen name="Child Page" component={ChildScreen} options={{headerStyle: styles.searchColor, cardStyle: styles.backColor}} />
        <Stack.Screen name="Adult Page" component={AdultScreen} options={{headerStyle: styles.searchColor, cardStyle: styles.backColor}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
*/


export default App;
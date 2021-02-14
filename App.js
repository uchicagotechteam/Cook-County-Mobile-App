import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "./screens/HomeScreen.js";
import ChildScreen from "./screens/ChildScreen.js";
import AdultScreen from "./screens/AdultScreen.js";

const MyTheme = {
  dark: false,
  colors: {
    primary: 'rgb(255, 0, 0)',
    background: 'rgb(0, 0, 242)',
    text : 'rgb(255, 255, 255)'
  },
};

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}
          options={{ title:'Project Rainbow'}}
        />
        <Stack.Screen name="Child Page" component={ChildScreen} options={{headerStyle: { backgroundColor: '#1390A0' }}} />
        <Stack.Screen name="Adult Page" component={AdultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
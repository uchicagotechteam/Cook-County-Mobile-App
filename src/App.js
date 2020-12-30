import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, View, Text, StyleSheet} from 'react-native';



var styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Cochin',
    textAlign: 'center',
  },
  titleText: {
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'rgb(255, 255, 255)'
  },
});

const MyTheme = {
  dark: false,
  colors: {
    primary: 'rgb(255, 0, 0)',
    background: 'rgb(0, 0, 242)',
  },
};

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={styles.titleText}>
        Welcome to the Project Rainbow learning app! I am a:
      </Text>
      <View style={{margin:20}}>
      <Button
        title="Teacher"
        onPress={() => navigation.navigate('Adult Page')}
      />
      </View>
      <Button
        title="Student"
        onPress={() => navigation.navigate('Child Page')}
      />
    </View>
  );
}

function ChildScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <img
        src={require('./images/rainbow.jpg')}
        width="230"
        height="130"
        alternate="rainbow image"
      />
      <Text style={styles.titleText}>Child View</Text>
    </View>
  );
}

function AdultScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={styles.titleText}>Adult View</Text>
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{title:'Project Rainbow'}} />
        <Stack.Screen name="Child Page" component={ChildScreen} />
        <Stack.Screen name="Adult Page" component={AdultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;





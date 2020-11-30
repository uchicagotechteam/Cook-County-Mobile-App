import * as React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

renderText = () => {
  return (
    <Text style={styles.baseText}>
      <Text style={styles.titleText}>
        {this.state.titleText + '\n\n'}
      </Text>
      <Text numberOfLines={5}>
        {this.state.bodyText}
      </Text>
    </Text>
  );
}

var styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Cochin',
    textAlign: 'center',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
}
)

function HomeScreen({ navigation }) {
  return (
    
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={styles.titleText}>
        Welcome to the Rainbow Project learning app! I am a:
      </Text>
      <Button
        title="Go to Adult Page"
        onPress={() => navigation.navigate('Adult Page')}
      />
      <Button
        title="Go to Child Page"
        onPress={() => navigation.navigate('Child Page')}
      />
    </View>
  );
}

function ChildScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Child View</Text>
    </View>
  );
}

function AdultScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Adult View</Text>
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Child Page" component={ChildScreen} />
        <Stack.Screen name="Adult Page" component={AdultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;


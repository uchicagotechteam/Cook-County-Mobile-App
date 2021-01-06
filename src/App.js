import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, View, Text, Image, ImageBackground, ScrollView,
         TouchableHighlight, StyleSheet} from 'react-native';



var styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Cochin',
    textAlign: 'center',
    color: 'rgb(255, 255, 255)',
    fontSize: 20,
  },
  titleText: {
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 45,
    color: 'rgb(255, 255, 255)',
  },
  // Intro page
  mainLogo: {
    width: 200,
    height: 200,
  },
  // Child page
  regLogo: {
    width: 410,
    height: 300,
  },
  // Adult page
  wideLogo: {
    width: 250,
    height: 155,
  },
  // Background logo
  bgLogo: {
    width: 300,
    height: 200,
    alignItems: 'center',
  }
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
      <ImageBackground style={styles.bgLogo} source={require('./images/simple_rainbow.png')}>
      <Image
        style={styles.mainLogo}
        source={require('./images/cook_county_seal.png')}
      />
      </ImageBackground>
      <Text style={styles.titleText}>
        Welcome to Project Rainbow! {"\n"} I am a:
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
    // Change to ScrollView tag below
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {/* Vertical padding */}
      <View style={{ height: 700, }} />
      <Image
        style={styles.regLogo}
        source={require('./images/rainbow.jpg')}
      />
      <View style={{ height: 20, }} />

      <Text style={styles.titleText}> Child View </Text>

      {/* Vertical padding */}
      <View style={{ height: 60, }} />

      <Image
        style={{width: 380, height: 410, alignItems: 'center', justifyContent: 'center'}}
        source={require('./images/nav_layout.png')}
      />
      <Text style={styles.baseText}> * Need to replace the above image with a similar layout navigation bar, with videos ordered by date and title </Text>

      {/* Vertical padding */}
      <View style={{ height: 60, }} />

      {/* Download video button */}
      <Text style={styles.titleText}> Download Today's {"\n"} Video! </Text>
      {/* Vertical padding */}
      <View style={{ height: 20, }} />
      <TouchableHighlight
        onPress={() => alert('Button clicked (change later)')}
        style={{alignItems: 'center',}}>
          <Image
            style={{width: 100, height: 125, transform: [{ rotate: '180deg' }]}}
            source={require('./images/up_arrow.png')}
          />
      </TouchableHighlight>
    </View>
  );
}

function AdultScreen({ navigation }) {
  return (
    // Change to ScrollView tag below
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {/* Vertical padding */}
      <View style={{ height: 150, }} />
      <Image
        style={styles.wideLogo}
        source={require('./images/documents.png')}
      />
      <View style={{ height: 20, }} />

      <Text style={styles.titleText}> Adult View </Text>
      {/* Vertical padding */}
      <View style={{ height: 35, }} />

      {/* Button layout */}
      <Button
        title="Download Documents"
        onPress={() => alert('Button clicked (change later)')}
      />
      {/* Vertical padding */}
      <View style={{ height: 35, }} />
      <Button
        title="Upload Documents"
        onPress={() => alert('Button clicked (change later)')}
      />

      {/* Vertical padding */}
      <View style={{ height: 60, }} />

      {/* Upload video button */}
      <Text style={styles.titleText}> Upload Video: </Text>
      {/* Vertical padding */}
      <View style={{ height: 20, }} />
      <TouchableHighlight
        onPress={() => alert('Button clicked (change later)')}
        style={{alignItems: 'center',}}>
          <Image
            style={{width: 100, height: 125,}}
            source={require('./images/up_arrow.png')}
          />
      </TouchableHighlight>
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





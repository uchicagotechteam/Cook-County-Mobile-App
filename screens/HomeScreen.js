import * as React from 'react';
import { useEffect, useState, useCallback, useRef } from "react";
import { TouchableOpacity, View, Text, Image, ImageBackground, StyleSheet } from 'react-native';
import { styles } from '../scripts/constants.js'
import RoundedButton from '../components/RoundedButton.js'


function HomeScreen({ navigation }) {
  // const source = {uri:'http://samples.leanpub.com/thereactnativebook-sample.pdf',cache:true};
  
  // const shuffleArray = useCallback((array)=> {
  //   for (var i = array.length - 1; i > 0; i--) {
  //       var j = Math.floor(Math.random() * (i + 1));
  //       var temp = array[i];
  //       array[i] = array[j];
  //       array[j] = temp;
  //   }
  //   console.log("Shuffling!")
  //   return array;
  // }, []);
  
  return (
    <View style={styles.centerColumn}>
      
      <Image
        style={styles.mainLogo}
        source={require('../images/PR_logo_name.png')}
      />
      { /* </ImageBackground> */ }
      <Text style={styles.titleText}>
        Welcome to Project Rainbow! {"\n"} I am a:
      </Text>
      <View style={{margin:20}}>
      <RoundedButton
        onPress={() => navigation.navigate('Adult Page')}
        buttonStyle={styles.mainButtonStyle}
        textStyle={styles.mainButtonText}
        text={"Teacher"}
      />
      </View>
      <RoundedButton
        onPress={() => navigation.navigate('Child Page')}
        buttonStyle={styles.mainButtonStyle}
        textStyle={styles.mainButtonText}
        text={"Student"}
      />
    </View>
  );
}

export default HomeScreen;
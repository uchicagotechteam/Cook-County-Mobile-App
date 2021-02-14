import * as React from 'react';
import { useEffect, useState, useCallback, useRef } from "react";
import { Button, View, Text, Image, ImageBackground, StyleSheet } from 'react-native';
import { styles } from '../scripts/constants.js'

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      { /* <ImageBackground style={styles.bgLogo} source={require('../images/simple_rainbow.png')}> */ }
      <Image
        style={styles.mainLogo}
        source={require('../images/PR_logo_name.png')}
      />
      { /* </ImageBackground> */ }
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

export default HomeScreen;
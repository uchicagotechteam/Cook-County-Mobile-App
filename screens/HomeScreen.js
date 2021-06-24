import * as React from 'react';
import { useEffect, useState, useCallback, useRef } from "react";
import { TouchableOpacity, View, Text, Image, ImageBackground, StyleSheet } from 'react-native';
import { styles } from '../scripts/constants.js'
import RoundedButton from '../components/RoundedButton.js'
import SponsorBanner from '../components/SponsorBanner.js'

function HomeScreen({ navigation }) {
  // const source = {uri:'http://samples.leanpub.com/thereactnativebook-sample.pdf',cache:true};

  return (
    <View style={styles.centerColumn}>
      { /* <ImageBackground style={styles.bgLogo} source={require('../images/simple_rainbow.png')}> */ }
      <SponsorBanner
        image_ids={[ "19Y4tCXEbft3isAWAT-4l34t8fRiZzpWE" ]}
        shuffle={true}
      />
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
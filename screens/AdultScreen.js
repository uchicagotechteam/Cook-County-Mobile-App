import * as React from 'react';
import { useEffect, useState, useCallback, useRef } from "react";
import { Button, View, Text, Image, ImageBackground, StyleSheet, ScrollView, TouchableHighlight} from 'react-native';
import { styles } from '../scripts/constants.js'

function AdultScreen({ navigation }) {
  return (
    <ScrollView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {/* Vertical padding */}
      <View style={{ height: 150, }} />
      <Image
        style={styles.wideLogo}
        source={require('../images/documents.png')}
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
            source={require('../images/up_arrow.png')}
          />
      </TouchableHighlight>
    </ScrollView>
  );
}

export default AdultScreen;
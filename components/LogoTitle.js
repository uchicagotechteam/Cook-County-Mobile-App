import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

//mini org logo and org name
export default function LogoTitle() {
  return (
    <View style={styles.container}>
    <View style={styles.row}>
    <View style={styles.column1}>
      <Image style={styles.logo} source={require('../images/PR_logo.png')} />
      </View>
      <View style={styles.column2}>
      <Text style={styles.paragraph}>
        Organization Name
      </Text>
       </View>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  //Change font
  paragraph: {
    margin: 24,
    marginTop: 10,
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo: {
    height: 50,
    width: 50,
    borderRadius:5,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  column1: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '10%',
  },
  column2: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '90%',
  },
});

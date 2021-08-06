import * as React from 'react';
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native';


export default function LogoScroll() {
	const channelImages = ["golden", "music", "interview", "forest", "zoo", "garden"];
	const logoSrc = channelImages.map(d => ('require(../images/'+ d +'.png)'));

	return(
	<ScrollView horizontal={true} style={{ flex: 1 }}>
		logoSrc.map(d => (<Image style={styles.logo} source={d} />));
	</ScrollView>
	);
}


const styles = StyleSheet.create({
	logo: {
    height: 50,
    width: 50,
    borderRadius:5,
  },
  });
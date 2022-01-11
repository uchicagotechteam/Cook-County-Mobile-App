import * as React from 'react';
//import LogoScroll from '../components/LogoScroll.js';
//import LogoTitle from '../components/LogoTitle.js';
import { View, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import ChannelCollection from "../components/ChannelCollection.js";
//import { styles } from '../scripts/constants.js';

function NewhomeScreen({ navigation }) {
	const channels = [{
    channelTitle : "Golden Apples",
    channelImage : "golden",
    playlistId : "PL4fGSI1pDJn6O1LS0XSdF3RyO0Rq_LDeI",
  },
  {
    channelTitle : "CDEFG Music!",
    channelImage : "music",
    playlistId : "PLydZ2Hrp_gPRpfRjuzArwtmlD5TDGIUql",
  },
  {
    channelTitle : "Without Further Ado",
    channelImage : "interview",
    playlistId : "PLSQl0a2vh4HAxgGKXD5Oc_eELflPEddPx",
  },
  {
    channelTitle : "Forest Reserve",
    channelImage : "forest",
    playlistId : "PLvahqwMqN4M0GRkZY8WkLZMb6Z-W7qbLA",
  },
  {
    channelTitle : "Brookfield Zoo",
    channelImage : "zoo",
    playlistId : "PLH8c8f3_r5t5jObPDlNNMQo0aMv52stCz",
  },
  {
    channelTitle : "Botanical Garden",
    channelImage : "garden",
    playlistId : "PL-WIU6_H4uiQGUipeRB7STrAA9SQhQ0io",
  },
  ];
	return(
		<View>
	 
	        <TouchableOpacity activeOpacity = { .5 } onPress={ () => navigation.navigate('Org') }>	 
	         	<Image style = {styles.logo} source={require('../images/flower.png')} />     
	        </TouchableOpacity>
		</View>

		);

};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
  	height: 260, 
  	width:340,
    borderRadius:12,
  }
});


export default NewhomeScreen;
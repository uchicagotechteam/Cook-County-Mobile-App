import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import AdjustableText from "../components/AdjustableText.js";
import LogoImage from '../components/LogoImage.js';

// Import functions to retrieve props
import { getProp, getPropRequired, getPropDefault } from "../scripts/GetProps.js";


//mini org logo and org name
//line 20 {props.channel.channelTitle}
// Props include
//   channel : Object    - object that describe a channel. {channelTitle : String, channelImage : String, playlistID : String}


export default function LogoTitle(props) {

  // Retrieve required channel prop
  const channel = getPropRequired(props, "channel", "LogoTitle");

  // Retrieve information from channel
  const title = channel.channelTitle;
  const image_id = channel.image_id;

  const style = getPropDefault(props, "style", {});

  return (
    <View style={[{alignItems: "center", width: "100%"}, style]}>
      <LogoImage imageId={image_id} width={175} clickable={false} />
      <AdjustableText
        text=<Text>{title}</Text>
        fontSize={30} maxHeight={60}
      />
    </View>
  );

  // return (
  //   <View style={styles.container}>
  //     <View style={styles.row}>
  //       <View style={styles.column1}>
  //         <Image
  //           style={styles.logo}
  //           source={{uri: "https://drive.google.com/thumbnail?id=" + image_id }}
  //         />
  //       </View>
  //       <View style={styles.column2}>
  //           <AdjustableText
  //             fontSize={30}
  //             text=<Text>{title}</Text>
  //             style={styles.column2}
  //             maxHeight={60}
  //           />
  //       </View>
  //     </View>
  //   </View>
  // );
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

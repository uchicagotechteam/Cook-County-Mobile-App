import * as React from 'react';
import { Image, View, ScrollView } from 'react-native';
import { styles } from '../scripts/constants.js'

// Wrapper component for a rounded button
// Props include
//   image_ids : [String]        - IDs to get the image links from Google Drive
function SponsorBanner(props) {

  return (
    <ScrollView horizontal={true} style={{ flex: 1 }}>
      <View style={{ flexDirection : "row", justifyContent: 'space-evenly', }}>
        {props.image_ids.map((image_id, index) =>
          <View key={image_id}>
            <Image
              style={styles.sponsorLogo}
              source={{uri: "https://drive.google.com/thumbnail?id=" + image_id }}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
}

export default SponsorBanner;
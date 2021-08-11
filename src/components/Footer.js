import * as React from 'react';
import { View } from 'react-native';
import { styles } from '../scripts/constants.js'
import RoundedButton from '../components/RoundedButton.js'


function Footer(props) {
  return (
      <View style={{flexDirection: "row", justifyContent: 'center'}}>
        <RoundedButton
          onPress={() => props.navigation.navigate('License Screen')}
          buttonStyle={styles.footerButtonStyle}
          textStyle={styles.footerButtonText}
          text={"See App License"}
        />
        <RoundedButton
          onPress={() => props.navigation.navigate('Privacy Screen')}
          buttonStyle={styles.footerButtonStyle}
          textStyle={styles.footerButtonText}
          text={"See Privacy Policy"}
        />
      </View>
  );
}

export default Footer;
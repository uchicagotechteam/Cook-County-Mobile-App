import * as React from 'react';
import { View, Image } from 'react-native';
import { styles } from '../scripts/constants.js'

function HeaderLogo(props) {
  return (
    <View>
      <Image
        source={require('../assets/images/PR_logo.png')}
        style={styles.headerLogo}
        resizeMode={"contain"}
      />
    </View>
  );
}

export default HeaderLogo;
import * as React from 'react';
import { TouchableOpacity, Text} from 'react-native';
import { styles } from '../scripts/constants.js'

// Wrapper component for a rounded button
// Props include
//   onPress : Func()     - Function which runs when the button is pressed
//   text : String        - Button's text
//   buttonStyle : Object - Object containing the button's style
//   textStyle : Object   - Object containing the text's style
function RoundedButton(props) {

  return (
      <TouchableOpacity
        onPress={props.onPress}
        style={props.buttonStyle}
      >
        <Text style={props.textStyle}>{props.text}</Text>
      </TouchableOpacity>
  );
}

export default RoundedButton;
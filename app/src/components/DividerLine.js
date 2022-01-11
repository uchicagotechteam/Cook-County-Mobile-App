import * as React from 'react';
import { View } from 'react-native';
import { styles, PALETTE } from '../scripts/constants.js'

// Import functions to retrieve props
import { getProp, getPropRequired, getPropDefault } from "../scripts/GetProps.js";

function DividerLine(props) {

  // Get props
  const color   = getPropDefault(props, "color", "green");
  const variant = getPropDefault(props, "variant", "normal");

  // Return the object
  return (
    <View style={[ styles.lineStyle, { borderColor: PALETTE[color][variant] } ]} />
  );
}

export default DividerLine;
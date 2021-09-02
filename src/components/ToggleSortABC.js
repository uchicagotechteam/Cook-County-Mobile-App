import * as React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useEffect, useState, useCallback, useRef } from "react";
import { styles } from '../scripts/constants.js'

// Component which toggles between a forward icon and a backward icon. Sends an onPress event to its parent when clicked, which presumably will be used to switch between sorting in regular or reverse order.
// Props include
//   setForward : Func(Bool) - Result of activating or deactiving the sort direction
//   onPress : Func(Bool) - Result of activating or deactiving the toggle
function ToggleSortABC(props) {
  //var [forward, setForward] = useState(true);

  return (
      props.forward ? 
        (<View style={{flexDirection : "row"}}>
          <Text style={{...styles.baseText, paddingRight : 15}}>Z to A</Text>
          <Icon name='forward' style={styles.icon} size={25} onPress={() => { props.setForward(false) }} />
        </View>)
      :
        (<View style={{flexDirection : "row"}}>
          <Text style={{...styles.baseText, paddingRight : 15}}>A to Z</Text>
          <Icon name='backward' style={styles.icon} size={25}  onPress={() => { props.setForward(true) }} /> 
        </View>)
  );
}

export default ToggleSortABC;
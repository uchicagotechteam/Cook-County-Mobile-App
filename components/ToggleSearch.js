import * as React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useEffect, useState, useCallback, useRef } from "react";

// Component which toggles between a search icon and an up icon. Sends an onPress event to its parent when clicked, which presumably will be used to switch between when the search area is open or not.
// Props include
//   onPress : Func(Bool) - Result of activating or deactiving the toggle
function ToggleSearch(props) {
  var [active, setActive] = useState(false);

  return (
      <View style={{paddingRight : 15, alignContent: "center", justifyContent:"center",}}>
        {active ? <Icon name='caret-up' color="#FFFFFF" size={30} 
          onPress={() => { setActive(false); props.onPress(false)}}
        />
        : <Icon name='search' color="#FFFFFF" size={25} 
          onPress={() => { setActive(true); props.onPress(true) }}
        />}
      </View>
  );
}

export default ToggleSearch;
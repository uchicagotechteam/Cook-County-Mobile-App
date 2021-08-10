import * as React from 'react';
import { ScrollView, Text } from 'react-native';
import { useState, useCallback } from "react";
import { styles } from '../scripts/constants.js'

// Import functions to retrieve props
import { getProp, getPropRequired, getPropDefault } from "../scripts/GetProps.js";

// Component which displays three lines of text and then a "show more" option
function ShowMoreText(props) {
  var [textShown, setTextShown] = useState(false);
  var [lengthMore, setLengthMore] = useState(false);

  const onTextLayout = useCallback(e =>{
      setLengthMore(e.nativeEvent.lines.length >=3);
  },[]);
  
  const toggleShown = () => {
    setTextShown(!textShown);
  }

  const textStyle = getPropDefault(props, "textStyle", {fontSize: 20});

  return (
      <ScrollView style={{height: 160, width: '90%'}}>       
        <Text
          onTextLayout={onTextLayout}
          numberOfLines={textShown ? undefined : 2}
          style={textStyle}>
         { props.text }
       </Text>
       {
          lengthMore
            ? <Text
                onPress={toggleShown}
                style={[{ fontSize: 20, marginTop: 10 }, styles.link_text]}
              >{textShown ? 'See less...' : 'See more...'}</Text>
           :null
       }
      </ScrollView>
  )
}

export default ShowMoreText;
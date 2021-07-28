import * as React from 'react';
import { ScrollView, Text } from 'react-native';
import { useState, useCallback } from "react";
import { styles } from '../scripts/constants.js'

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

  return (
      <ScrollView style={{height: 160, width: '90%'}}>       
        <Text
          onTextLayout={onTextLayout}
          numberOfLines={textShown ? undefined : 2}
          style={{fontSize: 20}}>
         { props.text }
       </Text>
       {
           lengthMore ? <Text
           onPress={toggleShown}
           style={{ fontSize: 20, marginTop: 10, color: "#0000FF" }}>{textShown ? 'See less...' : 'See more...'}</Text>
           :null
       }
      </ScrollView>
  )
}

export default ShowMoreText;
import React from 'react';
import { View, ActivityIndicator } from 'react-native';

// Simple wrapper class that centers an activity indicator inside a black background that fills whatever
class LoadingThumbnail extends React.Component {
  render() {
    return (
      <View style={{height: "100%",
        width:"100%",
        backgroundColor: "#000000",
        alignContent: "center",
        justifyContent:"center",
        }}
      >
          <ActivityIndicator size="large" color="#FFFFff" />
      </View>
    );
  }
}

export default LoadingThumbnail;
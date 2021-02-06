import React from 'react';
import RainbowVideo from "../Components/RainbowVideo.js";
import { View } from 'react-native';

class RainbowChannel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      this.props.videoArray.map(videoInfo =>  (
        <RainbowVideo videoId={videoInfo.videoId}
          title={videoInfo.title}
          date={videoInfo.date}
        />
      )));
  }
}

export default RainbowChannel;

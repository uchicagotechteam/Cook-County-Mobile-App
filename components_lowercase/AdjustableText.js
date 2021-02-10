import React from 'react';
import { Text } from 'react-native';

// Simple wrapper class for React Native's Text component which will take a default font size and a maximum height, and will keep reducing the font size by 1 from the default until the wrapped Text component has <= to the max height.
class AdjustableText extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentFont : this.props.fontSize
    };
  }


  render() {
    return (
      <Text
        adjustsFontSizeToFit
        style={ [this.props.style, { fontSize: this.state.currentFont }] }
        onTextLayout={ (e) => {
          let { lines } = e.nativeEvent;
          if (lines.map(line => {lines.height}).reduce((a, b) => a + b, 0) > this.props.maxHeight) {
            this.setState({currentFont: this.state.currentFont - 1});
          }
        } }
      >
        { this.props.text }
      </Text>
    );
  }
}

export default AdjustableText;
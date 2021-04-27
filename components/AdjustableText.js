import React from 'react';
import { Text } from 'react-native';

// Simple wrapper class for React Native's Text component which will take a default font size and a maximum height, and will keep reducing the font size by 1 from the default until the wrapped Text component has <= to the max height.
// Props include:
//   style : Style Object - style for the text, excluding font size
//   maxHeight : Int      - upperbound on the height that the text can take up
//   text : JSX           - whatever components (probably should only be used with just text) you want to fit within props.maxHeight by shrinking the font  
//   fontSize : Int       - initial font size that the component will try to use. Will shrink if text is taller than props.maxHeight
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
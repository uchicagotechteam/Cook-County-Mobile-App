import * as React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles, RATIOS } from '../scripts/constants.js'

// Import functions to retrieve props
import { getProp, getPropRequired, getPropDefault } from "../scripts/GetProps.js";


function get_dimensions(props) {

  // Get the passed image ratio, as a a fraction of width over height
  // Height to Width -> multiply
  // Width to Height -> divide
  const ratio  = getProp(props, "imageRatio");

  // Get the passed width and height
  const width  = getProp(props, "width");
  const height = getProp(props, "height");

  // If all three are undefined, throw an error
  if (width == undefined && height == undefined && ratio == undefined) {
    throw `LogoImage must be given two of the three following props: 'width', 'height', and 'imageRatio'.`;
  }

  // If the ratio is not defined and both dimensions are, use the width and height values as-is
  if (width != undefined && height != undefined && ratio == undefined) {
    return { width, height };
  }

  // If one of the dimensions was undefined or if all three were passed, use the ratio
  // Get the desired image ratio, defaulting to the one in constants.js
  const image_ratio = (ratio == undefined) ? RATIOS.sponsors : ratio;

  // Compute either the width or the height from the ratio
  // If both are passed, default to using the width
  return (width == undefined)
    ? { height, width:  height * image_ratio }
    : { width,  height: width  / image_ratio };
}


function LogoImage(props) {

  // Get the link to the image
  // const image_id = getPropRequired(props, "imageId", "LogoImage");
  // const uri = "https://drive.google.com/thumbnail?id=" + image_id;
  const source = getPropRequired(props, "source", "LogoImage");

  console.log("Logo source: ", source);

  // Get various props
  const resize_mode = getPropDefault(props, "resizeMode", "contain");
  const clickable   = getPropDefault(props, "clickable",  true);
  const nav_params  = getPropDefault(props, "navParams",  {});
  const style       = getPropDefault(props, "style",      {});

  // Compute the desired width and height using the width, height, and imageRatio props
  const dimensions = get_dimensions(props);

  // Return the Image component wrapped in a linked TouchableOpacity, if applicable
  if (clickable) {

    // Get the navigation object
    const navigation = useNavigation();

    // Wrap the Image component
    return (
      <TouchableOpacity
        activeOpacity = { .5 } onPress={ () => navigation.navigate('Org', nav_params) }
      >
        <Image style={ [style, dimensions] } source={ source } resizeMode={ resize_mode } />
      </TouchableOpacity>
    );
  }

  // Otherwise, just return the Image component itself
  return (
    <Image style={ [style, dimensions] } source={ source } resizeMode={ resize_mode } />
  );
}

export default LogoImage;
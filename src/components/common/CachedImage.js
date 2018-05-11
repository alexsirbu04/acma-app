import React from 'react';
import { Image } from 'react-native-expo-image-cache';
import PropTypes from 'prop-types';

export const CachedImage = ({ style, source }) => {
  const { uri } = source;
  return <Image style={style} {...{ uri }} />;
};

CachedImage.propTypes = {
  source: PropTypes.object.isRequired
};

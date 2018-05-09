import React from 'react';
import { Image } from 'react-native-expo-image-cache';
import PropTypes from 'prop-types';

const CachedImage = ({ style, source }) => {
  const { uri } = source;
  return <Image style={style} {...{ uri }} />;
};

CachedImage.propTypes = {
  source: PropTypes.object.isRequired
};

export { CachedImage };

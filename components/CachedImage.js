import React from 'react';
import { Image } from 'react-native-expo-image-cache';

const CachedImage = ({ style, source }) => {
  const uri = source.uri;
  return(
    <Image style={style} {...{uri}} />
  );
}

export { CachedImage };
import React, { Component } from 'react';
import { Dimensions } from 'react-native';

import { SocialIcon } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class FacebookLogin extends Component {
  render() {
    return (
      <SocialIcon
        title="FACEBOOK"
        button
        type="facebook"
        raised={false}
        style={{ width: SCREEN_WIDTH / 2 - 40, height: 45 }}
      />
    );
  }
}

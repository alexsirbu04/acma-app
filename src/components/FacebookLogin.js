import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SocialIcon } from 'react-native-elements';

import { SCREEN_WIDTH } from './common';
import facebookLogin from '../actions/auth';

// eslint-disable-next-line
class FacebookLogin extends Component {
  componentDidMount() {
    this.props.facebookLogin();
  }

  render() {
    return (
      <SocialIcon
        title="FACEBOOK"
        button
        type="facebook"
        raised={false}
        style={{ width: SCREEN_WIDTH / 2 - 40 }}
      />
    );
  }
}

export default connect(null, facebookLogin)(FacebookLogin);

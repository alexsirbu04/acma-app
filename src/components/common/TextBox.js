import React, { Component } from 'react';
import { Text } from 'react-native';
import { Font } from 'expo';
import PropTypes from 'prop-types';

import OpenSansBold from '../../../assets/fonts/OpenSans-Bold.ttf';
import OpenSansRegular from '../../../assets/fonts/OpenSans-Regular.ttf';
import OpenSansSemiBold from '../../../assets/fonts/OpenSans-SemiBold.ttf';

export class TextBox extends Component {
  constructor(props) {
    super(props);
    this.renderTextboxWithFont = this.renderTextboxWithFont.bind(this);
  }

  state = {
    fontLoaded: false
  };

  async componentDidMount() {
    await Font.loadAsync({
      bold: OpenSansBold,
      'semi-bold': OpenSansSemiBold,
      regular: OpenSansRegular
    });

    this.setState({ fontLoaded: true });
  }

  renderTextboxWithFont() {
    const {
      children,
      color,
      size,
      type,
      ellipsizeMode,
      numberOfLines,
      onPress,
      style
    } = this.props;

    if (this.state.fontLoaded) {
      return (
        <Text
          fontfamily={type}
          ellipsizeMode={ellipsizeMode}
          numberOfLines={numberOfLines}
          onPress={onPress}
          style={[style, { fontFamily: type, color, fontSize: size }]}
        >
          {children}
        </Text>
      );
    }

    return null;
  }

  render() {
    return this.renderTextboxWithFont();
  }
}

TextBox.propTypes = {
  type: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  ellipsizeMode: PropTypes.string,
  numberOfLines: PropTypes.number
};

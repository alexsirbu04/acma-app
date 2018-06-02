import React, { Component } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';

import { GREY, MAIN_BLUE, WHITE } from '../../../assets/colors';
import { TextBox } from './';

export class Input extends Component {
  constructor(props) {
    super(props);

    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);

    this.state = {
      color: props.mainColor || GREY,
      textColor: props.textColor || GREY,
      labelColor: GREY
    };
  }

  onFocus() {
    this.setState({
      color: this.props.focusColor || MAIN_BLUE,
      labelColor: WHITE
    });
  }

  onBlur() {
    this.setState({
      color: this.props.mainColor || GREY,
      labelColor: GREY
    });
  }

  render() {
    const {
      value,
      onChangeText,
      placeholder,
      placeholderTextColor,
      keyboardType,
      underlineColorAndroid,
      secureTextEntry,
      width,
      icon,
      iconType,
      label,
      containerStyle,
      inputStyle
    } = this.props;
    return (
      <View style={[styles.container, containerStyle, { width, borderColor: this.state.color }]}>
        {icon ? (
          <Icon
            name={icon}
            type={iconType}
            color={this.state.color}
            containerStyle={styles.icon}
            size={32}
          />
        ) : null}
        {label ? (
          <View style={[styles.label, { backgroundColor: this.state.color }]}>
            <TextBox type="regular" color={this.state.labelColor} size={18}>
              {label}
            </TextBox>
          </View>
        ) : null}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          keyboardType={keyboardType}
          underlineColorAndroid={underlineColorAndroid}
          secureTextEntry={secureTextEntry}
          autoComplete={false}
          autoCorrect={false}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          style={[styles.input, inputStyle, { width, color: this.state.textColor }]}
        />
      </View>
    );
  }
}

Input.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  underlineColorAndroid: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  width: PropTypes.number,
  icon: PropTypes.string,
  iconType: PropTypes.string,
  iconColor: PropTypes.string,
  mainColor: PropTypes.string,
  focusColor: PropTypes.string,
  textColor: PropTypes.string,
  label: PropTypes.string
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    height: 45,
    marginBottom: 15
  },
  input: {
    flex: 6,
    justifyContent: 'center',
    fontFamily: 'regular',
    height: '100%',
    fontSize: 18,
    paddingRight: 15,
    paddingLeft: 10
  },
  icon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 2
  },
  label: {
    width: 80,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

import React, { Component } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Platform } from 'react-native';
import { connect } from 'react-redux';

import { TextBox, SCREEN_HEIGHT, SCREEN_WIDTH } from './common';
import { WHITE } from '../../assets/colors';
import { clearError } from '../actions';

let paddingBottom = 0;
if (Platform.OS === 'ios' && (SCREEN_HEIGHT === 812 || SCREEN_WIDTH === 812)) {
  paddingBottom = 15;
}

class Error extends Component {
  componentDidUpdate() {
    if (this.props.error != '') {
      setTimeout(() => this.props.clearError(), 3000);
    }
  }

  render() {
    if (this.props.error) {
      return (
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={() => this.props.clearError()}>
            <View style={styles.errorContainer}>
              <TextBox
                type="regular"
                color={WHITE}
                size={18}
                style={{ textAlign: 'center', paddingBottom }}
              >
                {this.props.error}
              </TextBox>
            </View>
          </TouchableWithoutFeedback>
        </View>
      );
    }

    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#d00',
    borderTopWidth: 2,
    borderColor: '#b00'
  }
});

const mapStateToProps = state => {
  return {
    error: state.errors.error
  };
};

export default connect(mapStateToProps, { clearError })(Error);

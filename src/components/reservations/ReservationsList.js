import React, { Component } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ReservationDetail from './ReservationsDetail';
import { SCREEN_WIDTH, TextBox, Button, Hr } from '../common';
import { WHITE, LIGHT_GREY } from '../../../assets/colors';

class ReservationsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numOfRows: props.numOfRows || 0,
      renderButton: false,
      edit: false
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (state.numOfRows === 0) return null;
    if (props.reservations.length > state.numOfRows) {
      return {
        renderButton: true
      };
    }
    return {
      renderButton: false
    };
  }

  getRenderContent(event) {
    const { reservations } = this.props;
    const { height } = event.nativeEvent.layout;

    if (height < 270) {
      this.setState({ numOfRows: 1 });
      if (reservations.length > 1) {
        this.setState({ renderButton: true });
      }
    } else if (height < 430) {
      this.setState({ numOfRows: 2 });
      if (reservations.length > 2) {
        this.setState({ renderButton: true });
      }
    } else if (height < 590) {
      this.setState({ numOfRows: 3 });
      if (reservations.length > 3) {
        this.setState({ renderButton: true });
      }
    }
  }

  renderReservation(reservation, index) {
    const { navigation } = this.props;
    const { edit } = this.state;

    if (index === this.props.reservations.length - 1) {
      return (
        <ReservationDetail
          navigation={navigation}
          reservation={reservation}
          index={index}
          edit={edit}
        />
      );
    }

    return (
      <View>
        <ReservationDetail
          navigation={navigation}
          reservation={reservation}
          index={index}
          edit={edit}
        />
        <Hr color={LIGHT_GREY} width={SCREEN_WIDTH} />
      </View>
    );
  }

  render() {
    const { container, textContainer } = styles;
    const { reservations, navigation, scroll } = this.props;

    return (
      <View
        onLayout={event => {
          this.getRenderContent(event);
        }}
        style={container}
      >
        <View style={textContainer}>
          <TextBox type="semi-bold" size={14} color={WHITE}>
            RESERVATIONS ({reservations.length})
          </TextBox>
          <TouchableOpacity onPress={() => this.setState({ edit: !this.state.edit })}>
            <TextBox type="semi-bold" size={14} color={WHITE}>
              {this.state.edit ? 'DONE' : 'EDIT'}
            </TextBox>
          </TouchableOpacity>
        </View>
        <View style={{ height: this.state.numOfRows * 110 }}>
          <FlatList
            data={reservations.slice(0, this.state.numOfRows)}
            keyExtractor={item => item.id}
            renderItem={({ item, index }) => this.renderReservation(item, index)}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={scroll}
          />
        </View>
        {this.state.renderButton ? (
          <Button
            title="VIEW ALL RESERVATIONS"
            textColor={WHITE}
            gradient
            onPress={() => navigation.navigate('Reservations')}
            buttonStyle={styles.button}
          />
        ) : null}
      </View>
    );
  }
}

ReservationsList.propTypes = {
  navigation: PropTypes.object.isRequired,
  numOfRows: PropTypes.number,
  scroll: PropTypes.bool
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 15
  },
  button: {
    height: 50,
    marginTop: 15,
    width: SCREEN_WIDTH - 50,
    overflow: 'hidden',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: SCREEN_WIDTH,
    paddingHorizontal: 15,
    marginBottom: 10
  }
});

const mapStateToProps = state => {
  return {
    reservations: state.reservations.userReservations
  };
};

export default connect(mapStateToProps)(ReservationsList);

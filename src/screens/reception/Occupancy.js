import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { LinearGradient } from 'expo';
import { connect } from 'react-redux';

import StoreProvider from '../../store/StoreProvider';
import BookingsList from '../../components/reception/bookings/BookingsList';
import { clearReservations } from '../../actions';
import { Header, Loading } from '../../components/common';
import { DARK_BLUE, LIGHT_BLUE } from '../../../assets/colors';

class Occupancy extends Component {
  constructor(props) {
    super(props);

    this.refreshAsync = this.refreshAsync.bind(this);
  }

  state = {
    loading: false
  };

  async refreshAsync() {
    this.setState({ loading: true });
    this.props.clearReservations();
    await StoreProvider.loadReceptionReservations();
    this.setState({ loading: false });
  }

  render() {
    return (
      <SafeAreaView forceInset={{ bottom: 'always', top: 'never' }} style={styles.container}>
        {this.state.loading ? <Loading /> : null}
        <LinearGradient colors={[DARK_BLUE, LIGHT_BLUE]} start={[1, 1]} style={styles.gradient} />
        <Header title="Occupancy" refresh onRefreshPress={this.refreshAsync} />
        <BookingsList navigation={this.props.navigation} occupancy scroll />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  gradient: {
    position: 'absolute',
    height: '120%',
    width: '100%'
  }
});

export default connect(
  null,
  { clearReservations }
)(Occupancy);

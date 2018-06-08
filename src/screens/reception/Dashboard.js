import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { LinearGradient } from 'expo';
import { connect } from 'react-redux';

import StoreProvider from '../../store/StoreProvider';
import BookingsList from '../../components/reception/bookings/BookingsList';
import { Header, Loading } from '../../components/common';
import { clearReservations } from '../../actions';
import { DARK_BLUE, LIGHT_BLUE } from '../../../assets/colors';

class Dashboard extends Component {
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
    const { navigation } = this.props;
    return (
      <SafeAreaView forceInset={{ bottom: 'always', top: 'never' }} style={styles.container}>
        {this.state.loading ? <Loading /> : null}
        <LinearGradient colors={[DARK_BLUE, LIGHT_BLUE]} start={[1, 1]} style={styles.gradient} />
        <Header title="Reservations" refresh onRefreshPress={this.refreshAsync} />
        <BookingsList navigation={navigation} checkIn scroll={false} />
        <BookingsList navigation={navigation} checkOut scroll={false} />
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

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { clearReservations }
)(Dashboard);

import React, { Component } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { LinearGradient } from 'expo';
import { connect } from 'react-redux';

import ReservationsList from '../../components/reservations/ReservationsList';
import StoreProvider from '../../store/StoreProvider';
import { Header, Loading } from '../../components/common';
import { DARK_BLUE, LIGHT_BLUE } from '../../../assets/colors';

class Reservations extends Component {
  constructor(props) {
    super(props);

    this.onRefreshAsync = this.onRefreshAsync.bind(this);
  }

  state = {
    loading: false
  };

  async onRefreshAsync() {
    this.setState({ loading: true });
    await StoreProvider.loadUserReservations();
    this.setState({ loading: false });
  }

  render() {
    const { reservations, navigation } = this.props;
    return (
      <SafeAreaView forceInset={{ top: 'never' }} style={styles.container}>
        {this.state.loading ? <Loading /> : null}
        <LinearGradient colors={[DARK_BLUE, LIGHT_BLUE]} start={[1, 1]} style={styles.gradient} />
        <Header
          title="Reservations"
          backArrow
          onBackPress={() => navigation.goBack()}
          refresh
          onRefreshPress={this.onRefreshAsync}
        />
        <ReservationsList
          numOfRows={reservations.length}
          navigation={navigation}
          scrollEnabled={false}
        />
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
  },
  iconContainer: {
    position: 'absolute',
    right: 20,
    top: Platform.OS === 'ios' ? 50 : 40
  }
});

const mapStateToProps = state => {
  return {
    reservations: state.reservationsArray.reservations
  };
};

export default connect(mapStateToProps)(Reservations);

import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { LinearGradient } from 'expo';
import { connect } from 'react-redux';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Icon } from 'react-native-elements';

import StoreProvider from '../../store/StoreProvider';
import BarChart from '../../components/BarChart';
import LineChart from '../../components/LineChart';
import { SCREEN_WIDTH, Header, Loading } from '../../components/common';
import { DARK_BLUE, LIGHT_BLUE, WHITE, GOLD, TRANSPARENT } from '../../../assets/colors';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.refreshAsync = this.refreshAsync.bind(this);
  }

  state = {
    carouselData: ['Total Booked Rooms', 'Average Occupancy Rate'],
    totalBookedRoomsData: [],
    averageOccupancyRateData: [],
    loading: false,
    active: 0
  };

  static getDerivedStateFromProps(props, state) {
    if (props.months !== state.totalAvailableRoomsData) {
      const totalBookedRoomsData = [];
      const averageOccupancyRateData = [];
      for (const month of props.months) {
        if (month.roomsBooked > 0) {
          totalBookedRoomsData.push(month);
          averageOccupancyRateData.push({
            name: month.name,
            percent: (month.roomsBooked / props.totalRooms) * 100
          });
        }
      }

      return {
        totalBookedRoomsData,
        averageOccupancyRateData
      };
    }

    return null;
  }

  async refreshAsync() {
    this.setState({ loading: true });
    await StoreProvider.loadStatistics();
    this.setState({ loading: false });
  }

  renderItem({ item, index }) {
    switch (index) {
      case 0:
        return (
          <BarChart
            chartLabel={item}
            data={this.state.totalBookedRoomsData}
            labels={d => d.roomsBooked}
            x="name"
            y="roomsBooked"
          />
        );
      case 1:
        return (
          <LineChart
            chartLabel={item}
            data={this.state.averageOccupancyRateData}
            labels={d => `${Math.floor(d.percent)}%`}
            x="name"
            y="percent"
          />
        );
      default:
        break;
    }
  }

  renderDots(activeIndex) {
    const { dot } = styles;
    const activeDot = {
      backgroundColor: GOLD,
      width: 13,
      height: 13
    };

    return this.state.carouselData.map((value, index) => {
      return (
        <TouchableOpacity
          disabled
          key={value}
          style={[dot, activeIndex === index ? activeDot : dot]}
          onPress={() => {
            this.carousel._snapToItem(this.carousel._getPositionIndex(index));
          }}
        />
      );
    });
  }

  render() {
    return (
      <SafeAreaView forceInset={{ top: 'never' }} style={styles.container}>
        {this.state.loading ? <Loading /> : null}
        <LinearGradient colors={[DARK_BLUE, LIGHT_BLUE]} start={[1, 1]} style={styles.gradient} />
        <Header title="Statistics" refresh onRefreshPress={this.refreshAsync} />
        <Carousel
          ref={ref => {
            this.carousel = ref;
          }}
          data={this.state.carouselData}
          firstItem={this.state.active}
          onSnapToItem={slideIndex => {
            this.setState({ active: slideIndex });
          }}
          renderItem={({ item, index }) => this.renderItem({ item, index })}
          sliderWidth={SCREEN_WIDTH}
          itemWidth={SCREEN_WIDTH}
          decelerationRate="fast"
        />
        <View style={styles.dotsContainer}>
          {this.state.active !== 0 ? (
            <Icon
              name="chevron-left"
              color={WHITE}
              size={34}
              underlayColor={TRANSPARENT}
              containerStyle={{ flex: 1 }}
              onPress={() => {
                this.carousel._snapToItem(this.carousel._getPositionIndex(this.state.active - 1));
              }}
            />
          ) : (
            <View style={{ flex: 1 }} />
          )}
          <Pagination
            dotsLength={this.state.carouselData.length}
            activeDotIndex={this.state.active}
            renderDots={activeIndex => this.renderDots(activeIndex)}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            containerStyle={{ flex: 1 }}
          />
          {this.state.active !== this.state.carouselData.length - 1 ? (
            <Icon
              name="chevron-right"
              color={WHITE}
              size={34}
              containerStyle={{ flex: 1 }}
              underlayColor={TRANSPARENT}
              onPress={() => {
                this.carousel._snapToItem(this.carousel._getPositionIndex(this.state.active + 1));
              }}
            />
          ) : (
            <View style={{ flex: 1 }} />
          )}
        </View>
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
    height: '100%',
    width: '100%'
  },
  dot: {
    alignItems: 'center',
    marginHorizontal: 15,
    height: 10,
    width: 10,
    borderRadius: 10,
    backgroundColor: WHITE
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 15
  }
});

const mapStateToProps = state => {
  return {
    totalRooms: state.statistics.totalRooms,
    months: state.statistics.months
  };
};

export default connect(mapStateToProps)(Dashboard);

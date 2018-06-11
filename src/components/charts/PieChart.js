import React from 'react';
import { View, StyleSheet } from 'react-native';
import { VictoryPie } from 'victory-native';
import PropTypes from 'prop-types';

import Legend from './Legend';
import { TextBox, SCREEN_HEIGHT } from '../common';
import { WHITE, PIE_COLORS } from '../../../assets/colors';

export const PieChart = ({ chartLabel, data }) => {
  return (
    <View style={styles.chartContainer}>
      <TextBox type="semi-bold" color={WHITE} size={20} style={styles.chartLabel}>
        {chartLabel}
      </TextBox>
      {data.length > 0 ? (
        <VictoryPie
          height={SCREEN_HEIGHT / 2}
          width={SCREEN_HEIGHT / 2}
          colorScale={PIE_COLORS}
          data={data}
          labels={() => null}
          style={{ parent: { bottom: 20 } }}
        />
      ) : null}
      <Legend data={data} colorScale={PIE_COLORS} />
    </View>
  );
};

PieChart.propTypes = {
  chartLabel: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired
};

const styles = StyleSheet.create({
  chartContainer: {
    flex: 1,
    alignItems: 'center'
  },
  chartLabel: {
    paddingTop: 15
  }
});

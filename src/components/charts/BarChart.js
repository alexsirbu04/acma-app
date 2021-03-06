import React from 'react';
import { View, StyleSheet } from 'react-native';
import { VictoryChart, VictoryAxis, VictoryBar, VictoryTheme } from 'victory-native';
import PropTypes from 'prop-types';

import { SCREEN_HEIGHT, SCREEN_WIDTH, TextBox } from '../common';
import { WHITE, LIGHT_GREY } from '../../../assets/colors';

export const BarChart = ({ chartLabel, data, labels, x, y }) => {
  return (
    <View style={styles.chartContainer}>
      <TextBox type="semi-bold" color={WHITE} size={20} style={styles.chartLabel}>
        {chartLabel}
      </TextBox>
      {data.length > 0 ? (
        <VictoryChart
          width={SCREEN_WIDTH - 40}
          height={SCREEN_HEIGHT / 1.5}
          domain={{ x: [0.5, 4.5], y: [0, 50] }}
          theme={VictoryTheme.material}
          style={{
            parent: { borderRadius: 15, bottom: 15 }
          }}
        >
          <VictoryAxis
            style={{
              axis: { stroke: LIGHT_GREY, opacity: 0.8 },
              grid: { opacity: 0.5 },
              ticks: { stroke: LIGHT_GREY, size: 5, opacity: 0.5 },
              tickLabels: { fontSize: 15, padding: 5, fill: LIGHT_GREY, opacity: 0.9 }
            }}
          />
          <VictoryAxis
            dependentAxis
            style={{
              axis: { stroke: LIGHT_GREY, opacity: 0.8 },
              grid: { opacity: 0.5 },
              ticks: { stroke: LIGHT_GREY, size: 5, opacity: 0.5 },
              tickLabels: { fontSize: 15, padding: 5, fill: LIGHT_GREY, opacity: 0.9 }
            }}
          />
          <VictoryBar
            data={data}
            labels={labels}
            x={x}
            y={y}
            style={{
              data: {
                stroke: WHITE,
                fill: LIGHT_GREY,
                fillOpacity: 0.5
              },
              labels: {
                fill: WHITE,
                fontSize: 20
              }
            }}
          />
        </VictoryChart>
      ) : null}
    </View>
  );
};

BarChart.propTypes = {
  chartLabel: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  labels: PropTypes.func,
  x: PropTypes.string,
  y: PropTypes.string
};

const styles = StyleSheet.create({
  chartContainer: {
    flex: 1,
    alignItems: 'center'
  },
  chartLabel: {
    paddingTop: 20
  }
});

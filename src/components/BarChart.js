import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  VictoryChart,
  VictoryAxis,
  VictoryBar,
  VictoryZoomContainer,
  VictoryTheme
} from 'victory-native';

import { SCREEN_HEIGHT, SCREEN_WIDTH, TextBox } from './common';
import { WHITE, LIGHT_GREY } from '../../assets/colors';

const BarChart = ({ chartLabel, data, labels, x, y }) => {
  return (
    <View style={styles.chartContainer}>
      <TextBox type="semi-bold" color={WHITE} size={20} style={styles.chartLabel}>
        {chartLabel}
      </TextBox>
      <VictoryChart
        width={SCREEN_WIDTH - 40}
        height={SCREEN_HEIGHT / 1.5}
        domain={{ x: [0.5, 4.5], y: [0, 30] }}
        theme={VictoryTheme.material}
        style={{
          parent: { borderRadius: 15, marginBottom: 15 }
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
    </View>
  );
};

export default BarChart;

const styles = StyleSheet.create({
  chartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20
  },
  chartLabel: {
    position: 'absolute',
    top: 15
  }
});

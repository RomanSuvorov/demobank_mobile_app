import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { Card } from './Card';
import { GLOB_VAR, PAGINATION_HEIGHT, ACTIONS_BOX_HEIGHT } from '../styles/global';
import { deviceSize, getStyle } from '../helper';

const { height } = deviceSize;

export function CardSheet({
  currentIndex,
  currentPosition,
  scrollX,
  paginationIndex,
  activeSlide,
  goToSecondSlide,
}) {
  const progressBarContainerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      currentIndex.value,
      [0, 0.5],
      [1, 0],
      Extrapolate.CLAMP,
    ),
    transform: [
      {
        translateY: interpolate(
          currentIndex.value,
          [0, 1],
          [0, -currentPosition.value],
          Extrapolate.CLAMP,
        ),
      },
    ],
  }));
  const progressBarContainerStyle = getStyle(styles.progressBarContainer, progressBarContainerAnimatedStyle, progressBarContainerAnimatedStyle);

  return (
    <View style={styles.container}>
      <Card
        scrollX={scrollX}
        paginationIndex={paginationIndex}
        activeSlide={activeSlide}
        goToSecondSlide={goToSecondSlide}
      />

      <Animated.View style={progressBarContainerStyle} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: height - PAGINATION_HEIGHT - (height * GLOB_VAR.INITIAL_SNAP_POINT),
    alignItems: "center",
  },
  progressBarContainer: {
    bottom: 0,
    position: "absolute",
    backgroundColor: "blue",
    height: ACTIONS_BOX_HEIGHT,
    width: "100%",
  }
});

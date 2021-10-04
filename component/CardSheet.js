import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { Card } from './Card';
import { ACTIONS_BOX_HEIGHT, HEIGHT_OF_CARD_CONTENT } from '../styles/global';
import { getStyle } from '../sdk/helper';

export function CardSheet({
  currentIndex,
  currentPosition,
  scrollX,
  paginationIndex,
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
        goToSecondSlide={goToSecondSlide}
      />

      <Animated.View style={progressBarContainerStyle} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: HEIGHT_OF_CARD_CONTENT,
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

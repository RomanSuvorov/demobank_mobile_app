import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { color } from '../styles/color.theme';
import { GLOB_VAR, PAGINATION_HEIGHT } from '../styles/global';
import { StatusBarHeight } from '../helper';
import { deviceSize } from '../helper';

const { width, height } = deviceSize;

export function ScreenPagination({ screens, currentIndex, scrollX }) {
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      currentIndex.value,
      [0, 0.05],
      [1, 0],
      Extrapolate.CLAMP,
    ),
  }));

  const containerStyle = useMemo(
    () => [styles.container, containerAnimatedStyle],
    [containerAnimatedStyle],
  );

  return (
    <Animated.View style={containerStyle}>
      {
        screens.map((item, key) => {
          const paginationAnimatedDot = useAnimatedStyle(
            () => ({
              opacity: interpolate(
                scrollX.value,
                [(key - 1) * width, key * width, (key + 1) * width],
                [0.3, 1, 0.3],
                Extrapolate.CLAMP,
              ),
            })
          );

          const paginationStyle = [styles.paginationDot, paginationAnimatedDot];

          return (
            <Animated.View
              key={key}
              style={paginationStyle}
            />
          )
        })
      }
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    position: "absolute",
    height: PAGINATION_HEIGHT,
    alignItems: "center",
    bottom: (height * GLOB_VAR.INITIAL_SNAP_POINT) - StatusBarHeight,
    alignSelf: "center",
  },
  paginationDot: {
    width: 6,
    height: 6,
    borderRadius: 50,
    marginHorizontal: 3,
    backgroundColor: color.pagination.active,
  },
})

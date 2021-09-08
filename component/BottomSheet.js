import React, { useRef } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import BS from '@gorhom/bottom-sheet';

import { color } from '../styles/color.theme';

const { height, width } = Dimensions.get("window");

function CustomBottomSheetBackground({ style }) {
  return (
    <View
      style={[
        {
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          backgroundColor: color.bg.secondary,
          marginHorizontal: 0.5,
        },
        { ...style },
      ]}
    />
  );
}

export function BottomSheet({
  snapPoints = [-1],
  currentIndex,
  currentPosition,
  content = null,
  setScrollEnabled = () => {},
}) {
  const bottomSheetRef = useRef(null);

  return (
    <View style={styles.container}>
      <BS
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        backgroundComponent={CustomBottomSheetBackground}
        handleComponent={null}
        animatedIndex={currentIndex}
        animatedPosition={currentPosition}
        onChange={(index) => setScrollEnabled(index !== 1)}
      >
        {content}
      </BS>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height,
    width,
    position: "absolute",
  },
});

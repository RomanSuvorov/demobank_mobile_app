import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import BS from '@gorhom/bottom-sheet';

import { dark } from '../styles/color.theme';
import { deviceSize } from '../sdk/helper';

const { width, height } = deviceSize;

function CustomBottomSheetBackground({ style }) {
  return (
    <View
      style={[
        {
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          backgroundColor: dark,
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
  enableOverDrag = false,
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
        enableOverDrag={enableOverDrag}
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

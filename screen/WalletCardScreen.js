import React, { useMemo } from 'react';
import { View, Text, Dimensions, StyleSheet, Button } from 'react-native';

import { BottomSheet } from '../component/BottomSheet';

const { width, height } = Dimensions.get("window");

export function WalletCardScreen({
  currentPosition,
  currentIndex,
  setScrollEnabled,
}) {
  const snapPoints = useMemo(() => ["42%", "95%"], []);

  return (
    <View
      style={styles.container}
    >
      <Button title={"WalletCardScreen"} onPress={() => console.log(currentIndex.value)} />
      <BottomSheet
        snapPoints={snapPoints}
        currentIndex={currentIndex}
        currentPosition={currentPosition}
        content={() => <View><Text>BottomSheet</Text></View>}
        setScrollEnabled={setScrollEnabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    height,
  },
});

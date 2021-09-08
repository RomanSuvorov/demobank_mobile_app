import React, { useMemo } from 'react';
import { Button, View, Dimensions, StyleSheet } from 'react-native';

import { BottomSheet } from '../component/BottomSheet';
import { TransactionList } from '../component/TransactionList';

const { width, height } = Dimensions.get("window");

export function WalletBalanceScreen({
  navigation,
  currentPosition,
  currentIndex,
  setScrollEnabled,
}) {
  const snapPoints = useMemo(() => ["42%", "84%"], []);

  const handleGetDetails = (url, id) => {
    navigation.navigate('Details', { url: url, id: id });
  };



  return (
    <View
      style={styles.container}
    >
      <Button title={"WalletBalanceScreen"} onPress={() => console.log(currentIndex.value)} />
      <BottomSheet
        snapPoints={snapPoints}
        currentIndex={currentIndex}
        currentPosition={currentPosition}
        content={() => <TransactionList onGetDetails={handleGetDetails} />}
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

import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Dimensions } from 'react-native';
import { useSharedValue, useDerivedValue } from 'react-native-reanimated';

import { WalletBalanceScreen } from './WalletBalanceScreen';
import { WalletCardScreen } from './WalletCardScreen';
import { ScreenPagination } from '../component/ScreenPagination';

const { width, height } = Dimensions.get("window");

const screens = [
  WalletBalanceScreen,
  WalletCardScreen,
];

export function WalletScreen({ navigation }) {
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [active, setActive] = useState(0);
  const scrollX = useSharedValue(0);
  const currentBalancePosition = useSharedValue(0);
  const currentCardPosition = useSharedValue(0);
  const currentBalanceIndex = useSharedValue(0);
  const currentCardIndex = useSharedValue(0);

  const paginationIndex = useDerivedValue(() =>
    active === 0
    ? currentBalanceIndex.value
    : currentCardIndex.value
  );

  const handleScroll = ({ nativeEvent }) => {
    scrollX.value = nativeEvent.contentOffset.x;
    const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
    if (slide !== active) setActive(slide);
  };

  return (
    <View
      style={styles.container}
    >
      <ScrollView
        pagingEnabled={true}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        overScrollMode={"never"}
        scrollEnabled={scrollEnabled}
        style={styles.scrollContainer}
        onScroll={handleScroll}
      >
        <WalletBalanceScreen
          navigation={navigation}
          currentPosition={currentBalancePosition}
          currentIndex={currentBalanceIndex}
          setScrollEnabled={setScrollEnabled}
        />
        <WalletCardScreen
          navigation={navigation}
          currentPosition={currentCardPosition}
          currentIndex={currentCardIndex}
          setScrollEnabled={setScrollEnabled}
        />
      </ScrollView>
      <ScreenPagination
        screens={screens}
        currentIndex={paginationIndex}
        scrollX={scrollX}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    width,
    height,
    paddingTop: 20,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

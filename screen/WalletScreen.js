import React, { useState, useRef } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { useSharedValue, useDerivedValue } from 'react-native-reanimated';

import { WalletBalanceScreen } from './WalletBalanceScreen';
import { WalletCardScreen } from './WalletCardScreen';
import { ScreenPagination } from '../component/ScreenPagination';
import { StatusBarHeight, deviceSize } from '../helper';

const { width, height } = deviceSize;

const screens = [
  WalletBalanceScreen,
  WalletCardScreen,
];

export function WalletScreen({ navigation }) {
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [active, setActive] = useState(0);
  const scrollRef = useRef(null);
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

  const goToSecondSlide = () => {
    if (scrollRef && scrollRef.current) {
      scrollRef.current.scrollToEnd({ animated: true, duration: 800 })
    }
  };

  return (
    <View
      style={styles.container}
    >
      <ScrollView
        ref={scrollRef}
        pagingEnabled={true}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        overScrollMode={"never"}
        scrollEnabled={scrollEnabled}
        style={styles.scrollContainer}
        scrollEventThrottle={16}
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
          paginationIndex={paginationIndex}
          setScrollEnabled={setScrollEnabled}
          scrollX={scrollX}
          activeSlide={active}
          goToSecondSlide={goToSecondSlide}
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
    paddingTop: StatusBarHeight,
  },
});

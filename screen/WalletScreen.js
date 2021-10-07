import React, { useState, useRef } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import {
  useSharedValue,
  useDerivedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { useSelector, useDispatch } from 'react-redux';

import { WalletBalanceScreen } from './WalletBalanceScreen';
import { WalletCardScreen } from './WalletCardScreen';
import { Pagination } from '../component/Pagination';
import { deviceSize } from '../sdk/helper';
import AppType from '../store/app/types';
import { GLOB_VAR } from '../styles/global';

const { width, height } = deviceSize;

const screens = [
  WalletBalanceScreen,
  WalletCardScreen,
];

export function WalletScreen({ navigation }) {
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const activeSlide = useSelector(state => state.app.activeSlide);
  const scrollRef = useRef(null);
  const dispatch = useDispatch();
  const scrollX = useSharedValue(0);
  const currentBalancePosition = useSharedValue(0);
  const currentCardPosition = useSharedValue(0);
  const currentBalanceIndex = useSharedValue(0);
  const currentCardIndex = useSharedValue(0);

  const paginationIndex = useDerivedValue(() =>
    activeSlide === 0 ? currentBalanceIndex.value : currentCardIndex.value
  );

  const paginationAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      paginationIndex.value,
      [0, 0.05],
      [1, 0],
      Extrapolate.CLAMP,
    ),
  }));
  const paginationStyle = [paginationAnimatedStyle, { bottom: GLOB_VAR.INITIAL_SNAP_POINT }]

  const handleScroll = ({ nativeEvent }) => scrollX.value = nativeEvent.contentOffset.x;

  const goToSecondSlide = () => {
    if (scrollRef && scrollRef.current) {
      scrollRef.current.scrollToEnd({ animated: true });
      dispatch({ type: AppType.CHANGE_ACTIVE_SLIDE, payload: 1 });
    }
  };

  const handleChangeSlide = ({ nativeEvent }) => {
    const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
    if (slide !== activeSlide) dispatch({ type: AppType.CHANGE_ACTIVE_SLIDE, payload: slide });
  };

  return (
    <View style={styles.container}>
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
        onMomentumScrollEnd={handleChangeSlide}
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
          goToSecondSlide={goToSecondSlide}
        />
      </ScrollView>
      <Pagination
        slides={screens}
        scrollX={scrollX}
        style={paginationStyle}
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
  },
});

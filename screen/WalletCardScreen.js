import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import { BottomSheet } from '../component/BottomSheet';
import { CardSheet } from '../component/CardSheet';
import { SettingsWalletItem } from './SettingsWalletItemScreen';
import { GLOB_VAR } from '../styles/global';
import { deviceSize, StatusBarHeight } from '../sdk/helper';

const { width, height } = deviceSize;

export const WalletCardScreen = React.memo(({
  navigation,
  currentPosition,
  currentIndex,
  paginationIndex,
  setScrollEnabled,
  scrollX,
  goToSlide,
  bottomSheetRef,
}) => {
  const address = useSelector(state => state.wallet.address);
  const snapPoints = useMemo(() => [GLOB_VAR.INITIAL_SNAP_POINT, GLOB_VAR.SECOND_SNAP_POINT_CARD], []);

  return (
    <View style={styles.container}>
      <CardSheet
        currentIndex={currentIndex}
        scrollX={scrollX}
        paginationIndex={paginationIndex}
        goToSlide={goToSlide}
      />
      <BottomSheet
        snapPoints={snapPoints}
        currentIndex={currentIndex}
        currentPosition={currentPosition}
        content={() => (
          <SettingsWalletItem
            navigation={navigation}
            walletAddress={address}
          />
        )}
        setScrollEnabled={setScrollEnabled}
        bottomSheetRef={bottomSheetRef}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width,
    height,
    paddingTop: StatusBarHeight,
  },
  bottomSheetContainer: {
    paddingTop: 18,
    paddingBottom: height * (0.25 / 2), // half of gradient in bottom navigator
  },
});

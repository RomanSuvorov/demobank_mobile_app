import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import { BottomSheet } from '../component/BottomSheet';
import { CardSheet } from '../component/CardSheet';
import { TransactionHeader } from '../component/Transaction/TransactionHeader';
import { TransactionItem } from '../component/Transaction/TransactionItem';
import { SettingsWalletItem } from './SettingsWalletItemScreen';
import { BlockIcon, FingerPrintIcon, LockOpenIcon, SettingsIcon } from '../component/Icons';
import { GLOB_VAR } from '../styles/global';
import { deviceSize, StatusBarHeight } from '../sdk/helper';

const { width, height } = deviceSize;

const listData = [
  {
    title: "Настройки",
    data: [
      { title: "Заблокировать кошелек", subTitle: "Вы всегда можете его разблокировать", svg: BlockIcon },
      { title: "Изменить пароль", svg: FingerPrintIcon },
      { title: "Настройки безопасности", svg: LockOpenIcon },
      { title: "Настройки безопасности аккаунта", svg: SettingsIcon },
    ],
  },
];

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
  const activeWallet = useSelector(state => state.wallet.activeWallet);
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
            walletAddress={activeWallet.address}
          />
          /*<SectionList
            sections={listData}
            keyExtractor={(item) => item.title}
            renderSectionHeader={() => <TransactionHeader title={"Настройки"} />}
            renderItem={({ item }) => <TransactionItem item={item} withShadow={false} onPress={(item) => console.log(item.title)} />}
            contentContainerStyle={styles.bottomSheetContainer}
          />*/
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

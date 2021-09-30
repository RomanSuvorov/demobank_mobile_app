import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { BottomSheetSectionList } from '@gorhom/bottom-sheet';

import { BottomSheet } from '../component/BottomSheet';
import { CardSheet } from '../component/CardSheet';
import { TransactionHeader } from '../component/Transaction/TransactionHeader';
import { TransactionItem } from '../component/Transaction/TransactionItem';
import { BlockIcon, FingerPrintIcon, LockOpenIcon, SettingsIcon } from '../component/Icons';
import { GLOB_VAR } from '../styles/global';
import { deviceSize } from '../helper';

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
  currentPosition,
  currentIndex,
  paginationIndex,
  setScrollEnabled,
  scrollX,
  activeSlide,
  goToSecondSlide,
}) => {
  const snapPoints = useMemo(() => [GLOB_VAR.INITIAL_SNAP_POINT_PERC, GLOB_VAR.SECOND_SNAP_POINT_CARD], []);

  return (
    <View
      style={styles.container}
    >
      <CardSheet
        currentIndex={currentIndex}
        currentPosition={currentPosition}
        scrollX={scrollX}
        paginationIndex={paginationIndex}
        activeSlide={activeSlide}
        goToSecondSlide={goToSecondSlide}
      />
      <BottomSheet
        snapPoints={snapPoints}
        currentIndex={currentIndex}
        currentPosition={currentPosition}
        content={() => (
          <BottomSheetSectionList
            sections={listData}
            keyExtractor={(item) => item.title}
            renderSectionHeader={() => <TransactionHeader title={"Настройки"} />}
            renderItem={({ item }) => <TransactionItem item={item} onPress={(item) => console.log(item.title)} />}
            contentContainerStyle={styles.bottomSheetContainer}
          />
        )}
        setScrollEnabled={setScrollEnabled}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width,
    height,
  },
  bottomSheetContainer: {
    paddingTop: 18,
    paddingBottom: height * (0.25 / 2), // half of gradient in bottom navigator
  },
});

import React, { useMemo } from 'react';
import { View, Dimensions, StyleSheet, Button } from 'react-native';
import { BottomSheetSectionList } from '@gorhom/bottom-sheet';

import { BottomSheet } from '../component/BottomSheet';
import { TransactionHeader } from '../component/Transaction/TransactionHeader';
import { TransactionItem } from '../component/Transaction/TransactionItem';
import { BlockIcon, FingerPrintIcon, LockOpenIcon, SettingsIcon } from '../component/Icons';

const { width, height } = Dimensions.get("window");

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
  setScrollEnabled,
}) => {
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

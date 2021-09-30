import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { BottomSheetSectionList } from '@gorhom/bottom-sheet';

import { BalanceSheet } from '../component/BalanceSheet';
import { BottomSheet } from '../component/BottomSheet';
import { TransactionHeader } from '../component/Transaction/TransactionHeader';
import { TransactionItem } from '../component/Transaction/TransactionItem';
import { GLOB_VAR } from '../styles/global';
import { deviceSize } from '../helper';

const { width, height } = deviceSize;

const MOCK_DATA = [
  {
    title: "Сегодня",
    data: [{ title: "Bitcoin", subTitle: "DeMo Bank", sum: "-34.865", curr: "BTC", id: 1, logo: require("../assets/btc-mock.png"), url: "https://google.com" }],
  },
  {
    title: "Вчера",
    data: [
      { title: "Bitcoin", subTitle: "DeMo Bank", sum: "34.865", curr: "BTC", id: 2, logo: require("../assets/btc-mock.png"), url: "https://google.com" },
      { title: "Ethereum", subTitle: "DeMo Bank", sum: "2.343", curr: "ETH", id: 3, logo: require("../assets/btc-mock.png"), url: "https://google.com" },
    ],
  },
  {
    title: "20 мая",
    data: [
      { title: "SomeCoin", subTitle: "DeMo Bank", sum: "4.865", curr: "SMC", id: 4, logo: require("../assets/btc-mock.png"), url: "https://google.com" },
      { title: "Bitcoin", subTitle: "DeMo Bank", sum: "-64.865", curr: "BTC", id: 5, logo: require("../assets/btc-mock.png"), url: "https://google.com" },
    ],
  },
  {
    title: "20 мая 2020",
    data: [
      { title: "Another", subTitle: "Very loooooooooooooooooooooong text of transaction", sum: "-34.865", curr: "ACO", id: 6, logo: require("../assets/btc-mock.png"), url: "https://google.com" },
      { title: "Bitcoin", subTitle: "DeMo Bank", sum: "-34.865", curr: "BTC", id: 7, logo: require("../assets/btc-mock.png"), url: "https://google.com" },
    ],
  },
  {
    title: "10 мая 2020",
    data: [
      { title: "Another", subTitle: "Very loooooooooooooooooooooong text of transaction", sum: "-34.865", curr: "ACO", id: 8, logo: require("../assets/btc-mock.png"), url: "https://google.com" },
      { title: "Bitcoin", subTitle: "DeMo Bank", sum: "-34.865", curr: "BTC", id: 9, logo: require("../assets/btc-mock.png"), url: "https://google.com" },
    ],
  },
  {
    title: "1 мая 2020",
    data: [
      { title: "Another", subTitle: "Very loooooooooooooooooooooong text of transaction", sum: "-34.865", curr: "ACO", id: 10, logo: require("../assets/btc-mock.png"), url: "https://google.com" },
      { title: "Bitcoin", subTitle: "DeMo Bank", sum: "-34.865", curr: "BTC", id: 11, logo: require("../assets/btc-mock.png"), url: "https://google.com" },
      { title: "Bitcoin", subTitle: "DeMo Bank", sum: "-34.865", curr: "BTC", id: 12, logo: require("../assets/btc-mock.png"), url: "https://google.com" },
      { title: "Bitcoin", subTitle: "DeMo Bank", sum: "-34.865", curr: "BTC", id: 13, logo: require("../assets/btc-mock.png"), url: "https://google.com" },
      { title: "Bitcoin", subTitle: "DeMo Bank", sum: "-34.865", curr: "BTC", id: 14, logo: require("../assets/btc-mock.png"), url: "https://google.com" },
      { title: "Bitcoin", subTitle: "DeMo Bank", sum: "-34.865", curr: "BTC", id: 15, logo: require("../assets/btc-mock.png"), url: "https://google.com" },
    ],
  },
];

export const WalletBalanceScreen = React.memo(({
  navigation,
  currentPosition,
  currentIndex,
  setScrollEnabled,
}) => {
  const snapPoints = useMemo(() => [GLOB_VAR.INITIAL_SNAP_POINT_PERC, GLOB_VAR.SECOND_SNAP_POINT_BALANCE], []);

  const handleGetDetails = ({ id, url }) => {
    navigation.navigate('Details', { url: url, id: id });
  };

  return (
    <View
      style={styles.container}
    >
      <BalanceSheet
        currentIndex={currentIndex}
        currentPosition={currentPosition}
      />
      <BottomSheet
        snapPoints={snapPoints}
        currentIndex={currentIndex}
        currentPosition={currentPosition}
        content={() => (
          <BottomSheetSectionList
            sections={MOCK_DATA}
            keyExtractor={(item) => item.id}
            renderSectionHeader={({ section: { title } }) => <TransactionHeader title={title} />}
            renderItem={({ item }) => <TransactionItem item={item} onPress={handleGetDetails} />}
            contentContainerStyle={styles.bottomSheetContainer}
          />
        )}
        enableOverDrag={true}
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

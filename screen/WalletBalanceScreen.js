import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { BottomSheetSectionList } from '@gorhom/bottom-sheet';
import {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { BalanceSheet } from '../component/BalanceSheet';
import { BottomSheet } from '../component/BottomSheet';
import { TransactionHeader } from '../component/Transaction/TransactionHeader';
import { TransactionItem } from '../component/Transaction/TransactionItem';
import { EmptyList } from '../component/EmptyList';
import { GLOB_VAR } from '../styles/global';
import { deviceSize, StatusBarHeight } from '../sdk/helper';
import { SCREEN_NAMES, DEFAULT_RESOURCES } from '../styles/constants';

const { width, height } = deviceSize;

const MOCK_DATA = [
  // {
  //   title: "Сегодня",
  //   data: [{ title: "Bitcoin", subTitle: "DeMo Bank", sum: "-34.865", curr: "BTC", id: 1, svgUri: DEFAULT_RESOURCES.graphCoinSvgUri, url: "https://google.com" }],
  // },
  // {
  //   title: "Вчера",
  //   data: [
  //     { title: "Bitcoin", subTitle: "DeMo Bank", sum: "34.865", curr: "BTC", id: 2, svgUri: DEFAULT_RESOURCES.graphCoinSvgUri, url: "https://google.com" },
  //     { title: "Ethereum", subTitle: "DeMo Bank", sum: "2.343", curr: "ETH", id: 3, svgUri: DEFAULT_RESOURCES.graphCoinSvgUri, url: "https://google.com" },
  //   ],
  // },
  // {
  //   title: "20 мая",
  //   data: [
  //     { title: "SomeCoin", subTitle: "DeMo Bank", sum: "4.865", curr: "SMC", id: 4, svgUri: DEFAULT_RESOURCES.graphCoinSvgUri, url: "https://google.com" },
  //     { title: "Bitcoin", subTitle: "DeMo Bank", sum: "-64.865", curr: "BTC", id: 5, svgUri: DEFAULT_RESOURCES.graphCoinSvgUri, url: "https://google.com" },
  //   ],
  // },
  // {
  //   title: "20 мая 2020",
  //   data: [
  //     { title: "Another", subTitle: "Very loooooooooooooooooooooong text of transaction", sum: "-34.865", curr: "ACO", id: 6, svgUri: DEFAULT_RESOURCES.graphCoinSvgUri, url: "https://google.com" },
  //     { title: "Bitcoin", subTitle: "DeMo Bank", sum: "-34.865", curr: "BTC", id: 7, svgUri: DEFAULT_RESOURCES.graphCoinSvgUri, url: "https://google.com" },
  //   ],
  // },
  // {
  //   title: "10 мая 2020",
  //   data: [
  //     { title: "Another", subTitle: "Very loooooooooooooooooooooong text of transaction", sum: "-34.865", curr: "ACO", id: 8, svgUri: DEFAULT_RESOURCES.graphCoinSvgUri, url: "https://google.com" },
  //     { title: "Bitcoin", subTitle: "DeMo Bank", sum: "-34.865", curr: "BTC", id: 9, svgUri: DEFAULT_RESOURCES.graphCoinSvgUri, url: "https://google.com" },
  //   ],
  // },
  // {
  //   title: "1 мая 2020",
  //   data: [
  //     { title: "Another", subTitle: "Very loooooooooooooooooooooong text of transaction", sum: "-34.865", curr: "ACO", id: 10, svgUri: DEFAULT_RESOURCES.graphCoinSvgUri, url: "https://google.com" },
  //     { title: "Bitcoin", subTitle: "DeMo Bank", sum: "-34.865", curr: "BTC", id: 11, svgUri: DEFAULT_RESOURCES.graphCoinSvgUri, url: "https://google.com" },
  //     { title: "Bitcoin", subTitle: "DeMo Bank", sum: "-34.865", curr: "BTC", id: 12, svgUri: DEFAULT_RESOURCES.graphCoinSvgUri, url: "https://google.com" },
  //     { title: "Bitcoin", subTitle: "DeMo Bank", sum: "-34.865", curr: "BTC", id: 13, svgUri: DEFAULT_RESOURCES.graphCoinSvgUri, url: "https://google.com" },
  //     { title: "Bitcoin", subTitle: "DeMo Bank", sum: "-34.865", curr: "BTC", id: 14, svgUri: DEFAULT_RESOURCES.graphCoinSvgUri, url: "https://google.com" },
  //     { title: "Bitcoin", subTitle: "DeMo Bank", sum: "-34.865", curr: "BTC", id: 15, svgUri: DEFAULT_RESOURCES.graphCoinSvgUri, url: "https://google.com" },
  //   ],
  // },
];

export const WalletBalanceScreen = React.memo(({
  navigation,
  currentPosition,
  currentIndex,
  setScrollEnabled,
  bottomSheetRef,
}) => {
  const snapPoints = useMemo(() => [GLOB_VAR.INITIAL_SNAP_POINT, GLOB_VAR.SECOND_SNAP_POINT_BALANCE], []);

  const handleGetDetails = ({ id, url }) => {
    navigation.navigate(SCREEN_NAMES.DETAILS_SCREEN, { url: url, id: id });
  };

  const animationOfEmptyImage = useAnimatedStyle(() => ({
    height: interpolate(
      currentIndex.value,
      [0, 1],
      [GLOB_VAR.INITIAL_SNAP_POINT * 0.4, GLOB_VAR.SECOND_SNAP_POINT_BALANCE * 0.5],
      Extrapolate.CLAMP,
    ),
    transform: [
      {
        rotateY: `${interpolate(
          currentIndex.value,
          [0.3, 0.7],
          [0, 180],
          Extrapolate.CLAMP
        )}deg`
      }
    ]
  }));

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
            showsVerticalScrollIndicator={false}
            sections={MOCK_DATA}
            keyExtractor={(item) => item.id}
            renderSectionHeader={({ section: { title } }) => <TransactionHeader title={title} />}
            renderItem={({ item }) => <TransactionItem item={item} onPress={handleGetDetails} />}
            contentContainerStyle={styles.bottomSheetContainer}
            ListEmptyComponent={(
              <EmptyList
                text={"Транзакции на этом кошелке еще не производилось"}
                imageStyle={animationOfEmptyImage}
              />
            )}
          />
        )}
        enableOverDrag={true}
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

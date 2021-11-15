import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet, SectionList, Platform } from 'react-native';
import BottomSheet, { BottomSheetSectionList } from '@gorhom/bottom-sheet';
import {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { EvilIcons } from '@expo/vector-icons';

import { BalanceSheet } from '../component/BalanceSheet';
import { TransactionHeader } from '../component/Transaction/TransactionHeader';
import { TransactionItem } from '../component/Transaction/TransactionItem';
import { EmptyList } from '../component/EmptyList';
import { CustomBottomSheetBackground } from '../component/CustomBottomSheetBackground';
import { CustomHandleBS } from '../component/CustomHandleBS';
import { GLOB_VAR } from '../styles/global';
import {
  deviceSize,
  StatusBarHeight,
  onIOSBottomSheetIndexChange,
  onIOSBottomSheetListScroll,
} from '../sdk/helper';
import { SCREEN_NAMES, DEFAULT_RESOURCES } from '../styles/constants';
import { active05 } from '../styles/color.theme';

const { width, height } = deviceSize;

const MOCK_DATA = [
  {
    title: "Сегодня",
    data: [{ title: "Bitcoin", subTitle: "DeMo Bank", sum: "-34.865", curr: "BTC", id: 1, svgUri: DEFAULT_RESOURCES.graphCoinSvgUri, url: "https://google.com" }],
  },
  {
    title: "Вчера",
    data: [
      { title: "Bitcoin", subTitle: "DeMo Bank", sum: "34.865", curr: "BTC", id: 2, svgUri: DEFAULT_RESOURCES.graphCoinSvgUri, url: "https://google.com" },
      { title: "Ethereum", subTitle: "DeMo Bank", sum: "2.343", curr: "ETH", id: 3, svgUri: DEFAULT_RESOURCES.graphCoinSvgUri, url: "https://google.com" },
    ],
  },
  {
    title: "20 мая",
    data: [
      { title: "SomeCoin", subTitle: "DeMo Bank", sum: "4.865", curr: "SMC", id: 4, svgUri: DEFAULT_RESOURCES.graphCoinSvgUri, url: "https://google.com" },
      { title: "Bitcoin", subTitle: "DeMo Bank", sum: "-64.865", curr: "BTC", id: 5, svgUri: DEFAULT_RESOURCES.graphCoinSvgUri, url: "https://google.com" },
    ],
  },
  {
    title: "20 мая 2020",
    data: [
      { title: "Another", subTitle: "Very loooooooooooooooooooooong text of transaction", sum: "-34.865", curr: "ACO", id: 6, svgUri: DEFAULT_RESOURCES.graphCoinSvgUri, url: "https://google.com" },
      { title: "Bitcoin", subTitle: "DeMo Bank", sum: "-34.865", curr: "BTC", id: 7, svgUri: DEFAULT_RESOURCES.graphCoinSvgUri, url: "https://google.com" },
    ],
  },
  {
    title: "10 мая 2020",
    data: [
      { title: "Another", subTitle: "Very loooooooooooooooooooooong text of transaction", sum: "-34.865", curr: "ACO", id: 8, svgUri: DEFAULT_RESOURCES.graphCoinSvgUri, url: "https://google.com" },
      { title: "Bitcoin", subTitle: "DeMo Bank", sum: "-34.865", curr: "BTC", id: 9, svgUri: DEFAULT_RESOURCES.graphCoinSvgUri, url: "https://google.com" },
    ],
  },
  {
    title: "1 мая 2020",
    data: [
      { title: "Another", subTitle: "Very loooooooooooooooooooooong text of transaction", sum: "-34.865", curr: "ACO", id: 10, svgUri: DEFAULT_RESOURCES.graphCoinSvgUri, url: "https://google.com" },
      { title: "Bitcoin", subTitle: "DeMo Bank", sum: "-34.865", curr: "BTC", id: 11, svgUri: DEFAULT_RESOURCES.graphCoinSvgUri, url: "https://google.com" },
      { title: "Bitcoin", subTitle: "DeMo Bank", sum: "-34.865", curr: "BTC", id: 12, svgUri: DEFAULT_RESOURCES.graphCoinSvgUri, url: "https://google.com" },
      { title: "Bitcoin", subTitle: "DeMo Bank", sum: "-34.865", curr: "BTC", id: 13, svgUri: DEFAULT_RESOURCES.graphCoinSvgUri, url: "https://google.com" },
      { title: "Bitcoin", subTitle: "DeMo Bank", sum: "-34.865", curr: "BTC", id: 14, svgUri: DEFAULT_RESOURCES.graphCoinSvgUri, url: "https://google.com" },
      { title: "Bitcoin", subTitle: "DeMo Bank", sum: "-34.864", curr: "BTC", id: 15, svgUri: DEFAULT_RESOURCES.graphCoinSvgUri, url: "https://google.com" },
    ],
  },
];

const MOCK = [
  {
    timestamp: 1636120338000,
    amount: 200,
  },
  {
    timestamp: 1636130338000,
    amount: 200,
  },
  {
    timestamp: 1636502340000, // 2021-11-09 23 59 00
    amount: 200,
  },
  {
    timestamp: 1636502400000, // 2021-11-10 00 00 00
    amount: 200,
  },
  {
    timestamp: 1636416000000, // 2021-11-09 00 00 00
    amount: 200,
  },
]

export const WalletBalanceScreen = React.memo(({
  navigation,
  currentIndex,
  setScrollEnabled,
  bottomSheetRef,
}) => {
  const listRef = useRef(null);
  const transactions = useSelector(state => state.wallet.transactions);
  const [formattedTransactions, setFormattedTransactions] = useState([]);
  const [listScrollEnabled, setListScrollEnabled] = useState(false);

  const snapPoints = useMemo(() => [GLOB_VAR.INITIAL_SNAP_POINT, GLOB_VAR.SECOND_SNAP_POINT_BALANCE], []);

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



  const getTitleByDayAmount = (dayAmount) => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const date = new Date(1000 * 60 * 60 * 24 * dayAmount);
    // console.log(date.toLocaleDateString());
  };

  const handleFormatList = (list) => {
    const groupedDataObj = MOCK.reduce((result, current) => {
      let date = new Date(current.timestamp);
      date = Math.floor(date.getTime() / (1000 * 60 * 60 * 24));
      result[date] = result[date] || [];
      result[date].push(current);
      return result;
    }, {});

    let result = [];
    for (const value in groupedDataObj) {
      result.push({ title: getTitleByDayAmount(value), data: groupedDataObj[value] });
    }

    // console.log('result', result);
  };



  useEffect(() => {
    const formattedList = handleFormatList(transactions);
    // console.log(formattedList);
    // setFormattedTransactions(formattedList);
  }, []);

  const handleGetDetails = ({ id, url }) => {
    navigation.navigate(SCREEN_NAMES.DETAILS_SCREEN, { url: url, id: id });
  };

  const handleBottomSheetIndexChange = (index) => {
    if (Platform.OS === "ios") {
      onIOSBottomSheetIndexChange({
        index: index,
        scrollingSetter: setListScrollEnabled,
        listRef: listRef,
      });
    }

    setScrollEnabled(index !== 1)
  };

  const handleOnScroll = ({ nativeEvent }) => {
    onIOSBottomSheetListScroll({
      y: nativeEvent.contentOffset.y,
      scrollingSetter: setListScrollEnabled,
      bsRef: bottomSheetRef,
    });
  };

  let BottomSheetChildComponent = Platform.OS === "ios" ? SectionList : BottomSheetSectionList;

  return (
    <View style={styles.container}>
      <BalanceSheet
        currentIndex={currentIndex}
      />
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        backgroundComponent={CustomBottomSheetBackground}
        handleComponent={() => !!MOCK_DATA && MOCK_DATA.length > 0 ? (
          <CustomHandleBS Icon={<EvilIcons name="pointer" size={40} color={active05} />} />
        ) : null}
        enableHandlePanningGesture={true}
        animatedIndex={currentIndex}
        enableOverDrag={true}
        onChange={handleBottomSheetIndexChange}
        keyboardBehavior={"extend"}
      >
        <BottomSheetChildComponent
          ref={listRef}
          stickySectionHeadersEnabled={true}
          bounces={false}
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          sections={[]}
          keyExtractor={item => item.id}
          renderSectionHeader={({ section: { title } }) => <TransactionHeader title={title} />}
          renderItem={({ item }) => <TransactionItem item={item} onPress={handleGetDetails} />}
          ListEmptyComponent={(
            <EmptyList
              text={"Транзакции на этом кошелке еще не производилось"}
              imageStyle={animationOfEmptyImage}
            />
          )}
          contentContainerStyle={styles.bottomSheetContainer}
          scrollEnabled={Platform.OS === "ios" ? listScrollEnabled : true}
          onScroll={Platform.OS === "ios" ? handleOnScroll : () => {}}
        />
      </BottomSheet>
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
    marginTop: Platform.OS === "ios" ? 38 : 18,
    paddingBottom: height * 0.2 + 75, // gradient in bottom navigator
  },
});

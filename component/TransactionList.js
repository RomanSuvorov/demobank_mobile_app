import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { BottomSheetSectionList } from '@gorhom/bottom-sheet';

import { globalStyles } from '../styles/global';
import { color } from '../styles/color.theme';

const MOCK_DATA = [
  {
    title: "Сегодня",
    data: [{ coinName: "Bitcoin", author: "DeMo Bank", sum: "-34.865", curr: "BTC", id: 1 }],
  },
  {
    title: "Вчера",
    data: [
      { coinName: "Bitcoin", author: "DeMo Bank", sum: "34.865", curr: "BTC", id: 2 },
      { coinName: "Ethereum", author: "DeMo Bank", sum: "2.343", curr: "ETH", id: 3 },
    ],
  },
  {
    title: "20 мая",
    data: [
      { coinName: "SomeCoin", author: "DeMo Bank", sum: "4.865", curr: "SMC", id: 4 },
      { coinName: "Bitcoin", author: "DeMo Bank", sum: "-64.865", curr: "BTC", id: 5 },
    ],
  },
  {
    title: "20 мая 2020",
    data: [
      { coinName: "Another", author: "Very loooooooooooooooooooooong text of transaction", sum: "-34.865", curr: "ACO", id: 6 },
      { coinName: "Bitcoin", author: "DeMo Bank", sum: "-34.865", curr: "BTC", id: 7 },
    ],
  },
  {
    title: "10 мая 2020",
    data: [
      { coinName: "Another", author: "Very loooooooooooooooooooooong text of transaction", sum: "-34.865", curr: "ACO", id: 8 },
      { coinName: "Bitcoin", author: "DeMo Bank", sum: "-34.865", curr: "BTC", id: 9 },
    ],
  },
  {
    title: "1 мая 2020",
    data: [
      { coinName: "Another", author: "Very loooooooooooooooooooooong text of transaction", sum: "-34.865", curr: "ACO", id: 10 },
      { coinName: "Bitcoin", author: "DeMo Bank", sum: "-34.865", curr: "BTC", id: 11 },
      { coinName: "Bitcoin", author: "DeMo Bank", sum: "-34.865", curr: "BTC", id: 12 },
      { coinName: "Bitcoin", author: "DeMo Bank", sum: "-34.865", curr: "BTC", id: 13 },
      { coinName: "Bitcoin", author: "DeMo Bank", sum: "-34.865", curr: "BTC", id: 14 },
      { coinName: "Bitcoin", author: "DeMo Bank", sum: "-34.865", curr: "BTC", id: 15 },
    ],
  },
];

const { height } = Dimensions.get("window");

const SectionHeader = ({ title }) => (
  <View style={styles.sectionHeader}>
    <Text style={globalStyles.secondaryText}>{title}</Text>
  </View>
);

const SectionItem = ({ item, onPress }) => {
  const url = "https://google.com";

  return (
    <TouchableOpacity
      style={styles.sectionItem}
      onPress={() => onPress(url, item.id)}
    >
      <View style={styles.coinLogo}>
        <Image
          style={styles.coinLogoSvg}
          source={require('../assets/btc-mock.png')}
        />
      </View>
      <View style={styles.sectionItemInfo}>
        <Text numberOfLines={1} style={globalStyles.primaryText}>
          {item.coinName}
        </Text>
        <Text numberOfLines={1} style={globalStyles.secondaryText}>
          {item.author}
        </Text>
      </View>
      <View style={styles.sectionItemAmount}>
        <Text
          style={[
            globalStyles.primaryText,
            styles.sectionItemAmount_text,
            item.sum[0] === "-" ? styles.sectionItemAmount_sumNegative : styles.sectionItemAmount_subPositive,
          ]}
          numberOfLines={1}
        >
          {item.sum}
        </Text>
        <Text style={[globalStyles.primaryText, styles.sectionItemAmount_text]}>
          &nbsp;{item.curr}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export function TransactionList({ onGetDetails }) {
  return (
    <BottomSheetSectionList
      sections={MOCK_DATA}
      keyExtractor={(item) => item.id}
      renderSectionHeader={({ section: { title } }) => <SectionHeader title={title} />}
      renderItem={({ item }) => <SectionItem item={item} onPress={onGetDetails} />}
      contentContainerStyle={styles.contentContainer}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 18,
    paddingBottom: height * (0.25 / 2), // half of gradient in bottom navigator
  },
  sectionHeader: {
    alignItems: "center",
  },
  sectionItem: {
    paddingVertical: 24,
    paddingHorizontal: 30,
    flexDirection: "row",
    flex: 1,
  },
  coinLogo: {
    width: 45,
    height: 45,
    backgroundColor: color.bg.primary,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  coinLogoSvg: {
    width: 33,
    height: 33,
    resizeMode: 'center',
  },
  sectionItemInfo: {
    justifyContent: "center",
    paddingHorizontal: 22,
    flex: 1,
  },
  sectionItemAmount: {
    flexDirection: "row",
    alignItems: "center",
  },
  sectionItemAmount_text: {
    fontSize: 16,
    fontWeight: "bold",
  },
  sectionItemAmount_sumNegative: {
    color: color.danger,
  },
  sectionItemAmount_subPositive: {
    color: color.success,
  },
});

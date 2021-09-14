import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { globalStyles } from '../../styles/global';
import { color } from '../../styles/color.theme';

export function TransactionItem({ item, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.transactionItem, item.sum ? styles.transactionItemPaddingLarge : styles.transactionItemPaddingSmall]}
      onPress={() => onPress(item)}
    >
      <View style={styles.logoBox}>
        {
          item.logo ? (
            <Image
              style={styles.logoImage}
              source={item.logo}
            />
          ) : (
            <item.svg
              style={styles.logoSvg}
              color={color.text.secondary}
            />
          )
        }
      </View>
      <View style={styles.transactionItemInfo}>
        <Text numberOfLines={1} style={item.sum ? globalStyles.primaryText : { fontSize: 12, color: color.text.primary }}>
          {item.title}
        </Text>
        {
          item.subTitle && (
            <Text numberOfLines={1} style={globalStyles.secondaryText}>
              {item.subTitle}
            </Text>
          )
        }
      </View>
      {
        item.sum && (
          <View style={styles.transactionItemAmount}>
            <Text
              style={[
                globalStyles.primaryText,
                styles.transactionItemAmount_text,
                item.sum[0] === "-" ? styles.transactionItemAmount_sumNegative : styles.transactionItemAmount_subPositive,
              ]}
              numberOfLines={1}
            >
              {item.sum}
            </Text>
            <Text style={[globalStyles.primaryText, styles.transactionItemAmount_text]}>
              &nbsp;{item.curr}
            </Text>
          </View>
        )
      }
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  transactionItem: {
    paddingHorizontal: 30,
    flexDirection: "row",
    flex: 1,
  },
  transactionItemPaddingLarge: {
    paddingVertical: 24,
  },
  transactionItemPaddingSmall: {
    paddingVertical: 12,
  },
  logoBox: {
    width: 45,
    height: 45,
    backgroundColor: color.bg.primary,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: 33,
    height: 33,
    resizeMode: 'center',
  },
  logoSvg: {
    width: 24,
    height: 24,
  },
  transactionItemInfo: {
    justifyContent: "center",
    paddingHorizontal: 22,
    flex: 1,
  },
  transactionItemAmount: {
    flexDirection: "row",
    alignItems: "center",
  },
  transactionItemAmount_text: {
    fontSize: 16,
    fontWeight: "bold",
  },
  transactionItemAmount_sumNegative: {
    color: color.danger,
  },
  transactionItemAmount_subPositive: {
    color: color.success,
  },
});

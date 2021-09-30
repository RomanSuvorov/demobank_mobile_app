import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import { CustomText } from '../CustomText';
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
        <CustomText
          size={item.sum ? 14 : 12}
          numberOfLines={1}
        >
          {item.title}
        </CustomText>
        {
          item.subTitle && (
            <CustomText
              size={12}
              numberOfLines={1}
              color={"secondary"}
            >
              {item.subTitle}
            </CustomText>
          )
        }
      </View>
      {
        item.sum && (
          <View style={styles.transactionItemAmount}>
            <CustomText
              size={16}
              type={'bold'}
              color={item.sum[0] === "-" ? "danger" : "success"}
              numberOfLines={1}
            >
              {item.sum}
            </CustomText>
            <CustomText
              size={16}
              type={'bold'}
            >
              &nbsp;{item.curr}
            </CustomText>
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
});

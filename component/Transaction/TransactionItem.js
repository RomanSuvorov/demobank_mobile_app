import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { CustomText } from '../CustomText';
import { CircleBtn } from '../CircleBtn';
import { greyPrimary } from '../../styles/color.theme';

export function TransactionItem({ item, onPress, withShadow }) {
  return (
    <TouchableOpacity
      style={[styles.transactionItem, item.sum ? styles.transactionItemPaddingLarge : styles.transactionItemPaddingSmall]}
      onPress={() => onPress(item)}
    >
      {!!item.logo && (
        <CircleBtn
          size={45}
          contentSize={33}
          label={null}
          imageSource={item.logo}
          withShadow={withShadow}
        />
      )}

      {!!item.svg && (
        <CircleBtn
          size={45}
          contentSize={24}
          label={null}
          Icon={item.svg}
          withShadow={withShadow}
        />
      )}

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
              color={"greyPrimary"}
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

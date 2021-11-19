import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';

import { CustomText } from './CustomText';
import { CopyAddressIcon } from './Icons';
import { greyPrimary } from '../styles/color.theme';
import { CircleBtn } from './CircleBtn';

export function InfoRow({
  label,
  value,
  direction,
  containerStyle,
  labelStyle,
  valueStyle,
  widthBorder,
  onCopy,
}) {
  return (
    <View style={[
      styles.infoRow({ borderColor: widthBorder }),
      direction === "row" ? styles.row : styles.column,
      containerStyle,
    ]}>
      <CustomText
        color={'greyPrimary'}
        style={[
          styles.labelStyle,
          {
            width: direction === "row" ? "40%" : "100%",
            paddingBottom: direction === "row" ? 0 : 12,
          },
          labelStyle,
        ]}
      >
        {`${label}:`}
      </CustomText>
      <View
        style={[
          styles.valueStyle,
          {
            width: direction === "row" ? "60%" : "100%",
            justifyContent: direction === "row" ? "flex-end" : "center",
            paddingBottom: direction === "row" ? 0 : 12,
          }
        ]}
      >
        <CustomText
          style={[
            styles.valueTextStyle,
            {
              textAlign: direction === "row" ? "right" : "left",
              flex: 1,
            },
            valueStyle,
          ]}
        >
          {value}
        </CustomText>
        {!!onCopy && (
          <CircleBtn
            label={null}
            Icon={CopyAddressIcon}
            size={36}
            style={{ paddingHorizontal: 12 }}
            onPress={() => onCopy(value, label)}
          />
        )}
      </View>
    </View>
  );
}

InfoRow.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  direction: PropTypes.string,
  containerStyle: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.object]),
  labelStyle: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.object]),
  valueStyle: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.object]),
  widthBorder: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onCopy: PropTypes.oneOfType([PropTypes.func]),
};

InfoRow.defaultProps = {
  label: "",
  value: "",
  direction: "row",
  containerStyle: {},
  labelStyle: {},
  valueStyle: {},
  widthBorder: greyPrimary,
  onCopy: null,
};

const styles = StyleSheet.create({
  infoRow: ({ borderColor }) => ({
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: borderColor ? borderColor : "transparent",
  }),
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  column: {
    flexDirection: "column",
  },
  labelStyle: {
    lineHeight: 16,
    paddingHorizontal: 12,
  },
  valueStyle: {
    flexDirection: "row",
    paddingHorizontal: 12,
    alignItems: "center",
  },
  valueTextStyle: {
    lineHeight: 16,
  },
});

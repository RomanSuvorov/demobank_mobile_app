import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, StyleSheet } from 'react-native';

import { CustomText } from './CustomText';
import { active, greySecondary } from '../styles/color.theme';

export function CustomButton({
  type,
  children,
  disabled,
  isLarge,
  style,
  onPress,
}) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        type === "transparent" ? styles.transparentBtn : styles.filledBtn,
        { minWidth: isLarge ? 160 : 110 },
        disabled ? { backgroundColor: greySecondary } : {},
        style,
      ]}
      disabled={disabled}
      activeOpacity={0.4}
      onPress={onPress}
    >
      <CustomText
        size={12}
        type={"bold"}
        color={type === "transparent" ? "greySecondary" : "textWhite"}
        align={"center"}
      >
        {children}
      </CustomText>
    </TouchableOpacity>
  );
}

CustomButton.propTypes = {
  type: PropTypes.oneOf(["filled", "transparent"]),
  disabled: PropTypes.bool,
  isLarge: PropTypes.bool,
  style: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.object]),
  onPress: PropTypes.func.isRequired,
};

CustomButton.defaultProps = {
  type: "filled",
  disabled: false,
  isLarge: false,
  style: {},
  onPress: () => {},
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
    alignSelf: "center",
  },
  transparentBtn: {
    backgroundColor: "transparent",
  },
  filledBtn: {
    backgroundColor: active,
  },
});

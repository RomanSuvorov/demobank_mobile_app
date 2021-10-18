import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View, ActivityIndicator, StyleSheet } from 'react-native';

import { CustomText } from './CustomText';
import { active, greySecondary } from '../styles/color.theme';

export function CustomButton({
  loading,
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
      disabled={disabled || loading}
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
      {
        loading && (
          <View style={[
            styles.loaderContainer,
            { backgroundColor: type=== "transparent" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.5)" },
          ]}>
            <ActivityIndicator color={active} size={"large"} />
          </View>
        )
      }
    </TouchableOpacity>
  );
}

CustomButton.propTypes = {
  loading: PropTypes.bool,
  type: PropTypes.oneOf(["filled", "transparent"]),
  disabled: PropTypes.bool,
  isLarge: PropTypes.bool,
  style: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.object]),
  onPress: PropTypes.func.isRequired,
};

CustomButton.defaultProps = {
  loading: false,
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
  loaderContainer: {
    borderRadius: 10,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});

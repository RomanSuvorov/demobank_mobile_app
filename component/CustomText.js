import React from 'react';
import { Text } from 'react-native';

import { active, danger, success, textWhite, textWhite01, grey } from '../styles/color.theme';

export function CustomText({
  type = "regular",
  size = 14,
  color = "textWhite",
  style = {},
  children,
  ...props
}) {
  const setFontType = (type) => {
    switch (type) {
      case 'bold':
        return 'Play-Bold';
      case 'regular':
      default:
        return 'Play-Regular';
    }
  };

  const setFontColor = (color) => {
    switch (color) {
      case 'grey':
        return grey;
      case 'active':
        return active;
      case 'danger':
        return danger;
      case 'success':
        return success;
      case 'white01':
        return textWhite01;
      case 'textWhite':
      default:
        return textWhite;
    }
  }

  return (
    <Text
      {...props}
      style={[{ fontFamily: setFontType(type), fontSize: size, color: setFontColor(color) }, style]}
    >
      {children}
    </Text>
  );
}

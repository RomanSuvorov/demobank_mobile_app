import React from 'react';
import { Text } from 'react-native';

import { color as cl } from '../styles/color.theme';

export function CustomText({
  type = "regular",
  size = 14,
  color = "primary",
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
      case 'secondary':
        return cl.text.secondary;
      case 'active':
        return cl.text.active;
      case 'danger':
        return cl.danger;
      case 'success':
        return cl.success;
      case 'primary':
      default:
        return cl.text.primary;
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

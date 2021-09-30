import React, { useMemo } from 'react';
import { Platform, Dimensions, StatusBar } from 'react-native';

const { width, height } = Dimensions.get("window");

const X_WIDTH = 375;
const XS_MAX_WIDTH = 414;
const X_HEIGHT = 812;
const XS_MAX_HEIGHT = 896;

export const isIPhoneX = () => Platform.OS === "ios" && !Platform.isPad && !Platform.isTV
  ? width === X_WIDTH && height === X_HEIGHT || width === XS_MAX_WIDTH && height === XS_MAX_HEIGHT
  : false;

export const StatusBarHeight = Platform.select({
  ios: isIPhoneX() ? 44 : 20,
  android: StatusBar.currentHeight,
  default: 0,
});

export const deviceSize = { height, width };

export const getStyle = (styles, animatedStyles, depend) => useMemo(
  () => [styles, animatedStyles],
  [depend]
);

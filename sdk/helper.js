import React, { useMemo } from 'react';
import { compose, createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import thunk from 'redux-thunk';
import produce from 'immer';
import { Platform, Dimensions } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { createNavigationContainerRef } from '@react-navigation/native';
import Constants from 'expo-constants';
import { Easing } from "react-native-reanimated";

// redux
export const createReduxStore = _configureStore;
function _configureStore(reducers) {
  let middleware = [ReduxPromise, thunk];

  return createStore(
    combineReducers({ ...reducers }),
    undefined,
    compose(applyMiddleware(...middleware)),
  );
}

export const createReducer = (cases = {}, defaultState = {}) =>
  (state = defaultState, action) => produce(state, draft => {
    if (action && action.type && cases[action.type] instanceof Function) {
      cases[action.type](draft, action.payload);
    }
  });


// size
const { width, height } = Dimensions.get("screen");

function isIphoneWithNotch() {
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (
      height === 780 || width === 780 ||
      height === 812 || width === 812 ||
      height === 844 || width === 844 ||
      height === 896 || width === 896 ||
      height === 926 || width === 926
    )
  );
}

export const StatusBarHeight = Platform.select({
  ios: isIphoneWithNotch() ? Constants.statusBarHeight / 2 : Constants.statusBarHeight,
  android: Constants.statusBarHeight,
  default: 0,
});

export const deviceSize = { height, width };

// styles
export const getStyle = (styles, animatedStyles, depend) => useMemo(
  () => [styles, animatedStyles],
  [depend]
);

// navigation
export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

// storage managing
export async function saveToDeviceStorage(key, value, options) {
  await SecureStore.setItemAsync(key, value, options);
}

export async function getValueFromDeviceStorage(key, options) {
  return await SecureStore.getItemAsync(key, options);
}

export async function deleteValueFromDeviceStorage(key, options) {
  return await SecureStore.deleteItemAsync(key, options);
}

export function onIOSBottomSheetIndexChange({ index, scrollingSetter, listRef }) {
  if (index === 1) {
    listRef.current.getScrollResponder().scrollTo({ y: 20, animated: true });
    scrollingSetter(true);
  } else {
    scrollingSetter(false);
  }
}

export function onIOSBottomSheetListScroll({ y, scrollingSetter, bsRef }) {
  if (y <= 0) {
    scrollingSetter(false);
    bsRef.current.snapToIndex(0, {
      duration: 300,
      easing: Easing.quad,
    });
  }
}

import React, { useMemo } from 'react';
import { compose, createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import thunk from 'redux-thunk';
import produce from 'immer';
import { Platform, Dimensions, StatusBar } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { createNavigationContainerRef } from '@react-navigation/native';

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

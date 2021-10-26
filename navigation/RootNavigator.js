import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector, useDispatch } from 'react-redux';

import { AppLoadingScreen } from '../screen/AppLoadingScreen';
import { CustomModal } from '../component/CustomModal';
import { AppNavigator } from './AppNavigator';
import { AuthorizationNavigator } from './AuthorizationNavigator';
import { appStartAction } from '../store/app/actions';
import { greyPrimary } from '../styles/color.theme';
import { navigationRef } from '../sdk/helper';
import { SCREEN_NAMES } from '../styles/constants';

const DemobankTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: greyPrimary,
    background: "transparent",
  },
};

const Stack = createNativeStackNavigator();
export function RootNavigator() {
  const appLoading = useSelector(state => state.app.loading);
  const isAuthenticated = useSelector(state => state.wallet.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(appStartAction());
  }, []);

  return (
    <NavigationContainer
      theme={DemobankTheme}
      ref={navigationRef}
    >
      <StatusBar
        backgroundColor={"transparent"}
        translucent={true}
      />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {
          appLoading ? (
            <Stack.Group>
              <Stack.Screen
                name={SCREEN_NAMES.APP_LOADING_SCREEN}
                component={AppLoadingScreen}
              />

            </Stack.Group>
          ) : (
            <Stack.Group>
              {isAuthenticated ? (
                <Stack.Screen
                  name={SCREEN_NAMES.APP_NAVIGATOR}
                  component={AppNavigator}
                />
              ) : (
                <Stack.Screen
                  name={SCREEN_NAMES.AUTHORIZATION_NAVIGATOR}
                  component={AuthorizationNavigator}
                />
              )}
            </Stack.Group>
          )
        }

        <Stack.Group
          screenOptions={{
            presentation: "transparentModal",
            animation: "fade",
          }}
        >
          <Stack.Screen
            name={SCREEN_NAMES.MODAL_SCREEN}
            component={CustomModal}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

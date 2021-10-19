import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';

import { CustomModal } from '../component/CustomModal';
import { AppNavigator } from './AppNavigator';
import { AuthorizationNavigator } from './AuthorizationNavigator';
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
  const isAuthenticated = useSelector(state => state.wallet.isAuthenticated);

  useEffect(() => {

  }, []);

  console.log("RootNavigator rerender");

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

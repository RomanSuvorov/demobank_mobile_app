import React, { useEffect } from 'react';
import { Platform, StatusBar } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector, useDispatch } from 'react-redux';
import * as LocalAuthentication from 'expo-local-authentication';

import { AppLoadingScreen } from '../screen/AppLoadingScreen';
import { CustomModal } from '../component/CustomModal';
import { AppNavigator } from './AppNavigator';
import { AddWalletNavigator } from './AddWalletNavigator';
import { checkGraphNetwork, checkSecure } from '../store/app/actions';
import { NetworkUrlErrorScreen } from '../screen/NetworkUrlErrorScreen';
import { ServerSettingsScreen } from '../screen/ServerSettingsScreen';
import { LocalAuthorizationScreen } from '../screen/LocalAuthorizationScreen';
import { active, greyPrimary, lightDark } from '../styles/color.theme';
import { navigationRef } from '../sdk/helper';
import { SCREEN_NAMES } from '../styles/constants';
import { BackNavigation } from '../component/BackNavigation';

const DemobankTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: greyPrimary,
    background: lightDark,
  },
};

const Stack = createNativeStackNavigator();
export function RootNavigator() {
  const secureChecking = useSelector(state => state.app.secureChecking);
  const isLocalAuthenticated = useSelector(state => state.app.isLocalAuthenticated);
  const checkNetworkLoading = useSelector(state => state.app.checkNetworkLoading);
  const checkNetworkError = useSelector(state => state.app.checkNetworkError);
  const walletsLoading = useSelector(state => state.wallet.walletsLoading);
  const wallets = useSelector(state => state.wallet.wallets);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(checkSecure());
      await dispatch(checkGraphNetwork());
    })();
    // (async () => {
    //   const isSupported = await LocalAuthentication.hasHardwareAsync();
    //   console.log(Platform.OS, "isSupported", isSupported);
    //   const isSaved = await LocalAuthentication.isEnrolledAsync();
    //   console.log(Platform.OS, "isSaved", isSaved);
    //   const isAuth = await LocalAuthentication.authenticateAsync({
      //   promptMessage: "Login with ...",
      //   cancelLabel: "PIN",
      //   disableDeviceFallback: true,
      // });
      // console.log(Platform.OS, "isAuth", isAuth);
    // })();
  }, []);

  const renderContent = () => {
    if (checkNetworkError) {
      return (
        <Stack.Group>
          <Stack.Screen
            name={SCREEN_NAMES.NETWORK_URL_ERROR_SCREEN}
            component={NetworkUrlErrorScreen}
          />
          <Stack.Screen
            name={SCREEN_NAMES.SERVER_SETTINGS_SCREEN}
            component={ServerSettingsScreen}
            options={({ navigation }) => ({
              headerShown: true,
              animation: Platform.OS === "ios" ? "default" : "slide_from_right",
              title: "Настройки сервера",
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontFamily: "Play-Bold",
                fontSize: 16,
                fontWeight: "normal",
              },
              headerTintColor: active,
              headerLeft: (props) => (
                <BackNavigation
                  title={"Назад"}
                  navigation={navigation}
                  {...props}
                />
              ),
              headerStyle: { backgroundColor: lightDark },
              headerShadowVisible: false,
            })}
          />
        </Stack.Group>
      );
    }

    if (secureChecking || walletsLoading || checkNetworkLoading) {
      return (
        <Stack.Screen
          name={SCREEN_NAMES.APP_LOADING_SCREEN}
          component={AppLoadingScreen}
        />
      );
    }

    if (!isLocalAuthenticated) {
      return (
        <Stack.Screen
          name={SCREEN_NAMES.LOCAL_AUTH_SCREEN}
          component={LocalAuthorizationScreen}
        />
      );
    }

    if (wallets.length === 0) {
      return (
        <Stack.Screen
          name={SCREEN_NAMES.ADD_WALLET_NAVIGATOR}
          component={AddWalletNavigator}
        />
      )
    }

    return (
      <Stack.Screen
        name={SCREEN_NAMES.APP_NAVIGATOR}
        component={AppNavigator}
      />
    )
  };

  return (
    <NavigationContainer
      theme={DemobankTheme}
      ref={navigationRef}
    >
      <StatusBar
        backgroundColor={"transparent"}
        barStyle={"light-content"}
        translucent={true}
      />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {renderContent()}

        <Stack.Group screenOptions={{
            presentation: "transparentModal",
            animation: "fade",
          }}>
          <Stack.Screen
            name={SCREEN_NAMES.MODAL_SCREEN}
            component={CustomModal}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

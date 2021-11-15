import React, { useEffect } from 'react';
import { Platform, StatusBar } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector, useDispatch } from 'react-redux';

import { AppLoadingScreen } from '../screen/AppLoadingScreen';
import { CustomModal } from '../component/CustomModal';
import { AppNavigator } from './AppNavigator';
import { AuthorizationNavigator } from './AuthorizationNavigator';
import { checkGraphNetwork } from '../store/app/actions';
import { NetworkUrlErrorScreen } from '../screen/NetworkUrlErrorScreen';
import { ServerSettingsScreen } from '../screen/ServerSettingsScreen';
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
  const walletsLoading = useSelector(state => state.wallet.walletsLoading);
  const isAuthenticated = useSelector(state => state.wallet.isAuthenticated);
  const checkNetworkLoading = useSelector(state => state.app.checkNetworkLoading);
  const checkNetworkError = useSelector(state => state.app.checkNetworkError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkGraphNetwork());
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

    if (walletsLoading || checkNetworkLoading) {
      return (
        <Stack.Group>
          <Stack.Screen
            name={SCREEN_NAMES.APP_LOADING_SCREEN}
            component={AppLoadingScreen}
          />
        </Stack.Group>
      );
    }

    return (
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

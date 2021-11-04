import React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { TabNavigator } from './TabNavigator';
import { DetailsScreen } from '../screen/DetailsScreen';
import { GlobalSettingsScreen } from '../screen/GlobalSettingsScreen';
import { ServerSettingsScreen } from '../screen/ServerSettingsScreen';
import { SecuritySettingsScreen } from '../screen/SecuritySettingsScreen';
import { NetworkUrlErrorScreen } from '../screen/NetworkUrlErrorScreen';
import { BackNavigation } from '../component/BackNavigation';
import { dark, lightDark, textWhite, active } from '../styles/color.theme';
import { SCREEN_NAMES } from '../styles/constants';

const AppStack = createNativeStackNavigator();
export function AppNavigator() {
  const checkNetworkError = useSelector(state => state.app.checkNetworkError);

  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      {
        checkNetworkError ? (
          /* User can reload with exist or input new server config */
          <AppStack.Screen
            name={SCREEN_NAMES.NETWORK_URL_ERROR_SCREEN}
            component={NetworkUrlErrorScreen}
          />
        ) : (
          <AppStack.Group>
            <AppStack.Screen
              name={SCREEN_NAMES.TABS_NAVIGATOR}
              component={TabNavigator}
            />
            <AppStack.Screen
              name={SCREEN_NAMES.DETAILS_SCREEN}
              component={DetailsScreen}
              options={{
                headerShown: true,
                headerStyle: styles.headerStyle,
                headerTintColor: textWhite,
              }}
            />
          </AppStack.Group>
        )
      }
      <AppStack.Group>
        <AppStack.Screen
          name={SCREEN_NAMES.GLOBAL_SETTINGS_SCREEN}
          component={GlobalSettingsScreen}
          options={({ navigation }) => ({
            headerShown: true,
            animation: "fade",
            title: "Настройки приложения",
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
        <AppStack.Screen
          name={SCREEN_NAMES.SERVER_SETTINGS_SCREEN}
          component={ServerSettingsScreen}
          options={({ navigation }) => ({
            headerShown: true,
            animation: "fade",
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
        <AppStack.Screen
          name={SCREEN_NAMES.SECURITY_SETTINGS_SCREEN}
          component={SecuritySettingsScreen}
          options={({ navigation }) => ({
            headerShown: true,
            animation: "fade",
            title: "Настройки безопасности",
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
      </AppStack.Group>
    </AppStack.Navigator>
  )
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: dark,
  }
});

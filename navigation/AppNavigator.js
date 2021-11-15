import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { TabNavigator } from './TabNavigator';
import { DetailsScreen } from '../screen/DetailsScreen';
import { GlobalSettingsScreen } from '../screen/GlobalSettingsScreen';
import { SettingsWalletItemScreen } from '../screen/SettingsWalletItemScreen';
import { ServerSettingsScreen } from '../screen/ServerSettingsScreen';
import { SecuritySettingsScreen } from '../screen/SecuritySettingsScreen';
import { AuthorizationNavigator } from './AuthorizationNavigator';
import { BackNavigation } from '../component/BackNavigation';
import { dark, lightDark, textWhite, active } from '../styles/color.theme';
import { SCREEN_NAMES } from '../styles/constants';

const AppStack = createNativeStackNavigator();
export function AppNavigator() {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
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
      <AppStack.Group>
        <AppStack.Screen
          name={SCREEN_NAMES.GLOBAL_SETTINGS_SCREEN}
          component={GlobalSettingsScreen}
          options={({ navigation }) => ({
            headerShown: true,
            animation: Platform.OS === "ios" ? "default" : "slide_from_right",
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
          name={SCREEN_NAMES.SETTINGS_WALLET_ITEM}
          component={SettingsWalletItemScreen}
          options={({ navigation }) => ({
            headerShown: true,
            title: null,
            headerTintColor: active,
            animation: Platform.OS === "ios" ? "default" : "slide_from_right",
            headerLeft: (props) => (
              <BackNavigation
                title={"Назад"}
                navigation={navigation}
                {...props}
              />
            ),
            headerTransparent: true,
            headerStyle: { backgroundColor: lightDark },
            headerShadowVisible: false,
          })}
        />
        <AppStack.Screen
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
        <AppStack.Screen
          name={SCREEN_NAMES.SECURITY_SETTINGS_SCREEN}
          component={SecuritySettingsScreen}
          options={({ navigation }) => ({
            headerShown: true,
            animation: Platform.OS === "ios" ? "default" : "slide_from_right",
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
        <AppStack.Screen
          name={SCREEN_NAMES.AUTHORIZATION_NAVIGATOR}
          component={AuthorizationNavigator}
          options={({ navigation }) => ({
            headerShown: true,
            animation: Platform.OS === "ios" ? "default" : "slide_from_right",
            title: "Добавление кошелька",
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontFamily: "Play-Bold",
              fontSize: 16,
              fontWeight: "normal",
            },
            headerTintColor: active,
            headerLeft: (props) => (
              <BackNavigation
                title={"К списку"}
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

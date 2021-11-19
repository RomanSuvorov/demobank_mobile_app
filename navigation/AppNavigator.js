import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { TabNavigator } from './TabNavigator';
import { DetailsTransactionScreen } from '../screen/DetailsTransactionScreen';
import { GlobalSettingsScreen } from '../screen/GlobalSettingsScreen';
import { SettingsWalletItemScreen } from '../screen/SettingsWalletItemScreen';
import { ServerSettingsScreen } from '../screen/ServerSettingsScreen';
import { SecuritySettingsScreen } from '../screen/SecuritySettingsScreen';
import { AuthorizationNavigator } from './AuthorizationNavigator';
import { WalletPublicKeyScreen } from '../screen/WalletPublicKeyScreen';
import { WalletPrivateKeyScreen } from '../screen/WalletPrivateKeyScreen';
import { BackNavigation } from '../component/BackNavigation';
import { lightDark, active } from '../styles/color.theme';
import { SCREEN_NAMES } from '../styles/constants';

const AppStack = createNativeStackNavigator();
export function AppNavigator() {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen
        name={SCREEN_NAMES.TABS_NAVIGATOR}
        component={TabNavigator}
      />

      <AppStack.Group screenOptions={{
        headerShown: true,
        headerShadowVisible: false,
        headerStyle: { backgroundColor: lightDark },
        headerTintColor: active,
      }}>
        <AppStack.Group screenOptions={({ navigation }) => ({
          animation: Platform.OS === "ios" ? "default" : "slide_from_right",
          headerLeft: (props) => (
            <BackNavigation
              title={"Назад"}
              navigation={navigation}
              {...props}
            />
          ),
        })}>
          <AppStack.Screen
            name={SCREEN_NAMES.DETAILS_SCREEN}
            component={DetailsTransactionScreen}
            options={{
              title: "Детали транзакции",
              headerTitleAlign: "center",
              headerTitleStyle: styles.headerFontStyle,
              animation: Platform.OS === "ios" ? "default" : "fade",
              presentation: "formSheet",
            }}
          />
          <AppStack.Screen
            name={SCREEN_NAMES.GLOBAL_SETTINGS_SCREEN}
            component={GlobalSettingsScreen}
            options={{
              title: "Настройки приложения",
              headerTitleAlign: "center",
              headerTitleStyle: styles.headerFontStyle,
            }}
          />
          <AppStack.Screen
            name={SCREEN_NAMES.SETTINGS_WALLET_ITEM}
            component={SettingsWalletItemScreen}
            options={{
              title: null,
              headerTransparent: true,
            }}
          />
          <AppStack.Screen
            name={SCREEN_NAMES.SETTINGS_WALLET_PUBLIC_KEY}
            component={WalletPublicKeyScreen}
            options={{
              title: "Публичные ключи",
              headerTitleAlign: "center",
              headerTitleStyle: styles.headerFontStyle,
              animation: "fade",
              headerTransparent: true,
              presentation: "transparentModal",
            }}
          />
          <AppStack.Screen
            name={SCREEN_NAMES.SETTINGS_WALLET_PRIVATE_KEY}
            component={WalletPrivateKeyScreen}
            options={{
              title: "Приватные ключи",
              headerTitleAlign: "center",
              headerTitleStyle: styles.headerFontStyle,
              animation: "fade",
              headerTransparent: true,
              presentation: "transparentModal",
            }}
          />
          <AppStack.Screen
            name={SCREEN_NAMES.SERVER_SETTINGS_SCREEN}
            component={ServerSettingsScreen}
            options={{
              title: "Настройки сервера",
              headerTitleAlign: "center",
              headerTitleStyle: styles.headerFontStyle,
            }}
          />
          <AppStack.Screen
            name={SCREEN_NAMES.SECURITY_SETTINGS_SCREEN}
            component={SecuritySettingsScreen}
            options={{
              title: "Настройки безопасности",
              headerTitleAlign: "center",
              headerTitleStyle: styles.headerFontStyle,
            }}
          />
        </AppStack.Group>

        <AppStack.Screen
          name={SCREEN_NAMES.AUTHORIZATION_NAVIGATOR}
          component={AuthorizationNavigator}
          options={({ navigation }) => ({
            animation: Platform.OS === "ios" ? "default" : "slide_from_right",
            title: "Добавление кошелька",
            headerTitleAlign: "center",
            headerTitleStyle: styles.headerFontStyle,
            headerLeft: (props) => (
              <BackNavigation
                title={"К списку"}
                navigation={navigation}
                {...props}
              />
            ),
          })}
        />
      </AppStack.Group>
    </AppStack.Navigator>
  )
}

const styles = StyleSheet.create({
  headerFontStyle: {
    fontFamily: "Play-Bold",
    fontSize: 16,
    fontWeight: "normal",
  }
});

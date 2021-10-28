import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SettingsWalletListScreen } from '../screen/SettingsWalletListScreen';
import { SettingsWalletItemScreen } from '../screen/SettingsWalletItemScreen';
import { SCREEN_NAMES } from '../styles/constants';
import { active } from '../styles/color.theme';
import { BackNavigation } from '../component/BackNavigation';
import { StatusBarHeight } from '../sdk/helper';

const SettingsStack = createNativeStackNavigator();
export function SettingsBottomSheetNavigator() {
  return (
    <SettingsStack.Navigator screenOptions={{ headerShown: false, animation: "fade" }}>
      <SettingsStack.Screen
        name={SCREEN_NAMES.SETTINGS_WALLET_LIST}
        component={SettingsWalletListScreen}
      />
      <SettingsStack.Screen
        name={SCREEN_NAMES.SETTINGS_WALLET_ITEM}
        component={SettingsWalletItemScreen}
        options={({ navigation }) => ({
          headerShown: true,
          title: null,
          headerTintColor: active,
          headerLeft: (props) => (
            <BackNavigation
              title={"Назад"}
              navigation={navigation}
              style={{ top: - StatusBarHeight / 2 }}
              {...props}
            />
          ),
          headerTransparent: true,
          headerStyle: { backgroundColor: "transparent" },
          headerShadowVisible: false,
        })}
      />
    </SettingsStack.Navigator>
  );
}

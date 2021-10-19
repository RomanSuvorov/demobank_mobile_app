import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthScreen as AuthStartScreen } from '../screen/AuthScreen';
import { GenerateWalletScreen } from '../screen/GenerateWalletScreen';
import { BackNavigation } from '../component/BackNavigation';
import { active } from '../styles/color.theme';
import { SCREEN_NAMES } from '../styles/constants';

const AuthStack = createNativeStackNavigator();
export function AuthorizationNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen
        name={SCREEN_NAMES.AUTH_START_SCREEN}
        component={AuthStartScreen}
      />
      <AuthStack.Screen
        name={SCREEN_NAMES.GENERATE_WALLET_SCREEN}
        component={GenerateWalletScreen}
        options={({ navigation }) => ({
          headerShown: true,
          title: null,
          headerTintColor: active,
          headerLeft: (props) => (
            <BackNavigation
              title={"Назад"}
              navigation={navigation}
              {...props}
            />
          ),
          headerTransparent: true,
          headerStyle: { backgroundColor: "transparent" },
          headerShadowVisible: false,
        })}
      />
    </AuthStack.Navigator>
  );
}

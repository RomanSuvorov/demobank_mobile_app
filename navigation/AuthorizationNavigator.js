import React from 'react';
import { Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthScreen as AuthStartScreen } from '../screen/AuthScreen';
import { GenerateWalletScreen } from '../screen/GenerateWalletScreen';
import { BackNavigation } from '../component/BackNavigation';
import { active, lightDark } from '../styles/color.theme';
import { SCREEN_NAMES } from '../styles/constants';

const AuthStack = createNativeStackNavigator();
export function AuthorizationNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen
        name={SCREEN_NAMES.AUTH_START_SCREEN}
        component={AuthStartScreen}
        options={{
          animation: Platform.OS === "ios" ? "default" : "slide_from_right",
        }}
      />
      <AuthStack.Screen
        name={SCREEN_NAMES.GENERATE_WALLET_SCREEN}
        component={GenerateWalletScreen}
        options={({ navigation }) => ({
          headerShown: true,
          animation: Platform.OS === "ios" ? "default" : "slide_from_right",
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
          headerStyle: { backgroundColor: lightDark },
          headerShadowVisible: false,
        })}
      />
    </AuthStack.Navigator>
  );
}

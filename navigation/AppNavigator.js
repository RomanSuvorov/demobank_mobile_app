import React from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { TabNavigator } from './TabNavigator';
import { DetailsScreen } from '../screen/DetailsScreen';
import { dark, textWhite } from '../styles/color.theme';
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
    </AppStack.Navigator>
  )
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: dark,
  }
});

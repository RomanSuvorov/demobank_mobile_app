import React from 'react';
import { View, StyleSheet } from 'react-native';

import { dark } from '../styles/color.theme';
import { StatusBarHeight } from '../sdk/helper';

export function SecuritySettingsScreen({ navigation }) {
  return (
    <View style={styles.container}>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: dark,
    paddingHorizontal: 18,
    paddingVertical: StatusBarHeight,
  },
});

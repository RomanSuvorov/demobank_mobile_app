import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import { MainNavigator } from './component/Navigator';
import { color } from './styles/color.theme';

export default function App() {
  const isAuthenticated = true;

  return (
    <SafeAreaView style={styles.container}>
      <MainNavigator isAuthenticated={isAuthenticated} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.bg.secondary,
  },
});

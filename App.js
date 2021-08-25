import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import { MainNavigator } from './component/Navigator';

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
  },
});

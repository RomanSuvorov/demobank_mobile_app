import React, {  } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useFonts } from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';

import { MainNavigator } from './component/Navigator';
import { color } from './styles/color.theme';

export default function App() {
  const isAuthenticated = true;

  const [fontLoaded] = useFonts({
    'Play-Bold': require('./assets/fonts/Play-Bold.ttf'),
    'Play-Regular': require('./assets/fonts/Play-Regular.ttf'),
  });

  return (
    <SafeAreaView style={styles.container}>
      {
        fontLoaded ? (
          <MainNavigator isAuthenticated={isAuthenticated} />
        ) : (
          <AppLoading />
        )
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.bg.secondary,
  },
});

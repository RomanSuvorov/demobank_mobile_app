import React, {  } from 'react';
import { Provider } from 'react-redux';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useFonts } from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';

import { MainNavigator } from './component/Navigator';
import { createReduxStore } from './sdk/helper';
import reducers from './store';
import { color } from './styles/color.theme';

const store = createReduxStore(reducers);

export default function App() {
  const isAuthenticated = true;

  const [fontLoaded] = useFonts({
    'Play-Bold': require('./assets/fonts/Play-Bold.ttf'),
    'Play-Regular': require('./assets/fonts/Play-Regular.ttf'),
  });

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        {
          fontLoaded ? (
            <MainNavigator isAuthenticated={isAuthenticated} />
          ) : (
            <AppLoading />
          )
        }
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.bg.secondary,
  },
});

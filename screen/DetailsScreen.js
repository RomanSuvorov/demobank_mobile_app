import React, { useRef } from 'react';
import { HeaderBackButton } from '@react-navigation/elements';
import { WebView } from 'react-native-webview';
import { View, ActivityIndicator, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { color } from '../styles/color.theme';
import { deviceSize } from '../helper';

const { width, height } = deviceSize;

export function DetailsScreen({ navigation, route }) {
  const ref = useRef(null);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={"transparent"} translucent={true} />

      <WebView
        ref={ref}
        source={{ uri: route.params.url }}
        renderLoading={() => (
          <View style={styles.loaderContainer}>
            <ActivityIndicator color={color.text.active} size="large" />
          </View>
        )}
        startInLoadingState
        style={styles.webView}
        allowsBackForwardNavigationGestures
        onNavigationStateChange={(navState) => {
          navigation.setOptions({
            title: route.params.id,
            headerLeft: (props) => {
              if (navState.canGoBack) {
                return (
                  <HeaderBackButton
                    {...props}
                    title={""}
                    onPress={() => ref.current.goBack()}
                  />
                );
              }

              return <HeaderBackButton {...props} onPress={() => navigation.goBack()}/>
            },
          });
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderContainer: {
    position: "absolute",
    width: width,
    height: height,
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: color.bg.primary,
  },
  webView: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
  },
});

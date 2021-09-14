import React from 'react';
import { ImageBackground, Text, View, StyleSheet, StatusBar, Dimensions, Image } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LinearGradient } from 'expo-linear-gradient';

import { WalletScreen } from '../screen/WalletScreen';
import { ExchangeScreen } from '../screen/ExchangeScreen';
import { AnalyticsScreen } from '../screen/AnalyticsScreen';
import { SettingsScreen } from '../screen/SettingsScreen';
import { DetailsScreen } from '../screen/DetailsScreen';
import { AnalyticsIcon, ExchangeIcon, SettingsIcon, WalletIcon } from './Icons';
import { color } from '../styles/color.theme';

const { height } = Dimensions.get("window");

const DemobankTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: color.text.secondary,
    background: "transparent",
  },
};

const Stack = createNativeStackNavigator();
function Navigator({ isAuthenticated }) {
  return (
    <NavigationContainer theme={DemobankTheme}>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
      >
        {isAuthenticated ? (
          <Stack.Screen name={"App"} component={AppNavigator} />
        ) : (
          <Stack.Screen name={"SignIn"} component={SignInNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const AppStack = createNativeStackNavigator();
function AppNavigator() {
  return (
    <AppStack.Navigator
      screenOptions={{ headerShown: false }}
    >
      <AppStack.Screen name={"Tabs"} component={TabNavigator} />
      <AppStack.Screen
        name={"Details"}
        component={DetailsScreen}
        options={{
          headerShown: true,
          headerStyle: styles.headerStyle,
          headerTintColor: color.text.primary,
        }}
      />
    </AppStack.Navigator>
  )
}

const Tab = createBottomTabNavigator();
function TabNavigator() {
  return (
    <ImageBackground
      source={require("../assets/backgroundImage.png")}
      resizeMode={"cover"}
      style={styles.imageBackground}
    >
      <StatusBar barStyle="light-content" backgroundColor={"transparent"} translucent={true} />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let Icon;

            switch (route.name) {
              case "Exchange":
                Icon = ExchangeIcon;
                break;
              case "Analytics":
                Icon = AnalyticsIcon;
                break;
              case "Settings":
                Icon = SettingsIcon;
                break;
              case "Wallet":
              default:
                Icon = WalletIcon;
                break;
            }

            return (
              <View style={styles.tabIcon}>
                <Image source={require("../assets/tabShadow.png")} style={styles.shadowTabImage} />
                <Icon size={size} color={color} />
              </View>
            );
          },
          tabBarActiveTintColor: color.text.active,
          tabBarInactiveTintColor: color.text.secondary,
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarItemStyle: styles.tabBarItem,
          tabBarBackground: () => (
            <>
              <View style={styles.barBackground} />
              {route.name === "Wallet" && (
                <LinearGradient
                  colors={['rgba(22,26,29,0)', color.bg.secondary]}
                  style={styles.barBackgroundGradient}
                  locations={[0, 0.64]}
                />
              )}
            </>
          ),
        })}
      >
        <Tab.Screen
          name={"Wallet"}
          component={WalletScreen}
          options={{
            tabBarLabel: "Wallet"
          }}
        />
        <Tab.Screen
          name={"Exchange"}
          component={ExchangeScreen}
          options={{
            tabBarLabel: "Exchange"
          }}
        />
        <Tab.Screen
          name={"Analytics"}
          component={AnalyticsScreen}
          options={{
            tabBarLabel: "Analytics"
          }}
        />
        <Tab.Screen
          name={"Settings"}
          component={SettingsScreen}
          options={{
            tabBarLabel: "Settings"
          }}
        />
      </Tab.Navigator>
    </ImageBackground>
  );
}

function SignInNavigator() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>SignIn Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    height: 75,
    backgroundColor: "transparent",
    elevation: 0,
    borderTopWidth: 0,
    paddingBottom: 17,
  },
  tabIcon: {
    width: 44,
    height: 44,
    borderRadius: 50,
    backgroundColor: color.bg.secondary,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  shadowTabImage: {
    position: "absolute",
    width: 66,
    height: 66,
    top: "50%",
    left: "50%",
    transform: [{ translateY: -27 }, { translateX: -27 }]
  },
  tabBarLabel: {
    fontSize: 10,
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    height: "100%",
    backgroundColor: color.bg.secondary,
  },
  tabBarItem: {
    justifyContent: "center",
    alignItems: "center",
  },
  barBackground: {
    height: 58,
    width: "100%",
    bottom: 0,
    position: "absolute",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    zIndex: 2,
    backgroundColor: color.bg.secondary,
  },
  barBackgroundGradient: {
    flex: 1,
    height: height * 0.25,
    position: "absolute",
    width: "100%",
    bottom: 0,
  },
  headerStyle: {
    backgroundColor: color.bg.secondary,
  }
});

export { Navigator as MainNavigator };

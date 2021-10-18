import React from 'react';
import { ImageBackground, View, StyleSheet, StatusBar, Image } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from 'react-redux';

import { WalletScreen } from './screen/WalletScreen';
import { ExchangeScreen } from './screen/ExchangeScreen';
import { AnalyticsScreen } from './screen/AnalyticsScreen';
import { SettingsScreen } from './screen/SettingsScreen';
import { DetailsScreen } from './screen/DetailsScreen';
import { AuthScreen } from './screen/AuthScreen';
import { GenerateWalletScreen } from './screen/GenerateWalletScreen';
import { BackNavigation } from './component/BackNavigation';
import { CustomModal } from './component/CustomModal';
import { AnalyticsIcon, ExchangeIcon, SettingsIcon, WalletIcon } from './component/Icons';
import TabNavigatorBgImage from "./assets/backgroundImage.png";
import TabShadow from "./assets/tabShadow.png";
import { dark, textWhite, greyPrimary, active } from './styles/color.theme';
import { deviceSize } from './sdk/helper';
import { navigationRef } from './sdk/helper';

const { height } = deviceSize;

const DemobankTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: greyPrimary,
    background: "transparent",
  },
};

const Stack = createNativeStackNavigator();
function Navigator() {
  const isAuthenticated = useSelector(state => state.wallet.isAuthenticated);

  return (
    <NavigationContainer
      theme={DemobankTheme}
      ref={navigationRef}
    >
      <StatusBar
        backgroundColor={"transparent"}
        translucent={true}
      />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Group>
          {isAuthenticated ? (
            <Stack.Screen
              name={"App"}
              component={AppNavigator}
            />
          ) : (
            <Stack.Screen
              name={"Authorization"}
              component={AuthorizationNavigator}
            />
          )}
        </Stack.Group>
        <Stack.Group
          screenOptions={{
            presentation: "transparentModal",
            animation: "fade",
          }}
        >
          <Stack.Screen
            name={"Modal"}
            component={CustomModal}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const AppStack = createNativeStackNavigator();
function AppNavigator() {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen
        name={"Tabs"}
        component={TabNavigator}
      />
      <AppStack.Screen
        name={"Details"}
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

const Tab = createBottomTabNavigator();
function TabNavigator() {
  return (
    <ImageBackground
      source={TabNavigatorBgImage}
      resizeMode={"cover"}
      style={styles.imageBackground}
    >
      <Tab.Navigator screenOptions={({ route }) => ({
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
                <Image source={TabShadow} style={styles.shadowTabImage} />
                <Icon size={size} color={color} />
              </View>
            );
          },
          tabBarActiveTintColor: active,
          tabBarInactiveTintColor: greyPrimary,
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarItemStyle: styles.tabBarItem,
          tabBarBackground: () => (
            <>
              <View style={styles.barBackground} />
              {route.name === "Wallet" && (
                <LinearGradient
                  colors={['rgba(22,26,29,0)', dark]}
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

const AuthStack = createNativeStackNavigator();
function AuthorizationNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen
        name={"AuthScreen"}
        component={AuthScreen}
      />
      <AuthStack.Screen
        name={"GenerateWallet"}
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
    backgroundColor: dark,
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
    transform: [{ translateY: -27 }, { translateX: -27 }],
  },
  tabBarLabel: {
    fontSize: 10,
    fontFamily: "Play-Regular",
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    height: "100%",
    backgroundColor: dark,
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
    backgroundColor: dark,
  },
  barBackgroundGradient: {
    flex: 1,
    height: height * 0.25,
    position: "absolute",
    width: "100%",
    bottom: 0,
  },
  headerStyle: {
    backgroundColor: dark,
  }
});

export { Navigator as MainNavigator };

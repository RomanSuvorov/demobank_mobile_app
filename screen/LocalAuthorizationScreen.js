import React from 'react';
import { SafeAreaView, View, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { CustomText } from '../component/CustomText';
import { StatusBarHeight } from '../sdk/helper';
import { textWhite, active } from '../styles/color.theme';

export function LocalAuthorizationScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.lockIconContainer}>
        <Ionicons name="lock-closed" size={36} color={textWhite} />
      </View>
      <View style={styles.passcodeContainer}>
        <CustomText size={18}>Введите ваш пароль</CustomText>
        <View style={styles.codeContainer}>
          <View style={styles.codeItem} />
          <View style={styles.codeItem} />
          <View style={styles.codeItem} />
          <View style={styles.codeItem} />
          <View style={styles.codeItem} />
          <View style={styles.codeItem} />
        </View>
      </View>
      <View style={styles.keyboard}>

      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBarHeight : 0,
  },
  lockIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 0.1,
  },
  passcodeContainer: {
    alignItems: "center",
    flex: 0.2,
    justifyContent: "space-around",
  },
  codeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 200,
  },
  codeItem: {
    width: 18,
    height: 18,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: active,
  },
  codeActiveItem: {
    backgroundColor: active,
  },
  keyboard: {
    flex: 0.7,
    backgroundColor: "yellow",
  },
});

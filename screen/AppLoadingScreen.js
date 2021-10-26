import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

import { CustomText } from '../component/CustomText';
import { StatusBarHeight } from '../sdk/helper';
import { active, dark } from '../styles/color.theme';

export function AppLoadingScreen() {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        size={"large"}
        color={active}
      />
      <View style={styles.labelContainer}>
        <CustomText
          type={'bold'}
          size={16}
          color={'active'}
        >
          Проверка локальных данных
        </CustomText>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: StatusBarHeight,
    backgroundColor: dark,
  },
  labelContainer: {
    marginTop: 18,
  },
});

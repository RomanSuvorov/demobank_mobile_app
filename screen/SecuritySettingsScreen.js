import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { View, Switch, StyleSheet } from 'react-native';

import { CustomText } from '../component/CustomText';
import { dark, textWhite, success } from '../styles/color.theme';

export function SecuritySettingsScreen({ navigation }) {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <View style={styles.switchPasswordContainer}>
        <CustomText>Блокировка приложения</CustomText>
        <Switch
          style={styles.switch}
          thumbColor={textWhite}
          trackColor={success}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: dark,
    paddingHorizontal: 18,
    paddingVertical: 24,
  },
  switch: {
    width: 200,
  },
});

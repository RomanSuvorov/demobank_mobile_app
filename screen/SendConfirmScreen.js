import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';

import { CustomInput } from '../component/CustomInput';
import { CustomButton } from '../component/CustomButton';
import { dark } from '../styles/color.theme';
import { StatusBarHeight } from '../sdk/helper';

export function SendConfirmScreen({ navigation }) {
  return (
    <ScrollView
      overScrollMode={"never"}
      bounces={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTap={"always"}
    >
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: dark,
  },
  contentContainer: {
    paddingVertical: StatusBarHeight,
    paddingHorizontal: 18,
  },
});

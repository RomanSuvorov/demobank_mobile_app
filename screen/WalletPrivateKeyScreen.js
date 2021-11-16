import React from 'react';
import { View, Pressable, StyleSheet, Platform, Alert } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import Constants from 'expo-constants';
import { setString } from 'expo-clipboard';

import { CustomText } from '../component/CustomText';
import { dark, lightDark } from '../styles/color.theme';
import { StatusBarHeight } from '../sdk/helper';

export function WalletPrivateKeyScreen({ navigation, route }) {
  const { privateKey } = route.params;
  const headerHeight = useHeaderHeight();

  const handleCopyKey = () => {
    setString(privateKey);
    Alert.alert("Приватный ключ скопирован");
  };

  return (
    <View style={[styles.container, { marginTop: Platform.OS === "ios" ? Constants.statusBarHeight + headerHeight : headerHeight }]}>
      <CustomText
        size={12}
        color={'greySecondary'}
        align={'center'}
      >
        Никогда не передавайте приватный ключ кому-либо, храните его надежно!
      </CustomText>

      <Pressable
        style={styles.infoBox}
        onLongPress={handleCopyKey}
      >
        <CustomText
          size={12}
          align={'center'}
        >
          {privateKey}
        </CustomText>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    flex: 1,
    backgroundColor: dark,
    paddingVertical: StatusBarHeight,
  },
  infoBox: {
    borderRadius: 15,
    backgroundColor: lightDark,
    marginVertical: 18,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
});

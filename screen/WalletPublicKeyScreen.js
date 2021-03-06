import React from 'react';
import { View, Pressable, StyleSheet, Platform, Alert } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import Constants from 'expo-constants';
import { setString } from 'expo-clipboard';

import { CustomText } from '../component/CustomText';
import { dark, lightDark } from '../styles/color.theme';

export function WalletPublicKeyScreen({ navigation, route }) {
  const { publicKey } = route.params;
  const headerHeight = useHeaderHeight();

  const handleCopyKey = () => {
    setString(publicKey);
    Alert.alert("Публичный ключ скопирован");
  };

  return (
    <View style={[styles.container, { marginTop: Platform.OS === "ios" ? Constants.statusBarHeight + headerHeight : headerHeight }]}>
      <CustomText
        size={12}
        color={'greySecondary'}
        align={'center'}
      >
        Будьте осторожны с открытыми ключами вашего аккаунта (XPUB), когда вы даете их третьему лицу, вы позволяете ему видеть всю историю транзакций
      </CustomText>

      <Pressable
        style={styles.infoBox}
        onLongPress={handleCopyKey}
      >
        <CustomText
          size={12}
          align={'center'}
        >
          {publicKey}
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
    paddingVertical: 24,
  },
  infoBox: {
    borderRadius: 15,
    backgroundColor: lightDark,
    marginVertical: 18,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
});

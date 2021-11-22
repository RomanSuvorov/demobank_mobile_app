import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { useSelector, useDispatch } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';

import { CustomText } from '../component/CustomText';
import { CustomButton } from '../component/CustomButton';
import { CustomInput } from '../component/CustomInput';
import { PADDING_TOP_FROM_NAVIGATION_HEADER } from '../styles/global';
import { importWalletAction } from '../store/wallet/actions';
import { textWhite, dark, lightDark, greyPrimary } from '../styles/color.theme';

export function ImportWalletScreen({}) {
  const [privateKey, setPrivateKey] = useState("");
  const loading = useSelector(state => state.wallet.loading);
  const isAuthenticated = useSelector(state => state.wallet.isAuthenticated);
  const headerHeight = useHeaderHeight();
  const dispatch = useDispatch();

  const handleChangeInput = (value) => {
    setPrivateKey(value);
  };

  const handleContinue = () => {
    if (!privateKey) return;
    dispatch(importWalletAction({ isAuthenticated, privateKey }));
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { marginTop: headerHeight }]}>
      <View style={styles.headerText}>
        <CustomText
          size={12}
          align={"center"}
          style={{ marginBottom: 12 }}
        >
          Верифицировать приватный ключ
        </CustomText>
        <CustomText
          size={12}
          color={"greySecondary"}
          align={"center"}
        >
          Введите или вставьте приватный ключ импортируемого кошелька
        </CustomText>
      </View>
      <View style={styles.inputBox}>
        <CustomInput
          value={privateKey}
          label={"Приватный ключ"}
          multiline={true}
          blurOnSubmit={true}
          onChangeText={handleChangeInput}
          onSubmitEditing={handleContinue}
        />
      </View>
      <View style={styles.infoWrapper}>
        <AntDesign name="exclamationcircle" size={24} color={textWhite} />
        <CustomText
          size={12}
          align={"center"}
          style={{ marginTop: 18 }}
        >
          Никогдал не передавайте приватный ключ кому-либо, храните его надежно!
        </CustomText>
      </View>
      <View style={styles.footerWrapper}>
        <CustomButton
          loading={loading}
          isLarge={true}
          disabled={!privateKey}
          onPress={handleContinue}
        >
          Продолжить
        </CustomButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: PADDING_TOP_FROM_NAVIGATION_HEADER,
    paddingHorizontal: 18,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: dark,
  },
  headerText: {
    paddingHorizontal: 36,
  },
  inputBox: {
    width: "100%",
    borderWidth: 1,
    borderColor: greyPrimary,
    backgroundColor: lightDark,
    borderRadius: 15,
    padding: 18,
  },
  infoWrapper: {
    padding: 24,
    backgroundColor: lightDark,
    borderRadius: 15,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  footerWrapper: {
    marginBottom: 60,
  },
});

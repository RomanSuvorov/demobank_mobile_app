import React, { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';

import { CustomText } from '../component/CustomText';
import { CustomButton } from '../component/CustomButton';
import { CustomCheckbox } from '../component/CustomCheckbox';
import { PADDING_TOP_FROM_NAVIGATION_HEADER } from '../styles/global';
import { deviceSize } from '../sdk/helper';
import AreYouAgreeImage from '../assets/areYouAgreeImage.png';

const { width, height } = deviceSize;

export function GenerateWalletScreen({}) {
  const [isAgreed, setIsAgreed] = useState(false);
  const headerHeight = useHeaderHeight();

  const handleContinue = () => console.log("handleContinue");

  const handleChangeAgreeState = (checked) => setIsAgreed(checked);

  return (
    <View style={[styles.container, { marginTop: headerHeight }]}>
      <View style={styles.headerText}>
        <CustomText
          size={12}
          align={"center"}
          style={{ marginBottom: 12 }}
        >
          Сделайте резервную копию вашего кошелька сейчас!
        </CustomText>
        <CustomText
          size={12}
          color={"greySecondary"}
          align={"center"}
        >
          На следующем шаге вы увидите 12 слов, которые позволят восстановить кошелек.
        </CustomText>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={AreYouAgreeImage}
          style={styles.imageStyle}
        />
      </View>
      <View style={styles.footerWrapper}>
        <CustomCheckbox
          size={23}
          label={"Я понимаю, что если я потеряю секретную фразу, я потеряю доступ к своему кошельку."}
          labelColor={"active"}
          style={styles.checkboxStyle}
          onChange={handleChangeAgreeState}
        />
        <CustomButton
          isLarge={true}
          disabled={!isAgreed}
          onPress={handleContinue}
        >
          Продолжить
        </CustomButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: PADDING_TOP_FROM_NAVIGATION_HEADER,
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    paddingHorizontal: 36,
  },
  imageContainer: {
    width: width,
  },
  imageStyle: {
    width: width,
    height: height * 0.5,
    resizeMode: "contain",
  },
  checkboxStyle: {
    marginBottom: 24,
    width: width * 0.8,
  },
  footerWrapper: {
    marginBottom: 60,
  },
});

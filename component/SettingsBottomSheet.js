import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';

import { CustomButton } from './CustomButton';
import { CustomText } from './CustomText';
import { WalletItem } from './WalletItem';
import { SettingsIcon, AddIcon } from './Icons';
import { lightDark, textWhite, greyPrimary } from '../styles/color.theme';
import { deviceSize } from '../sdk/helper';

const { height } = deviceSize;
const WALLETS = [
  {
    name: "First",
    id: "1",
  },
  {
    name: "Second",
    id: "2",
  },
  {
    name: "First",
    id: "3",
  },
  {
    name: "Second",
    id: "4",
  },
  {
    name: "First",
    id: "5",
  },
  {
    name: "Second",
    id: "6",
  },
  {
    name: "First",
    id: "7",
  },
  {
    name: "Second",
    id: "8",
  },
];
const chosenWallet = "2";

export function SettingsBottomSheet() {
  const changeWallet = () => {
    console.log("changeWallet");
  };

  const goToWalletSettings = () => {
    console.log("goToWalletSettings");
  };

  return (
    <View style={styles.container}>
      <CustomButton
        style={styles.settingsButton}
        textSize={16}
        Icon={<SettingsIcon color={textWhite} />}
        disabled={true} /* TODO: Add opportunity */
      >
        Настройки приложения
      </CustomButton>

      <View style={styles.multiWalletListHeader}>
        <CustomText
          color={"greyPrimary"}
          size={12}
        >
          Мульти-монетные кошельки
        </CustomText>
      </View>

      <CustomButton
        style={styles.settingsButton}
        textSize={16}
        Icon={<AddIcon />}
        disabled={true} /* TODO: Add opportunity */
      >
        Новый кошелек
      </CustomButton>

      <BottomSheetFlatList
        data={WALLETS}
        showsVerticalScrollIndicator ={false}
        renderItem={({ item, extraData }) => (
          <WalletItem
            item={item}
            chosenItem={chosenWallet === item.id}
            onItemPress={changeWallet}
            onActionPress={goToWalletSettings}
          />
        )}
        keyExtractor={(item) => item.id}
        extraData={chosenWallet}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 18,
    paddingBottom: height * (0.25 / 2), // half of gradient in bottom navigator
    paddingHorizontal: 18,
  },
  settingsButton: {
    backgroundColor: lightDark,
    height: 48,
    width: "100%",
    marginBottom: 18,
  },
  multiWalletListHeader: {
    paddingBottom: 12,
    justifyContent: "center",
    alignItems: "center",
  }
});

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';

import { CustomButton } from '../component/CustomButton';
import { CustomText } from '../component/CustomText';
import { WalletItem } from '../component/WalletItem';
import { SettingsIcon, AddIcon } from '../component/Icons';
import { changeActiveWallet } from '../store/wallet/actions';
import { lightDark, textWhite, greyPrimary } from '../styles/color.theme';
import { deviceSize } from '../sdk/helper';
import { SCREEN_NAMES } from '../styles/constants';
import AppTypes from '../store/app/types';

const { height } = deviceSize;

export function SettingsWalletListScreen({ navigation }) {
  const wallets = useSelector(state => state.wallet.wallets);
  const activeWallet = useSelector(state => state.wallet.activeWallet);
  const dispatch = useDispatch();

  const changeWallet = (wallet) => {
    dispatch(changeActiveWallet(wallet.address));
    dispatch({ type: AppTypes.CHANGE_ACTIVE_SLIDE, payload: 0 });
    navigation.navigate(SCREEN_NAMES.WALLET_SCREEN);
  };

  const goToWalletSettings = (wallet) => {
    navigation.navigate(SCREEN_NAMES.SETTINGS_WALLET_ITEM, { walletAddress: wallet.address });
  };

  return (
      <BottomSheetFlatList
        ListHeaderComponent={
          <>
            <CustomButton
              style={styles.settingsButton}
              textSize={16}
              Icon={<SettingsIcon color={textWhite} />}
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
          </>
        }
        data={wallets}
        showsVerticalScrollIndicator ={false}
        renderItem={({ item }) => (
          <WalletItem
            item={item}
            chosenItem={activeWallet.address === item.address}
            onItemPress={changeWallet}
            onActionPress={goToWalletSettings}
          />
        )}
        keyExtractor={(item) => item.address}
        extraData={activeWallet}
        style={styles.container}
      />
  )
}

const styles = StyleSheet.create({
  container: {
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

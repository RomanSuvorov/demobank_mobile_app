import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';

import { GoToButton } from '../component/GoToButton';
import { CustomText } from '../component/CustomText';
import { WalletItem } from '../component/WalletItem';
import { SettingsIcon, AddIcon } from '../component/Icons';
import { getWalletDataAction } from '../store/wallet/actions';
import { textWhite, greyPrimary } from '../styles/color.theme';
import { deviceSize } from '../sdk/helper';
import { SCREEN_NAMES } from '../styles/constants';
import AppTypes from '../store/app/types';

const { height } = deviceSize;

export function SettingsWalletListScreen({ navigation }) {
  const wallets = useSelector(state => state.wallet.wallets);
  const address = useSelector(state => state.wallet.address);
  const loading = useSelector(state => state.wallet.loading);
  const dispatch = useDispatch();

  const changeWallet = (wallet) => {
    dispatch(getWalletDataAction({ address: wallet.address }));
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
            <GoToButton
              to={SCREEN_NAMES.GLOBAL_SETTINGS_SCREEN}
              style={styles.settingsButton}
              Icon={<SettingsIcon color={textWhite} />}
            >
              Настройки приложения
            </GoToButton>

            <View style={styles.multiWalletListHeader}>
              <CustomText
                color={"greyPrimary"}
                size={12}
              >
                Мульти-монетные кошельки
              </CustomText>
            </View>

            <GoToButton
              to={SCREEN_NAMES.AUTHORIZATION_NAVIGATOR}
              style={styles.settingsButton}
              Icon={<AddIcon />}
            >
              Новый кошелек
            </GoToButton>
          </>
        }
        data={wallets}
        showsVerticalScrollIndicator ={false}
        renderItem={({ item, index }) => (
          <WalletItem
            index={index}
            loading={loading}
            item={item}
            chosenItem={address === item.address}
            onItemPress={changeWallet}
            onActionPress={goToWalletSettings}
          />
        )}
        keyExtractor={(item) => item.address}
        extraData={address}
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
    marginBottom: 18,
  },
  multiWalletListHeader: {
    paddingBottom: 12,
    justifyContent: "center",
    alignItems: "center",
  }
});

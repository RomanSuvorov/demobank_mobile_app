import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet } from 'react-native';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useHeaderHeight } from '@react-navigation/elements';
import { AntDesign } from '@expo/vector-icons';

import { CustomText } from '../component/CustomText';
import { GoToButton } from '../component/GoToButton';
import { CustomInput } from '../component/CustomInput';
import { CustomButton } from '../component/CustomButton';
import { changeWalletName } from '../store/wallet/actions';
import { showModalAction } from '../store/modal/actions';
import { deleteWalletAction } from '../store/wallet/actions';
import { deviceSize, StatusBarHeight } from '../sdk/helper';
import { danger07, danger, greySecondary } from '../styles/color.theme';
import { SCREEN_NAMES } from '../styles/constants';

const { height } = deviceSize;

export function SettingsWalletItem({ walletAddress, navigation }) {
  const wallet = useSelector(state => state.wallet.wallets.find(w => w.address === walletAddress));
  const dispatch = useDispatch();
  const headerHeight = useHeaderHeight();

  const handleNameChange = (value) => {
    dispatch(changeWalletName({ newName: value, walletAddress: wallet.address }));
  };

  const handleDelete = () => {
    dispatch(deleteWalletAction({ address: walletAddress }));
    navigation.navigate(SCREEN_NAMES.SETTINGS_WALLET_LIST);
  };

  const showDeleteModal = () => {
    dispatch(showModalAction({
      type: "info",
      text: `Вы действительно хотите удалить кошелек ${wallet.name}?\nСоветуем Вам сохранить privateKey для востановления`,
      closeOnOverlay: true,
      onCloseText: "Отмена",
      onClick: handleDelete,
      onClickText: "Удалить",
      onClickBgColor: danger,
    }));
  };

  return (
    <BottomSheetScrollView style={[styles.container, { paddingTop: !!headerHeight ? headerHeight : StatusBarHeight  }]}>
      <CustomInput
        isInsideBottomSheet={true}
        defaultValue={wallet?.name}
        label={"Имя"}
        placeholder={"Введите имя кошелька..."}
        autoFocus={true}
        containerStyle={styles.nameInput}
        onChangeText={handleNameChange}
      />
      <CustomText
        color={'greySecondary'}
        size={12}
        style={[{ marginBottom: 12, paddingHorizontal: 12 }]}
      >
        Варианты для резервного копирования
      </CustomText>
      <GoToButton
        disabled={true}
        style={[{ marginBottom: 12 }]}
      >
        Показать секретную фразу
      </GoToButton>
      <CustomText
        color={'greySecondary'}
        size={12}
        style={[{ marginBottom: 36, paddingHorizontal: 12 }]}
      >
        Если вы потеряете доступ к этому устройству, ваши средства будут утеряны, если вы не сделаете резервное копирование!
      </CustomText>
      <CustomText
        color={'greySecondary'}
        size={12}
        style={[{ marginBottom: 12, paddingHorizontal: 12 }]}
      >
        Открытые ключи аккаунта
      </CustomText>
      <GoToButton
        disabled={true}
        style={{ marginBottom: 42 }}
      >
        Экспортировать открытые ключи
      </GoToButton>

      <CustomButton
        style={{ backgroundColor: danger07 }}
        textSize={14}
        Icon={<AntDesign name="delete" size={18} color="white" />}
        iconPosition={'right'}
        onPress={showDeleteModal}
      >
        Удалить кошелек
      </CustomButton>
    </BottomSheetScrollView>
  );
}

export function SettingsWalletItemScreen({ navigation, route }) {
  const { walletAddress } = route.params;

  return (
    <SettingsWalletItem walletAddress={walletAddress} navigation={navigation} />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: height * (0.25 / 2), // half of gradient in bottom navigator
    paddingHorizontal: 18,
  },
  nameInput: {
    marginBottom: 36,
  },
});

import { BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Types from './types';
import WalletTypes from '../wallet/types';
import { navigate, getValueFromDeviceStorage } from '../../sdk/helper';
import { SCREEN_NAMES, SECURE_STORE_NAMES } from '../../styles/constants';

export const appStartAction = () => async (dispatch) => {
  dispatch({ type: Types.APP_START });

  try {
    // get all wallets from secure store
    const stringifiedWallets = await getValueFromDeviceStorage(SECURE_STORE_NAMES.WALLETS);
    if (!stringifiedWallets) {
      dispatch({ type: WalletTypes.CHANGE_AUTHENTICATED, payload: false });
      return;
    }

    const wallets = JSON.parse(stringifiedWallets);
    // stored wallets from secure store to redux store
    dispatch({ type: WalletTypes.WALLET_LIST_LOAD_SUCCESS, payload: wallets });
    // get active wallet address
    const activeWallet = JSON.parse(await AsyncStorage.getItem(SECURE_STORE_NAMES.ACTIVE_WALLET_ADDRESS));
    // set active wallet for redux store
    dispatch({ type: WalletTypes.WALLET_SET_ACTIVE, payload: activeWallet || wallets[0].address });
    // push user to signed in app with active wallet
    dispatch({ type: WalletTypes.CHANGE_AUTHENTICATED, payload: true });
  } catch (e) {
    console.error(e);
    dispatch({ type: Types.APP_ERROR, payload: e });
    dispatch(showModalAction({
      type: "error",
      text: "Возникла проблемка при проверке локального хранилища. Перезапустите приложение. Если" +
        " ошибка повторится, сбросьте настройки кэша и запустите приложение",
      onClose: BackHandler.exitApp,
      onCloseText: "Закрыть",
      isFullScreen: true,
    }));
  } finally {
    dispatch({ type: Types.APP_FINISH });
  }
};

export const showModalAction = (data) => async (dispatch) => {
  dispatch({
    type: Types.SHOW_MODAL,
    payload: {
      type: data.type,
      text: data.text,
      closeOnOverlay: data.closeOnOverlay,
      onClose: data.onClose,
      onCloseText: data.onCloseText,
      isFullScreen: data.isFullScreen,
    },
  });
  navigate(SCREEN_NAMES.MODAL_SCREEN);
};

export const getProfileAction = () => async (dispatch) => {
  try {
    const profile = await AsyncStorage.getItem(SECURE_STORE_NAMES.PROFILE);

    if (profile) {
      const { name, surname } = JSON.parse(profile);
      dispatch({ type: Types.CHANGE_PROFILE, payload: { name, surname } });
    }
  } catch (e) {
    console.error(e);
    dispatch(showModalAction({
      type: "error",
      text: "Возникла проблемка при загрузке профиля",
    }));
  }
};

export const saveProfileAction = ({ name, surname }) => async (dispatch) => {
  try {
    const data = JSON.stringify({ name, surname });
    await AsyncStorage.setItem(SECURE_STORE_NAMES.PROFILE, data);
    dispatch(showModalAction({
      type: "success",
      text: "Ваш профиль был успешно обновлен.",
    }));
    dispatch({ type: Types.CHANGE_PROFILE, payload: { name, surname } });
  } catch (e) {
    console.error(e);
    dispatch(showModalAction({
      type: "error",
      text: "Возникла проблемка при редактировании полей профиля",
    }));
  }
};

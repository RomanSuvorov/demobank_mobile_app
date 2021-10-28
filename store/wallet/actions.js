import AsyncStorage from '@react-native-async-storage/async-storage';

import Types from './types';
import { saveToDeviceStorage, getValueFromDeviceStorage } from '../../sdk/helper';
import { createWallet } from '../../sdk/wallet';
import { showModalAction } from '../app/actions';
import { SECURE_STORE_NAMES } from '../../styles/constants';

export const generateWalletAction = () => async (dispatch) => {
  dispatch({ type: Types.WALLET_LOAD_START });

  try {
    let address = undefined;
    let privateKey = undefined;

    // generate new wallet
    await new Promise((resolve) => {
      setTimeout(() => {
        const result = createWallet();
        address = result.address;
        privateKey = result.privateKey;
        resolve();
      }, 0);
    });


    // TODO: check what is wrong with this (UI button freeze)
    // const { address, privateKey} = createWallet();

    // get all previous wallets from secure store
    const walletsStringified = await getValueFromDeviceStorage(SECURE_STORE_NAMES.WALLETS);
    const wallets = JSON.parse(walletsStringified) || [];
    // concatenate all previous wallets from secure store with new one
    const newWallets = [...wallets, { address, privateKey, name: `Основной кошелек ${wallets.length + 1}` }];
    // save new wallets list to secure store for next sign in process (startApp action)
    await saveToDeviceStorage(SECURE_STORE_NAMES.WALLETS, JSON.stringify(newWallets));
    await dispatch(changeActiveWallet(address));
    dispatch({ type: Types.WALLET_LIST_LOAD_SUCCESS, payload: newWallets });
    // push user to signed in app with this (newest) wallet
    dispatch({ type: Types.CHANGE_AUTHENTICATED, payload: true });
    dispatch(showModalAction({ type: "success", text: "Ваш кошелек был успешно создан." }));
  } catch (e) {
    console.error(e);
    dispatch({ type: Types.WALLET_LOAD_ERROR, payload: e });
    dispatch(showModalAction({ type: "error", text: "Возникла проблемка при создании кошелька. Упсь" }));
  } finally {
    dispatch({ type: Types.WALLET_LOAD_FINISH });
  }
};

export const importWalletAction = () => async (dispatch) => {
  dispatch({ type: Types.WALLET_LOAD_START });

  try {
    console.log("import");
  } catch (e) {
    dispatch({ type: Types.WALLET_LOAD_ERROR, payload: e });
  } finally {
    dispatch({ type: Types.WALLET_LOAD_FINISH });
  }
};

export const changeActiveWallet = (address) => async (dispatch) => {
  // save the wallet's address as active to local devise store
  await AsyncStorage.setItem(SECURE_STORE_NAMES.ACTIVE_WALLET_ADDRESS, JSON.stringify(address));
  // same for redux store
  dispatch({ type: Types.WALLET_SET_ACTIVE, payload: address });
};

export const changeWalletName = ({ newName, walletAddress }) => async (dispatch, getState) => {
  const store = getState();
  const { wallets, activeWallet } = store.wallet;

  const changedWalletIndex = wallets.findIndex(wallet => wallet.address === walletAddress);
  const updatedWalletList = [
    ...wallets.slice(0, changedWalletIndex),
    {
      ...wallets[changedWalletIndex],
      name: newName === "" ? `Без названия ${changedWalletIndex + 1}` : newName,
    },
    ...wallets.slice(changedWalletIndex + 1),
  ];

  await saveToDeviceStorage(SECURE_STORE_NAMES.WALLETS, JSON.stringify(updatedWalletList));
  dispatch({ type: Types.WALLET_LIST_LOAD_SUCCESS, payload: updatedWalletList });

  if (activeWallet.address === walletAddress) {
    dispatch({ type: Types.WALLET_SET_ACTIVE, payload: wallets[changedWalletIndex].address });
  }
};

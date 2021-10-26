import Types from './types';
import { saveToDeviceStorage } from '../../sdk/helper';
import { createWallet } from '../../sdk/wallet';
import { showModalAction } from '../app/actions';
import { SECURE_STORE_NAMES } from '../../styles/constants';

export const generateWalletAction = () => async (dispatch) => {
  dispatch({ type: Types.WALLET_LOAD_START });

  try {
    let address = undefined;
    let privateKey = undefined;

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


    dispatch({ type: Types.WALLET_LOAD_SUCCESS, payload: { address, privateKey } });
    await saveToDeviceStorage(SECURE_STORE_NAMES.WALLET, JSON.stringify({ address, privateKey }));
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

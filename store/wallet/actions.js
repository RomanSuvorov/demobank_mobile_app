import Types from './types';
import { navigate, saveToDeviceStorage } from '../../sdk/helper';
import { createWallet } from '../../sdk/wallet';

export const generateWalletAction = () => async (dispatch) => {
  dispatch({ type: Types.GENERATE_START });

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


    dispatch({ type: Types.GENERATE_SUCCESS, payload: { address, privateKey } });
    await saveToDeviceStorage("wallet", JSON.stringify({ address, privateKey }));
    dispatch({ type: Types.CHANGE_AUTHENTICATED });
    navigate("Modal", { type: "success", text: "Ваш кошелек был успешно создан." });
  } catch (e) {
    console.error(e);
    dispatch({ type: Types.GENERATE_ERROR, payload: e });
    navigate("Modal", { type: "error", text: "Возникла проблемка при создании кошелька. Упсь" });
  } finally {
    dispatch({ type: Types.GENERATE_FINISH });
  }
};

export const importWalletAction = () => async (dispatch) => {
  dispatch({ type: Types.IMPORT_START });

  try {
    console.log("import");
  } catch (e) {
    dispatch({ type: Types.IMPORT_ERROR, payload: e });
  } finally {
    dispatch({ type: Types.IMPORT_FINISH });
  }
};
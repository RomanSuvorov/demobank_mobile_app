import AsyncStorage from '@react-native-async-storage/async-storage';

import Types from './types';
import { showModalAction } from '../modal/actions';
import { getWalletsList } from '../wallet/actions';
import { SECURE_STORE_NAMES, DEFAULT_RESOURCES } from '../../styles/constants';

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

export const checkGraphNetwork = () => async (dispatch) => {
  dispatch({ type: Types.CHECK_NETWORK_START });

  try {
    // check graph network
    const graphNetworkUrl = JSON.parse(await AsyncStorage.getItem(SECURE_STORE_NAMES.GRAPH_NETWORK_URL)) || DEFAULT_RESOURCES.graphNetworkUrl;

    if (DEFAULT_RESOURCES.graphNetworkUrl !== graphNetworkUrl) {
      dispatch({
        type: Types.CHECK_NETWORK_SUCCESS,
        payload: {
          configUrl: graphNetworkUrl,
        }
      });
    }

    const response = await fetch(graphNetworkUrl);
    const { message } = await response.json();

    dispatch({
      type: Types.CHECK_NETWORK_SUCCESS,
      payload: {
        configUrl: graphNetworkUrl,
        network: message.network,
        gnn: JSON.stringify(message.gnn),
        status: message.status,
      },
    });

    // get wallets from storage
    await dispatch(getWalletsList());
  } catch (e) {
    console.error(e);
    dispatch({ type: Types.CHECK_NETWORK_ERROR, payload: e });
  } finally {
    dispatch({ type: Types.CHECK_NETWORK_FINISH });
  }
};

export const saveServerAction = ({ configUrl, network }) => async (dispatch) => {
  try {
    dispatch({ type: Types.CHANGE_NETWORK_CONFIG, payload: { configUrl, network } });

    const configUrlStr = JSON.stringify(configUrl);
    await AsyncStorage.setItem(SECURE_STORE_NAMES.GRAPH_NETWORK_URL, configUrlStr);
    await dispatch(checkGraphNetwork());
  } catch (e) {
    console.error(e);
    dispatch(showModalAction({
      type: "error",
      text: "Возникла проблемка при редактировании полей серверной конфигурации",
    }));
  }
};

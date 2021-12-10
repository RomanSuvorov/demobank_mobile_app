import { createReducer } from '../../sdk/helper';
import Types from './types';
import { DEFAULT_RESOURCES } from '../../styles/constants';

const initialStore = {
  activeSlide: 0,
  secureChecking: true,
  isLocalAuthenticated: false,
  isPasscodeSet: false,

  profile: {
    name: "Имя",
    surname: "Фамилия",
  },

  checkNetworkLoading: true,
  checkNetworkError: undefined,
  configUrl: DEFAULT_RESOURCES.graphNetworkUrl,
  gnn: "Unknown",
  status: "inactive",
  network: undefined,
};

const reducer = {
  [Types.CHANGE_ACTIVE_SLIDE]: (draft, payload) => {
    draft.activeSlide = payload;
  },

  [Types.CHANGE_PROFILE]: (draft, payload) => {
    draft.profile.name = payload.name;
    draft.profile.surname = payload.surname;
  },

  [Types.CHECK_NETWORK_START]: draft => {
    draft.checkNetworkLoading = true;
  },

  [Types.CHECK_NETWORK_SUCCESS]: (draft, payload) => {
    draft.configUrl = payload.configUrl || initialStore.configUrl;
    draft.gnn = payload.gnn || initialStore.gnn;
    draft.status = payload.status || initialStore.status;
    draft.network = payload.network || initialStore.network;
    draft.checkNetworkError = null;
  },

  [Types.CHANGE_NETWORK_CONFIG]: (draft, payload) => {
    draft.configUrl = payload.configUrl || initialStore.configUrl;
    draft.network = payload.network || initialStore.network;
  },

  [Types.CHECK_NETWORK_ERROR]: (draft, payload) => {
    draft.checkNetworkError = payload;
  },

  [Types.CHECK_NETWORK_FINISH]: draft => {
    draft.checkNetworkLoading = false;
  },

  [Types.SECURE_CHECKING_START]: draft => {
    draft.secureChecking = true;
  },

  [Types.SECURE_CHECKING_FINISH]: draft => {
    draft.secureChecking = false;
  },

  [Types.CHANGE_IS_LOCAL_AUTHENTICATED]: (draft, payload) => {
    draft.isLocalAuthenticated = payload;
  },
};

export const app = createReducer(reducer, initialStore);


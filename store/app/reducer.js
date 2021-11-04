import { createReducer } from '../../sdk/helper';
import Types from './types';

const initialStore = {
  loading: true,
  error: null,

  activeSlide: 0,

  modal: {
    type: "info",
    text: "",
    closeOnOverlay: false,
    onClose: null,
    onCloseText: "OK",
    isFullScreen: false,
  },

  profile: {
    name: "Имя",
    surname: "Фамилия",
  },

  checkNetworkLoading: false,
  checkNetworkError: undefined,
  configUrl: undefined,
  gnn: 0,
  status: "inactive",
  network: undefined,
};

const reducer = {
  [Types.APP_START]: draft => {
    draft.loading = true;
  },

  [Types.APP_ERROR]: (draft, payload) => {
    draft.error = payload;
  },

  [Types.APP_FINISH]: draft => {
    draft.loading = false;
  },

  [Types.CHANGE_ACTIVE_SLIDE]: (draft, payload) => {
    draft.activeSlide = payload;
  },

  [Types.SHOW_MODAL]: (draft, payload) => {
    draft.modal.type = payload.type || initialStore.modal.type;
    draft.modal.text = payload.text || initialStore.modal.text;
    draft.modal.closeOnOverlay = payload.closeOnOverlay || initialStore.modal.closeOnOverlay;
    draft.modal.onClose = payload.onClose || initialStore.modal.onClose;
    draft.modal.onCloseText = payload.onCloseText || initialStore.modal.onCloseText;
    draft.modal.isFullScreen = payload.isFullScreen || initialStore.modal.isFullScreen;
  },

  [Types.CLOSE_MODAL]: draft => {
    draft.modal = initialStore.modal;
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
};

export const app = createReducer(reducer, initialStore);


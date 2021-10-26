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
};

export const app = createReducer(reducer, initialStore);


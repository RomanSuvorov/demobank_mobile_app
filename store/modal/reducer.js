import { createReducer } from '../../sdk/helper';
import Types from './types';
import { greySecondary } from '../../styles/color.theme';

const initialStore = {
  type: "info",
  text: "",
  closeOnOverlay: false,
  isFullScreen: false,
  onClose: null,
  onCloseText: "OK",
  onClick: null,
  onClickText: undefined,
  onClickBgColor: greySecondary,
};

const reducer = {
  [Types.SHOW_MODAL]: (draft, payload) => {
    draft.type = payload.type || initialStore.type;
    draft.text = payload.text || initialStore.text;
    draft.closeOnOverlay = payload.closeOnOverlay || initialStore.closeOnOverlay;
    draft.isFullScreen = payload.isFullScreen || initialStore.isFullScreen;
    draft.onClose = payload.onClose || initialStore.onClose;
    draft.onCloseText = payload.onCloseText || initialStore.onCloseText;
    draft.onClick = payload.onClick || initialStore.onClick;
    draft.onClickText = payload.onClickText || initialStore.onClickText;
    draft.onClickBgColor = payload.onClickBgColor || initialStore.onClickBgColor;
  },

  [Types.CLOSE_MODAL]: draft => {
    draft.type = initialStore.type;
    draft.text = initialStore.text;
    draft.closeOnOverlay = initialStore.closeOnOverlay;
    draft.isFullScreen = initialStore.isFullScreen;
    draft.onClose = initialStore.onClose;
    draft.onCloseText = initialStore.onCloseText;
    draft.onClick = initialStore.onClick;
    draft.onClickText = initialStore.onClickText;
    draft.onClickBgColor = initialStore.onClickBgColor;
  },
};

export const modal = createReducer(reducer, initialStore);

import { createReducer } from '../../sdk/helper';
import Types from './types';

const initialStore = {
  loading: false,
  error: null,

  address: null,
  privateKey: null,

  isAuthenticated: false,
};

const reducer = {
  // generating or importing
  [Types.WALLET_LOAD_START]: draft => {
    draft.loading = true;
  },

  [Types.WALLET_LOAD_SUCCESS]: (draft, payload) => {
    draft.address = payload.address;
    draft.privateKey = payload.privateKey;
  },

  [Types.WALLET_LOAD_ERROR]: (draft, payload) => {
    draft.error = payload;
  },

  [Types.WALLET_LOAD_FINISH]: draft => {
    draft.loading = false;
  },

  [Types.CHANGE_AUTHENTICATED]: (draft, payload) => {
    draft.isAuthenticated = payload;
  }
};

export const wallet = createReducer(reducer, initialStore)

import { createReducer } from '../../sdk/helper';
import Types from './types';

const initialStore = {
  loading: false,
  error: null,

  isAuthenticated: false,
  wallets: [],
  activeWallet: {
    address: null,
    privateKey: null,
  }
};

const reducer = {
  // generating or importing
  [Types.WALLET_LOAD_START]: draft => {
    draft.loading = true;
  },

  [Types.WALLET_SET_ACTIVE]: (draft, payload) => {
    draft.activeWallet = draft.wallets.find(wallet => wallet.address === payload);
  },

  [Types.WALLET_LIST_LOAD_SUCCESS]:(draft, payload) => {
    draft.wallets = payload;
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

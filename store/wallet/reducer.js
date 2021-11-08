import { createReducer } from '../../sdk/helper';
import Types from './types';

const initialStore = {
  loading: false,
  error: null,

  walletsLoading: false,
  walletsError: undefined,

  isAuthenticated: false,
  wallets: [],

  address: null,
  balance: 0,
  transactions: [],
};

const reducer = {
  // generating or importing wallet (or checking balance)
  [Types.WALLET_LOAD_START]: draft => {
    draft.loading = true;
  },

  [Types.WALLET_LOAD_SUCCESS]: (draft, payload) => {
    draft.address = payload.address;
    draft.balance = payload.balance;
    draft.transactions = payload.transactions;
  },

  [Types.WALLET_LOAD_ERROR]: (draft, payload) => {
    draft.error = payload;
  },

  [Types.WALLET_LOAD_FINISH]: draft => {
    draft.loading = false;
  },

  // wallets
  [Types.WALLET_LIST_LOAD_START]: draft => {
    draft.walletsLoading = true;
  },

  [Types.WALLET_LIST_LOAD_SUCCESS]: (draft, payload) => {
    draft.wallets = payload;
  },

    [Types.WALLET_LIST_LOAD_ERROR]: (draft, payload) => {
    draft.walletsError = payload;
  },

  [Types.WALLET_LIST_LOAD_FINISH]: draft => {
    draft.walletsLoading = false;
  },

  [Types.CHANGE_AUTHENTICATED]: (draft, payload) => {
    draft.isAuthenticated = payload;
  }
};

export const wallet = createReducer(reducer, initialStore)

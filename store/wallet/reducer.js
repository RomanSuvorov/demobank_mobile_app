import { createReducer } from '../../sdk/helper';
import Types from './types';

const initialStore = {
  generateLoading: false,
  generateError: null,

  importLoading: false,
  importError: null,

  address: null,
  privateKey: null,

  isAuthenticated: false,
};

const reducer = {
  // generating
  [Types.GENERATE_START]: draft => {
    draft.generateLoading = true;
  },

  [Types.GENERATE_SUCCESS]: (draft, payload) => {
    draft.address = payload.address;
    draft.privateKey = payload.privateKey;
  },

  [Types.GENERATE_ERROR]: (draft, payload) => {
    draft.generateError = payload;
  },

  [Types.GENERATE_FINISH]: draft => {
    draft.generateLoading = false;
  },

  // importing
  [Types.IMPORT_START]: draft => {
    draft.importLoading = true;
  },

  [Types.IMPORT_SUCCESS]: (draft, payload) => {

  },

  [Types.IMPORT_ERROR]: (draft, payload) => {
    draft.importError = payload;
  },

  [Types.IMPORT_FINISH]: draft => {
    draft.importLoading = false;
  },

  [Types.CHANGE_AUTHENTICATED]: draft => {
    draft.isAuthenticated = !draft.isAuthenticated;
  }
};

export const wallet = createReducer(reducer, initialStore)

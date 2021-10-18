import { createReducer } from '../../sdk/helper';
import Types from './types';

const initialStore = {
  activeSlide: 0,
};

const reducer = {
  [Types.CHANGE_ACTIVE_SLIDE]: (draft, payload) => {
    draft.activeSlide = payload;
  },
};

export const app = createReducer(reducer, initialStore);


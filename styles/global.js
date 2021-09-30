import { deviceSize } from '../helper';

const { height, width } = deviceSize;

export const WALLETS_ICON_BOX_HEIGHT = 54;
export const PAGINATION_HEIGHT = 42;
export const ACTIONS_BOX_HEIGHT = 95;
export const CARD_WIDTH = width * 0.912;
export const CARD_HEIGHT = CARD_WIDTH * 0.65;

export const WIDTH_OF_QR_FRAME_WITH_SHADOW = CARD_WIDTH * 0.357; // with shadow
export const HEIGHT_OF_QR_FRAME_WITH_SHADOW = CARD_WIDTH * 0.357; // with shadow
export const WIDTH_OF_QR = CARD_WIDTH * 0.33 * 0.64; // 0.33 => without shadow
export const HEIGHT_OF_QR = CARD_WIDTH * 0.33 * 0.64; // 0.33 => without shadow
export const TOP_OFFSET_OF_QR = CARD_WIDTH * 0.33 * 0.185; // 0.33 => without shadow
export const LEFT_OFFSET_OF_QR = CARD_WIDTH * 0.33 * 0.185; // 0.33 => without shadow
export const WIDTH_OF_ADDRESS_FRAME = CARD_WIDTH * 0.88;
export const HEIGHT_OF_ADDRESS_FRAME = CARD_HEIGHT * 0.26;

export const GLOB_VAR = {
  INITIAL_SNAP_POINT_PERC: "42%",
  INITIAL_SNAP_POINT: 0.42,
  SECOND_SNAP_POINT_BALANCE: height - (WALLETS_ICON_BOX_HEIGHT - 12),
  SECOND_SNAP_POINT_CARD: height,
};

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { CircleBtn } from './CircleBtn';
import { CustomText } from './CustomText';
import { CopyAddressIcon, FillUpWalletIcon, SendToWalletIcon, WalletsIcon, ArrowDownIcon } from './Icons';
import { WALLETS_ICON_BOX_HEIGHT, ACTIONS_BOX_HEIGHT, HEIGHT_OF_BALANCE_CONTENT } from '../styles/global';
import { deviceSize, getStyle } from '../sdk/helper';
import { color } from '../styles/color.theme';

const { width, height } = deviceSize;
const HORIZONTAL_PADDING_BALANCE = width * 0.093;

export function BalanceSheet({ currentIndex }) {
  const [widthOfBalanceString, setWidthOfBalanceString] = useState(0);
  const actionsContainerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      currentIndex.value,
      [0, 0.5],
      [1, 0],
      Extrapolate.CLAMP,
    ),
    transform: [
      {
        translateY: interpolate(
          currentIndex.value,
          [0, 1],
          [0, -(height * 0.2)],
          Extrapolate.CLAMP,
        ),
      }
    ],
  }));

  const animateTextOpacityAndTransform = ({
    withOpacity = true,
    translateYInput = [0, 0.8],
    translateYOutput = [WALLETS_ICON_BOX_HEIGHT / 2, -(WALLETS_ICON_BOX_HEIGHT + 12)],
    withScale = false,
  }) => useAnimatedStyle(() => ({
    opacity: withOpacity ? interpolate(
      currentIndex.value,
      [0, 0.6],
      [1, 0],
      Extrapolate.CLAMP,
    ) : 1,
    transform: [
      {
        translateX: interpolate(
          currentIndex.value,
          [0, 0.8],
          [0, (width - HORIZONTAL_PADDING_BALANCE - widthOfBalanceString) / 2],
          Extrapolate.CLAMP,
        ),
      },
      {
        translateY: interpolate(
          currentIndex.value,
          translateYInput,
          translateYOutput,
          Extrapolate.CLAMP,
        )
      },
      {
        scale: withScale ? interpolate(
          currentIndex.value,
          [0.9, 1],
          [1, 0.9],
          Extrapolate.CLAMP,
        ) : 1
      },
    ],
  }));

  const walletsAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      currentIndex.value,
      [0, 0.2],
      [1, 0],
      Extrapolate.CLAMP,
    ),
  }));

  const onLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setWidthOfBalanceString(width);
  }

  const currentBalanceLabelAnimatedStyle = animateTextOpacityAndTransform({ withOpacity: true });
  const balancePriceContainerAnimatedStyle = animateTextOpacityAndTransform({ withOpacity: false, withScale: true });
  const balancePriceEqualToAnimatedStyle = animateTextOpacityAndTransform({ withOpacity: true });
  const byLastPeriodContainerAnimatedStyle = animateTextOpacityAndTransform({ withOpacity: true });

  const currentBalanceLabelStyle = getStyle(styles.currentBalanceLabel, currentBalanceLabelAnimatedStyle, currentBalanceLabelAnimatedStyle);
  const balancePriceContainerStyle = getStyle(styles.balancePriceContainer, balancePriceContainerAnimatedStyle, balancePriceContainerAnimatedStyle);
  const balancePriceEqualToStyle = getStyle(styles.balancePriceEqualTo, balancePriceEqualToAnimatedStyle, balancePriceEqualToAnimatedStyle);
  const byLastPeriodContainerStyle = getStyle(styles.byLastPeriodContainer, byLastPeriodContainerAnimatedStyle, byLastPeriodContainerAnimatedStyle);
  const actionsContainerStyle = getStyle(styles.actionsContainer, actionsContainerAnimatedStyle, actionsContainerAnimatedStyle);
  const walletsStyle = getStyle(styles.walletsContainer, walletsAnimatedStyle, walletsAnimatedStyle);

  return (
    <View style={styles.container}>
      <Animated.View style={walletsStyle}>
        <CircleBtn
          label={null}
          Icon={WalletsIcon}
          styleCircle={styles.walletsCircle}
          styleShadow={styles.shadowWalletsCircle}
        />
        <ArrowDownIcon style={styles.walletsArray} />
      </Animated.View>
      <View style={styles.balanceContainer}>
        <View style={styles.currentBalanceContainer}>
          <Animated.View style={currentBalanceLabelStyle}>
            <CustomText
              size={12}
              color={"secondary"}
            >
              Баланс
            </CustomText>
          </Animated.View>
          <Animated.View style={balancePriceContainerStyle} onLayout={onLayout}>
            <CustomText
              size={24}
              type={'bold'}
              style={[styles.balancePriceValue]}
            >
              {"0.64748838474"}
            </CustomText>
            <CustomText
              type={'bold'}
              style={[styles.balancePriceCurr]}
            >
              {"BTC"}
            </CustomText>
          </Animated.View>
          <Animated.View style={balancePriceEqualToStyle}>
            <CustomText
              size={12}
              color={"secondary"}
            >
              {"33761.58"}
            </CustomText>
            <CustomText
              size={12}
              color={"secondary"}
            >
              {` ${"USD"}`}
            </CustomText>
          </Animated.View>
        </View>
        <Animated.View style={byLastPeriodContainerStyle}>
          <CustomText
            size={12}
            color={"secondary"}
            style={[styles.byLastPeriodLabel]}
          >
            За прошлый месяц
          </CustomText>
          <CustomText
            size={14}
            color={"success"}
            style={[styles.byLastPeriodValue]}
          >
            {"+36.12 USD (+5.2%)"}
          </CustomText>
        </Animated.View>
      </View>
      <Animated.View style={actionsContainerStyle}>
        <CircleBtn
          label={"Пополнить\n свой кошелек "}
          Icon={FillUpWalletIcon}
        />
        <CircleBtn
          label={"Перевести\n на кошелек "}
          Icon={SendToWalletIcon}
        />
        <CircleBtn
          label={"Копировать\n адресс "}
          Icon={CopyAddressIcon}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: HEIGHT_OF_BALANCE_CONTENT,
    paddingHorizontal: 21,
    position: "relative",
  },
  walletsContainer: {
    height: WALLETS_ICON_BOX_HEIGHT,
    alignItems: "center",
  },
  walletsCircle: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: color.bg.primary,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  shadowWalletsCircle: {
    position: "absolute",
    width: 60,
    height: 60,
    top: "50%",
    left: "50%",
    transform: [{ translateY: -25 }, { translateX: -25 }]
  },
  walletsArray: {
    position: "absolute",
    top: 40 + WALLETS_ICON_BOX_HEIGHT / 6, // 44 - size of icon + 10 - marginTop
  },
  balanceContainer: {
    top: WALLETS_ICON_BOX_HEIGHT,
    left: HORIZONTAL_PADDING_BALANCE,
    position: "absolute",
    width: (width * 0.7) - HORIZONTAL_PADDING_BALANCE,
    height: HEIGHT_OF_BALANCE_CONTENT - ACTIONS_BOX_HEIGHT - WALLETS_ICON_BOX_HEIGHT,
  },
  currentBalanceContainer: {

  },
  currentBalanceLabel: {
    marginBottom: 6,
  },
  balancePriceContainer: {
    flexDirection: "row",
    marginBottom: 6,
  },
  balancePriceValue: {
    lineHeight: 24,
  },
  balancePriceCurr: {
    lineHeight: 24,
    marginLeft: 6,
  },
  balancePriceEqualTo: {
    flexDirection: "row",
    marginBottom: 42,
  },
  byLastPeriodContainer: {

  },
  byLastPeriodLabel: {
    marginBottom: 6,
  },
  byLastPeriodValue: {

  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    bottom: 0,
    position: "absolute",
    height: ACTIONS_BOX_HEIGHT,
    width: width,
  },
});

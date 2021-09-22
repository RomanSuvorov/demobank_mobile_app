import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { CircleBtn } from './CircleBtn';
import { CopyAddressIcon, FillUpWalletIcon, SendToWalletIcon } from './Icons';
import { globalStyles } from '../styles/global';

const { width, height } = Dimensions.get("window");
const HORIZONTAL_MARGIN_LAYOUT = width * 0.056;
const HORIZONTAL_MARGIN_BALANCE = width * 0.037;

export function BalanceSheet({ currentIndex, currentPosition }) {
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
    translateYInput = [0, 0.6],
    translateYOutput = [0, -(height * 0.08)],
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
          [0, (width - (HORIZONTAL_MARGIN_BALANCE * 2) - (HORIZONTAL_MARGIN_LAYOUT * 2) - widthOfBalanceString) / 2],
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
          [0.8, 1],
          [1, 0.9],
          Extrapolate.CLAMP,
        ) : 1
      },
    ],
  }));

  const getStyle = (styles, animatedStyles, depend) => useMemo(
    () => [styles, animatedStyles],
    [depend]
  );

  const onLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setWidthOfBalanceString(width);
  }

  const currentBalanceLabelAnimatedStyle = animateTextOpacityAndTransform({ withOpacity: true });
  const balancePriceContainerAnimatedStyle = animateTextOpacityAndTransform({ withOpacity: false, translateYInput: [0, 0.8], translateYOutput: [0, -(height * 0.12)], withScale: true });
  const balancePriceEqualToAnimatedStyle = animateTextOpacityAndTransform({ withOpacity: true });
  const byLastPeriodContainerAnimatedStyle = animateTextOpacityAndTransform({ withOpacity: true });

  const currentBalanceLabelStyle = getStyle(styles.currentBalanceLabel, currentBalanceLabelAnimatedStyle, currentBalanceLabelAnimatedStyle);
  const balancePriceContainerStyle = getStyle(styles.balancePriceContainer, balancePriceContainerAnimatedStyle, balancePriceContainerAnimatedStyle);
  const balancePriceEqualToStyle = getStyle(styles.balancePriceEqualTo, balancePriceEqualToAnimatedStyle, balancePriceEqualToAnimatedStyle);
  const byLastPeriodContainerStyle = getStyle(styles.byLastPeriodContainer, byLastPeriodContainerAnimatedStyle, byLastPeriodContainerAnimatedStyle);
  const actionsContainerStyle = getStyle(styles.actionsContainer, actionsContainerAnimatedStyle, actionsContainerAnimatedStyle);

  return (
    <View style={styles.container}>
      <View style={styles.balanceContainer}>
        <View style={styles.currentBalanceContainer}>
          <Animated.View style={currentBalanceLabelStyle}>
            <Text style={[globalStyles.secondaryText]}>Баланс</Text>
          </Animated.View>
          <Animated.View style={balancePriceContainerStyle} onLayout={onLayout}>
            <Text style={[globalStyles.primaryText, styles.balancePriceValue]}>{"0.64748838474"}</Text>
            <Text style={[globalStyles.primaryText, styles.balancePriceCurr]}>{"BTC"}</Text>
          </Animated.View>
          <Animated.View style={balancePriceEqualToStyle}>
            <Text style={[globalStyles.secondaryText]}>{"33761.58"}</Text>
            <Text style={[globalStyles.secondaryText]}>{` ${"USD"}`}</Text>
          </Animated.View>
        </View>
        <Animated.View style={byLastPeriodContainerStyle}>
          <Text style={[globalStyles.secondaryText, styles.byLastPeriodLabel]}>За прошлый месяц</Text>
          <Text style={[globalStyles.primaryText, globalStyles.successText, styles.byLastPeriodValue]}>{"+36.12 USD (+5.2%)"}</Text>
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
    height: height * 0.54,
    marginHorizontal: HORIZONTAL_MARGIN_LAYOUT,
    position: "relative",
  },
  balanceContainer: {
    marginHorizontal: HORIZONTAL_MARGIN_BALANCE,
    top: height * 0.12,
    position: "absolute",
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
    fontSize: 24,
    fontWeight: "bold",
    lineHeight: 24,
  },
  balancePriceCurr: {
    fontWeight: "bold",
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
  },
});

import React from 'react';
import { Pressable, ImageBackground, StyleSheet, Image } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate, withTiming,
  Extrapolate,
} from 'react-native-reanimated';

import { CustomText } from './CustomText';
import CardBackground from '../assets/cardFrontBg.png';
import FrameForQR from '../assets/frameForQR.png';
import FrameForAddress from '../assets/frameForAddress.png';
import MockQR from '../assets/mockQR.png';
import { deviceSize, getStyle, StatusBarHeight } from '../helper';
import {
  ACTIONS_BOX_HEIGHT,
  CARD_HEIGHT,
  CARD_WIDTH,
  PAGINATION_HEIGHT,
  WIDTH_OF_QR_FRAME_WITH_SHADOW,
  HEIGHT_OF_QR_FRAME_WITH_SHADOW,
  WIDTH_OF_QR,
  HEIGHT_OF_QR,
  TOP_OFFSET_OF_QR,
  LEFT_OFFSET_OF_QR,
  WIDTH_OF_ADDRESS_FRAME,
  HEIGHT_OF_ADDRESS_FRAME,
} from '../styles/global';
import { color } from '../styles/color.theme';

const { width } = deviceSize;
const CARD_FLIP_DURATION = 800;

export function Card({ scrollX, paginationIndex, activeSlide, goToSecondSlide = () => {} }) {
  const progress = useSharedValue(0);
  const cardAnimatedValue = useSharedValue(0);

  const frontCardAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotateY: `${cardAnimatedValue.value}deg`
      },
      { perspective: 600 },
      {
        scale: interpolate(
          progress.value,
          [0, 0.2, 0.4, 1],
          [1, 0.8, 0.9, 1],
          Extrapolate.CLAMP,
        )
      }
    ],
  }));
  const backCardAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotateY: `${cardAnimatedValue.value + 180}deg`,
      },
      { perspective: -600 },
      {
        scale: interpolate(
          progress.value,
          [0, 0.2, 0.4, 1],
          [1, 0.8, 0.9, 1]
        )
      }
    ],
  }));

  const flipCard = ({ nativeEvent }) => {
    if (!nativeEvent) {
      cardAnimatedValue.value = withTiming(cardAnimatedValue.value - 180, { duration: CARD_FLIP_DURATION });
      return;
    }

    if (progress.value !== 0) return;

    if (activeSlide === 0) {
      goToSecondSlide();
      return;
    }

    if (nativeEvent.pageX >= (width / 2)) {
      cardAnimatedValue.value = withTiming(cardAnimatedValue.value + 180, { duration: CARD_FLIP_DURATION });
    } else {
      cardAnimatedValue.value = withTiming(cardAnimatedValue.value - 180, { duration: CARD_FLIP_DURATION });
    }
    progress.value = withTiming(1, { duration: CARD_FLIP_DURATION }, () => progress.value = 0);
  };

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    top: interpolate(
      paginationIndex.value,
      [0, 1],
      [StatusBarHeight, - PAGINATION_HEIGHT - ACTIONS_BOX_HEIGHT - CARD_HEIGHT - StatusBarHeight],
      Extrapolate.CLAMP,
    ),
    transform: [
      {
        translateX: interpolate(
          scrollX.value,
          [0, width],
          [-(width * 0.3), 0],
          Extrapolate.CLAMP,
        ),
      },
    ],
  }));
  const containerStyle = getStyle(styles.container, containerAnimatedStyle, containerAnimatedStyle);

  return (
    <Animated.View style={containerStyle}>
        <Pressable onPress={flipCard}>
          <Animated.View style={[styles.flipCard, frontCardAnimatedStyle]}>
            <ImageBackground source={CardBackground} style={styles.cardBg} />
            <CustomText
              style={{ color: "#fff" }}
            >
              Front
            </CustomText>
          </Animated.View>
          <Animated.View style={[styles.flipCard, styles.flipCardBack, backCardAnimatedStyle]}>
            <ImageBackground source={FrameForQR} style={styles.frameForQR}>
              <Image source={MockQR} style={styles.qr} />
            </ImageBackground>

            <ImageBackground source={FrameForAddress} style={styles.frameForAddress}>
              <CustomText
                size={12}
                style={styles.addressText}
              >
                zpub6qTE9SeygRHtUnAc4e4VuBA5Ex39YC7Aw7bSq5m9LVfkNQCQtqVbHtZ5e8KH9G4D88L3DBCSU
              </CustomText>
            </ImageBackground>
          </Animated.View>
        </Pressable>
      </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    justifyContent: "center",
    position: "absolute",
    top: StatusBarHeight,
  },
  flipCard: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
    backfaceVisibility: "hidden",
    backgroundColor: color.bg.secondary,
    borderRadius: 10,
  },
  cardBg: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    position: "absolute",
    backgroundColor: color.bg.secondary,
    borderRadius: 10,
  },
  flipCardBack: {
    position: "absolute",
    top: 0,
    justifyContent: "space-around"
  },
  frameForQR: {
    width: WIDTH_OF_QR_FRAME_WITH_SHADOW,
    height: HEIGHT_OF_QR_FRAME_WITH_SHADOW,
    resizeMode: "contain",
  },
  qr: {
    width: WIDTH_OF_QR,
    height: HEIGHT_OF_QR,
    top: TOP_OFFSET_OF_QR,
    left: LEFT_OFFSET_OF_QR,
  },
  frameForAddress: {
    width: WIDTH_OF_ADDRESS_FRAME,
    height: HEIGHT_OF_ADDRESS_FRAME,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: (HEIGHT_OF_ADDRESS_FRAME * 0.356) / 2,
    paddingHorizontal: (WIDTH_OF_ADDRESS_FRAME * 0.09) / 2,
  },
  addressText: {
    color: color.text.secondary,
    lineHeight: (HEIGHT_OF_ADDRESS_FRAME - (HEIGHT_OF_ADDRESS_FRAME * 0.356)) / 2,
  },
});

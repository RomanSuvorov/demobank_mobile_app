import React, { useState, useEffect } from 'react';
import { Pressable, ImageBackground, StyleSheet, Image } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate, withTiming,
  Extrapolate,
} from 'react-native-reanimated';
import { useSelector } from 'react-redux';

import { CustomText } from './CustomText';
import CardBackground from '../assets/cardFrontBg.png';
import FrameForQR from '../assets/frameForQR.png';
import FrameForAddress from '../assets/frameForAddress.png';
import MockQR from '../assets/mockQR.png';
import { deviceSize, getStyle, StatusBarHeight } from '../sdk/helper';
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
  WALLETS_ICON_BOX_HEIGHT,
} from '../styles/global';
import { color } from '../styles/color.theme';

const { width } = deviceSize;
const CARD_FLIP_DURATION = 800;
const CARD_SHORT_FLIP_DURATION = 500;

export function Card({ scrollX, paginationIndex, goToSecondSlide = () => {} }) {
  const progress = useSharedValue(0);
  const cardAnimatedValue = useSharedValue(0);
  const activeSlide = useSelector(state => state.app.activeSlide);
  const [isFront, setIsFront] = useState(true)

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

  useEffect(() => {
    if (activeSlide === 0 && !isFront) flipCard({ resetting: true });
  }, [activeSlide]);

  const flipCard = ({ nativeEvent, resetting = false }) => {
    if (resetting) {
      cardAnimatedValue.value = withTiming(cardAnimatedValue.value - 180, { duration: CARD_SHORT_FLIP_DURATION });
      progress.value = withTiming(1, { duration: CARD_SHORT_FLIP_DURATION }, () => progress.value = 0);

      setIsFront(true);
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
    setIsFront(!isFront);
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
            <ImageBackground source={CardBackground} style={styles.cardBg} resizeMode='contain' />
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
    top: WALLETS_ICON_BOX_HEIGHT / 2,
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
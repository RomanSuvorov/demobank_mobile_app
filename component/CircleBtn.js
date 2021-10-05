import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';

import { CustomText } from './CustomText';
import Shadow from '../assets/grayShadow.png';

const DEFAULT_SIZE = 50;
const DEFAULT_CONTENT_SIZE = 33;
const SHADOW_SIZE_COEFFICIENT = 1.48;
const SHADOW_TRANSLATE_COEFFICIENT = 0.07;

export function CircleBtn({
  label = "",
  Icon = null,
  imageSource = "",
  style = {},
  size = DEFAULT_SIZE,
  contentSize = DEFAULT_CONTENT_SIZE,
  withShadow = true,
}) {
  return (
    <TouchableOpacity style={[styles.container, style]}>
      <View style={[styles.circle, { width: size, height: size }]}>
        {withShadow && (
          <Image
            style={[
              styles.shadow,
              {
                width: size * SHADOW_SIZE_COEFFICIENT,
                height: size * SHADOW_SIZE_COEFFICIENT,
                transform: [
                  { translateY: -size * SHADOW_SIZE_COEFFICIENT * SHADOW_TRANSLATE_COEFFICIENT },
                  { translateX: -size * SHADOW_SIZE_COEFFICIENT * SHADOW_TRANSLATE_COEFFICIENT },
                ]
              },
            ]}
            source={Shadow}
          />
        )}
        {!!Icon && <Icon style={{ width: contentSize, height: contentSize }} />}
        {!!imageSource && <Image style={{ resizeMode: "contain", width: contentSize, height: contentSize }} source={imageSource} />}
      </View>
      {label && (
        <CustomText
          size={12}
          color={"grey"}
          style={[styles.label]}
          numberOfLines={2}
        >
          {label}
        </CustomText>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  circle: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  shadow: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  label: {
    textAlign: "center",
    marginTop: 6,
  },
});

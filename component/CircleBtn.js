import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';

import { active, textWhite } from '../styles/color.theme';
import { CustomText } from './CustomText';
import Shadow from '../assets/grayShadow.png';

const DEFAULT_SIZE = 50;
const DEFAULT_CONTENT_SIZE = 33;

// shadow top offset x = -1, blur = 3
// shadow bottom offset x = 5, blur = 10
// circle image origin size = 40
const SHADOW_SIZE_COEFFICIENT = 1.475; // (origin size + sum of both offsets) / origin size
const SHADOW_TRANSLATE_COEFFICIENT = 0.068; // sum of top offsets / origin size

export function Circle({
  withShadow,
  size,
  Icon,
  contentSize,
  imageSource,
  style,
  iconColor,
  badge,
}) {
  return (
    <View style={[styles.circle, { width: size, height: size, borderRadius: size / 2 }, style]}>
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
              ],
            },
          ]}
          source={Shadow}
        />
      )}
      {!!Icon && <Icon color={iconColor} size={contentSize} />}
      {!!imageSource && <Image style={{ resizeMode: "contain", width: contentSize, height: contentSize }} source={imageSource} />}
      {
        !!badge && (
          <View style={[styles.badge, { zIndex: 3, top: 0, right: 0 }]}>
            {badge}
          </View>
        )
      }
    </View>
  );
}

Circle.propTypes = {
  Icon: PropTypes.func,
  imageSource: PropTypes.any,
  size: PropTypes.number,
  contentSize: PropTypes.number,
  withShadow: PropTypes.bool,
  style: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.object]),
  iconColor: PropTypes.string,
  Badge: PropTypes.any,
};

Circle.defaultProps = {
  Icon: null,
  imageSource: null,
  size: DEFAULT_SIZE,
  contentSize: DEFAULT_CONTENT_SIZE,
  withShadow: true,
  style: {},
  iconColor: textWhite,
  Badge: null,
};

export function CircleBtn({
  label,
  Icon,
  imageSource,
  style,
  circleStyle,
  badge,
  size,
  contentSize,
  withShadow,
  onPress,
}) {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
    >
      <Circle
        withShadow={withShadow}
        size={size}
        Icon={Icon}
        contentSize={contentSize}
        imageSource={imageSource}
        style={circleStyle}
        badge={badge}
      />
      {label && (
        <CustomText
          size={12}
          color={"greyPrimary"}
          align={"center"}
          style={[styles.label]}
          numberOfLines={2}
        >
          {label}
        </CustomText>
      )}
    </TouchableOpacity>
  );
}

CircleBtn.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  Icon: PropTypes.func,
  imageSource: PropTypes.any,
  style: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.object]),
  circleStyle: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.object]),
  size: PropTypes.number,
  contentSize: PropTypes.number,
  withShadow: PropTypes.bool,
  badge: PropTypes.any,
  onPress: PropTypes.func,
};

CircleBtn.defaultProps = {
  label: null,
  Icon: null,
  imageSource: null,
  style: {},
  circleStyle: {},
  size: DEFAULT_SIZE,
  contentSize: DEFAULT_CONTENT_SIZE,
  withShadow: true,
  badge: null,
  onPress: () => {},
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    position: "relative",
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
    marginTop: 6,
  },
  badge: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: active,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
});

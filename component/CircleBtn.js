import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';

import { CustomText } from './CustomText';
import Shadow from '../assets/grayShadow.png';

export function CircleBtn({ label = "", Icon = null, style = {}, styleCircle = {}, styleShadow = {} }) {
  return (
    <TouchableOpacity style={[styles.container, style]}>
      <View style={[styles.circle, styleCircle]}>
        <Image
          style={[styles.shadow, styleShadow]}
          source={Shadow}
        />
          <Icon />
      </View>
      {label && (
        <CustomText
          size={12}
          color={"secondary"}
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
    flex: 1,
  },
  circle: {
    width: 70,
    height: 70,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  shadow: {
    position: "absolute",
    width: 80,
    height: 80,
    top: "50%",
    left: "50%",
    transform: [{ translateY: -32 }, { translateX: -32 }],
  },
  label: {
    textAlign: "center",
    marginTop: -12,
  },
});

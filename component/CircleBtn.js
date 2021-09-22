import React from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';

import { color } from '../styles/color.theme';
import { globalStyles } from '../styles/global';
import Shadow from '../assets/circleBtnShadow.png';

export function CircleBtn({ label = "", Icon = null, style = {} }) {
  return (
    <TouchableOpacity style={[styles.container, style]}>
      <View style={styles.circle}>
        <Image
          style={styles.shadow}
          source={Shadow}
        />
        <View style={styles.icon}>
          <Icon />
        </View>
      </View>
      {label && (
        <Text
          style={[globalStyles.secondaryText, styles.label]}
          numberOfLines={2}
        >
          {label}
        </Text>
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
    width: 75,
    height: 75,
    top: "50%",
    left: "50%",
    transform: [{ translateY: -32 }, { translateX: -32 }],
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: color.bg.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    textAlign: "center",
    marginTop: -12,
  },
});

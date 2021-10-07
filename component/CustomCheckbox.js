import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';

import { CustomText } from './CustomText';
import { CheckBoxIcon } from './Icons';
import { textWhite, active } from '../styles/color.theme';

export function CustomCheckbox({
  size,
  color,
  label,
  labelStyle,
  labelColor,
  style,
  onChange,
}) {
  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked(!checked);

    onChange(!checked);
  };

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      underlayColor="transparent"
      onPress={handleChange}
    >
      <View
        style={[
          styles.checkbox,
          {
            width: size,
            height: size,
            backgroundColor: checked ? color : "transparent",
            borderColor: color,
          }
        ]}
      >
        <View style={styles.centeredWrapper}>
          {checked ? <CheckBoxIcon /> : null}
        </View>
      </View>
      <CustomText
        size={12}
        color={labelColor}
        style={[styles.labelStyle, labelStyle]}
      >
        {label}
      </CustomText>
    </TouchableOpacity>
  );
}

CustomCheckbox.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  label: PropTypes.string,
  labelStyle: PropTypes.object,
  labelColor: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.object]),
  onChange: PropTypes.func,
};

CustomCheckbox.defaultProps = {
  size: 23,
  color: active,
  label: "",
  labelStyle: {},
  labelColor: textWhite,
  style: {},
  onChange: () => {},
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    borderRadius: 2,
    borderWidth: 1,
  },
  centeredWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  labelStyle: {
    flex: 1,
    paddingLeft: 18,
    lineHeight: 16,
  },
});

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, StyleSheet } from 'react-native';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';

import { CustomText } from './CustomText';
import { active, greySecondary, textWhite } from '../styles/color.theme';

export const CustomInput = ({
  value,
  label,
  placeholder,
  direction,
  editable,
  autoFocus,
  selectionColor,
  containerStyle,
  inputStyle,
  isInsideBottomSheet,
  onChangeText,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleInputFocus = () => setIsFocused(true);

  const handleInputBlur = () => setIsFocused(false);

  return (
    <View
      style={[
        styles.container,
        containerStyle,
        { flexDirection: direction },
      ]}
    >
      <CustomText
        size={12}
        color={'greySecondary'}
        style={[styles.label]}
      >
        {label}
      </CustomText>
      {
        isInsideBottomSheet ? (
          <BottomSheetTextInput
            value={props.defaultValue ? null : value}
            defaultValue={value}
            placeholder={placeholder}
            editable={editable}
            autoFocus={autoFocus}
            selectionColor={selectionColor}
            style={[styles.input, inputStyle, { borderBottomColor: isFocused ? active : textWhite }]}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onChangeText={onChangeText}
            {...props}
          />
        ) : (
          <TextInput
            value={props.defaultValue ? null : value}
            defaultValue={value}
            placeholder={placeholder}
            editable={editable}
            autoFocus={autoFocus}
            selectionColor={selectionColor}
            style={[styles.input, inputStyle, { borderBottomColor: isFocused ? active : textWhite }]}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onChangeText={onChangeText}
            {...props}
          />
        )
      }

    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  label: {
    paddingHorizontal: 12,
    lineHeight: 14,
    marginBottom: 6,
  },
  input: {
    height: 46,
    width: "100%",
    borderBottomWidth: 1,
    color: textWhite,
    paddingHorizontal: 12,
    fontFamily: "Play-Regular",
    fontSize: 14,
  },
});

CustomInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string,
  placeholder: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  direction: PropTypes.oneOf(['row', 'column']),
  editable: PropTypes.bool,
  autoFocus: PropTypes.bool,
  selectionColor: PropTypes.string,
  containerStyle: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.object]),
  inputStyle: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.object]),
  isInsideBottomSheet: PropTypes.bool,
  onChangeText: PropTypes.func,
};

CustomInput.defaultProps = {
  value: "",
  label: null,
  placeholder: "",
  placeholderTextColor: greySecondary,
  direction: 'column',
  editable: true,
  autoFocus: false,
  selectionColor: active,
  containerStyle: {},
  inputStyle: {},
  isInsideBottomSheet: false,
  onChangeText: () => {},
};

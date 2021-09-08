import { StyleSheet } from 'react-native';
import { color } from './color.theme';

export const globalStyles = StyleSheet.create({
  primaryText: {
    color: color.text.primary,
    fontSize: 14,
  },
  secondaryText: {
    color: color.text.secondary,
    fontSize: 12,
  },
  successText: {
    color: color.success,
  },
  errorText: {
    color: color.danger,
  },
});

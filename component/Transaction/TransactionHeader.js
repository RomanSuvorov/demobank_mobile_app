import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { globalStyles } from '../../styles/global';

export function TransactionHeader({ title }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={globalStyles.secondaryText}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    alignItems: "center",
  },
});

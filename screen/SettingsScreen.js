import React, { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

import { Profile } from '../component/Profile';
import { BottomSheet } from '../component/BottomSheet';
import { SettingsBottomSheet } from '../component/SettingsBottomSheet';
import { deviceSize, StatusBarHeight } from '../sdk/helper';
import { getProfileAction } from '../store/app/actions';
import { GLOB_VAR } from '../styles/global';

const { height, width } = deviceSize;

export function SettingsScreen() {
  const snapPoints = useMemo(() => [GLOB_VAR.INITIAL_SETTINGS_SNAP_POINT, GLOB_VAR.SECOND_SNAP_POINT_SETTINGS], []);
  const currentIndex = useSharedValue(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileAction());
  }, []);

  return (
    <View style={styles.container}>
      <Profile currentIndex={currentIndex} />
      <BottomSheet
        snapPoints={snapPoints}
        currentIndex={currentIndex}
        content={() => <SettingsBottomSheet />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    height,
    paddingTop: StatusBarHeight,
  },
});

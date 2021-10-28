import React, { useEffect, useMemo, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

import { Profile } from '../component/Profile';
import { BottomSheet } from '../component/BottomSheet';
import { SettingsBottomSheetNavigator } from '../navigation/SettingsBottomSheetNavigator';
import { deviceSize, StatusBarHeight } from '../sdk/helper';
import { getProfileAction } from '../store/app/actions';
import { GLOB_VAR } from '../styles/global';

const { height, width } = deviceSize;

export function SettingsTabScreen({ navigation }) {
  const snapPoints = useMemo(() => [GLOB_VAR.INITIAL_SETTINGS_SNAP_POINT, GLOB_VAR.SECOND_SNAP_POINT_SETTINGS], []);
  const currentIndex = useSharedValue(0);
  const dispatch = useDispatch();
  const bSheetRef = useRef(null);

  useEffect(() => {
    dispatch(getProfileAction());
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('state', (e) => {
      bSheetRef.current.snapToIndex(0);
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Profile currentIndex={currentIndex} />
      <BottomSheet
        snapPoints={snapPoints}
        currentIndex={currentIndex}
        content={() => <SettingsBottomSheetNavigator />}
        bottomSheetRef={bSheetRef}
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

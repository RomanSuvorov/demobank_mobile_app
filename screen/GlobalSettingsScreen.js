import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { MaterialIcons, FontAwesome, Ionicons } from '@expo/vector-icons';
import { CommonActions } from '@react-navigation/native';

import { GoToButton } from '../component/GoToButton';
import { FingerPrintIcon } from '../component/Icons';
import { dark, textWhite } from '../styles/color.theme';
import { SCREEN_NAMES } from '../styles/constants';

export function GlobalSettingsScreen({ navigation, route }) {
  const isPasscodeSet = useSelector(state => state.app.isPasscodeSet);

  useEffect(() => {
    if (!isPasscodeSet) return;
    // get this params from lock screen to authenticate navigation to "toPath" route;
    if (route.params?.authed && route.params?.toPath) {
      // when lock screen authed, go to "toPath"
      navigation.navigate(route.params?.toPath);
      // reset navigation store for current route, for repeating this behaviour;
      navigation.dispatch(CommonActions.setParams({ authed: false, toPath: undefined }));
    }
  }, [route.params?.authed, route.params?.toPath]);

  const handleGoToSecurity = () => {
    if (isPasscodeSet) {
      navigation.navigate(
        SCREEN_NAMES.LOCAL_AUTH_SCREEN,
        {
          fromPath: SCREEN_NAMES.GLOBAL_SETTINGS_SCREEN,
          toPath: SCREEN_NAMES.SECURITY_SETTINGS_SCREEN,
        }
      );
    } else {
      navigation.navigate(SCREEN_NAMES.SECURITY_SETTINGS_SCREEN);
    }
  };

  return (
    <View style={styles.container}>
      <GoToButton
        to={SCREEN_NAMES.SERVER_SETTINGS_SCREEN}
        Icon={(
          <Ionicons
            name="git-network-outline"
            size={24}
            color={textWhite}
          />
        )}
      >
        Сервер
      </GoToButton>

      <GoToButton
        onPress={handleGoToSecurity}
        Icon={(
          <FingerPrintIcon
            color={textWhite}
          />
        )}
      >
        Безопасность
      </GoToButton>

      <GoToButton
        disabled={true}
        Icon={(
          <Ionicons
            name="language"
            size={24}
            color={textWhite}
          />
        )}
      >
        Язык интерфейса
      </GoToButton>

      <GoToButton
        disabled={true}
        Icon={(
          <FontAwesome
            name="dollar"
            size={24}
            color={textWhite}
          />
        )}
      >
        Валюта
      </GoToButton>

      <GoToButton
        disabled={true}
        Icon={(
          <Ionicons
            name="sunny-outline"
            size={24}
            color={textWhite}
          />
          // Icon={<Ionicons name="moon-outline" size={24} color={textWhite} />}
        )}
      >
        Тема
      </GoToButton>

      <GoToButton
        disabled={true}
        Icon={(
          <MaterialIcons
            name="privacy-tip"
            size={24}
            color={textWhite}
          />
        )}
      >
        Условия и положение
      </GoToButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: dark,
    paddingHorizontal: 18,
    paddingVertical: 24,
  },
});

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialIcons, FontAwesome, Ionicons } from '@expo/vector-icons';

import { GoToButton } from '../component/GoToButton';
import { FingerPrintIcon } from '../component/Icons';
import { StatusBarHeight } from '../sdk/helper';
import { dark, textWhite } from '../styles/color.theme';
import { SCREEN_NAMES } from '../styles/constants';

export function GlobalSettingsScreen({ navigation }) {
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
        to={SCREEN_NAMES.SECURITY_SETTINGS_SCREEN}
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
    paddingVertical: StatusBarHeight,
  },
});

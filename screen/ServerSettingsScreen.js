import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, StyleSheet } from 'react-native';

import { CustomInput } from '../component/CustomInput';
import { CustomButton } from '../component/CustomButton';
import { saveServerAction } from '../store/app/actions';
import { StatusBarHeight } from '../sdk/helper';
import { dark } from '../styles/color.theme';

export function ServerSettingsScreen({ navigation }) {
  const [configUrlTemp, setConfigUrlTemp] = useState("");
  const [networkTemp, setNetworkTemp] = useState("");
  const configUrl = useSelector(state => state.app.configUrl);
  const network = useSelector(state => state.app.network);
  const dispatch = useDispatch();

  useEffect(() => {
    setConfigUrlTemp(configUrl);
    setNetworkTemp(network);
  }, [configUrl, network]);

  const handleChangeConfigUrl = (value) => {
    setConfigUrlTemp(value);
  };

  const handleChangeNetwork = (value) => {
    setNetworkTemp(value);
  };

  const handleSaveChange = () => {
    dispatch(saveServerAction({ configUrl: configUrlTemp, network: networkTemp }));
  };

  return (
    <View style={styles.container}>
      <CustomInput
        label={"URL-адрес конфигурации"}
        placeholder={"config URL"}
        defaultValue={configUrlTemp}
        containerStyle={styles.input}
        onChangeText={handleChangeConfigUrl}
      />

      <CustomInput
        label={"Blockchain ID"}
        placeholder={"blockchainID"}
        defaultValue={networkTemp}
        containerStyle={styles.input}
        onChangeText={handleChangeNetwork}
      />

      <CustomButton
        onPress={handleSaveChange}
      >
        Сохранить
      </CustomButton>
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
  input: {
    marginBottom: 36,
  },
});

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, StyleSheet } from 'react-native';

import { CustomInput } from '../component/CustomInput';
import { CustomButton } from '../component/CustomButton';
import { InfoRow } from '../component/InfoRow';
import { saveServerAction } from '../store/app/actions';
import { StatusBarHeight } from '../sdk/helper';
import { dark } from '../styles/color.theme';

export function ServerSettingsScreen({ navigation }) {
  const [configUrlTemp, setConfigUrlTemp] = useState("");
  const [networkTemp, setNetworkTemp] = useState("");
  const configUrl = useSelector(state => state.app.configUrl);
  const gnn = useSelector(state => state.app.gnn);
  const status = useSelector(state => state.app.status);
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

  const checkIfChanged = () => {
    return configUrlTemp === configUrl && networkTemp === network;
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
        containerStyle={styles.inputContainer}
        onChangeText={handleChangeConfigUrl}
      />

      <CustomInput
        label={"Blockchain ID"}
        placeholder={"blockchainID"}
        defaultValue={networkTemp}
        containerStyle={styles.inputContainer}
        onChangeText={handleChangeNetwork}
      />

      <InfoRow
        label={"Количество узлов"}
        value={gnn}
        widthBorder={false}
      />
      <InfoRow
        label={"Статус сервера"}
        value={status}
        containerStyle={styles.inputContainer}
        widthBorder={false}
      />

      <CustomButton
        disabled={checkIfChanged()}
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
  inputContainer: {
    marginBottom: 36,
  },
  readOnlyInputContainer: {
    justifyContent: "space-between"
  },
  readOnlyInput: {
    borderBottomWidth: 0,
    textAlign: "right",
    width: "60%",
  },
});

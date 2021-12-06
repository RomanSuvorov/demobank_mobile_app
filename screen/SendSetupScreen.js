import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getStringAsync } from 'expo-clipboard';

import { CustomInput } from '../component/CustomInput';
import { InfoRow } from '../component/InfoRow';
import { CustomButton } from '../component/CustomButton';
import { dark } from '../styles/color.theme';
import { StatusBarHeight } from '../sdk/helper';
import { validateAddress } from '../sdk/wallet';
import { SCREEN_NAMES } from '../styles/constants';
import WalletTypes from '../store/wallet/types';

export function SendSetupScreen({ navigation }) {
  const [receiverError, setReceiverError] = useState(null);
  const [amountError, setAmountError] = useState(null);
  const amountValue = useSelector(state => state.wallet.amountValue);
  const receiverAddress = useSelector(state => state.wallet.receiverAddress);
  const balance = useSelector(state => state.wallet.balance);
  // TODO: change it when wallet has puts
  const putSymbol = useSelector(state => state.wallet.putSymbol);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch({ type: WalletTypes.RESET_SEND_VALUES });
    };
  }, [])

  const handleChangeAmountValue = (value) => {
    dispatch({ type: WalletTypes.CHANGE_AMOUNT_VALUE, payload: value });
  };

  const handleSetToMaxAmount = () => {
    dispatch({ type: WalletTypes.CHANGE_AMOUNT_VALUE, payload: JSON.stringify(balance) });
  };

  const handleChangeReceiverAddressValue = (value) => {
    dispatch({ type: WalletTypes.CHANGE_RECEIVE_ADDRESS, payload: value });
  };

  const handlePasteReceiveAddress = async () => {
    try {
      const text = await getStringAsync();
      dispatch({ type: WalletTypes.CHANGE_RECEIVE_ADDRESS, payload: text });
    } catch (e) {
      console.error(e);
    }
  };

  const handleScanAddress = async () => {
    navigation.navigate(SCREEN_NAMES.QR_SCANNER_SCREEN);
  };

  const handleContinue = () => {
    let isValid = true;

    if (amountValue > balance) {
      setAmountError(`Указаное количество ${putSymbol} превышает текущий баланс`);
      isValid = false;
    } else if (amountValue === "" || amountValue === "undefined") {
      setAmountError(`Введите количество ${putSymbol} для отправки`);
      isValid = false;
    } else {
      setAmountError(null);
    }

    const isAddressValid = validateAddress(receiverAddress);
    if (!isAddressValid) {
      setReceiverError('Неверный адрес');
      isValid = false;
    } else if (receiverAddress === "" || receiverAddress === "undefined") {
      setReceiverError("Введите адрес получателя");
      isValid = false;
    } else {
      setReceiverError(null);
    }

    if (!isValid) return;

    navigation.navigate(SCREEN_NAMES.SEND_CONFIRM_SCREEN);
  };

  return (
    <ScrollView
      overScrollMode={"never"}
      bounces={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps={"always"}
    >
      <CustomInput
        value={amountValue}
        label={`Введите количество ${putSymbol}`}
        placeholder={"0"}
        keyboardType={"numeric"}
        autoFocus={true}
        buttons={[{
          text: "MAX",
          onPress: handleSetToMaxAmount,
        }]}
        onChangeText={handleChangeAmountValue}
        error={amountError}
      />
      <InfoRow
        label={"Ваш баланс"}
        value={`${balance} ${putSymbol}`}
        widthBorder={false}
        containerStyle={{ paddingTop: 6, marginBottom: 24 }}
      />

      <CustomInput
        value={receiverAddress}
        label={"Введите адрес получателя"}
        containerStyle={{ marginBottom: 24 }}
        buttons={[
          {
            text: "Paste",
            onPress: handlePasteReceiveAddress,
          },
          {
            text: "Scan",
            onPress: handleScanAddress,
          }
        ]}
        onChangeText={handleChangeReceiverAddressValue}
        error={receiverError}
      />

      <CustomButton
        disabled={!amountValue || !receiverAddress}
        onPress={handleContinue}
      >
        Продолжить
      </CustomButton>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: dark,
  },
  contentContainer: {
    paddingVertical: StatusBarHeight,
    paddingHorizontal: 18,
  },
  btnWrapper: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginVertical: 12,
  },
});

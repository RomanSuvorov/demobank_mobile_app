import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import { CustomInput } from '../component/CustomInput';
import { InfoRow } from '../component/InfoRow';
import { CustomButton } from '../component/CustomButton';
import { dark } from '../styles/color.theme';
import { StatusBarHeight } from '../sdk/helper';

export function SendSetupScreen({ navigation }) {
  const [amountValue, setAmountValue] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");
  const [errorState, setErrorState] = useState({
    amount: null,
    receiver: null,
  });
  const balance = useSelector(state => state.wallet.balance);
  // TODO: change it when wallet has puts
  const putSymbol = useSelector(state => state.wallet.putSymbol);

  const handleChangeAmountValue = (value) => {
    if (value[0] === "0" && value[1] === "0") {
      setAmountValue(value.substring(1));
      return;
    }
    setAmountValue(value);
  };

  const handleSetToMaxAmount = () => {
    setAmountValue(JSON.stringify(balance));
  };

  const handleChangeReceiverAddressValue = (value) => {
    setReceiverAddress(value);
  };

  const handlePasteReceiveAddress = () => {

  };

  const handleContinue = () => {
    let isValid = true;

    if (amountValue > balance) {
      setErrorState({
        ...errorState,
        amount: `Указаное количество ${putSymbol} превышает текущий баланс`,
      });
      isValid = false;
    }
    if (amountValue === "" || amountValue === "undefined") {
      setErrorState({
        ...errorState,
        amount: `Введите количество ${putSymbol} для отправки`,
      });
      isValid = false;
    }

    if (!isValid) return;

    setErrorState({
      amount: null,
      receiver: null,
    });
  };

  return (
    <ScrollView
      overScrollMode={"never"}
      bounces={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTap={"always"}
    >
      <CustomInput
        value={amountValue}
        label={`Введите количество ${putSymbol}`}
        placeholder={"0"}
        keyboardType={"numeric"}
        buttons={[{
          text: "MAX",
          onPress: handleSetToMaxAmount,
        }]}
        onChangeText={handleChangeAmountValue}
        error={errorState.amount}
      />
      <InfoRow
        label={"Ваш баланс"}
        value={`${balance} ${putSymbol}`}
        widthBorder={false}
        containerStyle={{ paddingTop: 6, marginBottom: 24 }}
      />

      <CustomInput
        value={receiverAddress}
        label={"Введите адресс получателя"}
        containerStyle={{ marginBottom: 24 }}
        buttons={[
          {
            text: "Paste",
            onPress: handlePasteReceiveAddress,
          },
          {
            text: "Scan",
            onPress: () => {},
          }
        ]}
        onChangeText={handleChangeReceiverAddressValue}
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

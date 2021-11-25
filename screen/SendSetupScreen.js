import React, { useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import { CustomInput } from '../component/CustomInput';
import { InfoRow } from '../component/InfoRow';
import { CustomButton } from '../component/CustomButton';
import { dark } from '../styles/color.theme';
import { StatusBarHeight } from '../sdk/helper';

export function SendSetupScreen({ navigation }) {
  const [isAmountUSD, setIsAmountUSD] = useState(false);
  const [amountValue, setAmountValue] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");
  const balance = useSelector(state => state.wallet.balance);
  // TODO: change it when wallet has puts
  const putSymbol = useSelector(state => state.wallet.putSymbol);

  const handleChangeAmountMode = () => {
    setIsAmountUSD(!isAmountUSD);
    setAmountValue("");
  };

  const handleChangeAmountValue = (value) => {
    if (value[0] === "0") {
      setAmountValue(value.substring(1));
      return;
    }
    setAmountValue(value);
  };

  const handleChangeReceiverAddressValue = (value) => {
    setReceiverAddress(value);
  };

  const handleContinue = () => {

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
        label={`Введите количество ${isAmountUSD ? "USD" : putSymbol}`}
        placeholder={"0"}
        keyboardType={"numeric"}
        onChangeText={handleChangeAmountValue}
      />

      <View style={styles.btnWrapper}>
        <CustomButton onPress={() => {}}>MAX</CustomButton>
        {
          isAmountUSD ? (
            <CustomButton
              style={{ marginLeft: 18 }}
              onPress={handleChangeAmountMode}
            >
              USD
            </CustomButton>
          ) : (
            <CustomButton
              style={{ marginLeft: 18 }}
              onPress={handleChangeAmountMode}
            >
              {putSymbol}
            </CustomButton>
          )
        }
      </View>

      <InfoRow
        label={"Ваш баланс"}
        value={`${balance} ${putSymbol}`}
        widthBorder={false}
        containerStyle={{ paddingTop: 12, marginBottom: 24 }}
      />
      <CustomInput
        value={receiverAddress}
        label={"Введите адресс получателя"}
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

import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, StyleSheet, Platform } from 'react-native';
import { Ionicons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';

import { CustomText } from '../component/CustomText';
import { CircleBtn } from '../component/CircleBtn';
import { StatusBarHeight } from '../sdk/helper';
import { textWhite, active, darkGrey } from '../styles/color.theme';
import { deviceSize } from '../sdk/helper';

const { width } = deviceSize;

export function LocalAuthorizationScreen({ navigation, route }) {
  const { fromPath, toPath } = route.params;
  const [code, setCode] = useState("");
  const numbers = [["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"], ['bio', "0", 'del']];
  const codeCircle = new Array(6).fill("");

  useEffect(() => {
    if (code.length === 6) {
      checkLocalCode();
    }
  }, [code]);

  const handlePress = value => {
    if (code.length > 5) return;
    const newCode = code + value;
    setCode(newCode);
  };

  const checkLocalCode = () => {
    navigation.navigate({ name: fromPath, params: { authed: true, toPath: toPath }, merge: true});
  };

  const handleActivateBiometric = () => {
    console.log("handleActivateBiometric");
  };

  const handleDelLastSymbol = () => {
    if (!code) return;
    const newCode = code.slice(0, -1);
    setCode(newCode);
  };

  const faceId = true;
  const isSupported = true;
  const getBiometricIcon = () => {
    return () => (
      <MaterialCommunityIcons
        name={faceId ? "face-recognition" : "fingerprint"}
        size={30}
        color={textWhite}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.lockIconContainer}>
        <Ionicons name="lock-closed" size={36} color={textWhite} />
      </View>
      <View style={styles.passcodeContainer}>
        <CustomText size={18}>Введите ваш пароль</CustomText>
        <View style={styles.codeContainer}>
          {
            codeCircle.map((c, index) => (
              <View
                key={index}
                style={[styles.codeItem, { backgroundColor: !code[index] ? "transparent" : active }]}
              />
            ))
          }
        </View>
      </View>
      <View style={styles.numberWrapper}>
        <View style={[styles.numbersContainer]}>
          {
            numbers.map((row, index) => (
              <View
                key={index}
                style={styles.numbersRow}
              >
                {row.map(item => {
                  if (item === "bio") {
                    if (isSupported) {
                      return (
                        <CircleBtn
                          key={index + item}
                          size={75}
                          style={[styles.number]}
                          Icon={getBiometricIcon()}
                          onPress={handleActivateBiometric}
                        />
                      );
                    } else {
                      return (
                        <View
                          key={index + item}
                          style={[
                            styles.number,
                            { width: 75, backgroundColor: "transparent" },
                            ]}
                        />
                      );
                    }
                  }

                  if (item === "del") {
                    return (
                      <CircleBtn
                        key={index + item}
                        size={75}
                        style={[styles.number]}
                        Icon={() => <Entypo name="erase" size={30} color={textWhite} />}
                        onPress={handleDelLastSymbol}
                      />
                    );
                  }

                  return (
                    <CircleBtn
                      key={index + item}
                      size={75}
                      style={styles.number}
                      onPress={() => handlePress(item)}
                    >
                      <CustomText size={36}>
                        {item}
                      </CustomText>
                    </CircleBtn>
                  )
                })}
              </View>
            ))
          }
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBarHeight : 0,
    justifyContent: "space-around",
  },
  lockIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 100,
  },
  passcodeContainer: {
    alignItems: "center",
    justifyContent: "space-around",
    height: 120,
  },
  codeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 24,
  },
  codeItem: {
    width: 24,
    margin: 12,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: active,
  },
  codeActiveItem: {
    backgroundColor: active,
  },
  numberWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  numbersContainer: {
    width: width,
    marginTop: 24,
    marginBottom: 60,
  },
  numbersRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  number: {
    margin: 12,
    borderRadius: 75,
    backgroundColor: darkGrey,
    justifyContent: "center",
    alignItems: "center",
  },
});

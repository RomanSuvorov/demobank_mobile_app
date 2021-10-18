import React, { useCallback } from 'react';
import { View, Modal, Pressable, Image, TouchableOpacity, StyleSheet } from 'react-native';

import { CustomText } from './CustomText';
import { CustomButton } from './CustomButton';
import { CloseIcon } from './Icons';
import { deviceSize } from '../sdk/helper';
import SuccessImage from '../assets/successImage.png';

const { height } = deviceSize;

export const CustomModal = ({ navigation, route }) => {
  const { type, text, closeOnOverlay = false } = route.params;

  const handlePressOverlay = () => {
    navigation.popToTop();
  };

  const getColor = useCallback(() => {
    switch (type) {
      case "error":
        return "danger";
      case "success":
      case "info":
      default:
        return "greySecondary";
    }
  }, [type]);

  return (
    <Modal
      animationType={"fade"}
      transparent={true}
      onRequestClose={handlePressOverlay}
    >
      <Pressable
        style={styles.modalOverlay}
        onPress={closeOnOverlay ? handlePressOverlay : null}
      />
      <View style={styles.modalWrapper}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalClose}
            onPress={handlePressOverlay}
          >
            <CloseIcon />
          </TouchableOpacity>
          <Image source={SuccessImage} style={styles.modalImage} />
          <View style={styles.modalContent}>
            <CustomText
              size={12}
              color={getColor()}
              style={styles.modalText}
            >
              {text}
            </CustomText>
            <CustomButton onPress={handlePressOverlay}>
              OK
            </CustomButton>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalWrapper: {
    flex: 1,
    justifyContent: "center",
    margin: 18,
  },
  modalContainer: {
    height: height * 0.5,
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingBottom: 24,
    width: "100%",
  },
  modalImage: {
    height: (height * 0.5) * 0.75,
    width: "100%",
    top: (-(height * 0.5) * 0.75) * 0.1,
    resizeMode: "contain",
    position: "absolute",
  },
  modalContent: {
    justifyContent: "flex-end",
    flex: 1,
  },
  modalText: {
    marginBottom: 18,
  },
  modalClose: {
    width: 33,
    height: 33,
    borderRadius: 25,
    right: 12,
    top: 12,
    backgroundColor: "#efefef",
    position: "absolute",
    zIndex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
});

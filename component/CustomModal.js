import React, { useCallback } from 'react';
import { View, Modal, Pressable, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { CustomText } from './CustomText';
import { CustomButton } from './CustomButton';
import { CloseIcon } from './Icons';
import { deviceSize } from '../sdk/helper';
import { dark } from '../styles/color.theme';
import SuccessImage from '../assets/successImage.png';
import Types from '../store/app/types';

const { height } = deviceSize;

export const CustomModal = ({ navigation }) => {
  const modalType = useSelector(state => state.app.modal.type);
  const modalText = useSelector(state => state.app.modal.text);
  const modalCloseOnOverlay = useSelector(state => state.app.modal.closeOnOverlay);
  const modalOnClose = useSelector(state => state.app.modal.onClose);
  const modalOnCloseText = useSelector(state => state.app.modal.onCloseText);
  const modalIsFullScreen = useSelector(state => state.app.modal.isFullScreen);
  const dispatch = useDispatch();

  const handlePressOverlay = () => {
    if (!modalIsFullScreen) {
      navigation.popToTop();
      dispatch({ type: Types.CLOSE_MODAL });
    }

    if (modalOnClose && typeof modalOnClose === "function") {
      modalOnClose();
    }
  };

  const getColor = useCallback(() => {
    switch (modalType) {
      case "error":
        return "danger";
      case "success":
      case "info":
      default:
        return "greySecondary";
    }
  }, [modalType]);

  const HEIGHT_OF_MODAL_CONTAINER = modalIsFullScreen ? height : height * 0.5;

  return (
    <Modal
      animationType={"fade"}
      transparent={true}
      onRequestClose={handlePressOverlay}
    >
      <Pressable
        style={styles.modalOverlay}
        onPress={modalCloseOnOverlay ? handlePressOverlay : null}
      />
      <View style={[styles.modalWrapper, { margin: modalIsFullScreen ? 0 : 18, }]}>
        <View style={[
          styles.modalContainer,
          {
            height: HEIGHT_OF_MODAL_CONTAINER,
            backgroundColor: modalIsFullScreen ? dark : "white",
          }
          ]}
        >
          {
            !modalIsFullScreen && (
              <TouchableOpacity
                style={styles.modalClose}
                onPress={handlePressOverlay}
              >
                <CloseIcon />
              </TouchableOpacity>
            )
          }

          <Image
            source={SuccessImage}
            style={[styles.modalImage, {
              height: HEIGHT_OF_MODAL_CONTAINER * 0.75,
              top: modalIsFullScreen ? 0 : (-HEIGHT_OF_MODAL_CONTAINER * 0.75) * 0.1,
              position: modalIsFullScreen ? "relative" : "absolute",
            }]}
          />
          <View style={[styles.modalContent, { justifyContent: modalIsFullScreen ? "flex-start" : "flex-end" }]}>
            <CustomText
              size={12}
              color={getColor()}
              style={styles.modalText}
              align={'center'}
            >
              {modalText}
            </CustomText>
            <CustomButton onPress={handlePressOverlay}>
              {modalOnCloseText}
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
  },
  modalContainer: {
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingBottom: 24,
    width: "100%",
  },
  modalImage: {
    width: "100%",
    resizeMode: "contain",
  },
  modalContent: {
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

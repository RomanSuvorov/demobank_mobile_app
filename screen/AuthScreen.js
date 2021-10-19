import React from 'react';
import { View, ScrollView, Image, StyleSheet } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

import { CustomButton } from '../component/CustomButton';
import { CustomText } from '../component/CustomText';
import { Pagination } from '../component/Pagination';
import { deviceSize, StatusBarHeight } from '../sdk/helper';
import { PAGINATION_HEIGHT} from '../styles/global';
import { SCREEN_NAMES } from '../styles/constants';

const { width, height } = deviceSize;
const slides = [
  {
    image: require("../assets/slideImage1.png"),
    title: "Конфиденциальный и безопасный",
    description: "Приватные ключи не покидают ваше устройство.",
  },
  {
    image: require("../assets/slideImage2.png"),
    title: "Все криптовалюты в одном месте",
    description: "Отслеживай и храни свою криптовалюту безопасно.",
  },
  {
    image: require("../assets/slideImage3.png"),
    title: "Обмен криптовалюты",
    description: "Торгуй криптовалютами анонимно.",
  },
];
const MARGIN_TOP = 24;

export function AuthScreen({ navigation }) {
  const scrollX = useSharedValue(0);

  const handleScroll = ({ nativeEvent }) => scrollX.value = nativeEvent.contentOffset.x;

  const generateNewWallet = () => navigation.navigate(SCREEN_NAMES.GENERATE_WALLET_SCREEN);

  const importWallet = () => navigation.navigate(SCREEN_NAMES.IMPORT_WALLET_SCREEN);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.slides}
        pagingEnabled={true}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        overScrollMode={"never"}
        onScroll={handleScroll}
      >
        {
          slides.map((slide, index) => (
            <View
              key={index}
              style={styles.slideContainer}
            >
              <Image
                source={slide.image}
                style={styles.slideImage}
              />
              <View style={styles.textWrapper}>
                <CustomText
                  size={16}
                  type={"bold"}
                  align={"center"}
                  style={styles.slideTitle}
                >
                  {slide.title}
                </CustomText>
                <CustomText
                  size={12}
                  color={"greySecondary"}
                  align={"center"}
                  style={styles.slideDescription}
                >
                  {slide.description}
                </CustomText>
              </View>
            </View>
          ))
        }
      </ScrollView>
      <View style={styles.buttons}>
        <Pagination
          slides={slides}
          scrollX={scrollX}
          style={styles.sliderPagination}
        />
        <CustomButton onPress={generateNewWallet}>
          Создать новый кошелек
        </CustomButton>
        <CustomButton
          style={styles.transparentButton}
          type={'transparent'}
          onPress={importWallet}
        >
          У меня уже есть кошелек
        </CustomButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: StatusBarHeight,
  },
  slides: {
    flex: 1,
    width: width,
  },
  slideContainer: {
    width: width,
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: PAGINATION_HEIGHT,
  },
  textWrapper: {
    alignItems: "center",
  },
  slideImage: {
    width: width,
    height: height * 0.5,
    resizeMode: "contain",
  },
  slideTitle: {
    marginTop: 6,
    width: width * 0.5,
  },
  slideDescription: {
    marginTop: 6,
    width: width * 0.8,
  },
  sliderPagination: {
    top: -(PAGINATION_HEIGHT + MARGIN_TOP),
  },
  buttons: {
    marginTop: MARGIN_TOP,
    marginBottom: 60,
  },
  transparentButton: {
    marginTop: 12,
  },
});

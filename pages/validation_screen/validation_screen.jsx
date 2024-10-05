import {
  ScrollView,
  Text,
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  Keyboard,
  Animated,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { arrowBack, background, bg2 } from "../../images/images";
import { useEffect, useRef, useState } from "react";
import ValidationForm from "../../components/forms/validation_form";

const ValidationScreen = () => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const fadeAnim = useRef(new Animated.Value(1)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  return (
    <ScrollView
      automaticallyAdjustKeyboardInsets={true}
      style={styles.container}
    >
      {isKeyboardVisible ? fadeOut() : fadeIn()}
      <Animated.View style={{ opacity: fadeAnim, zIndex: 2 }}>
        <SvgXml xml={background} width={windowWidth} style={styles.backgound} />
      </Animated.View>
      <SvgXml
        xml={bg2}
        width={windowWidth}
        style={{ zIndex: 1, position: "absolute" }}
      />

      <View style={styles.header}>
        <View style={styles.headView}>
          <TouchableOpacity style={styles.loginButton}>
            <SvgXml xml={arrowBack} />
            <Text style={styles.loginButtonText}>Войти</Text>
          </TouchableOpacity>
          <Text style={styles.registrationText}>Регистрация</Text>
        </View>
        <Text style={styles.hintText}>Введите ОТР-код</Text>
        <Text style={styles.numberText}>
          Отправлено на номер : (+7) 951 261 40 98
        </Text>
      </View>
      <View style={styles.formView}>
        <ValidationForm />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  backgound: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 2,
  },
  header: {
    paddingHorizontal: 24,
    zIndex: 3,
    marginTop: 40,
  },
  headView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  loginButton: {
    flexDirection: "row",
    backgroundColor: "rgba(232, 240, 249, 1)",
    height: 48,
    paddingHorizontal: 20,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
    gap: 13,
  },
  loginButtonText: {
    fontFamily: "RalewaySemiBold",
    color: "rgba(19, 174, 165, 1)",
  },
  registrationText: {
    color: "rgba(255, 255, 255, 1)",
    fontFamily: "RalewayBold",
    fontSize: 28,
  },
  hintText: {
    fontFamily: "RalewayMedium",
    fontSize: 26,
    color: "white",
    marginTop: 24,
    textAlign: "right",
  },
  numberText: {
    textAlign: "right",
    fontSize: 12,
    fontFamily: "RalewayMedium",
    marginTop: 11,
    color: "white",
  },
  formView: {
    marginTop: 186,
    paddingHorizontal: 24,
  },
});

export default ValidationScreen;

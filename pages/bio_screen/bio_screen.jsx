import {
  ScrollView,
  Text,
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  Modal,
  Image,
  Alert,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { arrowBack, avatar, bg3 } from "../../images/images";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import BioForm from "../../components/forms/bio_form";

const BioScreen = () => {
  const windowWidth = Dimensions.get("window").width;

  const [photo, setPhoto] = useState(avatar); // Состояние для хранения выбранного изображения
  const [modalVisible, setModalVisible] = useState(false);

  const selectPhotoFromLibrary = async () => {
    // Проверяем разрешение на доступ к библиотеке изображений
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Разрешение на доступ", "Разрешите доступ к библиотеке изображений.");
      return;
    }

    // Открываем библиотеку изображений
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const takePhotoWithCamera = async () => {
    // Проверяем разрешение на доступ к камере
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Разрешение на камеру", "Разрешите доступ к камере.");
      return;
    }

    // Открываем камеру
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  return (
    <ScrollView
      automaticallyAdjustKeyboardInsets={true}
      style={styles.container}
    >
      <SvgXml
        xml={bg3}
        width={windowWidth}
        style={{ zIndex: 1, position: "absolute" }}
      />

      <View style={styles.header}>
        <View style={styles.headView}>
          <TouchableOpacity style={styles.loginButton}>
            <SvgXml xml={arrowBack} />
            <Text style={styles.loginText}>Войти</Text>
          </TouchableOpacity>
          <Text style={styles.registrationText}>Регистрация</Text>
        </View>
        <TouchableOpacity
          style={{
            width: 128,
            height: 128,
            marginTop: 22,
            alignSelf: "center",
            position: "relative",
          }}
          onPress={() => setModalVisible(true)}
        >
          {photo ? <Image source={{ uri: photo }} style={{ width: 128, height: 128, borderRadius: 64 }} /> : null}
        </TouchableOpacity>
      </View>
      <View style={styles.formView}>
        <BioForm />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.modalContent}>
          <TouchableOpacity
            style={styles.buttonModal}
            onPress={selectPhotoFromLibrary}
          >
            <Text style={styles.buttonModalText}>Выбрать фото из галереи</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonModal}
            onPress={takePhotoWithCamera}
          >
            <Text style={styles.buttonModalText}>Сделать фото с камеры</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.buttonCloseModal}
          >
            <Text style={styles.buttonCloseModalText}>Закрыть</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
  loginText: {
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
  formView: {
    marginTop: 186,
    paddingHorizontal: 24,
  },
  modalContent: {
    width: "100%",
    height: 300,
    backgroundColor: "rgba(18, 143, 135, 1)",
    position: "absolute",
    bottom: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 20,
    borderTopLeftRadius: 27,
    borderTopRightRadius: 27,
  },
  buttonModal: {
    height: 48,
    backgroundColor: "white",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 27,
  },
  buttonModalText: {
    color: "rgba(19, 174, 165, 1)",
    fontSize: 20,
    fontFamily: "RalewayMedium",
  },
  buttonCloseModal: {
    marginTop: 20,
  },
  buttonCloseModalText: {
    color: "white",
    fontSize: 20,
    fontFamily: "RalewayMedium",
  },
});

export default BioScreen;

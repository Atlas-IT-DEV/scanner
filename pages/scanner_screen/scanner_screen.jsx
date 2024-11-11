import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import BottomMenu from "../../components/bottom_menu/bottom_menu";
import Header from "../../components/header/header";
import BotMessage from "../../components/messages/bot_message";
import { SvgXml } from "react-native-svg";
import { acceptIcon, deleteIcon, man } from "../../images/images";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { useStores } from "../../store/store_context";
import * as ImagePicker from "expo-image-picker";

const ScannerScreen = ({ route }) => {
  const [products, setProducts] = useState([]);
  const [uniqCategories, setUniqCategories] = useState([]);
  const { pageStore } = useStores();
  useEffect(() => {
    const getAllProducts = async () => {
      const response = await fetch(
        "https://orion-lab.tech:8010/products/?dirs=true",
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${pageStore.token}`,
          },
        }
      );
      const result = await response.json();
      setProducts(result);

      const uniqueCategories = [
        ...new Set(result.map((item) => item.category)),
      ];
      setUniqCategories(uniqueCategories);
    };
    getAllProducts();
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [rotated, setRotated] = useState(false);
  const [result, setResult] = useState("");
  const [status, setStatus] = useState(0);
  const [item, setItem] = useState("");

  const [category, setCategory] = useState("");

  const [productModal, setProductModal] = useState(false);
  const [orderModal, setOrderModal] = useState(false);

  useEffect(() => {
    if (photo) {
      performInference();
    }
  }, [photo, item]);

  const openImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Ошибка", "Необходимо разрешение на доступ к галерее.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };
  const performInference = async () => {
    setStatus(1);
    const formData = new FormData();
    formData.append("input", {
      uri: photo,
      type: "image/jpeg",
      name: "man.jpg",
    });
    formData.append("product_id", `${item.id}`);

    try {
      const response = await fetch("https://orion-lab.tech:8010/inference/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${pageStore.token}`,
        },
        body: formData,
      });
      const arrayBuffer = await response.arrayBuffer();
      const base64Image = `data:image/png;base64,${Buffer.from(
        arrayBuffer
      ).toString("base64")}`;
      setResult(base64Image);
      setStatus(2);
    } catch (error) {
      setStatus(3);
      console.error("Ошибка при отправке изображения:", error);
    }
  };

  const filteredCards = category
    ? products.filter((card) => card.category === category)
    : products;
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ImageBackground
        source={require("./../../images/chat_container.png")}
        resizeMode="cover"
        style={{ width: "100%", height: "100%", display: "flex", zIndex: -1 }}
      >
        <ScrollView style={{ marginTop: 80 }}>
          <View style={{ marginTop: 20 }}>
            {!modalVisible && !photo && !item ? <BotMessage /> : null}
          </View>
          <TouchableOpacity onPress={openImagePicker}>
            {photo && !result ? (
              <Image
                source={{ uri: photo }}
                style={styles.man}
                width={modalVisible ? 120 : 160}
                height={modalVisible ? 263 : 340}
              />
            ) : null}
            {photo && result & (status == 1) ? (
              <Image
                source={{ uri: photo }}
                style={styles.man}
                width={modalVisible ? 120 : 160}
                height={modalVisible ? 263 : 340}
              />
            ) : null}

            {!photo && !result ? (
              <SvgXml
                xml={man}
                style={styles.man}
                width={modalVisible ? 120 : 160}
                height={modalVisible ? 263 : 340}
              />
            ) : null}
            {photo && status == 2 ? (
              <Image
                source={{ uri: result }}
                style={styles.man}
                width={modalVisible ? 120 : 160}
                height={modalVisible ? 263 : 340}
              />
            ) : null}
            {status == 1 ? (
              <ActivityIndicator size="large" color="rgba(18, 145, 137, 1)" />
            ) : null}
          </TouchableOpacity>
        </ScrollView>
        {item && !modalVisible ? (
          <TouchableOpacity
            backgroundColor
            style={{
              backgroundColor: "rgba(19, 161, 152, 1)",
              position: "absolute",
              left: 0,
              right: 0,
              marginHorizontal: 27,
              paddingVertical: 15,
              bottom: 70,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 8,
            }}
            onPress={() => setOrderModal(true)}
          >
            <Text
              style={{
                color: "white",
                fontFamily: "RalewayBold",
                fontSize: 12,
              }}
            >
              Оформить заказ
            </Text>
          </TouchableOpacity>
        ) : null}
        <ScrollView
          horizontal
          style={{
            width: "100%",
            position: "absolute",
            left: 0,
            bottom: 20,
            zIndex: 100,
            flexDirection: "row",
            paddingHorizontal: 16,
          }}
        >
          {uniqCategories
            .filter((item) => item != null)
            .map((item) => {
              return (
                <>
                  {!modalVisible ? (
                    <TouchableOpacity
                      style={styles.categoryButton}
                      onPress={() => {
                        setCategory(item);
                        setModalVisible(true);
                      }}
                    >
                      <Text style={styles.categoryText}>
                        {item == "upperbody"
                          ? "Верхняя одежда"
                          : item == "dress"
                          ? "Платье"
                          : null}
                      </Text>
                    </TouchableOpacity>
                  ) : null}
                </>
              );
            })}
        </ScrollView>
      </ImageBackground>
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            width: "100%",
            height: 380,
            padding: 25,
          }}
        >
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={{
              alignItems: "center",
              backgroundColor: "white",
              padding: 10,
              borderRadius: 8,
            }}
          >
            <Text
              style={{
                fontFamily: "RalewayMedium",
                fontSize: 12,
                color: "black",
              }}
            >
              {category == "upperbody"
                ? "Верхняя одежда"
                : category == "dress"
                ? "Платье"
                : null}
            </Text>
          </TouchableOpacity>
          <ScrollView
            style={{
              marginTop: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                columnGap: 24,
                rowGap: 10,
              }}
            >
              {filteredCards.map((item, index) => {
                return (
                  <TouchableOpacity
                    style={{
                      width: 105,
                      height: 97,
                      backgroundColor: "white",
                      borderRadius: 7,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onPress={() => {
                      setModalVisible(false);
                      setProductModal(true);
                      setItem(item);
                    }}
                  >
                    <Image
                      source={{
                        uri: `https://orion-lab.tech:8010/public${item.image.url}`,
                      }}
                      style={{
                        width: 76,
                        height: 76,
                        resizeMode: "cover",
                        borderRadius: 7,
                      }}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </Modal>
      <Modal visible={productModal} animationType="fade" transparent={true}>
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(137, 137, 137, 0.9)",
          }}
        >
          <View
            style={{
              width: 255,
              height: 347,
              backgroundColor: "white",
              borderRadius: 7,
              alignSelf: "center",
              marginVertical: "auto",
              paddingHorizontal: 17,
              paddingVertical: 20,
            }}
          >
            <Image
              source={{
                uri:
                  item == ""
                    ? null
                    : `https://orion-lab.tech:8010/public${item.image.url}`,
              }}
              width={141}
              height={141}
              style={{ alignSelf: "center" }}
            />
            <Text
              style={{
                marginTop: 32,
                fontSize: 16,
                fontFamily: "RalewayRegular",
                color: "black",
              }}
            >
              {item.name}
            </Text>
            <Text
              style={{
                marginTop: 5,
                fontFamily: "RalewayMmedium",
                fontSize: 20,
                color: "black",
              }}
            >
              {item.price} ₽
            </Text>

            <TouchableOpacity
              style={{
                paddingVertical: 15,
                backgroundColor: "rgba(18, 145, 137, 1)",
                marginTop: 20,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 8,
              }}
              onPress={() => {
                setItem(item);
                setProductModal(false);
              }}
            >
              <Text
                style={{
                  fontFamily: "RalewayBold",
                  fontSize: 12,
                  color: "white",
                }}
              >
                Примерить
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={{ position: "absolute", right: 50, top: 160 }}
          onPress={() => {
            setProductModal(false);
            setModalVisible(true);
          }}
        >
          <SvgXml xml={deleteIcon} />
        </TouchableOpacity>
      </Modal>
      <Modal visible={orderModal} transparent={true} animationType="fade">
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(137, 137, 137, 0.9)",
          }}
        >
          <View
            style={{
              width: 255,
              height: 150,
              backgroundColor: "white",
              borderRadius: 7,
              alignSelf: "center",
              marginVertical: "auto",
              paddingHorizontal: 17,
              paddingVertical: 20,
            }}
          >
            <SvgXml xml={acceptIcon} style={{ alignSelf: "center" }} />
            <Text
              style={{
                marginTop: 10,
                fontFamily: "RalewayBold",
                fontSize: 16,
                color: "black",
                alignSelf: "center",
              }}
            >
              Заказ оформлен!
            </Text>
            <Text
              style={{
                marginTop: 5,
                fontSize: 16,
                fontFamily: "RalewayRegular",
                color: "black",
                textAlign: "center",
              }}
            >
              Мы свяжемся с вами для обсуждения деталей заказа.{" "}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{ position: "absolute", right: 50, top: 260 }}
          onPress={() => {
            setOrderModal(false);
          }}
        >
          <SvgXml xml={deleteIcon} />
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    position: "relative",
  },
  man: {
    marginTop: 45,
    alignSelf: "center",
  },
  categoryButton: {
    backgroundColor: "rgba(18, 145, 137, 1)",
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  categoryText: {
    fontSize: 12,
    fontFamily: "RalewayMedium",
    color: "white",
  },
});

export default ScannerScreen;

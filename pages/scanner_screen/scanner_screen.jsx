import {
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
import { man } from "../../images/images";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { useStores } from "../../store/store_context";

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
  const [itemId, setItemId] = useState(1);

  const [category, setCategory] = useState("");

  useEffect(() => {
    if (photo) {
      performInference();
    }
  }, [photo, itemId]);

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
    formData.append("product_id", `${itemId}`);

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
      console.log(base64Image);
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
            {!modalVisible ? <BotMessage /> : null}
          </View>
          <SvgXml
            xml={man}
            style={styles.man}
            width={modalVisible ? 120 : 160}
            height={modalVisible ? 263 : 340}
          />
        </ScrollView>
        <ScrollView
          horizontal
          style={{
            width: "100%",
            position: "absolute",
            left: 0,
            bottom: 120,
            zIndex: 100,
            flexDirection: "row",
            paddingHorizontal: 16,
          }}
        >
          {uniqCategories.map((item) => {
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

      {!modalVisible ? <BottomMenu /> : null}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            width: "100%",
            height: 300,
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
                console.log(index)
                return (
                  <TouchableOpacity
                    style={{
                      width: 105,
                      height: 97,
                      backgroundColor: "white",
                      borderRadius: 7,
                    }}
                  >
                    <Image
                      source={{
                        uri: `https://orion-lab.tech:8010${item.image.url}`,
                      }}
                      style={{ width: 66, height: 66, resizeMode: "cover" }}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>
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

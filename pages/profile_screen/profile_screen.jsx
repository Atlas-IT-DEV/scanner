import React, { useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { avatar, bg4, copyIcon, logoutIcon } from "../../images/images";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import BottomMenu from "../../components/bottom_menu/bottom_menu";
import { useStores } from "../../store/store_context";
import EditModal from "../../components/modals/edit_modal";
import { observer } from "mobx-react-lite";

const ProfileScreen = observer(
  ({ name_profile = "Имя Фамилия", bottomNavigator, route }) => {
    const windowWidth = Dimensions.get("window").width;
    const navigation = useNavigation();

    const [name, setName] = useState(route.params.first_name);
    const [phone, setPhone] = useState(route.params.phoneNumber);
    const [gender, setGender] = useState("male");
    const [birthdate, setBirthdate] = useState(new Date(1997, 0, 12));
    const [email, setEmail] = useState("name.family@mail.ru");
    const [avatarUri, setAvatarUri] = useState(
      "https://reactjs.org/logo-og.png"
    );
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [profileChecked, setProfilechecked] = useState(false);

    const { pageStore } = useStores();

    const onPickImage = async () => {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.canceled) {
        setAvatarUri(result.assets[0].uri);
      }
    };

    const onDateChange = (event, selectedDate) => {
      const currentDate = selectedDate || birthdate;
      setShowDatePicker(false);
      setBirthdate(currentDate);
    };
    const createUser = async () => {
      console.log(route.params);
      const values = {
        id: 0,
        first_name: route.params.first_name.split(" ")[0],
        last_name: route.params.first_name.split(" ")[1],
        phone: route.params.phoneNumber,
        password: "12345",
        data_register: new Date().toISOString().slice(0, 19),
        data_birthday: birthdate.toISOString().slice(0, 19),
        gender: gender,
        role: "USER",
        image_id: 1,
      };
      await pageStore.registerUser(values);
    };

    return (
      <>
        <ScrollView
          automaticallyAdjustKeyboardInsets={true}
          style={styles.container}
        >
          <SvgXml
            xml={bg4}
            width={windowWidth}
            height={150}
            style={styles.header}
          />
          <TouchableOpacity style={styles.avatar} onPress={onPickImage}>
            <Image
              source={{ uri: avatarUri }}
              style={{
                width: 146,
                height: 146,
                borderRadius: 100,
                resizeMode: "cover",
              }}
            />
          </TouchableOpacity>
          <View style={styles.mainInfo}>
            <TextInput
              style={styles.nameText}
              value={name}
              onChangeText={setName}
              placeholder="Имя Фамилия"
            />
            <View style={styles.dataProfile}>
              <View style={styles.dataField}>
                <Text style={styles.attributeField}>Телефон:</Text>
                <TextInput
                  style={styles.valueField}
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                />
              </View>
              <View style={styles.dataField}>
                <Text style={styles.attributeField}>Пол:</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={gender}
                    onValueChange={(itemValue) => setGender(itemValue)}
                    style={styles.picker}
                  >
                    <Picker.Item label="Мужской" value="male" />
                    <Picker.Item label="Женский" value="female" />
                  </Picker>
                </View>
              </View>
              <View style={styles.dataField}>
                <Text style={styles.attributeField}>Дата рождения:</Text>
                <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                  <Text style={styles.valueField}>
                    {birthdate.toLocaleDateString()}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.dataField}>
                <Text style={styles.attributeField}>Email:</Text>
                <TextInput
                  style={styles.valueField}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                />
              </View>
            </View>
          </View>
          <View style={styles.buttonsViewCheck}>
            {!pageStore.registered && (
              <TouchableOpacity
                style={styles.buttonLogoutCheck}
                onPress={() => {
                  createUser();
                }}
              >
                <Text style={styles.logOutTextCheck}>Сохранить</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.buttonsView}>
            <TouchableOpacity
              style={styles.buttonLogout}
              onPress={() => navigation.navigate("LoginScreen")}
            >
              <SvgXml xml={logoutIcon} />
              <Text style={styles.logOutText}>Выйти</Text>
            </TouchableOpacity>
            <EditModal />
          </View>
        </ScrollView>
        {showDatePicker && (
          <DateTimePicker
            value={birthdate}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}
        <BottomMenu />
      </>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  header: {
    zIndex: 1,
    position: "absolute",
    right: 0,
    top: 0,
  },
  avatar: {
    marginTop: 150,
    alignItems: "center",
  },
  mainInfo: {
    marginTop: 30,
    paddingHorizontal: 24,
  },
  nameText: {
    alignSelf: "center",
    fontFamily: "RalewaySemiBold",
    fontSize: 20,
    color: "rgba(44, 45, 58, 1)",
  },
  dataProfile: {
    marginTop: 30,
    gap: 15,
  },
  dataField: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
  },
  attributeField: {
    color: "rgba(104, 106, 138, 1)",
    fontFamily: "RalewayRegular",
    fontSize: 16,
  },
  valueField: {
    color: "rgba(44, 45, 58, 1)",
    fontFamily: "RalewayRegular",
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingBottom: 4,
    width: 180,
  },
  pickerContainer: {
    width: "60%",
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  picker: {
    color: "rgba(44, 45, 58, 1)",
  },
  buttonsView: {
    marginHorizontal: 30,
    marginTop: 15,
    gap: 15,
    marginBottom: 150,
  },
  buttonsViewCheck: {
    marginHorizontal: 30,
    marginTop: 15,
    gap: 15,
  },
  buttonLogout: {
    backgroundColor: "rgba(254, 236, 235, 1)",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 15,
    borderRadius: 8,
  },
  buttonLogoutCheck: {
    backgroundColor: "rgba(18, 145, 137, 0.5)",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 15,
    borderRadius: 8,
  },
  logOutText: {
    color: "rgba(246, 105, 94, 1)",
    fontSize: 16,
    fontFamily: "RalewayMedium",
  },
  logOutTextCheck: {
    color: "rgba(18, 145, 137, 1)",
    fontSize: 16,
    fontFamily: "RalewayMedium",
  },
});

export default ProfileScreen;

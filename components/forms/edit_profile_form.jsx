import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  Platform,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { SvgXml } from "react-native-svg";
import DateTimePicker from "@react-native-community/datetimepicker";

import { arrowDown, calendarIcon } from "../../images/images";

const dataValidationSchema = Yup.object().shape({
  username: Yup.string().required("Введите имя"),
  phoneNumber: Yup.string()
    .matches(/^\+\d+$/, "Номер должен начинаться с + и содержать только цифры")
    .min(12, "Номер слишком короткий")
    .max(15, "Номер слишком длинный")
    .required("Введите номер телефона"),
  gender: Yup.string().required("Выберите пол"),
  email: Yup.string()
    .required("Поле email обязательно для заполнения")
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Введите корректный email"),
});

const EditProfileForm = () => {
  const [state, setState] = useState([false, "+", false, ""]);

  const [date, setDate] = useState([false, new Date(), ""]);
  const copyState = Array.from(state);
  const genders = ["Мужчина", "Женщина"];

  const formatDate = (date) => {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${day < 10 ? `0${day}` : day}/${
      month < 10 ? `0${month}` : month
    }/${year}`;
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date[1];
    setDate((prevState) => [
      prevState[0],
      currentDate,
      formatDate(currentDate),
    ]);

    if (Platform.OS !== "ios") {
      setDate((prevState) => [false, currentDate, formatDate(currentDate)]);
    }
  };

  const toggleModal = () => {
    setDate((prevState) => [!prevState[0], prevState[1], prevState[2]]);
  };

  return (
    <Formik
      initialValues={{
        username: "",
        phoneNumber: "",
        gender: "",
        dateOfBirth: "",
        email: "",
      }}
      validationSchema={dataValidationSchema}
      onSubmit={(values) => {}}
    >
      {({
        handleChange,
        handleSubmit,
        values,
        errors,
        touched,
        handleBlur,
        setFieldValue,
      }) => (
        <>
          <View style={styles.dataView}>
            <View style={styles.dataField}>
              <Text style={styles.nameField}>Имя</Text>
              <View style={styles.InputView}>
                <TextInput
                  placeholder="Ваше имя"
                  placeholderTextColor={"rgba(156, 156, 156, 1)"}
                  style={styles.input}
                  onChangeText={handleChange("username")}
                  onBlur={handleBlur("username")}
                  value={values.username}
                />
              </View>
              {touched.username && errors.username && (
                <Text style={{ color: "red" }}>{errors.username}</Text>
              )}
            </View>
            <View style={styles.dataField}>
              <Text style={styles.nameField}>Номер телефона</Text>
              <View style={styles.InputView}>
                <TextInput
                  keyboardType="phone-pad"
                  placeholder="+7 000 000 00 00"
                  placeholderTextColor={"rgba(156, 156, 156, 1)"}
                  style={styles.input}
                  onChangeText={(text) => {
                    // Запрещаем удаление +, но позволяем вводить только цифры после
                    if (text.startsWith("+")) {
                      setFieldValue("phoneNumber", text);
                    } else {
                      setFieldValue("phoneNumber", "+");
                    }
                  }}
                  onBlur={handleBlur("phoneNumber")}
                  value={values.phoneNumber}
                />
              </View>
              {touched.phoneNumber && errors.phoneNumber && (
                <Text style={{ color: "red" }}>{errors.phoneNumber}</Text>
              )}
            </View>
            <View style={styles.dataField}>
              <Text style={styles.nameField}>Пол</Text>
              <TouchableOpacity
                style={styles.InputView}
                onPress={() => {
                  copyState[2] = true;
                  setState(copyState);
                }}
              >
                <Text style={styles.input}>{state[3] || "Пол"}</Text>
                <SvgXml xml={arrowDown} />
              </TouchableOpacity>
            </View>

            <View style={styles.dataField}>
              <Text style={styles.nameField}>Дата рождения</Text>
              <TouchableOpacity style={styles.InputView} onPress={toggleModal}>
                <Text style={styles.input}>{date[2] || "01/01/2000"}</Text>
                <SvgXml xml={calendarIcon} />
              </TouchableOpacity>
            </View>
            <View style={styles.dataField}>
              <Text style={styles.nameField}>Email</Text>
              <View style={styles.InputView}>
                <TextInput
                  placeholder="Ваша почта"
                  placeholderTextColor={"rgba(156, 156, 156, 1)"}
                  style={styles.input}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />
              </View>
              {touched.email && errors.email && (
                <Text style={{ color: "red" }}>{errors.email}</Text>
              )}
            </View>

            
          </View>

          <Modal
            transparent={true}
            animationType="slide"
            visible={state[2]}
            onRequestClose={() => {
              copyState[2] = false;
              setState(copyState);
            }}
            style={{ height: 100 }}
          >
            <View style={styles.modalOverlay}>
              <Text style={styles.modalTitle}>Выберите пол</Text>
              {genders.map((gender, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.modalOption}
                  onPress={() => {
                    copyState[3] = gender;

                    setFieldValue("gender", gender);
                    copyState[2] = false;
                    setState(copyState);
                  }}
                >
                  <Text style={styles.modalOptionText}>{gender}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </Modal>

          <Modal
            transparent={true}
            animationType="slide"
            visible={date[0]} // modalVisible
            onRequestClose={toggleModal}
          >
            <View style={styles.modalDate}>
              <Text style={styles.modalDateTitle}>Выберите дату рождения</Text>
              <DateTimePicker
                value={date[1]} // birthDate
                mode="date"
                display="spinner"
                onChange={onChange}
                maximumDate={new Date()}
              />
              <TouchableOpacity
                onPress={toggleModal}
                style={styles.modalOption}
              >
                <Text style={styles.modalOptionText}>Применить</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  dataView: {
    gap: 15,
    marginHorizontal: 24,
  },
  dataField: {
    gap: 7,
  },
  InputView: {
    flexDirection: "row",
    height: 50,
    borderColor: "rgba(208, 209, 219, 1)",
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  input: {
    color: "rgba(44, 45, 58, 1)",
    fontSize: 16,
    fontFamily: "RalewayRegular",
    flex: 1,
  },
  modalOverlay: {
    width: "100%",
    position: "absolute",
    height: "30%",
    bottom: 0,
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(18, 145, 137, 1)",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalTitle: {
    color: "white",
    fontFamily: "RalewayMedium",
    fontSize: 20,
  },
  modalOption: {
    backgroundColor: "rgba(232, 240, 249, 1)",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    borderRadius: 26,
  },
  modalOptionText: {
    color: "rgba(19, 174, 165, 1)",
    fontFamily: "RalewayBold",
  },
  nameField: {
    color: "rgba(104, 106, 138, 1)",
    fontFamily: "RalewayRegular",
    fontSize: 12,
  },
  modalDate: {
    position: "absolute",
    width: "100%",
    height: "50%",
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(18, 145, 137, 1)",
    gap: 20,
  },
  modalDateTitle: {
    color: "white",
    fontFamily: "RalewayMedium",
    fontSize: 20,
  },

});
export default EditProfileForm;

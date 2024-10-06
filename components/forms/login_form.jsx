import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { SvgXml } from "react-native-svg";
import {
  continueButtonActive,
  continueButtonInactive,
  rememberActive,
  rememberInactive,
} from "../../images/images";

const phoneValidationSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .matches(/^\+\d+$/, "Номер должен начинаться с + и содержать только цифры")
    .min(12, "Номер слишком короткий")
    .max(15, "Номер слишком длинный")
    .required("Введите номер телефона"),
});
const LoginForm = () => {
  const navigation = useNavigation();
  const [state, setState] = useState([false, "+"]);

  const copyState = Array.from(state);

  return (
    <Formik
      initialValues={{ phoneNumber: "" }}
      validationSchema={phoneValidationSchema}
      onSubmit={(values) => {
        navigation.navigate("ValidationScreen");
      }}
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
          <Text style={styles.headerText}>Вы получите код по sms</Text>
          <View style={styles.phoneView}>
            <TextInput
              keyboardType="phone-pad"
              placeholder="+7 000 000 00 00"
              placeholderTextColor={"rgba(156, 156, 156, 1)"}
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
              style={styles.phoneInput}
            />
          </View>
          {touched.phoneNumber && errors.phoneNumber && (
            <Text style={{ color: "red" }}>{errors.phoneNumber}</Text>
          )}
          <View style={styles.bottomView}>
            <TouchableOpacity
              style={styles.rememberButton}
              onPress={() => {
                copyState[0] = !copyState[0];
                setState(copyState);
              }}
            >
              <SvgXml xml={state[0] ? rememberActive : rememberInactive} />
              <Text style={styles.rememberButtonText}>Запомнить меня</Text>
            </TouchableOpacity>

            <TouchableOpacity
              disabled={errors.phoneNumber ? true : false}
              onPress={handleSubmit}
            >
              <SvgXml
                xml={
                  errors.phoneNumber
                    ? continueButtonInactive
                    : continueButtonActive
                }
              />
            </TouchableOpacity>
          </View>
        </>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  headerText: {
    textAlign: "center",
    fontFamily: "RalewayRegular",
    fontSize: 18,
  },
  phoneView: {
    marginTop: 22,
    paddingVertical: 14,
    borderBottomColor: "rgba(95, 95, 95, 1)",
    borderBottomWidth: 2.75,
  },
  phoneInput: {
    color: "rgba(95, 95, 95, 1)",
    fontSize: 22,
    backgroundColor: "white",
  },
  bottomView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 22,
  },
  rememberButton: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  rememberButtonText: {
    fontFamily: "RalewayBold",
    fontSize: 12,
    color: "rgba(95, 95, 95, 1)",
    lineHeight: 14.09,
  },
});

export default LoginForm;

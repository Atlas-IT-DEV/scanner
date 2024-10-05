import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SvgXml } from "react-native-svg";
import * as Yup from "yup";
import {
  clockIcon,
  continueButtonActive,
  continueButtonInactive,
} from "../../images/images";

const verificationSchema = Yup.object().shape({
  verificationCode: Yup.string()
    .matches(/^\d{4}$/, "Код должен содержать 4 цифры")
    .required("Введите код подтверждения"),
});

const ValidationForm = () => {
  const navigation = useNavigation();
  const [code, setCode] = useState([["", "", "", ""], 10, true]);
  const newCode = Array.from(code);
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    newCode[0][index] = value.replace(/[^0-9]/g, "");
    setCode(newCode);

    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    } else if (!value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };
  let verificationCode = "";
  const handleSubmit = (values) => {
    verificationCode = code[0].join("");
    console.log(`Код подтверждения: ${verificationCode}`);

    // navigation.navigate("BioScreen");
  };
  console.log(verificationCode);
  useEffect(() => {
    let interval;
    if (code[2]) {
      // isTimerActive
      interval = setInterval(() => {
        setCode((prev) => {
          if (prev[1] === 1) {
            // timer
            clearInterval(interval);
            return [prev[0], 0, false];
          }
          return [prev[0], prev[1] - 1, true];
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [code[2]]);

  const handleResendCode = () => {
    setCode([["", "", "", ""], 10, true]);
  };

  const formatTimer = (time) => {
    return time < 10 ? `0${time}` : time.toString(); // Добавляем ноль перед однозначными числами
  };
  return (
    <Formik
      initialValues={{ verificationCode: code[0].join("") }}
      validationSchema={verificationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit }) => (
        <View>
          <View style={styles.repeatCodeView}>
            <SvgXml xml={clockIcon} />
            {code[2] ? (
              <Text>00:{formatTimer(code[1])}</Text>
            ) : (
              <TouchableOpacity onPress={handleResendCode}>
                <Text>Повторно отправить код</Text>
              </TouchableOpacity>
            )}
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            {code[0].map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)} // Сохраняем ссылку на input
                style={{
                  borderBottomColor: "rgba(44, 45, 58, 1)",
                  borderBottomWidth: 2.75,
                  marginTop: 22,
                  width: 50,
                  textAlign: "center",
                  fontSize: 35,
                  fontFamily: "RalewayBold",
                  color: "rgba(44, 45, 58, 1)",
                  marginHorizontal: 20,
                }}
                placeholder="0"
                keyboardType="numeric"
                maxLength={1} // Ограничиваем ввод 1 символом
                onChangeText={(value) => handleChange(index, value)}
                value={digit}
              />
            ))}
          </View>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={() => navigation.navigate("BioScreen")}
          >
            <SvgXml
              xml={
                verificationCode.length < 4
                  ? continueButtonActive
                  : continueButtonInactive
              }
            />
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  repeatCodeView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  continueButton: {
    marginTop: 22,
    flexDirection: "row",
    alignSelf: "flex-end",
  },
});

export default ValidationForm;

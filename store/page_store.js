import { makeAutoObservable } from "mobx";
import { Alert } from "react-native";
const baseUrl = "https://orion-lab.tech:8010";

class pageStore {
  email = null;
  registered = false;
  token = null;
  user = {};

  constructor() {
    makeAutoObservable(this);
  }
  registerUser = async (values) => {
    const response = await fetch(baseUrl + "/signup/", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const result = await response.json();
    console.log(result);
    if (response.ok) {
      this.registered = true;
      this.token = result.access_token;
      await this.getMe();
      Alert.alert(
        "Регистрация прошла успешно!",
        `Ваш пароль ${values.password}`
      );
    } else {
      Alert.alert(
        "Во время регистрации произошла ошибка!",
        "Проверьте введенные данные либо попробуйте позже"
      );
      console.log(response, result);
    }
  };
  login = async (values) => {
    const response = await fetch(baseUrl + "/signin/", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const result = await response.json();
    if (response.ok) {
      Alert.alert("Вы успешно вошли в систему");
      console.log(result);
      this.token = result.access_token;
      this.registered = true;
      await this.getMe();
    } else {
      Alert.alert("Ошибка при входе в систему!");
    }
  };
  logout = () => {
    this.token = null;
    this.registered = false;
    this.user = {};
  };
  getMe = async () => {
    const response = await fetch(
      baseUrl + `/get_current_auth_user/?token=${this.token}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
    const result = await response.json();
    if (response.ok) {
      Alert.alert("Данные пользователяя загружены");
      this.user = result;
    } else {
      Alert.alert("При загрузке данных пользователя произошла ошибка");
    }
  };
}
export default pageStore;

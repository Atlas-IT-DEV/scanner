// import { StyleSheet,  } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import RegistrationScreen from "./pages/registration_screen/registration_screen";
import LoginScreen from "./pages/login_screen/login_screen";
import ValidationScreen from "./pages/validation_screen/validation_screen";
import BioScreen from "./pages/bio_screen/bio_screen";
import ProfileScreen from "./pages/profile_screen/profile_screen";
import ScannerScreen from "./pages/scanner_screen/scanner_screen";
import RootStore from "./store/root_store";
import { RootStoreContext } from "./store/store_context";
import { Buffer } from "buffer";
import ChatsScreen from "./pages/chats_screen/chats_screen";
import MenuScreen from "./pages/menu_screen/menu_scree";
import {
  menu_inact_bm,
  messenger_inact_bm,
  profile_act_bm,
  profile_inact_bm,
  scanner_chat_act_bm,
  scanner_chat_inact_bm,
} from "./images/images";
import { SvgXml } from "react-native-svg";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

global.Buffer = global.Buffer || Buffer;

function TabScreen({ route }) {
  return (
    <Tab.Navigator
      initialRouteName="Профиль"
      screenOptions={({ route }) => ({
        tabBarActiveBackgroundColor: "rgba(18, 145, 137, 1)",
        tabBarInactiveBackgroundColor: "white",
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "rgba(154, 155, 177, 1)",
        headerShown: false,
        tabBarStyle: {
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          height: 100,
          overflow: "hidden",
        },
        tabBarItemStyle: {
          borderRadius: 20, // закругление фона активного таба
          paddingHorizontal: 10, // добавляет отступы по горизонтали
          marginVertical: 10,
          marginHorizontal: 10, // отступ снизу, чтобы было место для подсветки
        },
        tabBarIconStyle: {
          // marginBottom: -30, // отступ для иконок
        },
        tabBarLabelStyle: {
          marginBottom: 15,
          fontSize: 12,
          fontFamily: "RalewaySemiBold",
        },
      })}
    >
      <Tab.Screen
        component={ChatsScreen}
        name="Чаты"
        options={{
          tabBarIcon: ({ focused, size }) => {
            return (
              <SvgXml xml={messenger_inact_bm} width={size} height={size} />
            );
          },
        }}
      />
      <Tab.Screen
        component={ScannerScreen}
        name="ЗD-сканер"
        options={{
          tabBarIcon: ({ focused, size }) => {
            return (
              <SvgXml
                xml={focused ? scanner_chat_act_bm : scanner_chat_inact_bm}
                width={size}
                height={size}
              />
            );
          },
        }}
      />
      <Tab.Screen
        component={ProfileScreen}
        name="Профиль"
        options={{
          tabBarIcon: ({ focused, size }) => {
            return (
              <SvgXml
                xml={focused ? profile_act_bm : profile_inact_bm}
                width={size}
                height={size}
              />
            );
          },
        }}
      />
      <Tab.Screen
        component={MenuScreen}
        name="Меню"
        options={{
          tabBarIcon: ({ focused, size }) => {
            return <SvgXml xml={menu_inact_bm} width={size} height={size} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    RalewayRegular: require("./assets/fonts/Raleway-Regular.ttf"), //400
    RalewayMedium: require("./assets/fonts/Raleway-Medium.ttf"), //500
    RalewaySemiBold: require("./assets/fonts/Raleway-SemiBold.ttf"), //600
    RalewayBold: require("./assets/fonts/Raleway-Bold.ttf"), //700
  });
  return (
    <NavigationContainer>
      <RootStoreContext.Provider value={new RootStore()}>
        {fontsLoaded && (
          <>
            <Stack.Navigator
              initialRouteName="LoginScreen"
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen name="LoginScreen" component={LoginScreen} />
              <Stack.Screen
                name="RegistrationScreen"
                component={RegistrationScreen}
              />
              <Stack.Screen
                name="ValidationScreen"
                component={ValidationScreen}
              />
              <Stack.Screen name="BioScreen" component={BioScreen} />
              {/* <Stack.Screen name="ProfileScreen" component={ProfileScreen} /> */}
              {/* <Stack.Screen name="ScannerScreen" component={ScannerScreen} /> */}
              <Stack.Screen name="TabScreen" component={TabScreen} />
            </Stack.Navigator>
          </>
        )}
      </RootStoreContext.Provider>
    </NavigationContainer>
  );
}

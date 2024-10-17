// import { StyleSheet,  } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";

import RegistrationScreen from "./pages/registration_screen/registration_screen";
import LoginScreen from "./pages/login_screen/login_screen";
import ValidationScreen from "./pages/validation_screen/validation_screen";
import BioScreen from "./pages/bio_screen/bio_screen";
import ProfileScreen from "./pages/profile_screen/profile_screen";
import ScannerScreen from "./pages/scanner_screen/scanner_screen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    RalewayRegular: require("./assets/fonts/Raleway-Regular.ttf"), //400
    RalewayMedium: require("./assets/fonts/Raleway-Medium.ttf"), //500
    RalewaySemiBold: require("./assets/fonts/Raleway-SemiBold.ttf"), //600
    RalewayBold: require("./assets/fonts/Raleway-Bold.ttf"), //700
  });
  return (
    <NavigationContainer>
      {/* <RootStoreContext.Provider value={new RootStore()}> */}
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
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
            <Stack.Screen name="ScannerScreen" component={ScannerScreen} />
          </Stack.Navigator>
        </>
      )}
      {/* </RootStoreContext.Provider> */}
    </NavigationContainer>
  );
}

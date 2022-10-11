/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useContext, useState, useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { MaterialCommunityIcons, Entypo, AntDesign } from "@expo/vector-icons";
import { ColorSchemeName, Pressable, View, Alert, StyleSheet, Text, Button } from "react-native";

import { ROUTES } from '../utility/Routes';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { CredentialsContext } from "../context/CredentialsContext";
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import Modal from "react-native-modal";

import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import Main from '../screens/MainScreen';
import Profile from '../screens/Profile';
import Setting from '../screens/Setting';
import { post } from '../api/auth';

export default function Navigation({ colorScheme }: { colorScheme: "light" }) {
  const [appReady, setAppReady] = React.useState(false);
  const [storedCredentials, setStoredCredentials] = React.useState("");
  const [currentUser, setCurrentUser] = React.useState(null);
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setAppReady(true);
    }
  }, [currentUser]);

  const logoutModal = () => {
    return (
      <Modal
        isVisible={isLogoutModalVisible}
        animationIn="bounceInUp"
        animationOut="bounceOutDown"
        animationOutTiming={1000}
        animationInTiming={1000}
        //   style={{ marginTop: "160%" }}
      >
        <View style={styles.modal}>
          <View style={styles.closeButton}>
            <AntDesign
              name="closecircle"
              size={20}
              color="#4F4E4F"
              onPress={() => setIsLogoutModalVisible(false)}
            />
          </View>
          <View style={styles.confirmText}>
            <Text
              style={{
                fontWeight: "600",
                fontSize: 17,
                color: Colors.light.tint,
              }}
            >
              Are You Sure Want To Logout?
            </Text>
          </View>
          <View style={styles.buttonsContainer}>
            <View style={styles.cancleButton}>
              <Button
                color={Colors.dark.background}
                title="Cancle"
                onPress={() => setIsLogoutModalVisible(false)}
              />
            </View>
            <View style={styles.logoutButton}>
              <Button
                color="#DE1A1A"
                title="Logout"
                onPress={() => doUserLogOut()}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const doUserLogOut = async function () {
    setStoredCredentials();
    setIsLogoutModalVisible(false);
  };

  return (
    <NavigationContainer linking={LinkingConfiguration} theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <CredentialsContext.Provider value={{ storedCredentials, setStoredCredentials }}>
        <RootNavigator 
          currentUser={currentUser} 
          setCurrentUser={setCurrentUser}
          setIsLogoutModalVisible={setIsLogoutModalVisible}
          doUserLogOut={doUserLogOut} />
        {logoutModal()}
      </CredentialsContext.Provider>
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */


const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator(props) {
  const colorScheme = useColorScheme();
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);

  return (
    <CredentialsContext.Consumer>
      {({ storedCredentials }) => (
        <Stack.Navigator initialRouteName="Tab" 
          screenOptions={{                
            tabBarActiveTintColor: Colors[colorScheme].tint,
            headerStyle: {
            backgroundColor: Colors.light.tint,
            shadowOpacity: 0,
            elevation: 0,
          },
          headerTintColor: Colors.light.background,
          headerTitleAlign: "left",
          headerShown: false}}>
          {storedCredentials ? (
            <>
              <Stack.Screen name={ROUTES.HOME} component={Main} options={{ headerTitleAlign: "center" }} />
              <Stack.Screen name={ROUTES.PROFILE} component={Profile} options={{ headerTitleAlign: "center" }} />
              <Stack.Screen name={ROUTES.SETTING} component={Setting} options={{ headerTitleAlign: "center" }} />
            </>
          ) : (
            <>
              <Stack.Screen name={ROUTES.SIGN_IN} component={SignIn} options={{ headerTitleAlign: "center" }} />
              <Stack.Screen name={ROUTES.SIGN_UP} component={SignUp} options={{ headerTitleAlign: "center" }} />
            </>
          )}
          <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
          <Stack.Group screenOptions={{ presentation: 'modal' }}>
            <Stack.Screen name="Modal" component={ModalScreen} />
          </Stack.Group>
        </Stack.Navigator>
      )}
    </CredentialsContext.Consumer>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */


function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "white",
    borderRadius: "20%",
    marginBottom: 10,
    maxHeight: "80%",
    minHeight: "20%",
    width: "80%",
    marginLeft: 30,
  },
  buttonsContainer: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  closeButton: {
    alignItems: "flex-end",
    margin: 5,
  },
  cancleButton: {
    margin: 5,
  },
  logoutButton: {
    margin: 5,
  },
  confirmText: {
    alignItems: "center",
    marginTop: 20,
    fontWeight: "600",
  },
  perssable_style: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 60,
    marginRight: -40,
  }
});

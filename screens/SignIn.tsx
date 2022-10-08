import { Alert, Image, TextInput, Button, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { Formik } from "formik";
import PhoneInput from "react-native-phone-number-input";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import * as yup from "yup";
// import Parse from "parse";

// import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { formatPhoneNumber, phoneRegExp } from "../utility/utility";
import { CredentialsContext } from "../context/CredentialsContext";
import { ROUTES } from "../utility/Routes";
import Colors from "../constants/Colors";


export default function SignIn() {
  const phoneInput = useRef<PhoneInput>(null);
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
  const navigation = useNavigation();

  const colors = {
    tealGreen: "#128c7e",
    tealGreenDark: "#075e54",
    green: "#25d366",
    lime: "#dcf8c6",
    skyblue: "#34b7f1",
    smokeWhite: "#ece5dd",
    white: "white",
    gray: "#3C3C3C",
    lightGray: "#757575",
    iconGray: "#717171",
  };

  async function handlePress(values) {

    // Logout if any existing user exists
    // await Parse.User.logOut().then(async () => {
    //   const currentUser = await Parse.User.currentAsync();
    //   if (currentUser === null) {
    //     setStoredCredentials();
    //   }
    // }).catch((error) => {
    //   Alert.alert("Error!", error.message);
    // });

    // Clear Cache
    // setStoredCredentials();
    // Parse.User._clearCache();

    console.log(values);
    const usernameValue = values.phoneNo;
    const passwordValue = values.password;
    // return await Parse.User.logIn(usernameValue, passwordValue).then(async (loggedInUser) => {
    //   Alert.alert(
    //     "Success!",
    //     `User ${loggedInUser.get("username")} has successfully signed in!`
    //   );
    //   const currentUser = await Parse.User.currentAsync();
    //   console.log(loggedInUser === currentUser);
    //   setStoredCredentials(loggedInUser);
    //   navigation.navigate("ChatList", { screen: "Chats" });
    //   return true;
    // }).catch((error) => {
    //   Alert.alert("Error!", error.message);
    //   return false;
    // });

  }

  return (
    <Formik initialValues={{ phoneNo: "", password: "" }} onSubmit={(values) => handlePress(values)} 
      validationSchema={yup.object().shape({
        phoneNo: yup
          .string()
          .min(10, "Phone number is not valid")
          .max(10, "Phone number is not valid")
          .matches(phoneRegExp, "Phone number is not valid"),
        password: yup
          .string()
          .min(4)
          .max(10, "Password should not excced 10 chars.")
          .required("Password is a required field."), 
      })}>
        {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit,}) =>(
          <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} keyboardVerticalOffset={90} style={{ width: "100%", flex: 1 }} >
            <View style={styles.view_style} >
              <Text style={{ fontSize: 24, marginBottom: 20, }}>
                Welcome to Chat App
              </Text>
              <Image source={require("../assets/welcome-img.png")} style={styles.image_size} resizeMode="cover" />
              <View style={{ marginTop: 20 }}>
                <PhoneInput 
                  ref={phoneInput} 
                  placeholder="Phone No" 
                  defaultCode="US" 
                  layout="first" 
                  onChangeText={handleChange("phoneNo")} 
                  value={formatPhoneNumber(values.phoneNo)}
                  withDarkTheme
                  withShadow 
                />
                { errors.phoneNo && (
                  <View style={{}}>
                    <Text style={{ fontSize: 12, color: "#FF0D10" }}>
                      {errors.phoneNo}
                    </Text>
                  </View>
                )}
                <View style={styles.view_container} >
                  <TextInput
                    placeholder="Password"
                    value={values.password}
                    secureTextEntry={true}
                    onChangeText={handleChange("password")}
                    onBlur={() => setFieldTouched("password")}
                    style={{ width: 200, margin: 15}}
                    textContentType="password"
                  />
                </View>
                {touched.password && errors.password && (
                  <Text style={{ fontSize: 12, color: "#FF0D10" }}>
                    {errors.password}
                  </Text>
                )}
                <View style={{ marginTop: 20 }}>
                  <Button title={"Sign In"} disabled={!isValid || !values.phoneNo} color={colors.secondary} onPress={handleSubmit}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  <View style={{ marginTop: 15, flexDirection: "row" }}>
                    <Text style={{ color: colors.secondaryText }}>
                      Don't have an account?
                    </Text>
                    <Text
                      style={{ color: Colors.light.tint, marginLeft: 5, fontSize: 15}} 
                      onPress={() => navigation.navigate(ROUTES.SIGN_UP, {isAuhenticated: false})}
                    >
                      Sign Up{" "}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  view_style: {
    justifyContent: "center", 
    alignItems: "center", 
    flex: 1, 
    backgroundColor: "white"
  }, 
  image_size: {
    width: 180, 
    height: 180
  }, 
  view_container: {
    marginTop: 20,
    borderColor: "white",
    shadowOpacity: 0.2,
    backgroundColor: "#f7f5f5",
  }
});
import React, { useContext, useEffect, useRef, useState } from "react";
import { Alert, View, Text, Image, TextInput, Button, Platform, KeyboardAvoidingView, StyleSheet} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import RadioForm from "react-native-simple-radio-button";
import { Formik } from "formik";
import * as yup from "yup";
import PhoneInput from "react-native-phone-number-input";

import { formatPhoneNumber, phoneRegExp } from "../utility/utility";
import Colors from "../constants/Colors";
import { ROUTES } from "../utility/Routes";
import { CredentialsContext } from "../context/CredentialsContext";
import { post } from '../api/auth';

export default function SignUp() {

  const navigation = useNavigation();

  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);

  const phoneInput = useRef<PhoneInput>(null);

  const [chosenOption, setChosenOption] = useState("researcher"); //will store our current user options
  const options = [
    { label: "Researcher", value: "researcher" },
    { label: "Teacher", value: "teacher" },
  ]; //create our options for radio group
  
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
    // Note that this values come from state variables that we've declared before
    var param = {
      username: values.username,
      phoneNo: values.phoneNo,
      type: chosenOption,
      password: values.password
    };

    const res = await post(param, "users/signup");
    console.log(res);
    if(res.status) {
      Alert.alert(
        "Success!",
        `User ${param.username} was successfully created!`
      );
      setStoredCredentials(res.user);
      navigation.navigate(ROUTES.HOME, { isAuhenticated: true });

    } else {
      Alert.alert(
        "Error!",
        res.msg
      );
    }
    
  }

  return (
    <Formik
      initialValues={{ username: "", phoneNo: "", password: "", confirmPassword: "" }}
      onSubmit={(values) => handlePress(values)}
      validationSchema={yup.object().shape({
        username: yup
          .string()
          .min(4, "Username should be larger than 4 characters.")
          .max(30, "Username should not exceed 30 characters.")
          .required("Username is a required field."),
        phoneNo: yup
          .string()
          .min(10, "Phone number is not valid")
          .max(10, "Phone number is not valid")
          .matches(phoneRegExp, "Phone number is not valid"),
        password: yup
          .string()
          .min(4, "Password should be larger than 4 characters. ")
          .max(10, "Password should not excced 10 chars.")
          .required("Password is a required field."),
        confirmPassword: yup
          .string()
          .oneOf([yup.ref("password"), null], "Passwords must match")
          .required("Confirm Password is a required field."),
      })}
    >
      {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit,}) => {
        return (
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            keyboardVerticalOffset={90}
            style={{ width: "100%", flex: 1 }}
          >
            <View style={styles.view_container}>
              <Text style={{ fontSize: 24, marginBottom: 20,}} >
                Register Your Account
              </Text>
              <View style={{ marginTop: 20 }}>
                <View style={styles.view_style}>
                  <TextInput
                    placeholder="Username" value={values.username} 
                    onChangeText={handleChange("username")} 
                    onBlur={() => setFieldTouched("username")}
                    style={{ width: 200, margin: 15 }} textContentType="Username"
                  />
                </View>
                { touched.username && errors.username && (
                  <Text style={styles.error_style}> {errors.username} </Text>
                )
                }
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
                {errors.phoneNo && (
                  <Text style={styles.error_style}> {errors.phoneNo} </Text>
                )}
                <View style={styles.view_style}>
                  <TextInput placeholder="Password" value={values.password}
                    secureTextEntry={true} onChangeText={handleChange("password")} onBlur={() => setFieldTouched("password")}
                    style={{ width: 200, margin: 15 }} textContentType="newPassword"
                  />
                </View>
                {touched.password && errors.password && (
                  <Text style={styles.error_style}> {errors.password} </Text>
                )}
                <View style={styles.view_style}>
                  <TextInput
                    placeholder="Confirm Password"
                    value={values.confirmPassword}
                    onChangeText={handleChange("confirmPassword")}
                    onBlur={() => setFieldTouched("confirmPassword")}
                    secureTextEntry={true}
                    style={{ width: 200, margin: 15 }}
                    textContentType="newPassword"
                  />
                </View>
                {touched.confirmPassword && errors.confirmPassword && (
                  <Text style={styles.error_style}> {errors.confirmPassword} </Text>
                )}
                <View style={{ marginTop: 15, alignContent: "center" }}>
                  <RadioForm
                    labelStyle={styles.radio_style}
                    selectedButtonColor={Colors.light.tint}
                    radio_props={options}
                    initial={0} //initial value of this group
                    onPress={(value) => {
                      setChosenOption(value);
                    }} 
                  />
                </View>

                <View style={{ marginTop: 20 }}>
                  <Button
                    title={"Sign Up"}
                    disabled={!isValid || !values.phoneNo}
                    color={colors.secondary}
                    onPress={handleSubmit}
                  />
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-around" }} >
                  <View style={{ marginTop: 15, flexDirection: "row" }}>
                    <Text style={{ color: colors.secondaryText }}>
                      Already a Registered User?
                    </Text>
                    <Text style={styles.text_style} onPress={() => navigation.navigate(ROUTES.SIGN_IN, { isAuhenticated: false }) }>
                      Sign In{" "}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

          </KeyboardAvoidingView>
        );
        }
      }
    </Formik>
  );
}

const styles = StyleSheet.create({
  view_container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "white",
  }, 
  touchable: {
    borderWidth: 1,
    borderColor: "#cccbca",
    backgroundColor: "#fcfcfa",
    borderRadius: 100,
    width: 180,
    height: 180,
    justifyContent: "center",
  }, 
  view_style:{
    borderWidth: 1,
    marginTop: 20,
    borderColor: "white",
    shadowOpacity: 0.2,
    backgroundColor: "#f7f5f5",
  },
  radio_style: {
    fontSize: 12, 
    color: Colors.light.tint,
  }, 
  text_style: {
    alignSelf: "center",
    color: Colors.light.tint,
    fontSize: 16,
  }, 
  error_style: {
    fontSize: 12, 
    color: "#FF0D10"
  }
  
})
import React, { useContext, useEffect, useRef, useState } from "react";
import { Alert, View, Text, Image, TextInput, Button, Platform, KeyboardAvoidingView, StyleSheet} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import RadioForm from "react-native-simple-radio-button";
import Colors from "../constants/Colors";
import { Formik } from "formik";
import { ROUTES } from "../utility/Routes";
import * as yup from "yup";
import { formatPhoneNumber, phoneRegExp } from "../utility/utility";
import PhoneInput from "react-native-phone-number-input";
import { CredentialsContext } from "../context/CredentialsContext";
// import CameraScreen from "./CameraScreen";
import { isBase64 } from "../utility/utility";
import * as ImagePicker from "expo-image-picker";

export default function SignUp() {
  const [openCamera, setOpenCamera] = useState(false);
  const [profileImage, setProfileImage] = useState("");

  const [isModalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);

  const phoneInput = useRef<PhoneInput>(null);
  const [formattedValue, setFormattedValue] = useState("");

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
    console.log(values);
    // Note that this values come from state variables that we've declared before
    const usernameValue = values.phoneNo;
    const passwordValue = values.password;
    var attrs = {
      phonenumber: values.phoneNo,
      confirmPassword: values.confirmPassword,
      type: chosenOption,
      profile_pic: profileImage
    };
    // Since the signUp method returns a Promise, we need to call it using await
    // return await Parse.User.signUp(usernameValue, passwordValue, attrs).then((createdUser) => {
    //     Alert.alert(
    //       "Success!",
    //       `User ${createdUser.get("username")} was successfully created!`
    //     );
    //     setStoredCredentials(createdUser);
    //     // navigation.navigate("ChatList", { isAuhenticated: true });
    //     return true;
    // }).catch((error) => {
    //   Alert.alert("Error!", error.message);
    //   return false;
    // });
  }

  const handleAutoFocus = (setFieldTouched) => {
    setFieldTouched("phoneNo");
    return "";
  };

  const sendImage = (imageUrl) => {
    console.log("Image URL HERE>>>>>>>", imageUrl);
    setProfileImage(imageUrl.base64);
    setOpenCamera(false);
    setModalVisible(false);
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [8, 8],
      quality: 1,
      base64: true,
    });

    console.log("SELECTED IMAGE HERE>>>>>>", result.base64);

    if (!result.cancelled) {
      setModalVisible(false);
      setProfileImage("data:image/jpg;base64," + result.base64);
      // props.submitSelectedImage("data:image/jpg;base64," + result.base64);
    }
  };

  return (
    <Formik
      initialValues={{ phoneNo: "", password: "", confirmPassword: "" }}
      onSubmit={(values) => handlePress(values)}
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
              {/* <View>
                <TouchableOpacity
                  style={styles.touchable}
                  onPress={() => setModalVisible(!isModalVisible)}>
                </TouchableOpacity>
              </View> */}
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
                {errors.phoneNo && (
                  <View style={{}}>
                    <Text style={{ fontSize: 12, color: "#FF0D10" }}>
                      {errors.phoneNo}
                    </Text>
                  </View>
                )}
                <View style={styles.view_style}>
                  <TextInput
                    placeholder="Password"
                    value={values.password}
                    secureTextEntry={true}
                    onChangeText={handleChange("password")}
                    onBlur={() => setFieldTouched("password")}
                    style={{
                      width: 200,
                      margin: 15,
                    }}
                    textContentType="newPassword"
                  />
                </View>
                {touched.password && errors.password && (
                  <Text style={{ fontSize: 12, color: "#FF0D10" }}>
                    {errors.password}
                  </Text>
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
                  <Text style={{ fontSize: 12, color: "#FF0D10" }}>
                    {errors.confirmPassword}
                  </Text>
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
                    <Text style={{ color: Colors.light.tint, marginLeft: 5, fontSize: 15 }} onPress={() => navigation.navigate(ROUTES.SIGN_IN, { isAuhenticated: false }) }>
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
    color: Colors.light.tint
  }
  
})
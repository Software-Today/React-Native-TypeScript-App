import React, { useEffect, useState, useCallback, useContext } from "react";

import { View, Text, TouchableOpacity, StyleSheet, Keyboard, Button } from "react-native";
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";
import { MaterialCommunityIcons, Entypo, Ionicons } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";
import Colors from "../../constants/Colors";
import * as DocumentPicker from "expo-document-picker";
import { CredentialsContext } from "../../context/CredentialsContext";
import { Feather } from "@expo/vector-icons";
import * as FileSystem from 'expo-file-system';
import AWS from 'aws-sdk';
import { decode } from "base64-arraybuffer";

const AttachmentOptions = (props) => {
  const [visible, setVisible] = useState(false);

  const [addContactPress, setAddContactPress] = useState(false);
  const hideMenu = () => setVisible(false);
  const [fileResponse, setFileResponse] = useState([]);

  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);

  const showMenu = () => setVisible(true);

  // const navigation = useNavigation();

  useEffect(() => {
    if (visible) {
      props.focusInput.focus();
    }
  }, [visible]);

  const onAddContactPress = () => {
    navigation.navigate("Modal");
    // setAddContactPress(true);
    hideMenu();
  };

  const selectImage = () => {
    props.pickImage();
  };

  const attachmentClicked = () => {
    setVisible(true);
    props.setMessage();
  };

  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.getDocumentAsync({
        // presentationStyle: "fullScreen",
        type: ["application/pdf", "application/msword"],
      });

      setFileResponse(response);
      console.log("Document Selected>>>", response.uri);
      let fileBase64 = await FileSystem.readAsStringAsync(response.uri, { encoding: 'base64'  });
      console.log("Base64:", fileBase64);

      let fileName = '' + Math.floor(Math.random() * 10);
      const BUCKET_NAME = "kfchatapp";

      const s3bucket = new AWS.S3({
        accessKeyId: "AKIA3AT4VNL5N62ZFBLM",
        secretAccessKey: "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",
        Bucket: BUCKET_NAME,
        signatureVersion: "v4"
      });
      let contentType = "application/pdf";
      let contentDeposition = 'inline;filename="' + fileName + '"';

      const arrayBuffer = decode(fileBase64);
      s3bucket.createBucket(() => {
        const params = {
          Bucket: BUCKET_NAME,
          Key: fileName,
          Body: arrayBuffer,
          ContentDisposition: contentDeposition,
          ContentType: contentType

        };
        s3bucket.upload(params, (err, data) => {
          if (err) {
            console.log("error in callback");
            console.log(err);
          }
          console.log(data);
          props.saveDocument(data.Location);
        });
      });

    } catch (err) {
      console.error("Inside document console warning" + err);
    }
  }, []);

  return (
    <Modal
      isVisible={props.isModalVisible}
      animationIn="bounceInUp"
      animationOut="bounceOutDown"
      animationOutTiming={1000}
      animationInTiming={1000}
      style={{ marginTop: "160%" }}
    >
      <View style={styles.modal}>
        {!storedCredentials ? (
          <TouchableOpacity
            style={[styles.attachmentOptions, styles.camera]}
            onPress={() => props.setOpenCamera(true)}
          >
            <Feather
              name="camera"
              size={30}
              color={Colors.light.tint}
              style={{ paddingRight: 30 }}
            />
            <Text style={{ fontSize: 18, color: Colors.light.tint }}>
              Camera
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.attachmentOptions, styles.documents]}
            onPress={handleDocumentSelection}
          >
            <Ionicons
              name="documents"
              size={30}
              color={Colors.light.tint}
              style={{ paddingRight: 30 }}
            />
            <Text style={{ fontSize: 18, color: Colors.light.tint }}>
              Documents
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.attachmentOptions, styles.gallery]}
          onPress={selectImage}
        >
          <Entypo
            name="images"
            size={30}
            color={Colors.light.tint}
            style={{ paddingRight: 30 }}
          />
          <Text style={{ fontSize: 18, color: Colors.light.tint }}>
            Gallery
          </Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={[styles.attachmentOptions, styles.scaffold]}
          onPress={() => props.setOpenScaffoldInput(true) }
        >
          <Entypo
            name="code"
            size={30}
            color={Colors.light.tint}
            style={{ paddingRight: 30 }}
          />
          <Text style={{ fontSize: 18, color: Colors.light.tint }}>
            Scaffold Input
          </Text>
        </TouchableOpacity> */}
      </View>
      <View style={styles.cancelButton}>
        <Button
          title="Cancel"
          color="red"
          onPress={() => props.setModalVisible(false)}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "white",
    borderRadius: "20%",
    height: 50,
    justifyContent: "center",
  },
  attachmentOptions: {
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: "#d8d8d8",
    flexDirection: "row",
    paddingTop: 20,
    paddingLeft: 20,
  },
  documents: {
    borderBottomWidth: 1,
  },
  scaffold:{
    borderBottomWidth:0,
  },
  gallery: {
    borderBottomWidth: 0,
  },
  camera: {
    borderBottomWidth: 1,
  },
  modal: {
    backgroundColor: "white",
    borderRadius: "20%",
    marginBottom: 10,
  },
});

export default AttachmentOptions;

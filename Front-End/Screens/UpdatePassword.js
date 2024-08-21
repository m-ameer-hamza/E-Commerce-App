import { useEffect, useState } from "react";
import { View, StyleSheet, Text, Pressable, Keyboard } from "react-native";
import {
  TextInput,
  Button,
  PaperProvider,
  IconButton,
} from "react-native-paper";
import { useSelector } from "react-redux";
import { userHandler } from "../Handlers/userHandler";

import ActivityLoader from "../Components/ActivityLoader";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

const UpdatePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [isNewPassword, setIsNewPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isNewPassSecure, setIsNewPassSecure] = useState(true);
  const [newPassIcon, setNewPassIcon] = useState("eye");
  const [isCurrPassSecure, setIsCurrPassSecure] = useState(true);
  const [currPassIcon, setCurrPassIcon] = useState("eye");

  const { modifyPassword } = userHandler();

  const theme = useSelector((state) => state.settings.theme);

  const navigation = useNavigation();

  let containerColor, fontColor;
  if (theme === "light") {
    containerColor = "#404241";
    fontColor = "#fff";
  } else {
    containerColor = "#eee";
    fontColor = "#000";
  }

  const handleUpdate = () => {
    if (newPassword.length < 5) {
      setIsError(true);
      return;
    } else {
      setIsError(false);
    }

    if (currentPassword === newPassword) {
      setIsNewPassword(true);
      return;
    } else {
      setIsNewPassword(false);
    }

    setLoading(true);
    modifyPassword(currentPassword, newPassword);
    setCurrentPassword("");
    setNewPassword("");
    setLoading(false);
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
    >
      <Pressable
        style={{
          flexDirection: "row",

          backgroundColor: "#AFEEEE",
          height: 70,
          alignItems: "center",
          paddingHorizontal: 10,
        }}
      >
        <IconButton
          icon="arrow-left"
          iconColor="#000"
          size={27}
          onPress={() => navigation.goBack()}
        />
        <Text style={{ fontSize: 20, fontWeight: "500" }}>Update Password</Text>
      </Pressable>
      <PaperProvider>
        <View
          style={{
            marginTop: 80,
            justifyContent: "center",
            alignItems: "center",
            padding: 16,
            backgroundColor: containerColor,
          }}
        >
          <View style={{ width: "100%", alignItems: "center" }}>
            <Text
              style={{
                alignSelf: "flex-start",
                marginLeft: "10%",
                marginBottom: "3%",
                fontSize: 17,
                fontWeight: "bold",
                color: fontColor,
              }}
            >
              Current Password
            </Text>
            <TextInput
              label="CurrentPassword"
              secureTextEntry={isCurrPassSecure}
              value={currentPassword}
              onChangeText={setCurrentPassword}
              mode="outlined"
              style={styles.input}
              activeOutlineColor="#041e42"
              right={
                <TextInput.Icon
                  icon={currPassIcon}
                  onPress={() => {
                    if (currPassIcon === "eye") {
                      setCurrPassIcon("eye-off");
                    } else {
                      setCurrPassIcon("eye");
                    }
                    setIsCurrPassSecure(!isCurrPassSecure);
                  }}
                />
              }
            />
          </View>
          <View
            style={{ width: "100%", alignItems: "center", marginTop: "10%" }}
          >
            <Text
              style={{
                alignSelf: "flex-start",
                marginLeft: "10%",
                marginBottom: "3%",
                fontSize: 17,
                fontWeight: "bold",
                color: fontColor,
              }}
            >
              New Password
            </Text>
            <TextInput
              label="New Password"
              secureTextEntry={isNewPassSecure}
              value={newPassword}
              onChangeText={setNewPassword}
              mode="outlined"
              style={styles.input}
              activeOutlineColor="#041e42"
              right={
                <TextInput.Icon
                  icon={newPassIcon}
                  onPress={() => {
                    if (newPassIcon === "eye") {
                      setNewPassIcon("eye-off");
                    } else {
                      setNewPassIcon("eye");
                    }
                    setIsNewPassSecure(!isNewPassSecure);
                  }}
                />
              }
            />
            {isError && (
              <Text style={{ color: "#ed071a" }}>
                *Provide atleast 5 Letter Name{" "}
              </Text>
            )}
            {isNewPassword && (
              <Text style={{ color: "#ed071a" }}>
                *New Password is same as Old one{" "}
              </Text>
            )}
          </View>

          <Button
            mode="contained"
            onPress={() => {
              Keyboard.dismiss();
              handleUpdate();
            }}
            style={{
              width: "45%",
              backgroundColor: "#fab305",
              marginTop: 30,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "500", color: "#000" }}>
              Update
            </Text>
          </Button>
        </View>

        {loading && <ActivityLoader />}
      </PaperProvider>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  input: {
    width: "80%",
    marginBottom: 16,
  },
  button: {
    width: "80%",
  },
});

export default UpdatePassword;

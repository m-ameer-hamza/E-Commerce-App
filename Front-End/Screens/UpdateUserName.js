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
import PasswordConfirm from "../Components/PasswordConfirm";
import ActivityLoader from "../Components/ActivityLoader";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

const UpdateUserName = () => {
  const [currentUserName, setCurrentUserName] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [isError, setIsError] = useState(false);
  const [isNewName, setIsNewName] = useState(false);
  const [loading, setLoading] = useState(false);

  const { modifyUserName } = userHandler();

  const handleUpdate = async () => {
    if (newUserName.length < 5) {
      setIsError(true);
      return;
    } else if (newUserName === currentUserName) {
      setIsNewName(true);
    } else {
      setIsError(false);
      setIsNewName(false);

      setLoading(true);
      await modifyUserName(newUserName);
      setLoading(false);
    }
    setLoading(false);
  };

  const theme = useSelector((state) => state.settings.theme);
  const user = useSelector((state) => state.user.name);
  const session = useSelector((state) => state.session.session);

  const navigation = useNavigation();

  useEffect(() => {
    setCurrentUserName(user);
  }, [user]);

  let containerColor, fontColor;
  if (theme === "light") {
    containerColor = "#404241";
    fontColor = "#fff";
  } else {
    containerColor = "#eee";
    fontColor = "#000";
  }

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
        <Text style={{ fontSize: 20, fontWeight: "500" }}> Update Name </Text>
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
              Current User Name
            </Text>
            <TextInput
              label="Current User Name"
              value={currentUserName}
              editable={false}
              onChangeText={setCurrentUserName}
              mode="outlined"
              style={styles.input}
              activeOutlineColor="#041e42"
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
              New User Name
            </Text>
            <TextInput
              label="New User Name"
              value={newUserName}
              onChangeText={setNewUserName}
              mode="outlined"
              style={styles.input}
              activeOutlineColor="#041e42"
            />
            {isError && (
              <Text style={{ color: "#ed071a" }}>
                *Provide atleast 5 Letter Name{" "}
              </Text>
            )}
            {isNewName && (
              <Text style={{ color: "#ed071a" }}>
                *New Name is sam as Old one{" "}
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
        {!session && <PasswordConfirm />}
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

export default UpdateUserName;

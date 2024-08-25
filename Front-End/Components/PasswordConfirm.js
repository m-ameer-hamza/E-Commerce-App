import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editSession } from "../Redux/sessionSlice";

import { authHandlers } from "../Handlers/authHandler";

import {
  View,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Pressable,
  Keyboard,
} from "react-native";
import {
  Portal,
  Dialog,
  Text,
  Provider as PaperProvider,
} from "react-native-paper";

export default PasswordConfirm = () => {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.session.session);
  const user = useSelector((state) => state.user);

  const { refreshTokenFunc } = authHandlers();

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  // const showDialog = () => setVisible(true);
  const hideDialog = () => {
    if (password === "") {
      setPasswordError(true);
    }
  };

  return (
    <Portal>
      <TouchableWithoutFeedback onPress={hideDialog}>
        <View style={styles.backgroundBlur}>
          <TouchableWithoutFeedback>
            <Dialog visible={!session} onDismiss={hideDialog}>
              <Dialog.Content>
                <Text style={{ marginBottom: 20 }}>
                  Enter Password to Confirm
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  secureTextEntry={true}
                  onChangeText={(text) => setPassword(text)}
                />
                {passwordError && (
                  <Text style={{ color: "red" }}>Please enter password</Text>
                )}
              </Dialog.Content>
              <Dialog.Actions>
                <Pressable
                  style={{
                    padding: 10,

                    borderRadius: 5,
                  }}
                  onPress={async () => {
                    console.log("From password confirm", user.email, password);
                    Keyboard.dismiss();
                    await refreshTokenFunc(user.email, password);
                    hideDialog();
                  }}
                >
                  <Text style={{ color: "#041e42" }}> Done</Text>
                </Pressable>
              </Dialog.Actions>
            </Dialog>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundBlur: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    marginTop: 10,
    marginBottom: 20,
  },
});

import React from "react";

import {
  View,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import {
  Portal,
  Dialog,
  Button,
  Text,
  RadioButton,
  Provider as PaperProvider,
} from "react-native-paper";

export default FontDialong = ({ isVisible, setIsVisible }) => {
  const [value, setValue] = React.useState("Medium");

  const hideDialog = () => {
    setIsVisible(false);
  };

  return (
    <Portal>
      <TouchableWithoutFeedback onPress={hideDialog}>
        <View style={styles.backgroundBlur}>
          <TouchableWithoutFeedback>
            <Dialog visible={isVisible} onDismiss={hideDialog}>
              <Dialog.Content>
                <Text
                  style={{ marginBottom: 20, fontWeight: "bold", fontSize: 16 }}
                >
                  Select the Font Size
                </Text>
                <RadioButton.Group
                  onValueChange={(newValue) => setValue(newValue)}
                  value={value}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row-reverse",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Text style={{ fontSize: 15, marginLeft: "5%" }}>
                      Small
                    </Text>
                    <RadioButton value="Small" color="#0066b2" />
                  </View>

                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row-reverse",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Text style={{ fontSize: 15, marginLeft: "5%" }}>
                      Medium
                    </Text>
                    <RadioButton value="Medium" color="#0066b2" />
                  </View>

                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row-reverse",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Text style={{ fontSize: 20, marginLeft: "5%" }}>
                      Large
                    </Text>
                    <RadioButton value="Large" color="#0066b2" />
                  </View>
                </RadioButton.Group>
              </Dialog.Content>
              <Dialog.Actions>
                <Button textColor="#0066b2">Done</Button>
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

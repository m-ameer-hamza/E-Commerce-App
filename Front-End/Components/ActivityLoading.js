import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import {
  Portal,
  ActivityIndicator,
  Provider as PaperProvider,
} from "react-native-paper";

export default ActivityLoading = () => {
  return (
    <Portal>
      <TouchableWithoutFeedback>
        <View style={styles.backgroundBlur}>
          <TouchableWithoutFeedback>
            <ActivityIndicator
              style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
              animating={true}
              color="#fe8710"
            />
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
    backgroundColor: "rgba(0, 0, 0, 0.3)",
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

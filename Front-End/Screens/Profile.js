import { Text, View, ScrollView, Pressable } from "react-native";
import {
  TouchableRipple,
  PaperProvider,
  IconButton,
  Icon,
} from "react-native-paper";

import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import { styles } from "../Const/Styles";
import UpdateUserName from "./UpdateUserName";

export default function Profile() {
  const theme = useSelector((state) => state.settings.theme);

  const navigation = useNavigation();

  let containerColor, fontColor, listColor, fontColorDes;
  if (theme === "light") {
    containerColor = styles.Settings.darkBackGround.Container;
    listColor = styles.Settings.darkBackGround.listColor;
    fontColor = styles.Settings.darkBackGround.listTextColor;
    fontColorDes = styles.Settings.darkBackGround.listTextColorDes;
    console.log("light");
  } else {
    containerColor = styles.Settings.lightBackGround.Container;
    listColor = styles.Settings.lightBackGround.listColor;
    fontColor = styles.Settings.lightBackGround.listTextColor;
    fontColorDes = styles.Settings.lightBackGround.listTextColorDes;
    console.log("dark");
  }

  return (
    <PaperProvider>
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
          icon="menu"
          iconColor="#000"
          size={30}
          onPress={() => navigation.toggleDrawer()}
        />
        <Text style={{ fontSize: 25, fontWeight: "500" }}> Profile </Text>
      </Pressable>
      <ScrollView
        contentContainerStyle={[styles.Settings.Container, containerColor]}
      >
        <Pressable
          style={[styles.Settings.listContainer, listColor]}
          onPress={() => {
            navigation.navigate("UpdateUserName");
          }}
        >
          <View style={[styles.Settings.fontColor]}>
            <Text style={[{ fontSize: 20, fontWeight: "bold" }, fontColor]}>
              Update User Name
            </Text>
            <Text style={[{ fontSize: 14, marginTop: "5%" }, fontColorDes]}>
              Click here to update current user name.
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {/* <Switch
              value={isDark}
              onValueChange={onToggleSwitch}
              color="#FAB300"
              style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
            /> */}
            <Icon source="account-edit" size={35} color="grey" />
          </View>
        </Pressable>
        <View style={[styles.Settings.listContainer, listColor]}>
          <View style={[styles.Settings.fontColor]}>
            <Text style={[{ fontSize: 20, fontWeight: "bold" }, fontColor]}>
              Update Password
            </Text>
            <Text style={[{ fontSize: 14, marginTop: "5%" }, fontColorDes]}>
              Click here to update current password.
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {/* <Switch
              value={isDark}
              onValueChange={onToggleSwitch}
              color="#FAB300"
              style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
            /> */}
            <Icon source="pencil-lock" size={35} color="grey" />
          </View>
        </View>
      </ScrollView>
    </PaperProvider>
  );
}

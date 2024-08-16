import { useEffect, useState } from "react";
import { Text, View, ScrollView } from "react-native";
import { Switch, TouchableRipple, PaperProvider } from "react-native-paper";
import FontDialong from "../Components/FontDialong";

import { useDispatch, useSelector } from "react-redux";
import { editTheme } from "../Redux/appSettingsSlice";
import { styles } from "../Const/Styles";

export default function Settings() {
  const dispatch = useDispatch();
  const [isDark, setIsDark] = useState(false);
  const [fontDialong, setFontDialong] = useState(false);

  const theme = useSelector((state) => state.settings.theme);

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

  const onToggleSwitch = () => {
    dispatch(editTheme(!isDark));
    setIsDark(!isDark);

    console.log("isDark", isDark);
  };
  return (
    <PaperProvider>
      <ScrollView
        contentContainerStyle={[styles.Settings.Container, containerColor]}
      >
        <View style={[styles.Settings.listContainer, listColor]}>
          <View style={[styles.Settings.fontColor]}>
            <Text style={[{ fontSize: 20, fontWeight: "bold" }, fontColor]}>
              BackGround
            </Text>
            <Text style={[{ fontSize: 14, marginTop: "5%" }, fontColorDes]}>
              Toggle to enable the dark mode
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Switch
              value={isDark}
              onValueChange={onToggleSwitch}
              color="#FAB300"
              style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
            />
          </View>
        </View>
        <View
          style={[
            {
              backgroundColor: "#eee",
              paddingHorizontal: "7%",
              borderBottomColor: "#000",
              borderBottomWidthWidth: 1.5,
              paddingVertical: "7%",
              justifyContent: "space-between",

              flexDirection: "row",
            },
            listColor,
          ]}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              paddingRight: "10%",
              width: "80%",
            }}
          >
            <Text style={[{ fontSize: 20, fontWeight: "bold" }, fontColor]}>
              Change Font
            </Text>
            <Text style={[{ fontSize: 14, marginTop: "5%" }, fontColorDes]}>
              Change the font of the application to make it more readable.
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              width: "23%",
              alignItems: "flex-start",
            }}
          >
            <TouchableRipple
              rippleColor={"#ffb300"}
              onPress={() => {
                setFontDialong(true);
              }}
              centered={true}
              style={{
                width: "100%",
                backgroundColor: "#fab300",
                height: 35,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 20,
              }}
            >
              <View>
                <Text style={{ color: "#fff" }}>Medium</Text>
              </View>
            </TouchableRipple>
          </View>
        </View>
      </ScrollView>
      {fontDialong && (
        <FontDialong isVisible={fontDialong} setIsVisible={setFontDialong} />
      )}
    </PaperProvider>
  );
}

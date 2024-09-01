import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableRipple, IconButton, Icon } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import Drawer from "../assets/drawer.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logoutAppSettings } from "../Redux/appSettingsSlice";
import { logoutUser } from "../Redux/userSlice";
import { logout } from "../Redux/authSlice";
import { clearCart } from "../Redux/cartSlice";
import { logoutSession } from "../Redux/sessionSlice";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

export default CustomDrawerContent = (props) => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Define route configurations with text and icons
  const routeConfigs = {
    BottomNavigation: {
      label: "Home",
      icon: "home",
      focusIcon: "home-outline",
    },
    ProfileStack: {
      label: "Profile",
      icon: "account",
      focusIcon: "account-outline",
    },
    Settings: { label: "Settings", icon: "cog", focusIcon: "cog-outline" },
    LikedItemsStack: {
      label: "Liked",
      icon: "heart",
      focusIcon: "heart-outline",
    },
    OrderStack: {
      label: "Orders",
      icon: "shopping",
      focusIcon: "shopping-outline",
    },
    CartStack: {
      label: "Cart",
      icon: "cart",
      focusIcon: "cart-outline",
    },
  };

  //clear JWT token
  const clearJWT = async () => {
    try {
      await AsyncStorage.removeItem("jwt");
      return true;
    } catch (error) {
      console.log("Error", error);
      return false;
    }
  };

  const googleSignOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      return true;
    } catch (error) {
      console.log("Error", error);
      return false;
    }
  };

  const clearReduxData = async () => {
    dispatch(logoutAppSettings());
    dispatch(logoutUser());

    dispatch(clearCart());
    dispatch(logoutSession());
    dispatch(logout());
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={InlineStyles.headerContainer}>
        <View style={{ width: 150, height: 150 }}>
          <Image
            resizeMode="contain"
            source={Drawer}
            style={{ width: "100%", height: "100%" }}
          />
        </View>
      </View>
      <View style={{ borderWidth: 1, borderColor: "#fff" }} />
      <View
        style={{
          width: "100%",
          paddingVertical: 30,
          backgroundColor: "#afeeee",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "500" }}>{user.name}</Text>
      </View>

      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
        }}
      >
        {props.state.routes.map((route, index) => {
          const { label, icon, focusIcon } = routeConfigs[route.name] || {};
          let focused = props.state.index === index;

          {
            /* if (route.name === "BottomNavigation") {
              const bottomTabRoute =
                props.state.routes[props.state.index].state?.routeNames?.[
                  props.state.routes[props.state.index].state?.index
                ] ?? "Home";

              if (bottomTabRoute === "Home") {
                focused = label === "Home";
              } else if (bottomTabRoute === "CartStack") {
                label = "Cart";
                focused = label === "Cart";
              }
            } */
          }

          return (
            <TouchableRipple
              rippleColor="#ccc"
              centered={true}
              key={index}
              onPress={() => {
                if (route.name === "CartStack") {
                  navigation.navigate("BottomNavigation", {
                    screen: "CartStack",
                  });
                } else if (route.name === "BottomNavigation") {
                  navigation.navigate("BottomNavigation", {
                    screen: "Home",
                  });
                } else {
                  navigation.navigate(route.name);
                  props.navigation.closeDrawer();
                }
              }}
              style={InlineStyles.drawerItem}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
              >
                <IconButton
                  icon={focused ? icon : focusIcon}
                  size={30}
                  iconColor={focused ? "#fab300" : "#000"}
                />
                <Text
                  style={[
                    { fontSize: 18, marginLeft: 10 },
                    focused && { color: "#fab300" },
                  ]}
                >
                  {label || route.name}
                </Text>
              </View>
            </TouchableRipple>
          );
        })}
      </ScrollView>

      <TouchableOpacity
        style={InlineStyles.logoutButton}
        onPress={async () => {
          if (user.signUpMethod === "google") {
            try {
              await googleSignOut();
            } catch (e) {
              console.log(e.message);
            }
          }
          if (await clearJWT()) {
            clearReduxData();
          }

          // Handle logout logic here
        }}
      >
        <Text style={InlineStyles.logoutText}>Logout</Text>
        <IconButton icon="logout" size={27} iconColor="#d9534f" />
      </TouchableOpacity>
    </View>
  );
};

const InlineStyles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#fab300",
    height: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
  drawerItem: {
    width: "100%",
    alignItems: "baseline",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  logoutButton: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  logoutText: {
    fontSize: 20,
    color: "#d9534f",
  },
});

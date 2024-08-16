import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableRipple, IconButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import drawer from "../assets/drawer.png";

export default CustomDrawerContent = (props) => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.user);

  // Define route configurations with text and icons
  const routeConfigs = {
    BottomNavigation: { label: "Home", icon: "home" },
    ProfileStack: { label: "Profile", icon: "account" },
    Settings: { label: "Settings", icon: "cog" },
    OrderStack: { label: "Orders", icon: "receipt" },
    // Add more routes here
    // Orders: { label: "My Orders", icon: "receipt-outline" },
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={InlineStyles.headerContainer}>
        <View style={{ width: 150, height: 150 }}>
          <Image
            resizeMode="contain"
            source={drawer}
            style={{ width: "100%", height: "100%" }}
          />
        </View>
      </View>
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
          flex: 1,
          alignItems: "center",
        }}
      >
        {props.state.routes.map((route, index) => {
          const { label, icon } = routeConfigs[route.name] || {};
          const focused = props.state.index === index;

          return (
            <TouchableRipple
              rippleColor="#ccc"
              centered={true}
              key={index}
              onPress={() => {
                navigation.navigate(route.name);
                props.navigation.closeDrawer();
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
                  icon={focused ? icon : icon + "-outline"}
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
          // Handle logout logic here
          if (await clearJWT()) {
            clearReduxUserData();
            setIsLogOut(false);
            navigation.navigate("Login");
          } else {
            setIsLogOut(false);
            alert("Sorry!!!Cannot Log you Out.");
          }
        }}
      >
        <Text style={InlineStyles.logoutText}>Logout</Text>
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
    paddingVertical: 35,
    paddingHorizontal: 20,
  },
  logoutButton: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    alignItems: "center",
  },
  logoutText: {
    fontSize: 18,
    color: "#d9534f",
  },
});
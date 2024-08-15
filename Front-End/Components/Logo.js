import { View, Image } from "react-native";
import logo from "../assets/logo.png";

const Logo = () => {
  return (
    <View style={{ width: "45%", height: 150 }}>
      <Image
        source={logo}
        style={{ width: "100%", height: "100%", resizeMode: "contain" }}
      />
    </View>
  );
};

export default Logo;

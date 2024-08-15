import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { List } from "react-native-paper";

const DropDownList = ({ categoryHandler }) => {
  const [expanded, setExpanded] = React.useState(false);
  const [category, setCategory] = React.useState("Select Category");

  const handlePress = () => setExpanded(!expanded);
  return (
    <View
      style={{
        width: "60%",
        borderWidth: 1,
        borderColor: "#ffc",
      }}
    >
      <List.Accordion
        title={category}
        left={(props) => <List.Icon {...props} icon="menu" />}
        expanded={expanded}
        onPress={handlePress}
      >
        <List.Item
          title="All"
          onPress={() => {
            setCategory("Select Category");
            categoryHandler("Select Category");
            handlePress();
          }}
        />
        <List.Item
          title="Fridges"
          onPress={() => {
            setCategory("Fridges");
            categoryHandler("Fridges");
            handlePress();
          }}
        />
        <List.Item
          title="Mobile Phones"
          onPress={() => {
            setCategory("Mobile Phones");
            categoryHandler("Mobile Phones");
            handlePress();
          }}
        />
        <List.Item
          title="Sofa, Bed & Tables"
          onPress={() => {
            setCategory("Sofa, Bed & Tables");
            categoryHandler("Sofa, Bed & Tables");
            handlePress();
          }}
        />
        <List.Item
          title="Washing Machines"
          onPress={() => {
            setCategory("Washing Machines");
            categoryHandler("Washing Machines");
            handlePress();
          }}
        />
        <List.Item
          title="Mobile Accessories"
          onPress={() => {
            setCategory("Mobile Accessories");
            categoryHandler("Mobile Accessories");
            handlePress();
          }}
        />
      </List.Accordion>
    </View>
  );
};

export default DropDownList;

const styles = StyleSheet.create({});

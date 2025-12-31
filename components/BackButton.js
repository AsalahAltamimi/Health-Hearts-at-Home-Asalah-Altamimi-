import React from "react";
import { IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const BackButton = () => {
  const navigation = useNavigation();
  return <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />;
};

export default BackButton;




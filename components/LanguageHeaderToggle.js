import React from "react";
import { IconButton } from "react-native-paper";
import { useLanguage } from "../context/LanguageContext";

const LanguageHeaderToggle = () => {
  const { toggleLanguage } = useLanguage();
  return <IconButton icon="translate" onPress={toggleLanguage} />;
};

export default LanguageHeaderToggle;




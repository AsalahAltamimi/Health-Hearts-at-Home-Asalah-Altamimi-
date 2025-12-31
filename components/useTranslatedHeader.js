import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useT, useLanguage } from "../context/LanguageContext";

// Call inside any screen to auto-update the header title when language changes
export default function useTranslatedHeader(key) {
  const navigation = useNavigation();
  const t = useT();
  const { language } = useLanguage();

  useEffect(() => {
    navigation.setOptions({ headerTitle: t(key) });
  }, [navigation, t, key, language]);
}




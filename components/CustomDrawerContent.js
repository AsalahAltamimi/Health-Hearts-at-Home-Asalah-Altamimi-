import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import { Text } from "react-native-paper";
import { useAuth } from "../context/AuthContext";
import { useT } from "../context/LanguageContext";

const CustomDrawerContent = (props) => {
  const { logout, user } = useAuth();
  const t = useT();

  const handleLogout = () => {
    Alert.alert(
      t("logout"),
      t("logout_confirmation"),
      [
        {
          text: t("cancel"),
          style: "cancel",
        },
        {
          text: t("logout"),
          style: "destructive",
          onPress: async () => {
            try {
              await logout();
            } catch (error) {
              Alert.alert(t("error"), error.message);
            }
          },
        },
      ]
    );
  };

  return (
    <DrawerContentScrollView 
      {...props} 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {user && (
        <View style={styles.userInfo}>
          <Text variant="titleMedium" style={styles.userEmail}>
            {user.email}
          </Text>
        </View>
      )}
      <DrawerItemList {...props} />
      <View style={styles.logoutSection}>
        <DrawerItem
          label={t("logout")}
          icon={({ color, size }) => {
            const { Icon } = require("react-native-paper");
            return <Icon source="logout" color={color} size={size} />;
          }}
          onPress={handleLogout}
          labelStyle={styles.logoutLabel}
          style={styles.logoutItem}
        />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  userInfo: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    backgroundColor: "#F4F4F4",
  },
  userEmail: {
    color: "#34495E",
    fontWeight: "500",
  },
  logoutSection: {
    marginTop: "auto",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    paddingTop: 8,
  },
  logoutLabel: {
    color: "#E74C3C",
    fontWeight: "600",
  },
  logoutItem: {
    marginTop: 8,
  },
});

export default CustomDrawerContent;

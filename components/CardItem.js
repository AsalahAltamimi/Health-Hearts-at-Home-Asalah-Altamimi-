import React from "react";
import { StyleSheet } from "react-native";
import { Card, Text, Icon, IconButton } from "react-native-paper";

const CardItem = ({ title, description, icon, onPress, rightActionLabel, rightActionIcon, onRightAction }) => {
  return (
    <Card style={styles.card} onPress={onPress}>
      <Card.Title
        title={title}
        subtitle={description}
        left={() => <Icon source={icon || "information-outline"} size={24} />}
        right={(props) => (
          rightActionIcon || rightActionLabel ? (
            <IconButton {...props} icon={rightActionIcon || "chevron-right"} onPress={onRightAction || onPress} />
          ) : null
        )}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default CardItem;



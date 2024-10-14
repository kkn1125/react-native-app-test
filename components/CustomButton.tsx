import React from "react";
import {
  GestureResponderEvent,
  Pressable,
  Text,
  TextStyle,
  View,
} from "react-native";

interface CustomButtonProps {
  title: string;
  style?: TextStyle;
  onPress?: (e: GestureResponderEvent) => void;
}
const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  style = {},
  onPress,
}) => {
  return (
    <View style={{ display: "flex", flexDirection: "row" }}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          {
            borderRadius: 3,
            backgroundColor: "#1205a6",
            fontSize: 18,
            textAlign: "center",
            paddingVertical: 5,
            paddingHorizontal: 10,
          },
        ]}>
        <Text
          style={{
            color: "white",
            fontWeight: "700",
            textTransform: "uppercase",
            ...style,
          }}>
          {title}
        </Text>
      </Pressable>
    </View>
  );
};

export default CustomButton;

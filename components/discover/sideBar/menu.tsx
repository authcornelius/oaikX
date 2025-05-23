import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { FontAwesome, FontAwesome5, FontAwesome6, Ionicons } from "@expo/vector-icons";

interface MenuItemProps {
  icon: {
    type: "FontAwesome" | "FontAwesome5" | "FontAwesome6" | "Ionicons";
    name: string;
  };
  label: string;
  onPress: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, onPress }) => {
  const renderIcon = () => {
    const iconProps = {
      size: 20,
      color: "#0D1D35"
    };

    switch (icon.type) {
      case "FontAwesome":
        return <FontAwesome name={icon.name} {...iconProps} />;
      case "FontAwesome5":
        return <FontAwesome5 name={icon.name} {...iconProps} />;
        case "FontAwesome6":
        return <FontAwesome6 name={icon.name} {...iconProps} />;
      case "Ionicons":
        return <Ionicons name={icon.name} {...iconProps} />;
      default:
        return null;
    }
  };

  return (
    <TouchableOpacity
      className="flex-row items-center py-2"
      onPress={onPress}
    >
      <View className="flex justify-center items-center w-10 h-10">
        {renderIcon()}
      </View>
      <Text className="ml-1 text-base font-inter-medium text-[#0D1D35]">
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default MenuItem;

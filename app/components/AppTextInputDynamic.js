import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from "../config/styles";
import colors from "../config/colors";

function AppTextInputDynamic({
  icon,
  width = "100%",
  onFocusChange,
  ...otherProps
}) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocusChange = (focused) => {
    setIsFocused(focused);
    if (onFocusChange) {
      onFocusChange(focused); // Notify parent about the focus state change
    }
  };

  return (
    <View
      style={[
        styles.container,
        isFocused && styles.focusedContainer,
        { width },
      ]}
    >
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={25}
          // color={defaultStyles.colors.medium}
          color={isFocused ? colors.primary : colors.medium}
          style={styles.icon}
        />
      )}
      <TextInput
        placeholderTextColor={defaultStyles.colors.medium}
        style={[defaultStyles.text, styles.text]}
        onFocus={() => handleFocusChange(true)}
        onBlur={() => handleFocusChange(false)}
        {...otherProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: defaultStyles.colors.medium,
    flexDirection: "row",
    width: "100%",
    padding: 15,
    marginVertical: 10,
    alignItems: "center",
  },
  focusedContainer: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: defaultStyles.colors.primary,
    flexDirection: "row",
    width: "100%",
    padding: 15,
    marginVertical: 10,
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
  text: {
    flex: 1,
  },
});

export default AppTextInputDynamic;

import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

function CalculatorScreen() {
  const [input, setInput] = useState("");
  const [description, setDescription] = useState("");
  const [lastResult, setLastResult] = useState("");

  const handleButtonPress = (value) => {
    // Add input or calculate based on button press
    if (value === "=") {
      try {
        // Evaluate the result
        const result = eval(input); // Note: Using eval is generally unsafe; consider using a proper math parser library for production
        setLastResult(result.toString());
        setInput(result.toString());
      } catch (error) {
        setInput("Error");
      }
    } else if (value === "C") {
      // Clear the input
      setInput("");
    } else {
      setInput((prevInput) => prevInput + value);
    }
  };

  return (
    <View style={styles.container}>
      {/* Display Area */}
      <View style={styles.displayArea}>
        <TextInput
          style={styles.displayInput}
          value={input}
          placeholder="Enter calculation"
          editable={false} // Read-only, so user can't directly type
        />
        <Text style={styles.lastResult}>Last Result: {lastResult}</Text>
      </View>

      {/* Description Input */}
      <TextInput
        style={styles.descriptionInput}
        value={description}
        onChangeText={setDescription}
        placeholder="Add description"
      />

      {/* Calculator Buttons */}
      <View style={styles.calculator}>
        {[
          "1",
          "2",
          "3",
          "+",
          "4",
          "5",
          "6",
          "-",
          "7",
          "8",
          "9",
          "x",
          "0",
          ".",
          "C",
          "/",
          "=",
        ].map((item) => (
          <TouchableOpacity
            key={item}
            style={styles.button}
            onPress={() => handleButtonPress(item)}
          >
            <Text style={styles.buttonText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  displayArea: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  displayInput: {
    fontSize: 24,
    color: "#000",
    marginBottom: 10,
  },
  lastResult: {
    fontSize: 18,
    color: "#888",
  },
  descriptionInput: {
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
    marginBottom: 20,
  },
  calculator: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  button: {
    width: "22%",
    backgroundColor: "#ddd",
    margin: 5,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: "#000",
  },
});

export default CalculatorScreen;

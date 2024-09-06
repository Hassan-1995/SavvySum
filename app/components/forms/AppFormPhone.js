import React, { useState } from "react";
import { useFormikContext } from "formik";

import ErrorMessage from "./ErrorMessage";
import AppTextInput from "../AppTextInput";

function AppFormPhone({ name, width, ...otherProps }) {
  const { setFieldTouched, handleChange, errors, touched } = useFormikContext();
  const [text, setText] = useState(""); // Initialize with "03"

  const formatPhoneNumber = (input) => {
    // Remove any non-digit characters
    let cleaned = input.replace(/\D/g, "");

    // Limit the length to 11 digits
    if (cleaned.length > 11) cleaned = cleaned.slice(0, 11);

    // Apply the format 03XX-1234567
    if (cleaned.length > 4) {
      cleaned = `${cleaned.slice(0, 4)}-${cleaned.slice(4)}`;
    }

    return cleaned;
  };

  const handleTextChange = (input) => {
    const formatted = formatPhoneNumber(input);
    setText(formatted);
    handleChange(name)(formatted); // Set the formatted value in Formik
  };

  return (
    <>
      <AppTextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={handleTextChange} // Use the custom handler
        width={width}
        value={text}
        keyboardType="numeric" // Ensure the keyboard is numeric
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormPhone;

import React from "react";
import * as Yup from "yup";

import { View, StyleSheet, Image, ScrollView } from "react-native";

import {
  AppForm,
  AppFormDate,
  AppFormField,
  AppFormPassword,
  SubmitButton,
} from "../components/forms";
import Screen from "../components/Screen";
import AppFormPhone from "../components/forms/AppFormPhone";

const validationSchema = Yup.object().shape({
  mobile_phone_number: Yup.string().required().min(12).label("Mobile Number"),
});

function LoginScreen(props) {
  const Login = (values) => {
    console.log(values);
  };

  return (
    <Screen>
      <ScrollView style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logoImage}
            source={require("../assets/SavvySumLogo_1.png")}
          />
          <Image
            style={styles.nameImage}
            source={require("../assets/LogoName.png")}
          />
        </View>

        <AppForm
          initialValues={{
            mobile_phone_number: "",
          }}
          onSubmit={(values) => Login(values)}
          validationSchema={validationSchema}
        >
          <AppFormPhone
            autoCapitalize="none"
            autoCorrect={false}
            icon="cellphone"
            keyboardType="numeric"
            name="mobile_phone_number"
            placeholder="Mobile Number"
            textContentType="emailAddress"
          />
          <SubmitButton title="Login" />
        </AppForm>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  logoContainer: {
    width: "100%",
    height: 300,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  nameImage: {
    width: "100%",
    height: 100,
  },
  logoImage: {
    width: 105,
    height: 100,
    resizeMode: "cover",
    // backgroundColor: "blue",
  },
  header: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "900",
  },
});

export default LoginScreen;

import React from "react";
import * as Yup from "yup";

import { View, StyleSheet, Image, ScrollView } from "react-native";

import { AppForm, AppFormField, SubmitButton } from "../components/forms";

import AppText from "../components/AppText";
import Screen from "../components/Screen";
import AppFormPhone from "../components/forms/AppFormPhone";

const validationSchema = Yup.object().shape({
  user_name: Yup.string().required().label("User Name"),
  mobile_phone_number: Yup.string().required().label("Mobile Number"),
});

function RegisterationScreen(props) {
  const Register = (values) => {
    console.log(values);
  };

  return (
    <Screen>
      <ScrollView style={styles.container}>
        <AppText style={styles.header}>Welcome to SavvySum</AppText>

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
            user_name: "",
            mobile_phone_number: "",
          }}
          onSubmit={(values) => Register(values)}
          validationSchema={validationSchema}
        >
          <AppFormField
            autoCapitalize="words"
            autoCorrect={false}
            icon="account-outline"
            keyboardType="email-address"
            name="user_name"
            placeholder="User Name"
          />
          <AppFormPhone
            autoCapitalize="none"
            autoCorrect={false}
            icon="cellphone"
            keyboardType="numeric"
            name="mobile_phone_number"
            placeholder="Mobile Number"
            textContentType="emailAddress"
          />
          <SubmitButton title="Register" />
        </AppForm>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    // marginBottom: 20,
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
    marginTop: 30,
  },
});

export default RegisterationScreen;

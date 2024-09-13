import React, { useContext, useState } from "react";
import * as Yup from "yup";
import usersApi from "../api/users";
import { jwtDecode } from "jwt-decode";

import { View, StyleSheet, Image, ScrollView } from "react-native";

import { AppForm, SubmitButton } from "../components/forms";
import Screen from "../components/Screen";
import AppFormPhone from "../components/forms/AppFormPhone";
import AuthContext from "../auth/context";
import authStorage from "../auth/storage";

const validationSchema = Yup.object().shape({
  mobile_phone_number: Yup.string().required().min(12).label("Mobile Number"),
});

function LoginScreen(props) {
  const authContext = useContext(AuthContext);
  const [loginID, setLoginID] = useState(true);
  const [loading, setLoading] = useState(false);

  const Login = async (values) => {
    try {
      const { user, token } = await usersApi.authenticateUser(
        values.mobile_phone_number
      );

      if (!user || !token) {
        setLoginID(false);
        setLoading(false);
        return;
      }

      setLoginID(true);

      const auth = jwtDecode(token);
      authContext.setUser(user);
      authStorage.storeToken(token);

      console.log(user);
    } catch (error) {
      console.error("Error authenticating user:", error.message);
      setLoginID(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen>
      <ScrollView style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logoImage}
            source={require("../assets/SavvySyncLogo.png")}
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
    width: 150,
    height: 110,
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

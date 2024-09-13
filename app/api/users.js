import client from "./client";

const endPoint = "/users";

const authenticateUser = async (mobile_phone_number) => {
  try {
    // const response = await client.post("/api/auth", { email, password });
    const response = await client.post("/login/", { mobile_phone_number });
    return response.data;
  } catch (error) {
    console.error("Error authenticating user:", error);
    throw error;
  }
};

const createNewUser = async (user_name, mobile_phone_number) => {
  console.log(
    "Creating user with name ",
    user_name,
    " and Mobile Number: ",
    mobile_phone_number
  );

  const data = {
    user_name: user_name,
    mobile_phone_number: mobile_phone_number,
  };

  try {
    const result = await client.post("/register/", data);

    if (result.data.error) {
      throw new Error(result.data.error); // Handle error returned from backend
    }

    return result.data; // Return user data on success
  } catch (error) {
    console.error("Error creating user:", error.message);
    throw error;
  }
};

export default {
  authenticateUser,
  createNewUser,
};

const successMessages = {
  SIGNIN_SUCCESS: "SignIn Successful.",
  SIGNUP_SUCCESS: "User signin successful.",
  OTP_SENT_SUCCESS: "OTP sent successfully.",
  USER_CREATE_SUCCESS: "User created successfully",
  FORGET_PASSWORD_SUCCESS: "Forget password successful. please check you mail box for the OTP.",
  ACCOUNT_DELETE_SUCCESS: "Account Delete Successful.",
};

const errorMessages = {
    LOGIN_ERROR: "Login Error",
    USER_NOT_FOUND : "User not found!",
    USER_NOT_VERIFIED : "User is not verified. Please verify the email first.",
    ENTER_VALID_PASSWORD : "Please enter a valid password.",
    INVALID_OTP : "Invalid OTP",
    ERROR_SIGNUP : "Error creating user : ",
    ERROR_SIGNIN : "Error while signing in : ",
    ERROR_OTP : "Error sending OTP : ",
    ERROR_VERIFY_OTP : "Error verifying OTP : ",
    ERROR_FORGET_PASSWORD : "Error while forget password : ",
    ERROR_DELETE_ACCOUNT :  "Error while deleting account : ",
};


export  {
  successMessages,
  errorMessages,
};

const successMessages = {
  /**
   * Auth
   */
  SIGNIN_SUCCESS: "SignIn Successful.",
  SIGNUP_SUCCESS: "User signin successful.",
  OTP_SENT_SUCCESS: "OTP sent successfully.",
  USER_CREATE_SUCCESS: "User created successfully",
  FORGET_PASSWORD_SUCCESS:
    "Forget password successful. please check you mail box for the OTP.",
  ACCOUNT_DELETE_SUCCESS: "Account Delete Successful.",

  /**
   * Category
   */
  CATEGORY_CREATE_SUCCESS: "Category created successfully",
  CATEGORY_DELETE_SUCCESS: "Category delete successfully",

  /**
   * Product
   */
  PRODUCT_CREATE_SUCCESS: "Product created successfully",
  PRODUCT_UPDATE_SUCCESS: "Product update successfully",

  /**
   * Address
   */
  ADDRESS_CREATE_SUCCESS: "Address created successfully",
  DELETE_ADDRESS_SUCCESS: "Delete address successfully",
  UPDATE_ADDRESS_SUCCESS: "Update address successfully",

  /**
   * Cart
   */
  ADD_ITEM_IN_CART_SUCCESS: "Product add in successfully in your cart",
  PRODUCT_REMOVE_FROM_CART: "Product remove from cart!",

  /**
   * Order
   */
  UPDATE_STATUS_SUCCESS : "update status successful",
};

const errorMessages = {
  /**
   * Auth
   */
  LOGIN_ERROR: "Login Error",
  USER_NOT_FOUND: "User not found!",
  USER_NOT_VERIFIED: "User is not verified. Please verify the email first.",
  ENTER_VALID_PASSWORD: "Please enter a valid password.",
  INVALID_OTP: "Invalid OTP",
  ERROR_SIGNUP: "Error creating user : ",
  ERROR_SIGNIN: "Error while signing in : ",
  ERROR_OTP: "Error sending OTP : ",
  ERROR_VERIFY_OTP: "Error verifying OTP : ",
  ERROR_FORGET_PASSWORD: "Error while forget password : ",
  ERROR_DELETE_ACCOUNT: "Error while deleting account : ",

  /**
   * Category
   */
  CATEGORY_ALREADY_EXISTS: "Category already exists",
  CATEGORY_ID_NOT_FOUND : "Please enter the category ID.",
  CATEGORY_NOT_FOUND :"Category not Found.",

  /**
   * Product
   */
  INVALID_CATEGORY: "Please insert the valid category.",
  PRODUCT_NOT_FOUND: "Product not found",
  PRODUCT_EXISTS: "Same product already exists.",
  PRODUCT_ID_NOT_FOUND : "Please enter the product ID.",

  /**
   * Address
   */
  ADDRESS_NOT_FOUND: "Address not found.",
  ADDRESS_VALIDATION: "Please enter the address id.",
  ADDRESS_UPDATE_FAILED: "Failed to update the default address",
  ADDRESS_EXISTS: "Same address already exists.",

  /**
   * Cart
   */
  PRODUCT_ID_NOT_FOUND: "Please enter the product id.",
  PRODUCT_ALREADY_IN_CART: "Product already in cart.",
  VALID_CART_ID: "Please enter valid cart Id",
  CART_NOT_FOUND: "Cart product not found",
  EMPTY_CART : "Empty Cart!",

  /**
   * Order
   */
  ORDER_HISTORY_NOT_FOUND : "Order history not found!",
  ALREADY_UPDATED : "Already have the updated status!",

  /**
   * Common
   */
  VALIDATION_ERROR: "Validation failed",
  INTERNAL_SERVER_ERROR: "Internal Server Error",
  USER_ID_VALIDATION: "Please enter the user id.",
};

export { successMessages, errorMessages };

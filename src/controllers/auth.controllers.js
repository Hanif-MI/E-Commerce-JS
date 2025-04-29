import {
  emailValidation,
  signInValidation,
  signUpValidation,
} from "../validatons/auth.validation.js";
import Models from "../models/index.js";
import bcrypt from "bcrypt";
import {
  errorResponseData,
  errorResponseWithoutData,
  successResponseData,
  successResponseWithoutData,
} from "../utility/response.js";
import { RESPONSE_CODE } from "../utility/constant.js";
import { sendOTPEmail } from "../services/mail.service.js";
import { generateToken } from "../utility/helper.js";
import { checkIfUserExists, createUser } from "../services/auth.service.js";
import { errorMessages, successMessages } from "../utility/messages.js";

/**
 * This function is responsible for the creating new user,
 * This function will take multiple parameters ->  username, email, phone, password
 */
const signUp = async (req, res) => {
  /**
   * Steps to create a user:
   * 1. Validate the request body
   * 2. Check if the user already exists
   * 3. Hash the password
   * 4. Create the user in the database
   * 5. Send a response
   * 6. Handle errors
   * 7. Test the endpoint
   */

  try {
    return signUpValidation(req, res, async (isValid) => {
      if (!isValid)
        return errorResponseData(
          res,
          RESPONSE_CODE.BAD_REQUEST,
          errorMessages.VALIDATION_ERROR
        );

      const { username, email, phone, password } = req.body;

      const existingUser = await checkIfUserExists(email);

      if (existingUser) {
        return errorResponseData(
          res,
          RESPONSE_CODE.BAD_REQUEST,
          "User already exists"
        );
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await createUser({
        username,
        email,
        phone,
        password: hashedPassword,
      });
      await sendOTPEmail(newUser.email, newUser.id);
      successResponseData(
        res,
        {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
          phone: newUser.phone,
          is_verified: newUser.is_verified,
          wallet_balance: newUser.wallet_balance,
          createdAt: newUser.createdAt,
          updatedAt: newUser.updatedAt,
        },
        RESPONSE_CODE.SUCCESS,
        successMessages.USER_CREATE_SUCCESS
      );
    });
  } catch (error) {
    errorResponseData(
      res,
      RESPONSE_CODE.INTERNAL_SERVER,
      errorMessages.ERROR_SIGNUP + error.message
    );
  }
};

/**
 * This function is responsible for signin.
 * This will only take one parameters -> email and password.
 */
const signIn = async (req, res) => {
  /**
   * Steps to signin:
   * 1. Validate the request body.
   * 2. Check if user exists.
   * 3. Check if user is verified.
   * 4. Compare the credential's.
   * 5. Generate the JWT Token.
   * 6. Send a response.
   * 7. Handle errors.
   * 8. Test the endPoints
   */

  try {
    const UserModel = Models.User;
    signInValidation(req, res, async (isValidate) => {
      if (!isValidate)
        return errorResponseData(
          res,
          RESPONSE_CODE.BAD_REQUEST,
          errorMessages.VALIDATION_ERROR
        );

      const { email, password } = req.body;

      const user = await UserModel.findOne({
        where: { email },
        include: [{ model: Models.Address, as: "address" }],
      });

      if (!user)
        return errorResponseWithoutData(
          res,
          RESPONSE_CODE.NOT_FOUND,
          errorMessages.USER_NOT_FOUND
        );

      if (!user.is_verified) {
        return errorResponseWithoutData(
          res,
          RESPONSE_CODE.UNAUTHORIZED,
          errorMessages.USER_NOT_VERIFIED
        );
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return errorResponseWithoutData(
          res,
          RESPONSE_CODE.FORBIDDEN,
          errorMessages.ENTER_VALID_PASSWORD
        );
      }

      const token = generateToken(user.id);
      const address = await user.getAddress();
      return successResponseData(
        res,
        {
          id: user.id,
          username: user.username,
          email: user.email,
          phone: user.phone,
          is_verified: user.is_verified,
          wallet_balance: user.wallet_balance,
          addresses: address,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          token: token,
        },
        RESPONSE_CODE.SUCCESS,
        successMessages.SIGNIN_SUCCESS
      );
    });
  } catch (error) {
    errorResponseData(
      res,
      RESPONSE_CODE.INTERNAL_SERVER,
      errorMessages.ERROR_SIGNIN + error.message
    );
  }
};

/**
 * This function is responsible for sending OTP.
 * This will only take one parameters -> email.
 */
const sendOTP = async (req, res) => {
  /**
   * Steps to send OTP:
   * 1. Validate the request body
   * 2. Check if the user exists
   * 3. Generate OTP
   * 4. Store OTP in the database
   * 5. Send OTP to the user's email
   * 6. Send a response
   * 7. Handle errors
   * 8. Test the endpoint
   */

  try {
    const { email } = req.body;

    const user = await checkIfUserExists(email);
    if (!user) {
      return errorResponseData(
        res,
        RESPONSE_CODE.BAD_REQUEST,
        errorMessages.USER_NOT_FOUND
      );
    }
    await sendOTPEmail(user.email, user.id);
    successResponseWithoutData(
      res,
      RESPONSE_CODE.SUCCESS,
      successMessages.OTP_SENT_SUCCESS
    );
  } catch (error) {
    errorResponseData(
      res,
      RESPONSE_CODE.INTERNAL_SERVER,
      errorMessages.ERROR_OTP + error.message
    );
  }
};

/**
 * This function is responsible for verify OTP.
 * This will take two parameters -> email, otp.
 */
const verifyOTP = async (req, res) => {
  /**
   * Steps to verify OTP:
   * 1. Validate the request body
   * 2. Check if the user exists
   * 3. Check if the OTP is valid
   * 4. Update the user's is_verified status
   * 5. Send a response
   * 6. Handle errors
   * 7. Test the endpoint
   */

  try {
    const { email, otp } = req.body;

    const user = await checkIfUserExists(email);
    if (!user) {
      return errorResponseData(
        res,
        RESPONSE_CODE.BAD_REQUEST,
        errorMessages.USER_NOT_FOUND
      );
    }

    if (user.otp !== otp) {
      return errorResponseData(
        res,
        RESPONSE_CODE.BAD_REQUEST,
        errorMessages.INVALID_OTP
      );
    }

    user.is_verified = true;
    user.otp = null;
    await user.save();
    successResponseWithoutData(
      res,
      RESPONSE_CODE.SUCCESS,
      successMessages.OTP_SENT_SUCCESS
    );
  } catch (error) {
    errorResponseData(
      res,
      RESPONSE_CODE.INTERNAL_SERVER,
      errorMessages.ERROR_VERIFY_OTP + error.message
    );
  }
};

/**
 * This function is responsible for the forget password.
 * This will take the email as parameters.
 */

const forgetPassword = (req, res) => {
  /**
   * Steps for forget password.
   * 1. Validate the request body.
   * 2. Check the user in DB.
   * 3. Create the send the mail and update the entry in db.
   * 4. Send a response
   * 5. Handle errors
   * 6. Test the endpoint
   */
  try {
    return emailValidation(req, res, async (isValid) => {
      if (!isValid)
        return errorResponseWithoutData(
          res,
          RESPONSE_CODE.BAD_REQUEST,
          errorMessages.VALIDATION_ERROR
        );

      const { email } = req.body;

      const user = await checkIfUserExists(email);
      if (!user)
        return errorResponseWithoutData(
          res,
          RESPONSE_CODE.BAD_REQUEST,
          errorMessages.USER_NOT_FOUND
        );
      await sendOTPEmail(user.email, user.id, true);
      successResponseData(
        res,
        {},
        RESPONSE_CODE.SUCCESS,
        successMessages.FORGET_PASSWORD_SUCCESS
      );
    });
  } catch (error) {
    errorResponseData(
      res,
      RESPONSE_CODE.INTERNAL_SERVER,
      errorMessages.ERROR_FORGET_PASSWORD
    );
  }
};

/**
 * This function is responsible deleting the account
 */
const deleteMyAccount = async (req, res) => {
  /**
   * Steps to delete the account.
   * 1. check user is exists in database.
   * 2. soft delete and return the response.
   * 3. Handle errors
   * 4. Test the endpoint
   */

  try {
    const model = Models.User;
    await model.destroy({
      where: {
        id: req.user.id,
      },
    });
    successResponseWithoutData(
      res,
      201,
      successMessages.ACCOUNT_DELETE_SUCCESS
    );
  } catch (error) {
    errorResponseData(
      res,
      RESPONSE_CODE.INTERNAL_SERVER,
      errorMessages.ERROR_DELETE_ACCOUNT + error
    );
  }
};

export { signUp, signIn, sendOTP, verifyOTP, forgetPassword, deleteMyAccount };

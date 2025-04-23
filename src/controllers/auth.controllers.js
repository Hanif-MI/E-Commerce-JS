import {
  emailValidation,
  signInValidation,
  signUpValidation,
} from "../validatons/auth.validation.js";
import Models from "../models/index.js";
import bcrypt from "bcrypt";
import {
  errorResponseData,
  errorResponseWithData,
  errorResponseWithoutData,
  successResponseData,
} from "../utility/response.js";
import { RESPONSE_CODE } from "../utility/constant.js";
import { sendOTPEmail } from "../services/mail.service.js";
import { where } from "sequelize";
import { generateToken } from "../utility/helper.js";

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
    const UserModel = Models.User;

    return signUpValidation(req, res, async (isValid) => {
      if (!isValid)
        errorResponseData(res, RESPONSE_CODE.BAD_REQUEST, "Validation failed");

      const { username, email, phone, password } = req.body;

      const existingUser = await UserModel.findOne({ where: { email } });

      if (existingUser) {
        errorResponseData(
          res,
          RESPONSE_CODE.BAD_REQUEST,
          "User already exists"
        );
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await UserModel.create({
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
        "User created successfully"
      );
    });
  } catch (error) {
    errorResponseData(
      res,
      RESPONSE_CODE.INTERNAL_SERVER,
      "Error creating user"
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
        errorResponseData(res, RESPONSE_CODE.BAD_REQUEST, "Validation failed");

      const { email, password } = req.body;
      console.log("!@#", email);
      const user = await UserModel.findOne({ where: { email } });

      if (!user)
        return errorResponseWithoutData(
          res,
          RESPONSE_CODE.NOT_FOUND,
          "User not found!."
        );

      if (!user.is_verified) {
        return errorResponseWithoutData(
          res,
          RESPONSE_CODE.UNAUTHORIZED,
          "User is not verify please verify the email first."
        );
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return errorResponseWithoutData(
          res,
          RESPONSE_CODE.FORBIDDEN,
          "Please enter the valid password."
        );
      }

      const token = generateToken(user.id);

      return successResponseData(
        res,
        {
          id: user.id,
          username: user.username,
          email: user.email,
          phone: user.phone,
          is_verified: user.is_verified,
          wallet_balance: user.wallet_balance,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          token: token,
        },
        RESPONSE_CODE.SUCCESS,
        "User signin successful."
      );
    });
  } catch (error) {
    errorResponseData(
      res,
      RESPONSE_CODE.INTERNAL_SERVER,
      `Error while signin ${error}`
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
    const UserModel = Models.User;

    const user = await UserModel.findOne({ where: { email } });
    if (!user) {
      return errorResponseData(
        res,
        RESPONSE_CODE.BAD_REQUEST,
        "User not found"
      );
    }
    await sendOTPEmail(user.email, user.id);
    successResponseData(
      res,
      {},
      RESPONSE_CODE.SUCCESS,
      "OTP sent successfully"
    );
  } catch (error) {
    errorResponseData(res, RESPONSE_CODE.INTERNAL_SERVER, "Error sending OTP");
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
    const UserModel = Models.User;

    const user = await UserModel.findOne({ where: { email } });
    if (!user) {
      return errorResponseData(
        res,
        RESPONSE_CODE.BAD_REQUEST,
        "User not found"
      );
    }

    if (user.otp !== otp) {
      return errorResponseData(res, RESPONSE_CODE.BAD_REQUEST, "Invalid OTP");
    }

    user.is_verified = true;
    user.otp = null;
    await user.save();
    successResponseData(
      res,
      {},
      RESPONSE_CODE.SUCCESS,
      "OTP verified successfully"
    );
  } catch (error) {
    errorResponseData(
      res,
      RESPONSE_CODE.INTERNAL_SERVER,
      "Error verifying OTP"
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
    const userModel = Models.User;
    return emailValidation(req, res, async (isValid) => {
      if (!isValid)
        return errorResponseWithoutData(
          res,
          RESPONSE_CODE.BAD_REQUEST,
          "Validation failed"
        );

      const { email } = req.body;

      const user = await userModel.findOne({ where: { email } });
      if (!user)
        return errorResponseWithoutData(
          res,
          RESPONSE_CODE.BAD_REQUEST,
          "User not found please check you email."
        );
      await sendOTPEmail(user.email, user.id, true);
      successResponseData(
        res,
        {},
        RESPONSE_CODE.SUCCESS,
        "Forget password successful. please check you mail box for the OTP."
      );
    });
  } catch (error) {}
};

export { signUp, signIn, sendOTP, verifyOTP, forgetPassword };

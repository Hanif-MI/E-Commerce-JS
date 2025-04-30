import Models from "../models/index.js";
import {
  errorResponseData,
  errorResponseWithoutData,
  successResponseData,
  successResponseWithoutData,
} from "../utility/response.js";
import { RESPONSE_CODE } from "../utility/constant.js";
import { successMessages, errorMessages } from "../utility/messages.js";
import { checkIfUserExists } from "../services/auth.service.js";

const createAddress = async (req, res) => {
  /**
   * Steps to insert address in Database.
   * 1. Validate request body.
   * 2. Check in database shared userId's user exists.
   * 3. insert in the database.
   * 4. send response
   * 5. Handling error
   * 6. test the endpoint
   */

  try {
    const { full_address } = req.body;
    const user_id = req.user.id;
    const isUserExists = await checkIfUserExists(req.user.email);
    if (!isUserExists) {
      return errorResponseData(
        res,
        RESPONSE_CODE.BAD_REQUEST,
        errorMessages.USER_NOT_FOUND
      );
    }

    const model = Models.Address;

    const addressExists = await model.findOne({ where: { full_address } });
    if (addressExists) {
      return errorResponseWithoutData(
        res,
        RESPONSE_CODE.BAD_REQUEST,
        errorMessages.ADDRESS_EXISTS
      );
    }

    const address = await model.create({
      full_address,
      user_id,
    });
    successResponseData(
      res,
      address,
      RESPONSE_CODE.SUCCESS,
      successMessages.ADDRESS_CREATE_SUCCESS
    );
  } catch (error) {
    errorResponseData(
      res,
      RESPONSE_CODE.INTERNAL_SERVER,
      errorMessages.INTERNAL_SERVER_ERROR
    );
  }
};

const deleteAddress = async (req, res) => {
  /**
   * Steps to delete the address.
   * 1. Validate the request body.
   * 2. Check the entry in the database.
   * 3. Delete from database.
   * 4. Send response.
   * 5. Handle errors.
   * 6. Test the endpoint.
   */
  try {
    const { id } = req.body;
    const model = Models.Address;
    const address = await model.findOne({ where: { id } });
    if (!address) {
      return errorResponseData(
        res,
        RESPONSE_CODE.BAD_REQUEST,
        errorMessages.ADDRESS_NOT_FOUND
      );
    }

    await model.destroy({ where: { id } });

    successResponseWithoutData(
      res,
      RESPONSE_CODE.SUCCESS,
      successMessages.DELETE_ADDRESS_SUCCESS
    );
  } catch (error) {
    errorResponseData(
      res,
      RESPONSE_CODE.INTERNAL_SERVER,
      errorMessages.INTERNAL_SERVER_ERROR
    );
  }
};

const updateAddress = async (req, res) => {
  /**
   * Steps to update the address in database.
   * 1. Validate the request body.
   * 2. Check the entry in the database.
   * 3. Update in database.
   * 4. Send response.
   * 5. Handle errors.
   * 6. Test the endpoint.
   */
  try {
    const { id, full_address } = req.body;
    const user_id = req.user.id;
    const isUserExists = await checkIfUserExists(req.user.email);
    if (!isUserExists) {
      return errorResponseData(
        res,
        RESPONSE_CODE.BAD_REQUEST,
        errorMessages.USER_NOT_FOUND
      );
    }

    const model = Models.Address;
    const address = await model.findOne({ where: { id } });
    if (!address) {
      return errorResponseData(
        res,
        RESPONSE_CODE.BAD_REQUEST,
        errorMessages.ADDRESS_NOT_FOUND
      );
    }

    const addressExists = await model.findOne({ where: { full_address } });
    if (addressExists || address === full_address) {
      return errorResponseWithoutData(
        res,
        RESPONSE_CODE.BAD_REQUEST,
        errorMessages.ADDRESS_EXISTS
      );
    }

    await model.update(
      { id, full_address, user_id },
      {
        where: {
          id,
        },
      }
    );

    successResponseWithoutData(
      res,
      RESPONSE_CODE.SUCCESS,
      successMessages.UPDATE_ADDRESS_SUCCESS
    );
  } catch (error) {
    errorResponseData(
      res,
      RESPONSE_CODE.INTERNAL_SERVER,
      errorMessages.INTERNAL_SERVER_ERROR
    );
  }
};

const getAddressByID = async (req, res) => {
  /**
   * Steps to get the addresses by userId.
   * 1. Validate the request body.
   * 2. Check the user is exists in database.
   * 3. get addresses from the database.
   * 4. send response.
   * 5. handle error.
   * 6. test the endpoint.
   */

  try {
    const user_id = req.user.id;

    const model = Models.Address;
    const address = await model.findAll({ where: { user_id } });
    if (!address) {
      return errorResponseData(
        res,
        RESPONSE_CODE.BAD_REQUEST,
        errorMessages.ADDRESS_NOT_FOUND
      );
    }
    successResponseData(res, address, RESPONSE_CODE.SUCCESS);
  } catch (error) {
    errorResponseData(
      res,
      RESPONSE_CODE.INTERNAL_SERVER,
      errorMessages.INTERNAL_SERVER_ERROR
    );
  }
};

const makeAddressDefault = async (req, res) => {
  /**
   * Steps to make the address default
   * 1. validate the request body.
   * 2. check the user and address exists in database.
   * 3. check for already is default.
   * 4. make the address default and update remaining address as not default
   * 5. send response
   * 6. Handle error.
   * 7. test the endpoints
   */

  try {
    const { id } = req.body;
    const user_id = req.user.id;
    const model = Models.Address;
    
    const address = await model.findAll({ where: { user_id } });
    if (!address || address.length === 0) {
      return errorResponseData(
        res,
        RESPONSE_CODE.BAD_REQUEST,
        errorMessages.ADDRESS_NOT_FOUND
      );
    }

    await Promise.all(
      address.map(async (element) => {
        if (element.id === id) {
          return await model.update(
            { is_primary: true },
            { where: { id: element.id } }
          );
        } else {
          return await model.update(
            { is_primary: false },
            { where: { id: element.id } }
          );
        }
      })
    );

    const updatedAddress = await model.findOne({ where: { id } });
    if (!updatedAddress) {
      return errorResponseData(
        res,
        RESPONSE_CODE.BAD_REQUEST,
        errorMessages.ADDRESS_NOT_FOUND
      );
    }

    successResponseData(res, updatedAddress, RESPONSE_CODE.SUCCESS);
  } catch (error) {
    errorResponseData(
      res,
      RESPONSE_CODE.INTERNAL_SERVER,
      errorMessages.INTERNAL_SERVER_ERROR
    );
  }
};

export {
  createAddress,
  updateAddress,
  getAddressByID,
  makeAddressDefault,
  deleteAddress,
};

import Models from "../models/index.js";
import {
  addressValidation,
  makeAddressDefaultValidation,
  updateAddressValidation,
} from "../validatons/address.validation.js";
import {
  errorResponseData,
  successResponseData,
  successResponseWithoutData,
} from "../utility/response.js";
import { where } from "sequelize";
import { RESPONSE_CODE } from "../utility/constant.js";

const createAddress = (req, res) => {
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
    return addressValidation(req, res, async (isValid) => {
      if (!isValid)
        return errorResponseData(
          res,
          RESPONSE_CODE.BAD_REQUEST,
          "Validation failed"
        );
      const { full_address, user_id } = req.body;
      console.log(full_address, user_id);
      const userModel = Models.User;
      const isUserExists = await userModel.findOne({
        where: { id: user_id },
      });
      if (!isUserExists) {
        return errorResponseData(
          res,
          RESPONSE_CODE.BAD_REQUEST,
          "Please insert the valid user id."
        );
      }

      const model = Models.Address;
      const address = await model.create({
        full_address,
        user_id,
      });
      successResponseData(
        res,
        address,
        RESPONSE_CODE.SUCCESS,
        "User created successfully"
      );
    });
  } catch (error) {
    errorResponseData(
      res,
      RESPONSE_CODE.INTERNAL_SERVER,
      "Error while creating category"
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

    if (!id) {
      return errorResponseData(
        res,
        RESPONSE_CODE.BAD_REQUEST,
        "Please enter the id."
      );
    }

    const model = Models.Address;
    const address = await model.findOne({ where: { id } });
    if (!address) {
      return errorResponseData(
        res,
        RESPONSE_CODE.BAD_REQUEST,
        "address not found"
      );
    }

    await model.destroy({ where: { id } });

    successResponseWithoutData(
      res,
      RESPONSE_CODE.SUCCESS,
      "delete address successfully"
    );
  } catch (error) {
    errorResponseData(
      res,
      RESPONSE_CODE.INTERNAL_SERVER,
      "Error while deleting address"
    );
  }
};

const updateAddress = (req, res) => {
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
    return updateAddressValidation(req, res, async (isValid) => {
      if (!isValid)
        return errorResponseData(
          res,
          RESPONSE_CODE.BAD_REQUEST,
          "Validation failed"
        );

      const { id, full_address, user_id } = req.body;

      const userModel = Models.User;
      const isUserExists = await userModel.findOne({
        where: { id: user_id },
      });
      if (!isUserExists) {
        return errorResponseData(
          res,
          RESPONSE_CODE.BAD_REQUEST,
          "Please insert the valid user id."
        );
      }

      const model = Models.Address;
      const address = await model.findOne({ where: { id } });
      if (!address) {
        return errorResponseData(
          res,
          RESPONSE_CODE.BAD_REQUEST,
          "address not found"
        );
      }

      const updatedAddress = await model.update(
        { id, full_address, user_id },
        {
          where: {
            id,
          },
        }
      );

      successResponseData(
        res,
        updatedAddress,
        RESPONSE_CODE.SUCCESS,
        "User created successfully"
      );
    });
  } catch (error) {
    errorResponseData(
      res,
      RESPONSE_CODE.INTERNAL_SERVER,
      "Error while creating category"
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
    const { user_id } = req.body;
    if (!user_id) {
      return errorResponseData(
        res,
        RESPONSE_CODE.FORBIDDEN,
        "user id is mandatory filed."
      );
    }
    const userModel = Models.User;
    const isUserExists = await userModel.findOne({
      where: { id: user_id },
    });
    if (!isUserExists) {
      return errorResponseData(
        res,
        RESPONSE_CODE.BAD_REQUEST,
        "Please insert the valid user id."
      );
    }

    const model = Models.Address;
    const address = await model.findAll({ where: { user_id } });
    if (!address) {
      return errorResponseData(
        res,
        RESPONSE_CODE.BAD_REQUEST,
        "address not found"
      );
    }
    successResponseData(res, address, RESPONSE_CODE.SUCCESS);
  } catch (error) {
    errorResponseData(
      res,
      RESPONSE_CODE.INTERNAL_SERVER,
      "Error while getting the address"
    );
  }
};

const makeAddressDefault = (req, res) => {
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
    return makeAddressDefaultValidation(req, res, async (isValid) => {
      if (!isValid)
        return errorResponseData(
          res,
          RESPONSE_CODE.BAD_REQUEST,
          "Validation failed"
        );

      const { id, user_id } = req.body;

      const userModel = Models.User;
      const isUserExists = await userModel.findOne({
        where: { id: user_id },
      });
      if (!isUserExists) {
        return errorResponseData(
          res,
          RESPONSE_CODE.BAD_REQUEST,
          "Please insert the valid user id."
        );
      }

      const model = Models.Address;
      const address = await model.findAll({ where: { user_id } });
      if (!address || address.length === 0) {
        return errorResponseData(
          res,
          RESPONSE_CODE.BAD_REQUEST,
          "Address not found"
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
          "Failed to update the default address"
        );
      }

      successResponseData(res, updatedAddress, RESPONSE_CODE.SUCCESS);
    });
  } catch (error) {
    errorResponseData(
      res,
      RESPONSE_CODE.INTERNAL_SERVER,
      "Error while creating category"
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

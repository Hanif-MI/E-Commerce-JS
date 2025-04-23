"use strict";

import{ RESPONSE_CODE } from "./constant.js"; 

/**
 * @description This function use for format success response of rest api containing data
 * @param data
 * @param code
 * @param message
 * @param res
 * @param extras
 * @returns {{data: *, meta: {message: *, code: *}}}
 */
const successResponseData = (res, data, code = 1, message, extras) => {
  const response = {
    data,
    meta: {
      code,
      message,
    },
  };
  if (extras) {
    Object.keys(extras).forEach((key) => {
      if ({}.hasOwnProperty.call(extras, key)) {
        response.meta[key] = extras[key];
      }
    });
  }
  return res.send(response);
};

/**
 * @description This function use for format success response of rest api witout data
 * @param res
 * @param message
 * @param code
 * @returns {{data: *, meta: {message: *, code: *}}}
 */
const successResponseWithoutData = (res, code = 1, message, extras) => {
  const response = {
    data: null,
    meta: {
      code,
      message,
    },
  };
  if (extras) {
    Object.keys(extras).forEach((key) => {
      if ({}.hasOwnProperty.call(extras, key)) {
        response.meta[key] = extras[key];
      }
    });
  }
  return res.send(response);
};

/**
 * @description This function use for format error response of rest api
 * @param res
 * @param message
 * @param code
 * @returns {{response: {code: *, message: *}}}
 */
const errorResponseData = (res, code = RESPONSE_CODE.BAD_REQUEST, message) => {
  const response = {
    code,
    message,
  };
  return res.status(code).send(response);
};

/**
 * @description This function use for format error response of rest api witout data
 * @param res
 * @param message
 * @param code
 * @returns {{data: *, meta: {code: *, message: *}}}
 */
const errorResponseWithoutData = (res, code = 0, message) => {
  const response = {
    data: null,
    meta: {
      code,
      message,
    },
  };
  if (code > RESPONSE_CODE.SUCCESS) {
    return res.status(code).send(response);
  } else {
    return res.send(response);
  }
};

/**
 * @description This function use for format validation error response of rest api
 * @param res
 * @param message
 * @param code
 * @returns {{response: {code: *, message: *}}}
 */
const validationErrorResponseData = (
  res,
  message,
  code = RESPONSE_CODE.BAD_REQUEST
) => {
  const response = {
    code,
    message,
  };
  return res.status(code).send(response);
};

/**
 * @description This function use for server error response of rest api
 * @param res
 * @param message
 * @param code
 * @returns {{response: {code: *, message: *}}}
 */
const internalServerErrorResponse = (res) => {
  const response = {
    code: RESPONSE_CODE.INTERNAL_SERVER,
    message: res.__("internalError"),
  };

  return res.status(RESPONSE_CODE.INTERNAL_SERVER).send(response);
};
/**
 * @description This function use for format success response of rest api containing data
 * @param data
 * @param code
 * @param message
 * @param res
 * @param extras
 * @returns {{data: *, meta: {message: *, code: *}}}
 */
const errorResponseWithData = (res, data, code = 0, message, extras) => {
  const response = {
    data,
    meta: {
      code,
      message,
    },
  };
  if (extras) {
    Object.keys(extras).forEach((key) => {
      if ({}.hasOwnProperty.call(extras, key)) {
        response.meta[key] = extras[key];
      }
    });
  }
  return res.status(RESPONSE_CODE.SUCCESS).send(response);
};

export {
  successResponseData,
  successResponseWithoutData,
  errorResponseData,
  errorResponseWithoutData,
  validationErrorResponseData,
  internalServerErrorResponse,
  errorResponseWithData,
};

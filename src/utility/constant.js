const RESPONSE_CODE = {
  SUCCESS: 200,
  SUCCESS_NEW_RESOURCE: 201,
  SUCCESS_WITHOUT_RESPONSE: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  FORBIDDEN: 403,
  UPGRADE_REQUIRED: 426,
  INTERNAL_SERVER: 500,
  MAINTENANCE: 503,
  TOKEN_INAVLID: 498,
};


// Validate file type
const allowedMimeTypes = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/gif",
  "image/webp",
  "image/svg+xml",
  "image/tiff",
  "image/bmp",
];


export { RESPONSE_CODE, allowedMimeTypes };

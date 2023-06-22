interface BaseError extends Error {
  type: string;
  message: string;
}

export default BaseError;
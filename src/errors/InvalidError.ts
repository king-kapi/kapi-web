class InvalidError extends Error {
  name = "INVALID";
  constructor(fieldName: string, value: unknown, requirements = "") {
    super(`${value} is invalid for field ${fieldName}. ${requirements}`);
  }
}

export default InvalidError;
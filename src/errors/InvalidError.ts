class InvalidError extends Error {
  type = 'INVALID';
  message: string;

  constructor(fieldName: string, value: unknown, requirements = "") {
    super();

    this.message = `${value} is invalid for field ${fieldName}. ${requirements}`;
  }
}

export default InvalidError;
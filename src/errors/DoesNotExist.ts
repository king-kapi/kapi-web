class DoesNotExist extends Error {
  name = "DOES_NOT_EXIST";
  constructor(what: string, inWhat: string) {
    super(`${what} does not exist in ${inWhat}`);
  }
}

export default DoesNotExist;
class DoesNotExist extends Error {
  type = 'DOES_NOT_EXIST';
  message: string;

  constructor(what: string, inWhat: string) {
    super();

    this.message = `${what} does not exist in ${inWhat}`;
  }
}

export default DoesNotExist;
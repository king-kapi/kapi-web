function GenerateRandomTag() {
  // Are tags guaranteed to be 4 digit strings?
  // If we are trying to make tag ids, consider using https://www.npmjs.com/package/uuid
  let result = '';
  for (let i = 0; i < 4; i++) result += Math.floor(Math.random() * 10);

  return result;
}

export default GenerateRandomTag;

function GenerateRandomTag() {
    let result = "";
    for (let i = 0; i < 4; i++)
        result += Math.floor(Math.random() * 10);

    return result;
}

export default GenerateRandomTag;
type Result<T, E = Error> = {
    value: T,
    error: E | null
}

export default Result;
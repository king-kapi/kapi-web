class NotAuthenticatedError extends Error {
    name = "NOT_AUTHENTICATED"
    constructor() {
        super("Not Authenticated.");
    }
}

export default NotAuthenticatedError;
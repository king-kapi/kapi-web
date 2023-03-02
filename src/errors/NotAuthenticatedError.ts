class NotAuthenticatedError extends Error {
    constructor() {
        super("Not Authenticated");
    }
}

export default NotAuthenticatedError;
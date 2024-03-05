// Custom Error Classes

class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
        this.statusCode = 400;
    }
}

class DatabaseError extends Error {
    constructor(message) {
        super(message);
        this.name = "DatabaseError";
        this.statusCode = 500;
    }
}

class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "NotFoundError";
        this.statusCode = 404;
    }
}

class UnauthorizedError extends Error {
    constructor(message) {
        super(message);
        this.name = "UnauthorizedError";
        this.statusCode = 401;
    }
}

// Error Handling Middleware
const errorHandler = (err, req, res, next) => {
    // Log the error for the server's records
    console.error(err);

    // Handle specific error types with custom responses
    if (err instanceof ValidationError || err instanceof DatabaseError || err instanceof NotFoundError || err instanceof UnauthorizedError) {
        return res.status(err.statusCode).json({ error: err.message });
    }

    // Fallback for other errors not explicitly handled above
    const statusCode = err.statusCode || 500;
    const message = statusCode === 500 ? "An internal server error occurred." : err.message;
    res.status(statusCode).json({ error: message });
};

module.exports = {
    errorHandler,
    ValidationError,
    DatabaseError,
    NotFoundError,
    UnauthorizedError
};

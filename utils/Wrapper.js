const success = (statusCode, result, message) => {
    return {
        status: "ok",
        statusCode,
        result,
        message,
    };
};

const error = (statusCode, message) => {
    return {
        status: "error",
        statusCode,
        message,
    };
};

module.exports = { success, error };

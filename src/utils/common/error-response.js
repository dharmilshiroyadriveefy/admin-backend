const error = {
        success: false,
        message: "Something went wrong",
        data: {},
        error: {},
    };
    
    const sendErrorResponse = (statusCode, explanation) => {
        return {
            success: false,
            error: {
                statusCode: statusCode,
                explanation: explanation,
            },
        };
    };
    
    module.exports = { error, sendErrorResponse };
    
function successResponse(message, data, res, status = 200) {
    res.status(status).json({
        status,
        message,
        data
    });
}

function errorResponse(message, res, status = 400){
    res.status(status).json({
        status,
        message
    });
    return;
}

function successMessage(message, res, status = 200){
    res.status(status).json({
        status,
        message
    });
    return;
}

function serverErrorResponse(res){
    res.status(500).json({
        status: 500,
        message: "Oops! an unknown error occurred.",
    });
    return;
}


module.exports = {
    successMessage,
    successResponse,
    errorResponse,
    serverErrorResponse
}
const codeAndName = {
    200: "Success",
    201: "Created!",
    400: "Bad Request!",
    401: "Unauthorized!",
    403: "Forbidden!",
    404: "Not Found!",
    500: "Internal Server Error",
    502: "Bad Gateway",
    503: "Service Unavailable",
};
export function responseHandler({
    status_code = 400,
    status = codeAndName[status_code],
    message = null,
    more_info = null,
    errors = null
}) {
    return {
        status: status,
        status_code: status_code,
        message: message,
        more_info: more_info,
        errors: errors
    }
}


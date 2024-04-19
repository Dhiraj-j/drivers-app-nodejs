export interface responseHandler {
    status_code: 200 | 201 | 400 | 401 | 403 | 404 | 500 | 502;
    status: "success" | "failure"
    message: string;
    more_info: string;
    errors: string | object;
    data: string | object;
    request_body: object;
}
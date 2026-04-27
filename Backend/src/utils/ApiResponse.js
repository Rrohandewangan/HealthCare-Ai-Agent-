class ApiResponse {
    constructor(statusCode, data=null, message = "Success") {
        this.statusCode = statusCode,
        this.data = null,
        this.message = message,
        this.success = statusCode < 400
    }
}

export { ApiResponse }
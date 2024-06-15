class ApiError {
    constructor(status, message) {
        this.status = status
        this.message = message
    }
    static NotFound(message) {
        return new ApiError(404, message)        
    }
    static BadRequest(message) {
        return new ApiError(400, message)        
    }
    static Internal(message) {
        return new ApiError(500, message)        
    }
}

module.exports = ApiError
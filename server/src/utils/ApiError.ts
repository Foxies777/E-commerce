class ApiError extends Error {
    status: number;
  
    constructor(status: number, message: string) {
      super(message);
      this.status = status;
    }
  
    static badRequest(msg: string) {
      return new ApiError(400, msg);
    }
  
    static internal(msg: string) {
      return new ApiError(500, msg);
    }
    static unauthorized(msg: string) {
      return new ApiError(401, msg);
    }
  }
  
  export default ApiError;
  
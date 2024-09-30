import { Config } from "../Config/Config.js";
import { ErrorStatusCodes } from "../utils/errorStatusCodes.utils.js";
import { ErrorCode } from "../utils/errorCode.Utils.js";

class ApiException extends Error {
    constructor(code, message,data, status = 500) {
        super(message);
        this.name = "Api Errpr";
        this.code = code;
        this.data = data;
        this.status = status;

        if(Config.NODE_ENV === 'development') {
            this.message = `Api Error: ${message}`;
        }
    }
}

class InternalServerException extends ApiException {
    constructor(message = 'Internal Server Error', data) {
        super(ErrorCode.InternalServerException,message,data,ErrorStatusCodes.InternalServerException);

    }
}
    class  InvalidEndpointException extends ApiException {
        constructor(message = 'EndPoint not found',data) {
            super(ErrorCode.InvalidEndpointException,message,data,ErrorStatusCodes.InvalidEndpointException);
            
        }
    }


    export { ApiException, InternalServerException, InvalidEndpointException };


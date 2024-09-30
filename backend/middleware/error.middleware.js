import { Config } from "../Config/Config.js";
import { InternalServerException } from "../exceptions/api.exception.js";
import { InvalidEndpointException } from "../exceptions/api.exception.js";

function errorMiddleware(err, req, res, next) {
    // Handle token and other internal server exceptions
    if (err.status === 500 || !err.message) {
        if (!err.isOperational) err = new InternalServerException('Internal server error');
    } else if (err.name === 'JsonWebTokenError') {
        err = new TokenVerificationException();
    } else if (err.message === 'jwt expired') {
        err = new TokenExpiredException();
    }

    const { message, code, error, status, stack } = err;

    if (Config.NODE_ENV === 'dev') {
        console.error(`[Exception] ${error}, [Code] ${code}`);
        console.error(`[Error] ${message}`);
        console.error(`[Stack] ${stack}`);
    }

    const headers = {
        success: '0',
        error,
        code,
        message
    };

    res.status(status || 500).send({ headers, body: {} });
}
export { errorMiddleware };
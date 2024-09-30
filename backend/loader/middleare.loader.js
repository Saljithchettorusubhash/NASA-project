import { InvalidEndpointException } from "../exceptions/api.exception.js";
import { errorMiddleware } from "../middleware/error.middleware.js";


class MiddlewareLoader {
    static init(app) {
        app.all('*', (req, res, next) => {
            const err = new InvalidEndpointException();
            next(err);
        }
        );

        app.use(errorMiddleware);

    
    }
}
export { MiddlewareLoader };
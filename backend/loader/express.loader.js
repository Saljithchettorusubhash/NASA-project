import helmet from 'helmet';
import express from 'express';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import { Config } from '../Config/Config.js';
class ExpressLoader  {
    static init () {
        const app = express();
        app.use(helmet());
        app.use(compression());
app.use(cors({origin:Config.ALLOWED_ORIGIN}));

        const limiter = rateLimit({
            windowMs: 15 * 60 * 1000, 
            max: 100

        });
        app.use(limiter);

        app.use(express.json());
        return app;
    }
}
export { ExpressLoader };
import helmet from 'helmet';
import express from 'express';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import { Config } from '../Config/Config.js';

class ExpressLoader {
    static init() {
        const app = express();
        app.use(helmet());
        app.use(compression());
        app.use(cors({ origin: Config.ALLOWED_ORIGIN }));

        // Setup in-memory rate-limiting
        const limiter = rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutes window
            max: 100, // Limit each IP to 100 requests per window
            message: {
                success: 0,
                message: 'Too many requests, please try again later.',
            },
        });

        // Apply the rate limit globally
        app.use(limiter);

        // Parse incoming JSON payloads
        app.use(express.json());

        return app;
    }
}

export { ExpressLoader };

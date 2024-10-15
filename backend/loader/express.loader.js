import helmet from 'helmet';
import express from 'express';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import { Config } from '../Config/Config.js';

class ExpressLoader {
    static init() {
        const app = express();

        // Helmet for basic security headers
        app.use(helmet());

        // Compression middleware to gzip responses
        app.use(compression());

        // CORS configuration
        const allowedOrigins = [Config.ALLOWED_ORIGIN, 'http://localhost:5173'];
        
        // Dynamic origin configuration for CORS
        const corsOptions = {
            origin: (origin, callback) => {
                // Allow requests with no origin (mobile apps, curl, etc.)
                if (!origin) return callback(null, true);

                if (allowedOrigins.indexOf(origin) !== -1) {
                    callback(null, true);
                } else {
                    callback(new Error('Not allowed by CORS'));
                }
            },
            credentials: true, // Allow cookies to be sent
            methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
            optionsSuccessStatus: 200, // Some legacy browsers choke on 204
        };

        // Apply the CORS middleware
        app.use(cors(corsOptions));

        // Setup rate-limiting
        const limiter = rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutes window
            max: 100, // Limit each IP to 100 requests per window
            message: {
                success: 0,
                message: 'Too many requests, please try again later.',
            },
        });

        // Apply rate limiter middleware globally
        app.use(limiter);

        // Parse incoming JSON payloads
        app.use(express.json());

        return app;
    }
}

export { ExpressLoader };

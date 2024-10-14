import dotenv from 'dotenv';
dotenv.config();

export const Config = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3311,
    REDIS_HOST: process.env.REDIS_HOST || '127.0.0.1',
    REDIS_PORT: process.env.REDIS_PORT || 6379,
    NASA_API_KEY: process.env.NASA_API_KEY ,
    ALLOWED_ORIGIN:process.env.ALLOWED_ORIGIN || 'https://nasa-project-szum-aqbi57o4a-saljiths-projects.vercel.app',



};


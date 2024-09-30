import express from 'express';
import { awairHandler } from '../middleware/awaitHandler.js';
import { MarsWeatherController } from '../controller/marsWeather.controller.js';
const marsWeatherController = new MarsWeatherController();

const router = express.Router();

// Route to fetch the latest Mars weather data
router.get('/latest', awairHandler(marsWeatherController.getLatestWeather.bind(marsWeatherController)));

// Route to fetch Mars weather data by sol (Martian day)
router.get('/sol/:sol', awairHandler(marsWeatherController.getWeatherBySol.bind(marsWeatherController)));

export const marsWeatherRouter = router;

import express from 'express';
import { awairHandler } from '../middleware/awaitHandler.js';
import { ExoplanetController } from '../controller/exoPlanet.controller.js';
const router = express.Router();
const exoplanetController = new ExoplanetController();

router.get('/confirmed', awairHandler(exoplanetController.getConfirmedExoplanets.bind(exoplanetController)));
router.get('/habitable-zone', awairHandler(exoplanetController.getHabitableZonePlanets.bind(exoplanetController)));
router.get('/host-stars', awairHandler(exoplanetController.getHostStars.bind(exoplanetController)));
router.get('/planetary-candidates', awairHandler(exoplanetController.getPlanetaryCandidates.bind(exoplanetController)));
router.get('/transit-rv-planets', awairHandler(exoplanetController.getTransitOrRVPlanets.bind(exoplanetController)));

export const exoplanetRouter = router;

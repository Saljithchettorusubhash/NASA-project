import express from "express";
import { awairHandler } from "../middleware/awaitHandler.js";
import { AsteroidController } from "../controller/asteroid.controller.js";

const router = express.Router();

const asteroidController = new AsteroidController();

router.get('/feed',awairHandler(asteroidController.getAsteroidFeed.bind(asteroidController)));
router.get('/:asteroid_id',awairHandler(asteroidController.getAsteroidById.bind(asteroidController)));
router.get('/browse',awairHandler(asteroidController.browseAsteroids.bind(asteroidController)));

export const asteroidRouter = router;

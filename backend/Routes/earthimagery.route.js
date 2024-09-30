import express from 'express';
import { awairHandler } from '../middleware/awaitHandler.js';
import { EarthController } from '../controller/eartthimagery.controller.js';

const router = express.Router();
const earthController = new EarthController();

router.get('/imagery',awairHandler(earthController.getImagery.bind(earthController)));
router.get('/assets',awairHandler(earthController.getAssets.bind(earthController)));

export const earthImageryRouter = router;
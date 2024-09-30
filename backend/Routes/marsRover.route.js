import express from 'express';
import { awairHandler } from '../middleware/awaitHandler.js';
import { MarsRoverController } from '../controller/marsRover.controller.js';

const router = express.Router();

const marsRoverController = new MarsRoverController();

router.get('/photos/sol',awairHandler(marsRoverController.getPhotosBySol.bind(marsRoverController)));
router.get('/photos/earth_date',awairHandler(marsRoverController.getPhotosByEarthDate.bind(marsRoverController)));
router.get('/manifest/:rover_name',awairHandler(marsRoverController.getRoverManifest.bind(marsRoverController)));

export const marsRoverRouter = router;
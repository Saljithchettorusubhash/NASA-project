import express from 'express';
import { awairHandler } from '../middleware/awaitHandler.js';
import { NasaController } from '../controller/apod.controller.js';
const router = express.Router(); 

const nasaController = new NasaController();

router.get('/', awairHandler(nasaController.getApod.bind(nasaController)));


export const apodRouter = router;
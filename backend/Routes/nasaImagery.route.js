import express from 'express';
import { awairHandler } from '../middleware/awaitHandler.js';
import { NASAImageController } from '../controller/nasaImagery.controller.js';
const nasaImageController = new NASAImageController();

const router = express.Router();
router.get('/search/:query', awairHandler(nasaImageController.searchImages.bind(nasaImageController)));

// Route to fetch a media asset by NASA ID
router.get('/asset/:nasaId', awairHandler(nasaImageController.getAssetById.bind(nasaImageController)));

// Route to fetch metadata by NASA ID
router.get('/metadata/:nasaId', awairHandler(nasaImageController.getMetadataById.bind(nasaImageController)));


export const nasaImageRouter = router;
 
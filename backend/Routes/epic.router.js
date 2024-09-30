import express from 'express';
import { awairHandler } from '../middleware/awaitHandler.js';
import { EPICController } from '../controller/epic.controller.js';

const router = express.Router();
const epicController = new EPICController();

router.get('/latest', awairHandler(epicController.getLatestImages.bind(epicController)));
router.get('/date/:date', awairHandler(epicController.getImagesByDate.bind(epicController)));
router.get('/dates', awairHandler(epicController.getAvailableDates.bind(epicController)));

export const epicRouter = router;

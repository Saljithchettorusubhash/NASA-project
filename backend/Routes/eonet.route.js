import express from 'express';
import { awairHandler } from '../middleware/awaitHandler.js';
import { EONETController } from '../controller/eonet.controller.js';

const router = express.Router();
const eonetController = new EONETController();

router.get('/events', awairHandler(eonetController.getAllEvents.bind(eonetController)));
router.get('/events/:eventId', awairHandler(eonetController.getEventById.bind(eonetController)));

export const eonetRouter = router;

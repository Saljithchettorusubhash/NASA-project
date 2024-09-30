import express from 'express';
import { awairHandler } from '../middleware/awaitHandler.js';
import { NeoWsController } from '../controller/neo.controller.js';

const neoWsController = new NeoWsController();
const router = express.Router();

router.get('/date-range/:startDate/:endDate', awairHandler(neoWsController.getNEOsByDateRange.bind(neoWsController)));
router.get('/neo/:neoId', awairHandler(neoWsController.getNeoById.bind(neoWsController)));
router.get('/today', awairHandler(neoWsController.getTodayNEOs.bind(neoWsController)));

export const neoWsRouter = router;

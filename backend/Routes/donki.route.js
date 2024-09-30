import express from 'express';
import { awairHandler } from '../middleware/awaitHandler.js';
import { DonkiController } from '../controller/donki.controller.js';
const router = express.Router();

const donkiController = new DonkiController();

router.get('/cme',awairHandler(donkiController.getCMEData.bind(donkiController)));
router.get('/gst',awairHandler(donkiController.getGST.bind(donkiController)));
router.get('/ips',awairHandler(donkiController.getIPS.bind(donkiController)));
router.get('/flr',awairHandler(donkiController.getFLR.bind(donkiController)));
router.get('/sep',awairHandler(donkiController.getSEP.bind(donkiController)));
router.get('/mpc',awairHandler(donkiController.getMPC.bind(donkiController)));

export const donkiRouter = router;
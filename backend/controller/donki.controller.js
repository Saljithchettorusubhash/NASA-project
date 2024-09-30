import { DonkiRepository } from "../repository/donki.repository.js";

class DonkiController {
  constructor() {
    this.donkiRepository = new DonkiRepository();
  }

  async getCMEData(req, res) {
    const { startDate, endDate } = req.query || {};
    try {
      const response = await this.donkiRepository.getCMEData(
        startDate,
        endDate
      );
      res.status(200).send(response);
    } catch (err) {
      console.log(`Error occurred: ${err.message}`);
      res.status(500).json({ message: "Error fetching CME data" });
    }
  }

 async getGST(req, res) {
    const { startDate, endDate } = req.query || {};
    try {
      const response = await this.donkiRepository.getGST(startDate, endDate);
        res.status(200).send(response);
    }
    catch(err){
        console.log(`Error occurred: ${err.message}`);
        res.status(500).json({ message: "Error fetching GST data" });
    }
}

async getIPS(req, res) {
    const { startDate, endDate, location, catalog } = req.query || {};
    try {
        const response = await this.donkiRepository.getIPS(startDate, endDate, location, catalog);
        res.status(200).send(response);
    } catch (err) {
        console.log(`Error occurred: ${err.message}`);
        res.status(500).json({ message: "Error fetching IPS data" });
    }
}


async getFLR(req, res) {
    const { startDate, endDate } = req.query || {};
    try {
      const response = await this.donkiRepository.getFLR(startDate, endDate);
        res.status(200).send(response);
    }
    catch(err){
        console.log(`Error occurred: ${err.message}`);
        res.status(500).json({ message: "Error fetching FLR data" });
    }
}

async getSEP(req, res) {
    const { startDate, endDate } = req.query || {};
    try {
        const response = await this.donkiRepository.getSEP(startDate, endDate);
        res.status(200).send(response);

    }
    catch(err){
        console.log(`Error occurred: ${err.message}`);
        res.status(500).json({ message: "Error fetching SEP data" });
    }
}

async getMPC(req, res) {
    const { startDate, endDate } = req.query || {};
    try {
        const response = await this.donkiRepository.getMPC(startDate, endDate);
        res.status(200).send(response);
    }
    catch(err){
        console.log(`Error occurred: ${err.message}`);
        res.status(500).json({ message: "Error fetching MPC data" });
    }
}


}
export { DonkiController };

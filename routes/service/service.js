const express = require("express");
const router = express.Router();
const {
  addService,
  addServicesViaExcel,
  getServiceByServiceName,
  getAllService,
  deleteService,
  addRequirements,
} = require("../../controllers/service/service");

router.post("/add-service", addService);
router.put("/add-requirements/:id", addRequirements);
router.get("/get-service-by-servicename/:name", getServiceByServiceName);
router.post("/add-service-via-excel", addServicesViaExcel);
router.get("/get-all-service", getAllService);
router.delete("/delete-service/:id", deleteService);

module.exports = router;

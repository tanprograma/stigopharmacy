import { MedicineModel } from "../models/medicine.mjs";
import express from "express";

const router = express.Router();
router.get("/", async (req, res) => {
  const resource = await MedicineModel.find();
  console.log(`medicines: ${resource.length}`);
  res.send(resource);
});
router.post("/create", async (req, res) => {
  const resource = await MedicineModel.create(req.body);
  console.log(resource);
  res.send(resource);
});
router.patch("/update/:id", async (req, res) => {
  const resource = await MedicineModel.findById(req.params.id);
  resource.name = req.body.name;
  await resource.save();
  res.send(resource);
});
export default router;

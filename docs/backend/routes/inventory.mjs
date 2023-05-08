import { InventoryModel } from "../models/inventory.mjs";
import express from "express";

const router = express.Router();
router.get("/", async (req, res) => {
  const resource = await InventoryModel.find();
  res.send(resource);
});
router.post("/create", async (req, res) => {
  const resource = await InventoryModel.create(req.body);

  res.send(resource);
});
export default router;

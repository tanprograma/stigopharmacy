import { ClientModel } from "../models/client.mjs";
import express from "express";

const router = express.Router();
router.get("/", async (req, res) => {
  const resource = await ClientModel.find();
  console.log(`stores :${resource.length}`);
  res.send(resource);
});
router.post("/create", async (req, res) => {
  const resource = await ClientModel.create(req.body);
  console.log({ create: resource });
  res.send(resource);
});
router.patch("/update/:id", async (req, res) => {
  const resource = await ClientModel.findById(req.params.id);
  resource.name = req.body.name;
  await resource.save();
  res.send(resource);
});
export default router;

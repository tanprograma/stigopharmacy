import { StoreModel } from "../models/store.mjs";
import { InventoryModel } from "../models/inventory.mjs";
import { CommodityModel } from "../models/commodity.mjs";
import express from "express";

const router = express.Router();
router.get("/", async (req, res) => {
  const resource = await StoreModel.find();
  console.log(`stores :${resource.length}`);
  res.send(resource);
});
router.post("/create", async (req, res) => {
  const resource = await StoreModel.create(req.body);
  console.log({ created: resource });
  const commodity_status = await CommodityModel.find();
  if (commodity_status.length > 0) {
    createInventory(resource, commodity_status);
  }

  res.send(resource);
});
router.patch("/update/:id", async (req, res) => {
  const resource = await StoreModel.findById(req.params.id);
  resource.name = req.body.name;
  await resource.save();
  res.send(resource);
});
export default router;
function createInventory(store, commodities) {
  commodities.forEach(async (i) => {
    const inventory = await InventoryModel.create({
      commodity: i.name,
      outlet: store._id,
      dispensed: [],
      received: [],
      issued: [],
    });
  });
}

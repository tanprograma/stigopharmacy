import { CommodityModel } from "../models/commodity.mjs";
import { StoreModel } from "../models/store.mjs";
import { InventoryModel } from "../models/inventory.mjs";
import express from "express";

const router = express.Router();
router.get("/", async (req, res) => {
  const resource = await CommodityModel.find();
  res.send(resource);
});
router.post("/create", async (req, res) => {
  const resource = await CommodityModel.create(req.body);
  console.log({ created: resource });
  const store_status = await StoreModel.find();
  if (store_status.length > 0) {
    createInventory(resource, store_status);
  }

  res.send(resource);
});
export default router;
function createInventory(commodity, stores) {
  stores.forEach(async (i) => {
    const inventory = await InventoryModel.create({
      commodity: commodity._id,
      outlet: i._id,
      dispensed: [],
      received: [],
      issued: [],
    });
  });
}

import { DispenseModel } from "../models/dispense.mjs";
import { InventoryModel } from "../models/inventory.mjs";
import express from "express";

const router = express.Router();
router.get("/", async (req, res) => {
  const resource = await DispenseModel.find();
  res.send(resource);
});
router.post("/create", async (req, res) => {
  const dispensed = await DispenseModel.create(req.body);

  updateInventory(dispensed);
  // console.log({ created: dispensed.items });
  res.send(dispensed);
});
function updateInventory(data) {
  data.items.forEach(async (item) => {
    const inventory = await InventoryModel.findOne({
      commodity: item.commodity,
      outlet: data.host,
    });
    console.log({ inventory });

    inventory.dispensed.push({
      transaction: data._id,
      date: data.date,
      quantity: item.requested,
      unit: item.unit,
    });
    const resItem = await inventory.save();
    console.log({ resItem });
  });
}
export default router;

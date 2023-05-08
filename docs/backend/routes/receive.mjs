import { ReceiveModel } from "../models/receive.mjs";
import { InventoryModel } from "../models/inventory.mjs";
import express from "express";
import { StoreModel } from "../models/store.mjs";

const router = express.Router();
router.get("/", async (req, res) => {
  const resource = await ReceiveModel.find();
  console.log({ resource: resource.length });
  res.send(resource);
});
router.get("/unissued/:store", async (req, res) => {
  const store = await StoreModel.findOne({ name: req.params.store });
  if (!store) {
    res.status(404).send([]);
    return;
  }
  const resource = await ReceiveModel.find({
    host: store._id,
    isIssued: false,
  });
  console.log(resource);
  res.send(resource);
});

router.post("/create", async (req, res) => {
  try {
    const request = await ReceiveModel.create(req.body);
    console.log({ request });
    res.send(request);
  } catch {
    res.status(500).send({});
  }
});
router.patch("/update/:id", async (req, res) => {
  try {
    const resource = await ReceiveModel.findById({ _id: req.params.id });
    resource.isIssued = true;
    resource.commodities = req.body;
    const updatedResource = await resource.save();

    // updateInventory(updatedResource);

    res.send(updateInventory);
  } catch {
    res.status(500).send({});
  }
});
function updateInventory(data) {
  const date = data.date;
  const transaction = data._id;
  const host = data.host;
  const client = data.client;
  const commodities = data.commodities;
  commodities.forEach(async (item) => {
    const received = await updateReceived(client, item);
    const issued = await updateIssued(host, item);
  });
}
async function updateReceived(client, item) {
  await InventoryModel.findOne({ host: client, commodity: item.name });
  inventoryItem.received.push({
    transaction: transaction,
    date: date,
    quantity: item.quantity,
    unit: item.unit,
  });
  return await inventoryItem.save();
}
async function updateIssued(host, item) {
  await InventoryModel.find({ host: host, commodity: item.name });
  inventoryItem.Issued.push({
    transaction: transaction,
    date: date,
    quantity: item.quantity,
    unit: item.unit,
  });
  return await inventoryItem.save();
}
export default router;

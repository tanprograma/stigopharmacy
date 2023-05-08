import mongoose from "mongoose";
const schema = new mongoose.Schema({
  commodity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Medicines",
  },
  outlet: { type: mongoose.Schema.Types.ObjectId, ref: "Stores" },
  beginning: Number,
  dispensed: [
    {
      transaction: {
        type: { type: mongoose.Schema.Types.ObjectId, ref: "Dispenseds" },
      },
      quantity: Number,
      date: Number,
      unit: { type: mongoose.Schema.Types.ObjectId, ref: "Units" },
    },
  ],

  received: [
    {
      transaction_id: {
        type: { type: mongoose.Schema.Types.ObjectId, ref: "Receiveds" },
      },
      quantity: Number,
      date: Number,
      unit_id: { type: mongoose.Schema.Types.ObjectId, ref: "Units" },
    },
  ],
  issued: [
    {
      transaction_id: {
        type: { type: mongoose.Schema.Types.ObjectId, ref: "Receiveds" },
      },
      quantity: Number,
      date: Number,
      unit_id: { type: mongoose.Schema.Types.ObjectId, ref: "Units" },
    },
  ],
});

const InventoryModel = mongoose.model("Inventories", schema);
export { InventoryModel };

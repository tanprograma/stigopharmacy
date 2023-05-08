import mongoose from "mongoose";
const schema = new mongoose.Schema({
  name: String,
  isWarehouse: { type: Boolean, default: false },
});

const StoreModel = mongoose.model("Stores", schema);
export { StoreModel };

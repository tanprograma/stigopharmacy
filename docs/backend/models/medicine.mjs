import mongoose from "mongoose";
const schema = new mongoose.Schema({
  name: String,
});

const MedicineModel = mongoose.model("Medicines", schema);
export { MedicineModel };

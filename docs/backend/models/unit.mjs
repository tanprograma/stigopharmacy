import mongoose from "mongoose";
const schema = new mongoose.Schema({
  name: String,
});

const UnitModel = mongoose.model("Units", schema);
export { UnitModel };

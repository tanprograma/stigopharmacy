import mongoose from "mongoose";
const schema = new mongoose.Schema({
  name: String,
});

const ClientModel = mongoose.model("Clients", schema);
export { ClientModel };

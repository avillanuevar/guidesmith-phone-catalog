const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const phoneSchema = new Schema(
  {
    name: String,
    manufacturer: String,
    color: String,
    imageUrl: String,
    description: String,
    price: Number,
    simStatus: String,
    memory: Number,
    screen: String,
    processor: String
  },
  {
    timestamps: true
  }
);

const Phone = mongoose.model("Phone", phoneSchema);
module.exports = Phone;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productsSchema = new Schema({
  Item_id: {
    type: String,
    index: true,
    required: true,
  },
  //* ID

  Item_model: {
    type: String,
    default: true,
  },
  //* 型號

  Item_desc: {
    type: String,
    required: false,
  },
  //* 描述

  Item_cata: {
    type: String,
    required: true,
  },
  //* 類型

  Item_price: {
    type: Number,
    required: true,
  },
  //* 價格
});

module.exports = mongoose.model("Products", productsSchema);

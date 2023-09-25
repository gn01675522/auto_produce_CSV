const Products = require("../products");
const db = require("../../config/mongoose");

if (process.env.NODE.ENV !== "production") {
  require("dotenv").config();
}

const SEED_PRODUCT = {
  Item_id: "1231235511",
  Item_model: "testing_testing",
  Item_desc: "測試測試",
  Item_cata: "測試類",
  Item_price: 1999,
};

db.on("open", () => {
  const itemId = SEED_PRODUCT.Item_id;

  Products.findOne({ itemId })
    .then((item) => {
      if (item) {
        console.log("已存在種子資料，請勿重複創立！");
        return process.exit();
      }
      Products.create({
        Item_id: SEED_PRODUCT.Item_id,
        Item_model: SEED_PRODUCT.Item_model,
        Item_desc: SEED_PRODUCT.Item_desc,
        Item_cata: SEED_PRODUCT.Item_cata,
        Item_price: SEED_PRODUCT.Item_price,
      }).then(() => {
        console.log("done");
        process.exit();
      });
    })
    .catch((error) => console.log(error));
});

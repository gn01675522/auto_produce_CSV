const express = require("express");

const Products = require("../../models/products");
const Users = require("../../models/users");
const bcrypt = require("bcryptjs");

const router = express.Router();

router.post("/products", async (req, res) => {
  const { Item_id, Item_model, Item_desc, Item_cata, Item_price } = req.body;

  if (!Item_id || !Item_model || !Item_desc || !Item_cata || !Item_price) {
    return res.status(400).send({ error: "All input are required." });
  }
  //* 如果使用者其中一個欄位沒輸入，那麼就會報錯
  try {
    const isProductExist = await Products.findOne({ Item_id });
    if (isProductExist) {
      console.log("已存在同樣商品");
      res.send("已存在同樣商品");
    } else {
      await Products.create({
        Item_id,
        Item_model,
        Item_desc,
        Item_cata,
        Item_price,
      });
      res.send("新增成功");
    }
    //* 如果資料庫內已經有相同的 item id 的話，那麼就不建立資料在資料庫內
    res.redirect("/");
  } catch (e) {
    console.log(e);
    res.status(500).send("Server upload Error");
  }
});
//* 可上傳商品資訊

router.post("/users", async (req, res) => {
  const { User_id, User_password } = req.body;

  if (!User_id || !User_password) {
    return res.status(400).send({ error: "All input are required." });
  }
  //* 如果使用者其中一個欄位沒輸入，那麼就會報錯
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(User_password, salt);
    //* bcrypt 需求，先加鹽，並且用鹽來 hash 密碼

    const isUserExist = await Users.findOne({ User_id });
    //* 看看資料庫內有沒有同樣的資訊

    if (isUserExist) {
      console.log("已存在使用者");
      res.send("已存在使用者");
    } else {
      await Users.create({ User_id, User_password: hash });
      res.send("新增成功");
    }
    //* 如果資料庫內已經有相同的 user id 的話，那麼就不建立資料在資料庫內
  } catch (e) {
    console.log(e);
    res.status(500).send("Server upload Error");
  }
});
//* 可上傳使用者資訊

module.exports = router;

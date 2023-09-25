const fs = require("fs");
const path = require("path");

const express = require("express");
const router = express.Router();

router.get("/", (_, res) => {
  try {
    const usersFolderPath = path.join(
      __dirname,
      "../../routineLogCSV/dailyLog",
      "users"
    );
    const productssFolderPath = path.join(
      __dirname,
      "../../routineLogCSV/dailyLog",
      "products"
    );
    //* 訂定資料夾名稱

    const usersFileNames = fs.readdirSync(usersFolderPath).reverse();
    const productsFileNames = fs.readdirSync(productssFolderPath).reverse();
    //* 擷取所有在資料夾內的 CSV 檔案名稱

    res.render("index", { usersFileNames, productsFileNames });
  } catch (e) {
    console.log(e);
    res.status(500).send("Server Error");
  }
});
//* 渲染首頁畫面用

module.exports = router;

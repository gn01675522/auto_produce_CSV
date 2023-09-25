const path = require("path");

const express = require("express");
const router = express.Router();

router.get("/:type/:filename", (req, res) => {
  const chosenType = req.params.type;
  const chosenFile = req.params.filename;
  //* 取得 params 設定的值

  const fileDir = path.join(
    __dirname,
    "../../routineLogCSV/dailyLog",
    chosenType
  );
  const fileDirPath = path.join(fileDir, chosenFile);
  //* 取得檔案位置資料夾位置

  res.download(fileDirPath, chosenFile, (e) => {
    if (e) {
      console.error(e);
      res.status(500).send("Error downloading the file.");
    }
  });
});
//* 提供 user 下載用

module.exports = router;

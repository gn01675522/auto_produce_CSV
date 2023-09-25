const User = require("../models/users");
const Products = require("../models/products");

const papa = require("papaparse");
const schedule = require("node-schedule");
const fs = require("fs");
const path = require("path");

const { showNowTime } = require("../utils/utils");

const BOM = "\ufeff";

const detectFolderPath = (subFolder) =>
  path.join(__dirname, "../routineLogCSV/dailyLog", subFolder);
//* 定義 dailyLog 資料夾內的子資料夾

const defaultFileName = (type, exportTime) => `${type}Data-${exportTime}.csv`;
//* 根據時間及傳進來的 type 來做預設檔案名稱

const ensureFolderHelper = (folderPath) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
};
//* 如果沒有相對應的資料夾，那麼就產生一個；若找不到父層資料夾同樣也會創建

const exportDataToCSV = async (type, Model, exportTime) => {
  const folderPath = detectFolderPath(type);
  const fileName = defaultFileName(type, exportTime);
  const filePath = path.join(folderPath, fileName);

  ensureFolderHelper(folderPath);

  const data = await Model.find().lean();
  const filteredData = data.map(({ _id, __v, ...rest }) => rest);
  const csvData = papa.unparse(filteredData);

  fs.writeFileSync(filePath, BOM + csvData, "utf8");
};
//* 將報表產生出來的函式，

const autoTaskForGenerateCSV = schedule.scheduleJob(
  "* 1 * * * *",
  async () => {
    const exportTime = showNowTime();
    try {
      await exportDataToCSV("users", User, exportTime);
      await exportDataToCSV("products", Products, exportTime);
      console.log("CSV generation task is running!");
    } catch (e) {
      console.log("Auto generate CSV error", e);
    }
  }
);
//* 定義每 1 分鐘就產出報表

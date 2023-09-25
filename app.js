const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const routes = require("./routes");
const bodyParser = require("body-parser");
const port = 3000;

require("./config/mongoose");
//* 引入 mongoose 功能以便其他引入能藉此操作 MongoDB
require("./tasks/autoProduceCSV");
//* 引入自動產出 csv 報表 task

const app = express();

app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);

app.listen(port, () => {
  console.log(`App is running on http://loacalhost:${port}`);
});

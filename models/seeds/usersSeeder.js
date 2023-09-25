const bcrypt = require("bcryptjs");
const Users = require("../users");
const db = require("../../config/mongoose");

if (process.env.NODE.ENV !== "production") {
  require("dotenv").config();
}

const SEED_USER = {
  User_id: "12355117",
  User_password: "fake_infomation",
};

db.on("open", () => {
  const userId = SEED_USER.User_id;

  Users.findOne({ userId })
    .then((user) => {
      if (user) {
        console.log("已存在種子資料，請勿重複創立！");
        return process.exit();
      }
      bcrypt
        .genSalt(10)
        .then((salt) => bcrypt.hash(SEED_USER.User_password, salt))
        .then((hash) =>
          Users.create({ User_id: SEED_USER.User_id, User_password: hash })
        )
        .then(() => {
          console.log("done");
          process.exit();
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
});

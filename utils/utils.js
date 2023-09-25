const showNowTime = () => {
  const nowTime = new Date();

  const year = nowTime.getFullYear();
  const month = (nowTime.getMonth() + 1).toString().padStart(2, "0");
  const day = nowTime.getDate().toString().padStart(2, "0");
  const hours = nowTime.getHours().toString().padStart(2, "0");
  const minutes = nowTime.getMinutes().toString().padStart(2, "0");

  return `${year}${month}${day}${hours}${minutes}`;
};
//* 將時間碼轉換為西元年月日時分(e.g. 202309130101)

module.exports = { showNowTime };

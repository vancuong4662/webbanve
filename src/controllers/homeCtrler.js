const connection = require("../config/connectDB.js");

const getHomepage = (req, res) => {
  res.render("home.ejs");
};

const postDatVe = (req, res) => {
  console.log(">>>Dữ liệu lấy được từ XHR :", req.body);
  const cusName = req.body["name"];
  const cusPhone = req.body["phone"];
  const cusDerp = req.body["derp"];
  const cusDest = req.body["dest"];
  connection.query(
    `
    INSERT INTO dulieubanve (ten, sdt, diemdi, diemden)
    VALUES (?, ?, ?, ?)
    `,
    [cusName, cusPhone, cusDerp, cusDest],
    function (err, results) {
      if (err) {
        console.error(">>Lỗi khi tương tác với MySQL:", err);
        return res.status(500).send("Đã xảy ra lỗi khi xử lý yêu cầu.");
      }
      console.log(">>Tương tác với MySQL có kết quả: ", results);
      res.send("success");
    }
  );
};

module.exports = {
  getHomepage,
  postDatVe,
};

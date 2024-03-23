const connection = require("../config/connectDB.js");

const getHomepage = (req, res) => {
  res.render("home.ejs");
};

const getAdminpage = (req, res) => {
  res.render("admin.ejs");
};

const postDatVe = async (req, res) => {
  try {
    const interactionGetCurrentId = await new Promise((resolve, reject) => {
      connection.query(
        `
        SELECT idvehientai FROM dulieuchung
        `,
        function (err, results) {
          if (err) {
            console.error(">>Lỗi khi tương tác với MySQL:", err);
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });

    let currentId = interactionGetCurrentId[0]["idvehientai"];
    console.log(">>>Dữ liệu lấy được từ XHR :", req.body);
    const cusName = req.body["name"];
    const cusPhone = req.body["phone"];
    const cusDerp = req.body["derp"];
    const cusDest = req.body["dest"];
    const soldCheck = 0;
    const code = hexEncode(currentId);
    console.log("Code được tạo ra : ", code);
    connection.query(
      `
    INSERT INTO dulieubanve (ten, sdt, diemdi, diemden, daban, code)
    VALUES (?, ?, ?, ?, ?, ?)
    `,
      [cusName, cusPhone, cusDerp, cusDest, soldCheck, code],
      function (err, results) {
        if (err) {
          console.error(">>Lỗi khi tương tác với MySQL:", err);
          return res.status(500).send("Đã xảy ra lỗi khi xử lý yêu cầu.");
        }
        console.log(">>Tương tác INSERT INTO với MySQL có kết quả: ", results);

        const continuingId = currentId + 1;
        connection.query(
          `
          UPDATE dulieuchung
          SET idvehientai = ?
          where idvehientai = ?
          `,
          [continuingId, currentId],
          (err, updateResults) => {
            if (err) {
              console.error(">>Lỗi khi tương tác UPDATE với MySQL:", err);
              return res.status(500).send("Đã xảy ra lỗi khi xử lý yêu cầu.");
            }
            console.log(">>Tương tác UPDATE với MySQL có kết quả: ", results);
            res.send(["thành công",code]);
          }
        );
      }
    );
  } catch (error) {
    console.error(">>Đã xảy ra lỗi khi xử lý yêu cầu:", error);
    res.status(500).send("Đã xảy ra lỗi khi xử lý yêu cầu.");
  }
};

const postTestThu = (req, res) => {
  console.log(">>>Dữ liệu lấy được từ XHR :", req.body);
  res.send("thành công");
};

const postHuyVe = async (req, res) => {
  try {
    console.log(">>>Dữ liệu lấy được từ XHR :", req.body);
    const ticketId = req.body["id"];
    const interaction = await new Promise((resolve, reject) => {
      connection.query(
        `
        DELETE FROM dulieubanve WHERE id = ?
        `,
        [ticketId],
        function (err, results) {
          if (err) {
            console.error(">>Lỗi khi tương tác với MySQL:", err);
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });

    console.log(">>>Tương tác querry với MySQL :", interaction);
    res.send("thành công");
  } catch (error) {
    console.error(">>Đã xảy ra lỗi khi xử lý yêu cầu:", error);
    res.status(500).send("Đã xảy ra lỗi khi xử lý yêu cầu.");
  }
};

const postXuatVe = async (req, res) => {
  try {
    console.log(">>>Dữ liệu lấy được từ XHR :", req.body);
    const ticketId = req.body["id"];
    const interaction = await new Promise((resolve, reject) => {
      connection.query(
        `
        UPDATE dulieubanve
        SET daban = 1
        WHERE id = ?
        `,
        [ticketId],
        function (err, results) {
          if (err) {
            console.error(">>Lỗi khi tương tác với MySQL:", err);
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });

    console.log(">>>Tương tác querry với MySQL :", interaction);
    res.send("thành công");
  } catch (error) {
    console.error(">>Đã xảy ra lỗi khi xử lý yêu cầu:", error);
    res.status(500).send("Đã xảy ra lỗi khi xử lý yêu cầu.");
  }
};

const getTicketList = async (req, res) => {
  try {
    const arrayTable = await new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM dulieubanve`,
        (err, results) => {
          if (err) {
            console.error(">>Lỗi khi tương tác với MySQL:", err);
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    }); 
    
    //console.log(">>>Dữ liệu bảng : ", arrayTable);
    res.send(arrayTable);
  } catch (error) {
    console.error(">>Đã xảy ra lỗi khi xử lý yêu cầu:", error);
    res.status(500).send("Đã xảy ra lỗi khi xử lý yêu cầu.");
  }
};

const postTest = async (req, res) => {
  try {
    for (let i = 1; i <= 7; i++) {
      const createdCode = hexEncode(i);
      connection.query(
        `
            UPDATE dulieubanve
            SET code = ?
            WHERE id = ?
            `,
        [createdCode, i],
        (err) => {
          if (err) {
            console.error(">>Lỗi khi tương tác với MySQL:", err);
            return res.status(500).send("Đã xảy ra lỗi khi xử lý yêu cầu.");
          }
          console.log("Sửa dữ liệu thành công với id " + i);
        }
      );
    }

    res.send("Hoàn thành");
  } catch (error) {
    console.error(">>Đã xảy ra lỗi khi xử lý yêu cầu:", error);
    res.status(500).send("Đã xảy ra lỗi khi xử lý yêu cầu.");
  }
};

// START [Supportive FUNCTIONS]
function hexEncode(num) {
  // Chuyển số thành chuỗi
  let str = num.toString();

  // Kiểm tra độ dài của chuỗi số
  if (str.length === 1) {
    str = "00" + str; // Nếu là 1 chữ số, thêm "00" phía trước
  } else if (str.length === 2) {
    str = "0" + str; // Nếu là 2 chữ số, thêm "0" phía trước
  } else {
    str = str; // Nếu là 3 chữ số, trả về nguyên số
  }

  str = "BANVE" + str + "CODE";

  let hex = "";
  for (let i = 0; i < str.length; i++) {
    hex += str.charCodeAt(i).toString(16).toUpperCase();
  }
  return hex;
}
// END [Supportive FUNCTIONS]

module.exports = {
  getHomepage,
  getAdminpage,
  getTicketList,
  postDatVe,
  postHuyVe,
  postXuatVe,
  postTestThu,
  postTest,
};

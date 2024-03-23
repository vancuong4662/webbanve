// Khởi tạo thông số :
var ticketAwaitCurrentPageNumber = 1;
if (localStorage.getItem("ticketAwaitCurrentPageNumber") != null) {
  ticketAwaitCurrentPageNumber = localStorage.getItem("ticketAwaitCurrentPageNumber");
}


// ----- RENDER DANH SÁCH VÉ DÙNG KHI TẢI TRANG -----
// Tạo một XMLHttpRequest object
var xhrTicket = new XMLHttpRequest();

// Xác định hàm xử lý khi yêu cầu hoàn thành
xhrTicket.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    // Đã nhận được dữ liệu từ máy chủ

    var getData = JSON.parse(this.responseText); // Chuyển đổi JSON thành dạng dùng được với JavaScriptm ở đây là Array
    // Sử dụng dữ liệu ở đây
    console.log("Dữ liệu vé : ", getData); // Log ra để xem console

    // Chuỗi Render :
    writeDataToLocal(getData)
    .then(renderTicketsAwait())
    .then(renderTicketsCompleted())
    .then(() => {
      console.log("Đã render xong các bảng vé");
    })
    .catch((error) => {
      console.error("Có lỗi xảy ra:", error);
    });
  }
};

// Gửi yêu cầu GET đến mã PHP
xhrTicket.open("GET", "laydanhsachve", true);
xhrTicket.send();

// ----- CÁC FUNCTION RENDER  -----
const writeDataToLocal = (getData) => {
  return new Promise((resolve, reject) => {
    localStorage.setItem("data_tickets", JSON.stringify(getData));
    resolve("ghi localstorage xong");
  });
}

const renderTicketsAwait = async () => {
  const dataArrray = await new Promise((resolve, reject) => {
    resolve(JSON.parse(localStorage.getItem("data_tickets")));
  });

  dataArrray.forEach((ticket) => {
    if (ticket["daban"] == 0) {
      var newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td>${ticket["ten"]}</td>
        <td>${ticket["sdt"]}</td>
        <td>${ticket["diemdi"]}</td>
        <td>${ticket["diemden"]}</td>
        <td>${ticket["code"]}</td>
        <td>
          <button class="w3-button w3-black" onclick="xuatVe(${ticket["id"]})">Xuất vé</button>
          <button class="w3-button w3-black" onclick="huyVe(${ticket["id"]})">Hủy vé</button>
        </td>
    `;

      document.getElementById("ticket-table-zone").appendChild(newRow);
    }
  });
};

const renderTicketsCompleted = async () => {
  const dataArrray = await new Promise((resolve, reject) => {
    resolve(JSON.parse(localStorage.getItem("data_tickets")));
  });

  dataArrray.forEach((ticket) => {
    if (ticket["daban"] == 1) {
      var newRow = document.createElement("tr");
      newRow.innerHTML = `
          <td>${ticket["ten"]}</td>
          <td>${ticket["sdt"]}</td>
          <td>${ticket["diemdi"]}</td>
          <td>${ticket["diemden"]}</td>
          <td>${ticket["code"]}</td>
          <td>
              <button class="w3-button w3-black" onclick="huyVe(${ticket["id"]})">Xóa</button>
          </td>
      `;

      document.getElementById("completed-ticket-table-zone").appendChild(newRow);
    }
  });
};


// ----- CÁC FUNCTION HOẠT ĐỘNG KÍCH HOẠT  -----
const huyVe = (ticketId) => {
  // Tạo một XMLHttpRequest object
  var xhrTicketHuy = new XMLHttpRequest();
  xhrTicketHuy.open("POST", "huyve", true);
  xhrTicketHuy.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhrTicketHuy.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // Đã nhận được dữ liệu từ máy chủ
      if (this.responseText == "thành công") {
        alert("Đã thực hiện hủy vé. Vé đã xóa trên hệ thống.");
        location.reload();
      }
    }
  };

  // Gửi kèm data:
  xhrTicketHuy.send("id="+ticketId);
};

const xuatVe = (ticketId) => {
  // Tạo một XMLHttpRequest object
  var xhrTicketXuat = new XMLHttpRequest();
  xhrTicketXuat.open("POST", "xuatve", true);
  xhrTicketXuat.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhrTicketXuat.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // Đã nhận được dữ liệu từ máy chủ
      if (this.responseText == "thành công") {
        alert("Đã xác nhận xuất vé đã chọn");
        location.reload();
      }
    }
  };

  // Gửi kèm data:
  xhrTicketXuat.send("id="+ticketId);
};
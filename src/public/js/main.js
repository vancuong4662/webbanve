const datVe = () => {
  // Get input values :
  var customerName = document.getElementById("input-ve-ten").value;
  var customerPhone = document.getElementById("input-ve-sdt").value;
  var customerDeparture = document.getElementById("select-diem-di").value;
  var customerDestination = document.getElementById("select-diem-den").value;

  // Kiểm tra nếu chưa điền thông tin
  if (
    customerName == "" ||
    customerPhone == "" ||
    customerDeparture == "" ||
    customerDestination == ""
  ) {
    alert("Chưa điền đủ thông tin");
    return; // thoát hàm
  }

  var XHR = new XMLHttpRequest();
  XHR.open("POST", "datve", true);
  XHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  XHR.onreadystatechange = function () {
    if (XHR.readyState === 4 && XHR.status === 200) {
      var getData = JSON.parse(XHR.responseText);
      if (getData[0] == "thành công") {
        alert("Bạn đã đặt vé thành công. Hãy kiểm tra lại thông tin vé.");
        showTicketInfo(getData[1]);
      }
    }
  };
  XHR.send(
    "name=" + customerName +
    "&phone=" + customerPhone +
    "&derp=" + customerDeparture +
    "&dest=" + customerDestination 
  );
};

const showTicketInfo = (code) => {
  // Get input values :
  var customerName = document.getElementById("input-ve-ten").value;
  var customerPhone = document.getElementById("input-ve-sdt").value;
  var customerDeparture = document.getElementById("select-diem-di").value;
  var customerDestination = document.getElementById("select-diem-den").value;
  
  document.getElementById("show-ticket-info-ten").innerText = customerName;
  document.getElementById("show-ticket-info-sdt").innerText = customerPhone;
  document.getElementById("show-ticket-info-diemdi").innerText = customerDeparture;
  document.getElementById("show-ticket-info-diemden").innerText = customerDestination;
  document.getElementById("show-ticket-info-code").innerText = code;

  document.getElementById("form-ticket-book").style.display = 'none';
  document.getElementById("form-ticket-info").style.display = 'block';
}
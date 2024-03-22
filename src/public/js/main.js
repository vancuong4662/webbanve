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
      alert(XHR.responseText);
    }
  };
  XHR.send(
    "name=" + customerName +
    "&phone=" + customerPhone +
    "&derp=" + customerDeparture +
    "&dest=" + customerDestination 
  );
};

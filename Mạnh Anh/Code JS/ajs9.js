window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("error")) {
    let message = "Lỗi không xác định!";
    if (urlParams.get("error") === "invalid") {
      message = "Tên đăng nhập hoặc mật khẩu sai!";
    } else if (urlParams.get("error") === "db") {
      message = "Lỗi kết nối cơ sở dữ liệu!";
    }
    alert(message);
  } else if (urlParams.has("success")) {
    if (urlParams.get("success") === "login") {
      alert("Đăng nhập thành công!");
      localStorage.setItem("loggedIn", "true");
      window.location.href = "Demo.html";
    }
  }
};

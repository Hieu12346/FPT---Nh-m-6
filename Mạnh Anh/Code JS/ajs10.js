function validateRegister(event) {
  event.preventDefault();

  const username = document.querySelector("input[name='username']").value;
  const email = document.querySelector("input[name='email']").value;
  const password = document.querySelector("input[name='password']").value;
  const confirmPassword = document.querySelector(
    "input[name='confirm_password']"
  ).value;

  if (!email.includes("@")) {
    alert("Email không hợp lệ!");
    return;
  }
  if (password !== confirmPassword) {
    alert("Mật khẩu xác nhận không khớp!");
    return;
  }

  alert("Đăng ký thành công!");
}

window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("error")) {
    alert("Đăng ký thất bại! Tài khoản hoặc email có thể đã tồn tại.");
  } else if (urlParams.has("success")) {
    if (urlParams.get("success") === "register") {
      alert("Đăng ký thành công! Vui lòng đăng nhập.");
      window.location.href = "dangnhap.html";
    }
  }
};

let totalPrice = 0;
function applyDiscount() {
  let discountCode = document.getElementById("discount-code").value;
  if (discountCode === "NHOM6") {
    let discountAmount = totalPrice * 0.2;
    let finalPrice = totalPrice - discountAmount;
    document.getElementById(
      "discount"
    ).innerText = `${discountAmount.toLocaleString()} ₫`;
    document.getElementById(
      "final-price"
    ).innerText = `${finalPrice.toLocaleString()} ₫`;
    alert("Mã giảm giá đã được áp dụng!");
  } else {
    alert("Mã giảm giá không hợp lệ!");
  }
}

function confirmOrder() {
  let name = document.getElementById("full-name").value;
  let address = document.getElementById("address").value;
  let phone = document.getElementById("phone").value;
  let paymentMethod = document.getElementById("payment-method").value;

  document.getElementById("name-error").style.display = name ? "none" : "block";
  document.getElementById("address-error").style.display = address
    ? "none"
    : "block";
  document.getElementById("phone-error").style.display = phone
    ? "none"
    : "block";

  if (name && address && phone) {
    alert(
      `Đơn hàng đã được xác nhận!\nTên: ${name}\nĐịa chỉ: ${address}\nSố điện thoại: ${phone}\nPhương thức thanh toán: ${paymentMethod}`
    );
  }
}
////////////
document.addEventListener("DOMContentLoaded", function () {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let orderList = document.getElementById("order-list");
  totalPrice = 0;

  if (cart.length === 0) {
    orderList.innerHTML = "<p>Không có sản phẩm nào trong đơn hàng.</p>";
  } else {
    cart.forEach((product) => {
      let productElement = document.createElement("div");
      productElement.className = "order-item";
      productElement.innerHTML = `
        <img src="${product.image || "../Ảnh/default-product.jpg"}" 
             alt="${product.name}" 
             onerror="this.src='../Ảnh/tai_nghe_bluetooth_honor_choice_earbuds_x7e_trang_1_cbf19c597e.jpg'">
        <div class="order-item-info">
          <p><strong>Sản phẩm:</strong> ${product.name}</p>
          <p><strong>Số lượng:</strong> ${product.quantity}</p>
          <p><strong>Giá:</strong> ${product.price.toLocaleString()} ₫</p>
        </div>
      `;
      orderList.appendChild(productElement);
      totalPrice += product.price * product.quantity;
    });

    document.getElementById(
      "total-price"
    ).innerText = `${totalPrice.toLocaleString()} ₫`;
    document.getElementById(
      "final-price"
    ).innerText = `${totalPrice.toLocaleString()} ₫`;
  }
});
//////////////////
document.addEventListener("DOMContentLoaded", function () {
  const chatbox = document.querySelector(".chatbox");
  const chatToggle = document.querySelector(".chat-toggle");
  const chatClose = document.querySelector(".chat-close");
  const chatInput = document.querySelector(".chat-input");
  const chatSend = document.querySelector(".chat-send");
  const chatMessages = document.querySelector(".chat-messages");

  chatToggle.addEventListener("click", () => {
    chatbox.classList.toggle("active");
    chatToggle.style.display = chatbox.classList.contains("active")
      ? "none"
      : "block";
  });

  chatClose.addEventListener("click", () => {
    chatbox.classList.remove("active");
    setTimeout(() => {
      chatToggle.style.display = "block";
    }, 300);
  });

  function addMessage(name, message, isUser = false) {
    let msgElement = document.createElement("div");
    msgElement.classList.add("chat-message");
    if (isUser) msgElement.classList.add("user");

    msgElement.innerHTML = `
				<img class="chat-avatar" src="${
          isUser
            ? "../Ảnh/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
            : "../Ảnh/ho.jpg"
        }" alt="Avatar">
				<div class="chat-content-wrapper">
					<div class="${isUser ? "chat-nameuser" : "chat-name"}">${name}</div>
					<div class="chat-content">${message}</div>
				</div>
			`;

    chatMessages.appendChild(msgElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  chatSend.addEventListener("click", () => {
    let message = chatInput.value.trim();
    if (message) {
      addMessage("Bạn", message, true);
      chatInput.value = "";
      setTimeout(
        () =>
          addMessage(
            "KTSShop",
            "Chào mừng đến với KTSShop.com.vn. Bạn cần gì?"
          ),
        1000
      );
    }
  });

  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      chatSend.click();
    }
  });
});
/////////////////////
document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const productName = urlParams.get("name");
  const productPrice = urlParams.get("price");
  const productImage = urlParams.get("image");

  if (productName && productPrice && productImage) {
    const orderList = document.getElementById("order-list");
    const totalPriceElement = document.getElementById("total-price");
    const finalPriceElement = document.getElementById("final-price");

    const productElement = document.createElement("div");
    productElement.className = "order-item";
    productElement.innerHTML = `
            <img src="${productImage}" alt="${productName}">
            <div class="order-item-info">
                <p><strong>Sản phẩm:</strong> ${productName}</p>
                <p><strong>Giá:</strong> ${parseInt(
                  productPrice
                ).toLocaleString()} ₫</p>
            </div>
        `;
    orderList.appendChild(productElement);

    totalPrice = parseInt(productPrice);
    totalPriceElement.innerText = `${totalPrice.toLocaleString()} ₫`;
    finalPriceElement.innerText = `${totalPrice.toLocaleString()} ₫`;
  }
});
///////////////
function updateCartCount() {
  let totalQuantity = localStorage.getItem("cartCount") || 0;
  let cartCountElement = document.querySelector(".cart-count");

  if (totalQuantity > 0) {
    cartCountElement.textContent = totalQuantity;
    cartCountElement.style.display = "flex";
  } else {
    cartCountElement.style.display = "none";
  }
}

updateCartCount();
///////////////
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");

  if (searchButton && searchInput) {
    searchButton.addEventListener("click", function () {
      let keyword = searchInput.value.trim().toLowerCase();
      if (keyword) {
        window.location.href = `Search.html?search=${encodeURIComponent(
          keyword
        )}`;
      }
    });

    searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        searchButton.click();
      }
    });
  }
});
/////////////////
document.addEventListener("DOMContentLoaded", function () {
  const loginLink = document.getElementById("loginLink");

  function updateLoginUI() {
    if (localStorage.getItem("loggedIn") === "true") {
      loginLink.innerText = "Tài khoản";
      loginLink.href = "TTCN.html";
    } else {
      loginLink.innerText = "Đăng nhập";
      loginLink.href = "dangnhap.html";
    }
  }

  updateLoginUI();
});

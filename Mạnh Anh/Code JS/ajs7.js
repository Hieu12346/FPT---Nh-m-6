document.addEventListener("DOMContentLoaded", function () {
  const cartItemsList = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const clearCartButton = document.getElementById("clear-cart");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function updateCartUI() {
    cartItemsList.innerHTML = "";
    let total = 0;
    const discountContainer = document.querySelector(".discount-container");

    if (cart.length === 0) {
      cartItemsList.innerHTML = `<p style="text-align:center; font-size:18px; color:red;">🛒 Giỏ hàng của bạn đang trống.</p>`;
      document.getElementById("checkout").disabled = true;
      discountContainer.style.display = "none";
    } else {
      document.getElementById("checkout").disabled = false;
      cart.forEach((item, index) => {
        let li = document.createElement("li");
        let thanhTien = item.price * item.quantity;
        li.innerHTML = `
						<img src="${
              item.image
            }" alt="Ảnh sản phẩm" onerror="this.src='default-image.jpg'">
						<div class="item-info">
							<span class="item-name" >${item.name}</span>
							<span class="item-storage">Dung lượng: <strong>${
                item.storage || "Không xác định"
              }</strong></span>
							<span class="item-color">Màu sắc: <strong>${
                item.color || "Không xác định"
              }</strong></span>
						</div>
						<div class="quantity-controls">
							<button onclick="changeQuantity(${index}, -1)">➖</button>
							<span>${item.quantity}</span>
							<button onclick="changeQuantity(${index}, 1)">➕</button>
						</div>
						<div class="item-price">
							<span class="old-price">${item.oldPrice.toLocaleString()} ₫</span>
							<span class="new-price">${item.price.toLocaleString()} ₫</span>
						</div>
						<div class="thanh-tien">
							<strong>${thanhTien.toLocaleString()} ₫</strong>
						</div>
						<button onclick="removeFromCart(${index})">❌</button>
					`;
        cartItemsList.appendChild(li);
        total += thanhTien;
      });
    }

    cartTotal.textContent =
      cart.length > 0 ? `Tổng tiền: ${total.toLocaleString()} ₫` : "";
    document.getElementById(
      "cart-total-items"
    ).textContent = `Tổng số sản phẩm trong giỏ hàng: ${cart.reduce(
      (sum, item) => sum + item.quantity,
      0
    )}`;
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem(
      "cartCount",
      cart.reduce((sum, item) => sum + item.quantity, 0)
    );
    window.dispatchEvent(new Event("storage"));
    updateCartCount();
  }

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

  window.addEventListener("storage", function () {
    updateCartCount();
  });

  document
    .getElementById("continue-shopping")
    .addEventListener("click", function () {
      window.location.href = "Demo.html";
    });

  window.changeQuantity = function (index, change) {
    if (cart[index]) {
      cart[index].quantity += change;
      if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
      }
      document.getElementById("discount-code").value = "";
      document.getElementById("discount-message").textContent = "";
      document.getElementById("apply-discount").disabled = false;
      document.getElementById("discount-code").disabled = false;
      localStorage.setItem("cart", JSON.stringify(cart));
      localStorage.setItem(
        "cartCount",
        cart.reduce((sum, item) => sum + item.quantity, 0)
      );
      window.dispatchEvent(new Event("storage"));
      updateCartUI();
    }
  };

  window.removeFromCart = function (index) {
    if (
      confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng không?")
    ) {
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      localStorage.setItem(
        "cartCount",
        cart.reduce((sum, item) => sum + item.quantity, 0)
      );
      window.dispatchEvent(new Event("storage"));
      updateCartUI();
    }
  };

  clearCartButton.addEventListener("click", function () {
    if (confirm("Bạn có chắc chắn muốn xóa toàn bộ giỏ hàng không?")) {
      cart = [];
      localStorage.setItem("cart", JSON.stringify(cart));
      localStorage.setItem(
        "cartCount",
        cart.reduce((sum, item) => sum + item.quantity, 0)
      );
      window.dispatchEvent(new Event("storage"));
      updateCartUI();
    }
  });
  updateCartUI();
});

document.addEventListener("DOMContentLoaded", function () {
  const discountInput = document.getElementById("discount-code");
  const applyDiscountButton = document.getElementById("apply-discount");
  const discountMessage = document.getElementById("discount-message");
  let cartTotal = document.getElementById("cart-total");

  const discountCodes = { NHOM6: 20 };

  applyDiscountButton.addEventListener("click", function () {
    let code = discountInput.value.trim().toUpperCase();
    let totalAmount = parseInt(cartTotal.textContent.replace(/[^\d]/g, ""));

    if (discountCodes[code]) {
      let discountPercent = discountCodes[code];
      let discountAmount = (totalAmount * discountPercent) / 100;
      let newTotal = totalAmount - discountAmount;

      cartTotal.textContent = `Tổng tiền (sau giảm): ${newTotal.toLocaleString()} ₫`;
      discountMessage.textContent = `🎉 Đã áp dụng mã giảm ${discountPercent}%!`;
      discountMessage.style.color = "green";
      applyDiscountButton.disabled = true;
      discountInput.disabled = true;
    } else {
      discountMessage.textContent = "❌ Mã không hợp lệ!";
      discountMessage.style.color = "red";
    }
  });
});
//////////////////////////////////////////////////////////////////
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
            : "../Ảnh/z6322794975136_70f7ef48558d457e4384cf3304b8fc8d.jpg"
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
//////////////////////////////////////////////////////////////////////////////
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
////////////////////////////////////////
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

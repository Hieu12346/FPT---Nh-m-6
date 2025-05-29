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
////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", function () {
  const productList = document.querySelector(".product-list");
  let products = Array.from(document.querySelectorAll(".product"));

  function filterAndSortProducts() {
    let priceFilter = document.getElementById("priceFilter").value;
    let brandFilter = document.getElementById("brandFilter").value;
    let sortOrder = document.getElementById("sortOrder").value;

    let filteredProducts = products.filter((product) => {
      let price = parseInt(product.getAttribute("data-price"));
      let brand = product.getAttribute("data-brand");

      let priceMatch =
        priceFilter === "all" ||
        (priceFilter === "duoi10" && price < 10000000) ||
        (priceFilter === "10-20" && price >= 10000000 && price <= 20000000) ||
        (priceFilter === "20-30" && price >= 20000000 && price <= 30000000) ||
        (priceFilter === "tren30" && price > 30000000);

      let brandMatch = brandFilter === "all" || brand === brandFilter;

      return priceMatch && brandMatch;
    });

    if (sortOrder === "asc") {
      filteredProducts.sort(
        (a, b) => a.getAttribute("data-price") - b.getAttribute("data-price")
      );
    } else if (sortOrder === "desc") {
      filteredProducts.sort(
        (a, b) => b.getAttribute("data-price") - a.getAttribute("data-price")
      );
    }

    productList.style.opacity = "0";
    productList.style.transform = "scale(0.95)";

    setTimeout(() => {
      productList.innerHTML = "";
      if (filteredProducts.length === 0) {
        productList.innerHTML = `<div style="text-align: center; font-size: 18px; color: red; margin-top: 20px;">
												🚫 Không tìm thấy sản phẩm nào phù hợp.
											 </div>`;
      } else {
        filteredProducts.forEach((product) => productList.appendChild(product));
      }
      productList.style.opacity = "1";
      productList.style.transform = "scale(1)";
    }, 300);
  }

  document
    .getElementById("priceFilter")
    .addEventListener("change", filterAndSortProducts);
  document
    .getElementById("brandFilter")
    .addEventListener("change", filterAndSortProducts);
  document
    .getElementById("sortOrder")
    .addEventListener("change", filterAndSortProducts);
});
///////////////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get("search")?.toLowerCase().trim();
  const productList = document.querySelector(".product-list");
  const products = Array.from(document.querySelectorAll(".product"));

  if (searchQuery && productList && products.length > 0) {
    let foundProducts = products.filter((product) => {
      let description = product
        .querySelector(".description")
        .textContent.toLowerCase();
      let brand = product.getAttribute("data-brand")
        ? product.getAttribute("data-brand").toLowerCase()
        : "";
      return description.includes(searchQuery) || brand.includes(searchQuery);
    });

    productList.innerHTML = "";
    if (foundProducts.length > 0) {
      foundProducts.forEach((product) => productList.appendChild(product));
    } else {
      productList.innerHTML = `<div style="text-align: center; font-size: 18px; color: red; margin-top: 20px;">
												🚫 Không tìm thấy sản phẩm nào phù hợp.
											 </div>`;
    }
  }
});
/////
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
/////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", function () {
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

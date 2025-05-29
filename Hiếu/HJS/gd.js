document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");

  if (searchButton && searchInput) {
    searchButton.addEventListener("click", function () {
      let keyword = searchInput.value.trim().toLowerCase();
      if (keyword) {
        window.location.href = `../../Mạnh Anh/Code HTML/Search.html?search=${encodeURIComponent(
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
////////////////////////////////////////////////////////////////////////////
const carouselImages = document.querySelector(".carousel-images");
const images = document.querySelectorAll(".carousel-images img");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

let currentIndex = 0;

function updateCarousel() {
  const offset = -currentIndex * 100;
  carouselImages.style.transform = `translateX(${offset}%)`;
}

function showNextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  updateCarousel();
}

function showPrevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateCarousel();
}

nextButton.addEventListener("click", showNextImage);
prevButton.addEventListener("click", showPrevImage);

setInterval(showNextImage, 5000);

////////////////////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", function () {
  const productList = document.querySelector(".product-list");
  let products = Array.from(document.querySelectorAll(".product"));

  function filterAndSortProducts() {
    let priceFilter = document.getElementById("priceFilter").value;
    let sortOrder = document.getElementById("sortOrder").value;

    let filteredProducts = products.filter((product) => {
      let price = parseInt(product.getAttribute("data-price"));
      return (
        priceFilter === "all" ||
        (priceFilter === "duoi10" && price < 10000000) ||
        (priceFilter === "10-20" && price >= 10000000 && price <= 20000000) ||
        (priceFilter === "20-30" && price >= 20000000 && price <= 30000000) ||
        (priceFilter === "tren30" && price > 30000000)
      );
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

    productList.innerHTML = "";
    if (filteredProducts.length === 0) {
      productList.innerHTML = `<div style="text-align: center; font-size: 18px; color: red; margin-top: 20px;">
                                        Không tìm thấy sản phẩm nào phù hợp.
                                     </div>`;
    } else {
      filteredProducts.forEach((product) => productList.appendChild(product));
    }
  }

  document
    .getElementById("priceFilter")
    .addEventListener("change", filterAndSortProducts);
  document
    .getElementById("sortOrder")
    .addEventListener("change", filterAndSortProducts);
});

/////////////////////////////////////////////////////////////////////////
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

  chatSend.addEventListener("click", () => {
    let message = chatInput.value.trim();
    if (message) {
      let msgElement = document.createElement("div");
      msgElement.textContent = message;
      msgElement.style.padding = "5px";
      msgElement.style.margin = "5px 0";
      msgElement.style.background = "#f1f1f1";
      msgElement.style.borderRadius = "5px";
      chatMessages.appendChild(msgElement);
      chatInput.value = "";
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  });

  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      chatSend.click();
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  let user = localStorage.getItem("user");

  if (user) {
    document.getElementById(
      "loginBtn"
    ).innerHTML = `<a href="#" onclick="logout()">Đăng xuất</a>`;
  }
});

function logout() {
  localStorage.removeItem("user"); // Xóa dữ liệu đăng nhập
  localStorage.removeItem("cart"); // Reset giỏ hàng
  alert("Bạn đã đăng xuất!");
  location.reload(); // Tải lại trang
}

document.addEventListener("DOMContentLoaded", function () {
  const loginLink = document.getElementById("loginLink");

  function updateLoginUI() {
    if (localStorage.getItem("loggedIn") === "true") {
      loginLink.innerText = "Tài khoản";
      loginLink.href = "../../Mạnh Anh/Code HTML/TTCN.html";
    } else {
      loginLink.innerText = "Đăng nhập";
      loginLink.href = "../../Mạnh Anh/Code HTML/dangnhap.html";
    }
  }

  updateLoginUI();
});
function updateCartCount() {
  const cartCount = localStorage.getItem("cartCount") || 0;
  const cartCountElement = document.querySelector(".cart-count");

  if (cartCount > 0) {
    cartCountElement.textContent = cartCount;
    cartCountElement.style.display = "flex"; // Hiển thị vùng đỏ
  } else {
    cartCountElement.style.display = "none"; // Ẩn vùng đỏ
  }
}
// Gọi hàm updateCartCount khi trang được tải
updateCartCount();

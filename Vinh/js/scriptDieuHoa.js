const carouselImages = document.querySelector(".carousel-images2");
const images = document.querySelectorAll(".carousel-images2 img");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
let index = 0;
const totalImages = images.length;
function updateCarousel() {
  const offset = -index * 400;
  carouselImages.style.transform = `translateX(${offset}px)`;
}
window.addEventListener("resize", updateCarousel);
nextButton.addEventListener("click", () => {
  if (index < totalImages - 1) {
    index++;
  } else {
    index = 0;
  }
  updateCarousel();
});
prevButton.addEventListener("click", () => {
  if (index > 0) {
    index--;
  } else {
    index = totalImages - 1;
  }
  updateCarousel();
});
///////////
document.getElementById("xemThemBtn").addEventListener("click", function () {
  let themThongTin = document.getElementById("them-thong-tin");
  if (
    themThongTin.style.display === "none" ||
    themThongTin.style.display === ""
  ) {
    themThongTin.style.display = "block";
    this.innerHTML = "Thu gọn ▲ ";
  } else {
    themThongTin.style.display = "none";
    this.textContent = "Xem thêm ▼ ";
  }
});
document.getElementById("xemThemBtn1").addEventListener("click", function () {
  let themThongTin = document.getElementById("them-thong-tin1");
  if (
    themThongTin.style.display === "none" ||
    themThongTin.style.display === ""
  ) {
    themThongTin.style.display = "block";
    this.innerHTML = "Thu gọn ▲ ";
  } else {
    themThongTin.style.display = "none";
    this.textContent = "Xem thêm ▼ ";
  }
});
/////////
const pageID = window.location.pathname;
const defaultRatings = [10, 4, 0, 0, 0];
const totalRatingsDefault = 14;
const totalScoreDefault = 10 * 5 + 4 * 4 + 0 * 3 + 0 * 2 + 0 * 1;
let currentRatings = [...defaultRatings];
let currentTotalRatings = totalRatingsDefault;
let currentTotalScore = totalScoreDefault;
function updateUI(ratings, totalRatings, totalScore) {
  let avg = (totalScore / totalRatings).toFixed(1);
  document.getElementById("avg-rating").innerText = avg;
  document.getElementById("total-reviews").innerText =
    totalRatings + " lượt đánh giá";
  let starDisplay = "☆☆☆☆☆";
  if (avg >= 1.0) starDisplay = "★☆☆☆☆";
  if (avg >= 2.0) starDisplay = "★★☆☆☆";
  if (avg >= 3.0) starDisplay = "★★★☆☆";
  if (avg >= 4.0) starDisplay = "★★★★☆";
  if (avg == 5.0) starDisplay = "★★★★★";
  document.getElementById("star-display").innerHTML = starDisplay;
  for (let i = 0; i < 5; i++) {
    let percent = ((ratings[i] / totalRatings) * 100).toFixed(1) || 0;
    document.getElementById(`bar-${5 - i}`).style.width = percent + "%";
    document.getElementById(`count-${5 - i}`).innerText = ratings[i];
  }
}
function rate(star) {
  currentRatings[5 - star]++;
  currentTotalRatings++;
  currentTotalScore += star;
  updateUI(currentRatings, currentTotalRatings, currentTotalScore);
}
window.onload = () => {
  currentRatings = [...defaultRatings];
  currentTotalRatings = totalRatingsDefault;
  currentTotalScore = totalScoreDefault;
  updateUI(defaultRatings, totalRatingsDefault, totalScoreDefault);
};
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
            ? "../img/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
            : "../img/Logo.jpg"
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
/////////////////
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
///////////////
document.addEventListener("DOMContentLoaded", function () {
  const addToCartButton = document.querySelector(".add-to-cart");

  addToCartButton.addEventListener("click", function () {
    const product = {
      name: "Midea Inverter 1 HP (9000 BTU) MSAF6-10CDN8",
      price: 5790000,
      oldPrice: 11990000,
      image: "../../Mạnh Anh/Ảnh/Dieu-Hoa.jpg",
      quantity: 1,
      power: "9000 BTU",
      color: "Trắng",
    };
    if (product.price === undefined || product.oldPrice === undefined) {
      alert("Lỗi: Giá sản phẩm không hợp lệ!");
      return;
    }
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProductIndex = cart.findIndex(
      (item) => item.name === product.name
    );

    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity += 1;
    } else {
      cart.unshift(product);
    }
    localStorage.setItem("cart", JSON.stringify(cart));

    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    localStorage.setItem("cartCount", totalQuantity);
    window.dispatchEvent(new Event("storage"));
    alert("Sản phẩm đã được thêm vào giỏ hàng!");
  });
});
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

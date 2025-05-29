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

//////////////////////////////////////////////////////////////////
const priceData = {
  "256GB": { newPrice: 7990000, oldPrice: 9490000 },
};

function updatePrice() {
  let storageSelect = document.getElementById("storage");
  let selectedStorage = storageSelect.value;

  if (priceData[selectedStorage]) {
    let newPrice = priceData[selectedStorage].newPrice;
    let oldPrice = priceData[selectedStorage].oldPrice;

    document.getElementById("price").innerText =
      new Intl.NumberFormat("vi-VN").format(newPrice) + "₫";
    document.getElementById("old-price").innerText =
      new Intl.NumberFormat("vi-VN").format(oldPrice) + "₫";
  }
}
///////////////////////////////////////////////////////////////
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
//////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", function () {
  const cartCount = document.createElement("span");
  cartCount.id = "cart-count";
  cartCount.textContent = JSON.parse(localStorage.getItem("cart"))?.length || 0;

  function updatePrice() {
    let storagePrice = document.getElementById("storage").value;
    document.getElementById("price").innerText =
      new Intl.NumberFormat("vi-VN").format(storagePrice) + "₫";
  }

  window.removeFromCart = function (index) {
    let items = document.querySelectorAll("#cart-items li");
    if (items[index]) {
      items[index].style.opacity = "0";
      setTimeout(() => {
        cart.splice(index, 1);
        updateCartUI();
      }, 300);
    }
  };

  window.addToCart = function () {
    let product = document.querySelector(".product");
    let storageSelect = document.getElementById("storage");
    let colorSelect = document.getElementById("color");

    let storage = storageSelect.options[storageSelect.selectedIndex].text;
    let color = colorSelect.value;
    let newPrice = priceData[storage].newPrice;
    let oldPrice = priceData[storage].oldPrice;

    let imageMap = {
      "Tím Đen": "../Ảnh/realme_13_plus_5g_tim_5_4ed930bfe7 (1).png",
    };

    let selectedImage =
      imageMap[color] || "../Ảnh/iphone_16_pro_max_default.png";

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existingItem = cart.find(
      (item) =>
        item.id === product.getAttribute("data-id") &&
        item.storage === storage &&
        item.color === color
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      let item = {
        id: product.getAttribute("data-id"),
        name: product.getAttribute("data-name"),
        storage: storage,
        color: color,
        price: newPrice,
        oldPrice: oldPrice,
        image: selectedImage,
        quantity: 1,
      };
      cart.unshift(item);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Đã thêm sản phẩm vào giỏ hàng!");
    localStorage.setItem(
      "cartCount",
      cart.reduce((sum, item) => sum + item.quantity, 0)
    );
    updateCartCount();
  };
});

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

window.addEventListener("storage", function () {
  updateCartCount();
});

document.addEventListener("DOMContentLoaded", function () {
  updateCartCount();
});
///////////////////////////////////////////////////////////////////////////////////////////////
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
////////////////////////////////////////////////////////////////////////
const pageID = window.location.pathname;

const defaultRatings = [7, 2, 2, 0, 1];
const totalRatingsDefault = 12;
const totalScoreDefault = 7 * 5 + 2 * 4 + 2 * 3 + 0 * 2 + 1 * 1;

let currentRatings = [...defaultRatings];
let currentTotalRatings = totalRatingsDefault;
let currentTotalScore = totalScoreDefault;

function updateUI(ratings, totalRatings, totalScore) {
  let avg = (totalScore / totalRatings).toFixed(1);
  document.getElementById("avg-rating").innerText = avg;
  document.getElementById("total-reviews").innerText =
    totalRatings + " lượt đánh giá";

  let starDisplay = "☆☆☆☆☆";
  if (avg >= 0.5 && avg < 1.5) starDisplay = "★☆☆☆☆";
  if (avg >= 1.5 && avg < 2.5) starDisplay = "★★☆☆☆";
  if (avg >= 2.5 && avg < 3.5) starDisplay = "★★★☆☆";
  if (avg >= 3.5 && avg < 4.5) starDisplay = "★★★★☆";
  if (avg >= 4.5) starDisplay = "★★★★★";
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

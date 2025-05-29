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

const dots = document.querySelectorAll(".carousel-dots span");

function updateCarousel() {
  const offset = -currentIndex * 100;
  carouselImages.style.transform = `translateX(${offset}%)`;

  dots.forEach((dot) => dot.classList.remove("active"));
  dots[currentIndex].classList.add("active");
}

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentIndex = index;
    updateCarousel();
  });
});
////////////////////////////////////////////////////////////////////////////////
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
              <div class="${
                isUser ? "chat-nameuser" : "chat-name"
              }">${name}</div>
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
//////////////////////////////////////////////////////////////////////
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
/////////////////////////////////////////////////
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
////////////////////////////////////////////////////////////
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
/////////////////////////////////////////////////////////////////
function showMap() {
  document.getElementById("mapBox").classList.add("active");
  document.getElementById("mapToggle").classList.add("hidden");
}

function hideMap() {
  document.getElementById("mapBox").classList.remove("active");
  document.getElementById("mapToggle").classList.remove("hidden");
}

function openGoogleMaps() {
  window.open(
    "https://www.google.com/maps?q=31+Dịch+Vọng+Hậu,+Cầu+Giấy,+Hà+Nội,+Việt+Nam",
    "_blank"
  );
}

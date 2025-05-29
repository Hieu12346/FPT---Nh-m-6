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

///////////////

function addRating(star) {
  let count = document.getElementById(`count-${star}`);
  let bar = document.getElementById(`bar-${star}`);
  let newCount = parseInt(count.textContent) + 1;
  count.textContent = newCount;
  let totalReviews = document.getElementById("total-reviews");
  let total = parseInt(totalReviews.textContent) + 1;
  totalReviews.textContent = `${total} lượt đánh giá`;

  bar.style.width = `${(newCount / total) * 100}%`;
}

function submitComment() {
  let commentBox = document.getElementById("comment");
  let commentText = commentBox.value.trim();
  if (commentText !== "") {
    let comments = document.getElementById("comments");
    let newComment = document.createElement("div");
    newComment.classList.add("comment");
    newComment.textContent = commentText;

    let reply = document.createElement("div");
    reply.classList.add("reply");
    reply.textContent = "Cảm ơn bạn đã để lại đánh giá!";
    newComment.appendChild(reply);

    comments.prepend(newComment);
    commentBox.value = "";
  }
}
/////////////////
function addToCart(button) {
  const product = {
    id: button.dataset.id,
    name: button.dataset.name,
    price: parseInt(button.dataset.price),
    oldPrice: parseInt(button.dataset.oldPrice) || 0,
    image: button.dataset.image,
    color: button.dataset.color || "Không xác định",
    storage: button.dataset.storage || "Không áp dụng",
    quantity: 1,
  };

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.unshift(product);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Đã thêm vào giỏ hàng 🎉");
  updateCartCounter();
}

function updateCartCounter() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelector(".cart-count").textContent = totalItems;
}
////////////
document.addEventListener("DOMContentLoaded", function () {
  let cartCount = localStorage.getItem("cartCount") || 0;
  updateCartDisplay(cartCount);

  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", function () {
      let currentCount = parseInt(localStorage.getItem("cartCount") || 0);
      currentCount++;
      localStorage.setItem("cartCount", currentCount);
      updateCartDisplay(currentCount);
    });
  });
});

function updateCartDisplay(count) {
  let cartBadge = document.querySelector(".cart-count");
  if (cartBadge) {
    if (count > 0) {
      cartBadge.textContent = count;
      cartBadge.style.display = "flex";
    } else {
      cartBadge.style.display = "none";
    }
  }
}
////////////////////
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
//////////////////
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
//////////////////
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
/////////////////
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

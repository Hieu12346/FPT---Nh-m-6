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

document.addEventListener("DOMContentLoaded", function () {
  let xemThemBtn = document.getElementById("xemThemBtn");
  let themThongTin = document.getElementById("them-thong-tin");

  if (xemThemBtn && themThongTin) {
    xemThemBtn.addEventListener("click", function () {
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
  }
});

let currentImageIndex = 0;
function showImage(index) {
  const images = document.querySelectorAll(".image-slider img");
  images.forEach((img, i) => {
    img.style.display = i === index ? "block" : "none";
  });
}
function changeImage(direction) {
  const images = document.querySelectorAll(".image-slider img");
  currentImageIndex =
    (currentImageIndex + direction + images.length) % images.length;
  showImage(currentImageIndex);
}
document.addEventListener("DOMContentLoaded", () => {
  showImage(currentImageIndex);
});

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

// Lấy đường dẫn URL làm ID duy nhất cho từng trang
const pageID = window.location.pathname;

// Đánh giá mặc định (hiển thị khi tải trang)
const defaultRatings = [10, 4, 0, 0, 0];
const totalRatingsDefault = 14; // Tổng số lượt đánh giá mặc định
const totalScoreDefault = 10 * 5 + 4 * 4 + 0 * 3 + 0 * 2 + 0 * 1;

// Biến lưu trạng thái tạm thời
let currentRatings = [...defaultRatings];
let currentTotalRatings = totalRatingsDefault;
let currentTotalScore = totalScoreDefault;

function updateUI(ratings, totalRatings, totalScore) {
  let avg = (totalScore / totalRatings).toFixed(1); // Làm tròn đến 1 số thập phân
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

  // Cập nhật thanh tiến trình
  for (let i = 0; i < 5; i++) {
    let percent = ((ratings[i] / totalRatings) * 100).toFixed(1) || 0; // Giữ số thập phân chính xác
    document.getElementById(`bar-${5 - i}`).style.width = percent + "%";
    document.getElementById(`count-${5 - i}`).innerText = ratings[i];
  }
}

function rate(star) {
  // Cập nhật dữ liệu tạm thời
  currentRatings[5 - star]++;
  currentTotalRatings++;
  currentTotalScore += star;

  updateUI(currentRatings, currentTotalRatings, currentTotalScore);
}

// Khi tải lại trang, hiển thị trạng thái mặc định
window.onload = () => {
  currentRatings = [...defaultRatings];
  currentTotalRatings = totalRatingsDefault;
  currentTotalScore = totalScoreDefault;
  updateUI(defaultRatings, totalRatingsDefault, totalScoreDefault);
};

document.addEventListener("DOMContentLoaded", function () {
  if (!sessionStorage.getItem("loaded")) {
    sessionStorage.setItem("loaded", "true");
  }
  loadComments();
});

function openModal() {
  document.getElementById("overlay").style.display = "flex";
}

function closeModal() {
  document.getElementById("overlay").style.display = "none";
}

function submitComment() {
  const name = document.getElementById("nameInput").value.trim();
  const email = document.getElementById("emailInput").value.trim();
  const commentText = document.querySelector(".comment-input").value.trim();

  if (name && email && commentText) {
    const date = new Date().toLocaleDateString("vi-VN");
    saveComment(name, commentText, date);
    document.querySelector(".comment-input").value = "";
    closeModal();
    setTimeout(() => loadComments(), 300);
  } else {
    alert("Vui lòng nhập đầy đủ thông tin!");
  }
}

function getPageKey() {
  return window.location.pathname;
}

function saveComment(name, comment, date, replyTo = null) {
  let pageKey = getPageKey();
  let comments = JSON.parse(localStorage.getItem(pageKey)) || [];
  comments.push({ name, comment, date, replyTo });
  localStorage.setItem(pageKey, JSON.stringify(comments));
  console.log("Lưu bình luận:", comments); // Kiểm tra dữ liệu được lưu
}

function getComments() {
  let pageKey = getPageKey();
  return JSON.parse(localStorage.getItem(pageKey)) || [];
}

function loadComments() {
  const comments = getComments();
  const commentList = document.getElementById("commentList");
  commentList.innerHTML = "";

  comments.forEach(({ name, comment, date, replyTo }, index) => {
    addCommentToList(name, comment, date, index, replyTo);
  });
}

function addCommentToList(name, comment, date, index, replyTo) {
  const commentList = document.getElementById("commentList");
  const newComment = document.createElement("div");

  // Nếu là phản hồi, thêm class "reply" để thụt vào
  newComment.className = replyTo ? "comment reply" : "comment";
  newComment.dataset.index = index;

  newComment.innerHTML = `
<div><strong>${name}</strong> • <span class="comment-date">${date}</span></div>
<div style="margin-left: 10px;">${comment}</div>
<button class="reply-btn" onclick="toggleReplyBox(${index})">Trả lời</button>
<button class="delete-btn" style="display: none; margin-left: 10px; color: red;" onclick="deleteComment(${index})">Xóa bình luận</button>

<div id="replyBox-${index}" class="reply-box" style="display: none;">
    <strong>Đang trả lời: ${name}</strong>
    <input type="text" id="replyInput-${index}" class="reply-input" placeholder="Nhập nội dung bình luận">
    <button class="reply-button" onclick="submitReply(${index}, '${name}')">Gửi</button>
</div>
`;

  newComment.addEventListener("click", function () {
    const deleteBtn = this.querySelector(".delete-btn");
    deleteBtn.style.display =
      deleteBtn.style.display === "none" ? "inline-block" : "none";
  });

  commentList.appendChild(newComment);
}

function toggleReplyBox(index) {
  document.querySelectorAll(".reply-box").forEach((box) => {
    box.style.display = "none";
  });

  const replyBox = document.getElementById(`replyBox-${index}`);
  replyBox.style.display = "block";
  document.getElementById(`replyInput-${index}`).focus();
}

function submitReply(index, replyingTo) {
  const replyInput = document
    .getElementById(`replyInput-${index}`)
    .value.trim();

  if (replyInput) {
    const date = new Date().toLocaleDateString("vi-VN");
    saveComment("KTSShop", replyInput, date, replyingTo);
    loadComments();
  }
}
function deleteComment(index) {
  let pageKey = getPageKey();
  let comments = getComments();

  if (index >= 0 && index < comments.length) {
    let deletedComment = comments[index];

    // Lọc ra những bình luận không phải là phản hồi của bình luận bị xóa
    comments = comments.filter(
      (comment) => comment.replyTo !== deletedComment.name
    );

    // Xóa chính bình luận đó
    comments.splice(index, 1);

    localStorage.setItem(pageKey, JSON.stringify(comments));
    loadComments();
  }
}

// JavaScript cho chức năng thêm sản phẩm vào giỏ hàng
document.addEventListener("DOMContentLoaded", function () {
  const addToCartButton = document.querySelector(".add-to-cart");

  addToCartButton.addEventListener("click", function () {
    const product = {
      name: "Loa Bluetooth JBL Partybox 710",
      price: 18490000, // Giá hiện tại
      oldPrice: 21900000, // Giá cũ
      image: "../../Mạnh Anh/Ảnh/332.jpg", // Đường dẫn hình ảnh sản phẩm
      quantity: 1, // Số lượng mặc định
      storage: "157.5 l", // Dung tích
      color: "Đen", // Màu sắc
    };

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

    // Cập nhật số lượng giỏ hàng trên giao diện
    updateCartCount();

    // Thông báo cho người dùng
    alert("Sản phẩm đã được thêm vào giỏ hàng!");
  });

  // Hàm cập nhật số lượng giỏ hàng
  function updateCartCount() {
    const cartCount = localStorage.getItem("cartCount") || 0;
    const cartCountElement = document.querySelector(".cart-count");
    cartCountElement.textContent = cartCount;
  }

  function updateCartCount() {
    const cartCount = localStorage.getItem("cartCount") || 0;
    const cartCountElement = document.querySelector(".cart-count");

    if (cartCount > 0) {
      cartCountElement.textContent = cartCount;
      cartCountElement.classList.add("visible"); // Hiển thị vùng đỏ
    } else {
      cartCountElement.classList.remove("visible"); // Ẩn vùng đỏ
    }
  }

  updateCartCount(); // Cập nhật số lượng giỏ hàng khi trang được tải
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
//////
document.addEventListener("DOMContentLoaded", function () {
  const buyNowButtons = document.querySelectorAll(".buy-button");

  buyNowButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();

      // Lấy thông tin sản phẩm
      const productContainer = this.closest(".product-details");
      const productName =
        productContainer.querySelector(".product-title").innerText;
      const productImage = document.querySelector(".image-slider img").src;

      // Lấy giá từ phần tử có class "product-price"
      const productPriceText = productContainer
        .querySelector(".product-price")
        .childNodes[0].nodeValue.trim();
      const productPrice = parseInt(productPriceText.replace(/\D/g, ""), 10); // Chuyển về số

      if (!productName || isNaN(productPrice)) {
        alert("Lỗi: Không thể lấy thông tin sản phẩm!");
        return;
      }

      // Chuyển hướng với thông tin sản phẩm
      window.location.href = `../../Mạnh Anh/Code HTML/ThanhToan.html?name=${encodeURIComponent(
        productName
      )}&price=${productPrice}&image=${encodeURIComponent(productImage)}`;
    });
  });
});

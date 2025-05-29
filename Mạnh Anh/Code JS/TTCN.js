document.getElementById("edit-button").addEventListener("click", function () {
  document.getElementById("info-display").classList.add("hidden");
  document.getElementById("edit-form").classList.remove("hidden");
  document.getElementById("edit-button").classList.add("hidden");
  document.getElementById("save-button").classList.remove("hidden");
});

document.getElementById("save-button").addEventListener("click", function () {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const gender = document.getElementById("gender").value;
  const day = document.getElementById("day").value;
  const month =
    document.getElementById("month").options[
      document.getElementById("month").selectedIndex
    ].text;
  const year = document.getElementById("year").value;

  document.getElementById("display-name").innerText = name;
  document.getElementById("display-phone").innerText = phone;
  document.getElementById("display-gender").innerText = gender;
  document.getElementById("display-dob").innerText = `${day} ${month}, ${year}`;

  document.getElementById("info-display").classList.remove("hidden");
  document.getElementById("edit-form").classList.add("hidden");
  document.getElementById("edit-button").classList.remove("hidden");
  document.getElementById("save-button").classList.add("hidden");
});

function populateMonths() {
  let months = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];
  let select = document.getElementById("month");
  months.forEach((month, index) => {
    let option = document.createElement("option");
    option.value = index + 1;
    option.text = month;
    select.appendChild(option);
  });
}

function populateDropdown(id, start, end) {
  let select = document.getElementById(id);
  for (let i = start; i <= end; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.text = i;
    select.appendChild(option);
  }
}

populateDropdown("day", 1, 31);
populateMonths();
populateDropdown("year", 1920, 2025);
///////////////////////////////////////////////////////////////////
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
            : "../Ảnh/logo.jpg"
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
/////////////////////////////////////////////////////
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
///////////////////////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", function () {
  const logoutButton = document.getElementById("logoutButton");

  logoutButton.addEventListener("click", function () {
    localStorage.removeItem("loggedIn");
    alert("Đăng xuất thành công!");
    window.location.href = "Demo.html";
  });
});
////////////////////////////////////////////////////////////
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

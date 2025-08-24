const mainImg = document.getElementById("main-img");
const thumbnails = document.querySelectorAll(".thumb");
const viewBtn = document.getElementById("viewBtn");
const modal = document.getElementById("myModal");
const modalImg = document.getElementById("modal-img");
const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dots = document.querySelectorAll(".dot"); // ✅ dots select kiye

let currentIndex = 0;
const images = Array.from(thumbnails).map(img =>
  img.src.replace("width=120", "width=500&height=625&quality=80")
);

// Thumbnail click
thumbnails.forEach((thumb, index) => {
  thumb.addEventListener("click", () => {
    updateImage(index);
  });
});

// Open modal (slider)
viewBtn.addEventListener("click", () => {
  modal.style.display = "flex";
  modalImg.src = images[currentIndex];
  updateButtons();
});

// Close modal
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Prev & Next
prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    modalImg.src = images[currentIndex];
    updateButtons();
    updateDots();
  }
});

nextBtn.addEventListener("click", () => {
  if (currentIndex < images.length - 1) {
    currentIndex++;
    modalImg.src = images[currentIndex];
    updateButtons();
    updateDots();
  }
});

function updateButtons() {
  prevBtn.classList.toggle("hidden", currentIndex === 0);
  nextBtn.classList.toggle("hidden", currentIndex === images.length - 1);
}

// ✅ Ye function thumbnails + dots dono update karega
function updateImage(index) {
  mainImg.style.opacity = 0;
  setTimeout(() => {
    mainImg.src = images[index];
    mainImg.style.opacity = 1;
  }, 300);

  thumbnails.forEach(t => t.classList.remove("active"));
  thumbnails[index].classList.add("active");

  dots.forEach(d => d.classList.remove("active"));
  dots[index].classList.add("active");

  currentIndex = index;
}

// ✅ Dots click listener
dots.forEach(dot => {
  dot.addEventListener("click", () => {
    const index = parseInt(dot.getAttribute("data-index"));
    updateImage(index);
  });
});

// ✅ Dots update function (jab arrows ya modal use ho)
function updateDots() {
  dots.forEach(d => d.classList.remove("active"));
  dots[currentIndex].classList.add("active");
}


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


const items = document.querySelectorAll(".accordion-item");

// Get the last opened item from localStorage
const lastOpened = localStorage.getItem("lastOpenedAccordion");

items.forEach((item, index) => {
  const header = item.querySelector(".accordion-header");

  // Check if this item was the last one opened before refresh
  if (lastOpened == index) {
    item.classList.add("active");
  }

  header.addEventListener("click", () => {
    // Toggle the active state of the clicked item
    item.classList.toggle("active");

    // Update localStorage to remember which item is open
    if (item.classList.contains("active")) {
      localStorage.setItem("lastOpenedAccordion", index);
    } else {
      // If an item is closed, remove it from localStorage
      localStorage.removeItem("lastOpenedAccordion");
    }
  });
});


///>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const swiperZoom = new Swiper('.swiper-zoom', {
  loop: false,
  centeredSlides: true,
  slidesPerView: "auto",
  spaceBetween: 20,
  speed: 700,
  navigation: {
    nextEl: '.swiper-button-next-zoom',
    prevEl: '.swiper-button-prev-zoom',
  },
  on: {
    init: function () {
      updateArrowsZoom(this);
    },
    slideChangeTransitionEnd: function () {
      updateArrowsZoom(this);
    }
  }
});

function updateArrowsZoom(swiper) {
  const prevBtn = document.querySelector('.swiper-button-prev-zoom');
  const nextBtn = document.querySelector('.swiper-button-next-zoom');

  if (swiper.activeIndex === 0) {
    prevBtn.style.display = "none"; 
    nextBtn.style.display = "flex"; 
  } else if (swiper.activeIndex === swiper.slides.length - 1) {
    prevBtn.style.display = "flex"; 
    nextBtn.style.display = "none"; 
  } else {
    prevBtn.style.display = "flex";
    nextBtn.style.display = "flex";
  }
}


const searchIcon = document.getElementById("searchIcon");
const searchDropdown = document.getElementById("searchDropdown");

searchIcon.addEventListener("click", () => {
  if (searchDropdown.style.visibility === "visible") {
    // Close dropdown
    searchDropdown.style.top = "-30%";
    searchDropdown.style.visibility = "hidden";
    searchDropdown.style.opacity = "0";

    // wapis search icon banado
    searchIcon.classList.remove("fa-xmark", "active");
    searchIcon.classList.add("fa-magnifying-glass");
  } else {
    // Open dropdown
    searchDropdown.style.visibility = "visible";
    setTimeout(() => {
      searchDropdown.style.top = "0";
      searchDropdown.style.opacity = "1";
    }, 10);

    // search se cross banado
    searchIcon.classList.remove("fa-magnifying-glass");
    searchIcon.classList.add("fa-xmark", "active");

  }


});

// bahar click ya scroll pe dropdown band ho
document.addEventListener("click", (e) => {
  if (searchDropdown.style.visibility === "visible" &&
      !searchDropdown.contains(e.target) &&
      e.target !== searchIcon) {
    searchDropdown.style.top = "-30%";
    searchDropdown.style.visibility = "hidden";
    searchDropdown.style.opacity = "0";

    searchIcon.classList.remove("fa-xmark", "active");
    searchIcon.classList.add("fa-magnifying-glass");
  }
  size()
});

window.addEventListener("scroll", () => {
  if (searchDropdown.style.visibility === "visible") {
    searchDropdown.style.top = "-30%";
    searchDropdown.style.visibility = "hidden";
    searchDropdown.style.opacity = "0";

    searchIcon.classList.remove("fa-xmark", "active");
    searchIcon.classList.add("fa-magnifying-glass");
  }
  size()
});

function updateSearchIconSize() {
  if (window.matchMedia("(min-width: 1450px)").matches) {
    if (searchIcon.classList.contains("fa-xmark")) {
      searchIcon.style.fontSize = "30px";
    } else if (searchIcon.classList.contains("fa-magnifying-glass")) {
      searchIcon.style.fontSize = "50px";
    }
  } else {
    // optional: chhoti screen ke liye reset size
    searchIcon.style.fontSize = "";
  }
}

// pehli dafa run karo
updateSearchIconSize();

// jab bhi resize ho run karo
window.addEventListener("resize", updateSearchIconSize);




// ✅ SIDEBAR
const menuBtn = document.getElementById("menuBtn");
const closeBtn2 = document.getElementById("closeBtn2");
const sidebar = document.getElementById("sidebar");

// open close toggle
menuBtn.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

// cross click pe band
closeBtn2.addEventListener("click", () => {
  sidebar.classList.remove("open");
});

// bahar click pe band
document.addEventListener("click", (e) => {
  if (sidebar.classList.contains("open") &&
      !sidebar.contains(e.target) &&
      e.target !== menuBtn) {
    sidebar.classList.remove("open");
  }
});

// scroll pe bhi band
window.addEventListener("scroll", () => {
  sidebar.classList.remove("open");
});

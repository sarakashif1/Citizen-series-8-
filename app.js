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

    items.forEach(item => {
      const header = item.querySelector(".accordion-header");
      header.addEventListener("click", () => {
        item.classList.toggle("active");

        // close others
        items.forEach(i => {
          if (i !== item) i.classList.remove("active");
        });
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
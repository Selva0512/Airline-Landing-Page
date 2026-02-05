// Carousel Functionality for Destinations Section
document.addEventListener("DOMContentLoaded", function () {
  const track = document.getElementById("carouselTrack");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  let currentPosition = 0;
  let cardWidth;
  let visibleCards;
  let totalCards;
  let isTransitioning = false;

  function cloneCards() {
    if (!track) return;

    const cards = Array.from(
      track.querySelectorAll(".destination-card:not(.clone)"),
    );
    totalCards = cards.length;

    // Clone cards at the beginning and end
    cards.forEach((card) => {
      const cloneStart = card.cloneNode(true);
      const cloneEnd = card.cloneNode(true);
      cloneStart.classList.add("clone");
      cloneEnd.classList.add("clone");
      track.insertBefore(cloneStart, track.firstChild);
      track.appendChild(cloneEnd);
    });

    // Set initial position to show original cards
    currentPosition = totalCards;
  }

  function updateCardWidth() {
    const card = document.querySelector(".destination-card");
    if (card) {
      cardWidth = card.offsetWidth + 24;

      if (window.innerWidth <= 640) {
        visibleCards = 1;
      } else if (window.innerWidth <= 968) {
        visibleCards = 2;
      } else {
        visibleCards = 3;
      }
    }
  }

  function updateCarousel(smooth = true) {
    if (track) {
      track.style.transition = smooth ? "transform 0.5s ease" : "none";
      track.style.transform = `translateX(-${currentPosition * cardWidth}px)`;
    }
  }

  function handleInfiniteScroll() {
    if (currentPosition >= totalCards * 2) {
      // Jump back to the start of original cards
      setTimeout(() => {
        isTransitioning = true;
        currentPosition = totalCards;
        updateCarousel(false);
        setTimeout(() => {
          isTransitioning = false;
        }, 50);
      }, 500);
    } else if (currentPosition <= 0) {
      // Jump to the end of original cards
      setTimeout(() => {
        isTransitioning = true;
        currentPosition = totalCards;
        updateCarousel(false);
        setTimeout(() => {
          isTransitioning = false;
        }, 50);
      }, 500);
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (isTransitioning) return;
      currentPosition--;
      updateCarousel();
      handleInfiniteScroll();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (isTransitioning) return;
      currentPosition++;
      updateCarousel();
      handleInfiniteScroll();
    });
  }

  cloneCards();
  updateCardWidth();
  updateCarousel(false);

  window.addEventListener("resize", () => {
    updateCardWidth();
    updateCarousel(false);
  });

  let autoScroll = setInterval(() => {
    if (!isTransitioning) {
      currentPosition++;
      updateCarousel();
      handleInfiniteScroll();
    }
  }, 3000);

  // Pause auto-scroll on hover
  const container = document.querySelector(".destinations-section");
  if (container) {
    container.addEventListener("mouseenter", () => {
      clearInterval(autoScroll);
    });

    container.addEventListener("mouseleave", () => {
      autoScroll = setInterval(() => {
        if (!isTransitioning) {
          currentPosition++;
          updateCarousel();
          handleInfiniteScroll();
        }
      }, 3000);
    });
  }
});
// about-content-2
document.addEventListener("DOMContentLoaded", function () {
  const blocks = document.querySelectorAll(
    ".about-block-1, .about-block-2, .about-block-3",
  );

  blocks.forEach((block) => {
    const button = block.querySelector(".btn");

    if (button) {
      button.addEventListener("click", function (e) {
        e.stopPropagation();

        // Add ripple effect
        const ripple = document.createElement("span");
        ripple.classList.add("ripple-effect");

        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ripple.style.left = x + "px";
        ripple.style.top = y + "px";

        button.appendChild(ripple);

        setTimeout(() => {
          ripple.remove();
        }, 600);

        console.log(
          "Learn More clicked for:",
          block.querySelector("h3").textContent,
        );
      });
    }
  });

  // Add animation on scroll
  const observerOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
      }
    });
  }, observerOptions);

  blocks.forEach((block) => {
    block.classList.add("fade-up");
    observer.observe(block);
  });
});

// contact form
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form data
  const formData = new FormData(this);
  const data = Object.fromEntries(formData);

  // Show success message (you can replace this with actual form submission)
  alert("Thank you for your message! We will get back to you soon.");

  // Reset form
  this.reset();
});

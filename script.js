document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".section");
  const scrollTopBtn = document.getElementById("scrollTop");
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImg");
  const counters = document.querySelectorAll(".counter");

  const fadeInSections = () => {
    sections.forEach((section) => {
      if (section.getBoundingClientRect().top < window.innerHeight - 100) {
        section.classList.add("show");
      }
    });
  };

  window.addEventListener("scroll", fadeInSections);
  fadeInSections();

  window.addEventListener("scroll", () => {
    if (window.scrollY > 275) {
      scrollTopBtn.style.display = "flex";
    } else {
      scrollTopBtn.style.display = "none";
    }
  });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  document.querySelectorAll(".section__image").forEach((img) => {
    img.addEventListener("click", (e) => {
      modal.style.display = "flex";
      modalImg.src = e.target.src;
    });
  });

  modal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  const animateCounters = () => {
    counters.forEach((counter) => {
      let target = +counter.getAttribute("data-target");
      let count = 0;
      let step = target / 100;
      
      const updateCount = () => {
        if (count < target) {
          count += step;
          counter.innerText = Math.ceil(count);
          requestAnimationFrame(updateCount);
        } else {
          counter.innerText = target;
        }
      };

      updateCount();
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters();
      }
    });
  });

  counters.forEach((counter) => observer.observe(counter));
});

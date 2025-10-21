const menuToggle = document.getElementById("menu-toggle");
const menuClose = document.getElementById("menu-close");
const mobileMenu = document.getElementById("mobile-menu");
const overlay = document.getElementById("overlay");
const navbar = document.getElementById("navbar");
const mobileLinks = document.querySelectorAll(".mobile-link");

// Open menu
menuToggle.addEventListener("click", () => {
  mobileMenu.classList.remove("translate-x-full");
  overlay.classList.remove("hidden");
});

// Close menu (button)
menuClose.addEventListener("click", () => {
  mobileMenu.classList.add("translate-x-full");
  overlay.classList.add("hidden");
});

// Close menu (overlay)
overlay.addEventListener("click", () => {
  mobileMenu.classList.add("translate-x-full");
  overlay.classList.add("hidden");
});

// Close menu when any link is clicked
mobileLinks.forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("translate-x-full");
    overlay.classList.add("hidden");
  });
});

// Change navbar bg on scroll
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("bg-black/70", "backdrop-blur-md", "shadow-md");
  } else {
    navbar.classList.remove("bg-black/70", "backdrop-blur-md", "shadow-md");
  }
});









document.addEventListener("DOMContentLoaded", function () {
  window.toggleFAQ = function (id) {
    const answer = document.getElementById("answer-" + id);
    const icon = document.getElementById("icon-" + id);

    if (answer.classList.contains("hidden")) {
      answer.classList.remove("hidden");
      icon.textContent = "−";
    } else {
      answer.classList.add("hidden");
      icon.textContent = "+";
    }
  };
});







document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();

      // Remove active from all links
      navLinks.forEach(l => l.classList.remove("border-b-2", "border-[#6c024d]", "font-bold"));

      // Add active to clicked link
      link.classList.add("border-b-2", "border-[#6c024d]", "font-bold");

      // Scroll to the section
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80, // adjust for navbar height
          behavior: "smooth"
        });
      }

      // Close mobile menu if open
      const mobileMenu = document.getElementById("mobile-menu");
      const overlay = document.getElementById("overlay");
      if (mobileMenu.classList.contains("translate-x-0")) {
        mobileMenu.classList.add("translate-x-full");
        mobileMenu.classList.remove("translate-x-0");
        overlay.classList.add("hidden");
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const animatedText = document.getElementById("animated-text");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateText(animatedText);
        observer.unobserve(animatedText);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(animatedText);

  function animateText(element) {
    const span = element.querySelector("span"); // static text
    const fullText = element.innerText;
    const staticText = span.innerText;
    const hiddenText = fullText.replace(staticText, "");

    let i = 0;
    function typeEffect() {
      if (i < hiddenText.length) {
        element.innerHTML = `<span>${staticText}</span>` + hiddenText.slice(0, i + 1);
        i++;
        setTimeout(typeEffect, 40);
      }
    }

    element.classList.add("revealed");
    typeEffect();
  }
});


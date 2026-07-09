async function loadComponent(selector, filePath) {
  const placeholder = document.querySelector(selector);

  if (!placeholder) return;

  try {
    const response = await fetch(filePath);

    if (!response.ok) {
      throw new Error(`Could not load ${filePath}`);
    }

    placeholder.innerHTML = await response.text();
  } catch (error) {
    console.error(error);
  }
}

function setupNavigation() {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
      });
    });
  }

  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navItems = document.querySelectorAll(".nav-links a");

  navItems.forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active-link");
    }
  });
}

async function initPage() {
  await loadComponent("#header-placeholder", "assets/includes/header.html");
  await loadComponent("#footer-placeholder", "assets/includes/footer.html");

  setupNavigation();
}

initPage();
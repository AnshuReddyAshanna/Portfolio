
document.addEventListener("DOMContentLoaded", () => {
  /* ========== MOBILE NAV (ASIDE) TOGGLE ========== */
  const navToggler = document.querySelector(".nav-toggler");
  const aside = document.querySelector(".aside");

  if (navToggler && aside) {
    navToggler.addEventListener("click", () => {
      aside.classList.toggle("open");
    });

    // close aside when clicking a nav link (mobile)
    document.querySelectorAll(".aside .nav a").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 1199) aside.classList.remove("open");
      });
    });
  }

  /* ========== PROJECT FILTER (BUTTONS) ========== */
  const filterWrap = document.querySelector(".project-filter-inner");
  const filterButtons = filterWrap
    ? Array.from(filterWrap.querySelectorAll("button[data-filter]"))
    : [];
  const projectItems = Array.from(
    document.querySelectorAll(".project-grid .project-item")
  );

  if (filterWrap && filterButtons.length && projectItems.length) {
    // Default: show all
    projectItems.forEach((item) => {
      item.classList.remove("hide");
      item.classList.add("show");
    });

    filterWrap.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-filter]");
      if (!btn) return;

      const filterValue = btn.getAttribute("data-filter"); 

      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      projectItems.forEach((item) => {
        const category = item.getAttribute("data-category");
        const match = filterValue === "all" || category === filterValue;

        if (match) {
          item.classList.remove("hide");
          item.classList.add("show");
        } else {
          item.classList.remove("show");
          item.classList.add("hide");

          const more = item.querySelector(".project-more");
          const readBtn = item.querySelector(".project-readmore");
          if (more && readBtn && !more.hasAttribute("hidden")) {
            more.setAttribute("hidden", "");
            readBtn.textContent = "Read More";
            readBtn.setAttribute("aria-expanded", "false");
          }
        }
      });
    });
  }

  /* ========== PROJECT READ MORE TOGGLE ========== */
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".project-readmore");
    if (!btn) return;

    const card = btn.closest(".project-card");
    const more = card.querySelector(".project-more");
    const isOpen = !more.hasAttribute("hidden");

    if (isOpen) {
      more.setAttribute("hidden", "");
      btn.textContent = "Read More";
      btn.setAttribute("aria-expanded", "false");
    } else {
      more.removeAttribute("hidden");
      btn.textContent = "Read Less";
      btn.setAttribute("aria-expanded", "true");
    }
  });
});

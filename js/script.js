/* ===================== Project Filter ===================== */
/* ===================== Project read-more toggles ===================== */
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".project-readmore");
  if (!btn) return;

  const card = btn.closest(".project-card");
  const more = card.querySelector(".project-more");
  const isOpen = !more.hasAttribute("hidden");

  if (isOpen) {
    more.setAttribute("hidden", "");
    btn.textContent = "Read more";
    btn.setAttribute("aria-expanded", "false");
  } else {
    more.removeAttribute("hidden");
    btn.textContent = "Read less";
    btn.setAttribute("aria-expanded", "true");
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const filterWrap = document.querySelector(".project-filter-inner");
  const filterButtons = document.querySelectorAll(".project-filter-inner button");
  const projects = document.querySelectorAll(".project-grid .project-item");

  if (!filterWrap || !filterButtons.length || !projects.length) return;

  // Default state: show all
  projects.forEach((item) => {
    item.classList.remove("hide");
    item.classList.add("show");
  });

  filterWrap.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-filter]");
    if (!btn) return;

    const filterValue = btn.getAttribute("data-filter"); // 'all' or category

    // Active button styling
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    // Filtering
    projects.forEach((item) => {
      const category = item.getAttribute("data-category");

      const match = (filterValue === "all") || (category === filterValue);

      if (match) {
        item.classList.remove("hide");
        item.classList.add("show");
      } else {
        item.classList.remove("show");
        item.classList.add("hide");

        // OPTIONAL: close read-more if it was open
        const more = item.querySelector(".project-more");
        const readBtn = item.querySelector(".project-readmore");
        if (more && readBtn && !more.hasAttribute("hidden")) {
          more.setAttribute("hidden", "");
          readBtn.textContent = "Read more";
          readBtn.setAttribute("aria-expanded", "false");
        }
      }
    });
  });
});


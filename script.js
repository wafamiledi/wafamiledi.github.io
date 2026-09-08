"use strict";
const menuButton = document.getElementById("hamburger");
const menu = document.getElementById("nav-links");
function setMenu(open, restoreFocus = false) {
  menu.classList.toggle("open", open);
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute(
    "aria-label",
    open ? "Fermer le menu" : "Ouvrir le menu",
  );
  if (restoreFocus) menuButton.focus();
}
menuButton.addEventListener("click", () =>
  setMenu(menuButton.getAttribute("aria-expanded") !== "true"),
);
menu
  .querySelectorAll("a")
  .forEach((link) => link.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    menuButton.getAttribute("aria-expanded") === "true"
  )
    setMenu(false, true);
});
document.addEventListener("click", (event) => {
  if (!event.target.closest(".nav-container")) setMenu(false);
});
document.addEventListener("focusin", (event) => {
  if (!event.target.closest(".nav-container")) setMenu(false);
});
window
  .matchMedia("(min-width: 851px)")
  .addEventListener("change", () => setMenu(false));
const navigationLinks = [...menu.querySelectorAll("a")];
const sections = [...document.querySelectorAll("main section[id]")];
let scrollPending = false;
function updateNavigation() {
  const active = sections
    .filter((section) => section.getBoundingClientRect().top <= 160)
    .at(-1);
  navigationLinks.forEach((link) => {
    if (active && link.hash === "#" + active.id)
      link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
  scrollPending = false;
}
window.addEventListener(
  "scroll",
  () => {
    if (!scrollPending) {
      scrollPending = true;
      requestAnimationFrame(updateNavigation);
    }
  },
  { passive: true },
);
updateNavigation();
document.getElementById("year").textContent = new Date().getFullYear();
const copyButton = document.getElementById("copy-email");
const copyStatus = document.getElementById("copy-status");
let copyTimer;
copyButton.addEventListener("click", async () => {
  clearTimeout(copyTimer);
  try {
    if (!navigator.clipboard) throw new Error("Clipboard unavailable");
    await navigator.clipboard.writeText("miledywafa@gmail.com");
    copyStatus.textContent = "Adresse e-mail copiée.";
  } catch {
    copyStatus.textContent = "Copiez cette adresse : miledywafa@gmail.com";
  }
  copyTimer = setTimeout(() => {
    copyStatus.textContent = "";
  }, 7000);
});

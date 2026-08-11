const nav = document.querySelector<HTMLElement>("[data-site-nav]");
const toggle = document.querySelector<HTMLButtonElement>("[data-mobile-menu-toggle]");
const menu = document.querySelector<HTMLElement>("[data-mobile-navigation]");
const openIcon = document.querySelector<HTMLElement>("[data-menu-open]");
const closedIcon = document.querySelector<HTMLElement>("[data-menu-closed]");

const openClasses = ["grid-rows-[1fr]", "opacity-100", "border-surface-200"];
const closedClasses = ["grid-rows-[0fr]", "opacity-0", "pointer-events-none", "border-transparent"];

function setMenu(open: boolean) {
  if (!toggle || !menu) return;
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  for (const className of openClasses) menu.classList.toggle(className, open);
  for (const className of closedClasses) menu.classList.toggle(className, !open);
  openIcon?.classList.toggle("hidden", !open);
  closedIcon?.classList.toggle("hidden", open);
}

function setScrolled() {
  if (!nav) return;
  const scrolled = window.scrollY > 20;
  nav.classList.toggle("bg-white/90", scrolled);
  nav.classList.toggle("backdrop-blur-md", scrolled);
  nav.classList.toggle("py-3", scrolled);
  nav.classList.toggle("border-surface-200", scrolled);
  nav.classList.toggle("shadow-sm", scrolled);
  nav.classList.toggle("bg-transparent", !scrolled);
  nav.classList.toggle("py-5", !scrolled);
  nav.classList.toggle("border-transparent", !scrolled);
}

toggle?.addEventListener("click", () => {
  setMenu(toggle.getAttribute("aria-expanded") !== "true");
});
window.addEventListener("scroll", setScrolled, { passive: true });
setMenu(false);
setScrolled();

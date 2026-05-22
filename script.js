const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

menuBtn.addEventListener("click", () => {
  menu.classList.toggle("ativo");
});

const linksMenu = document.querySelectorAll(".menu a");

linksMenu.forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("ativo");
  });
});

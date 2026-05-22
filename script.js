const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

if (menuBtn && menu) {
  menuBtn.addEventListener("click", () => {
    menu.classList.toggle("ativo");
  });
}

const linksMenu = document.querySelectorAll(".menu a");

linksMenu.forEach((link) => {
  link.addEventListener("click", () => {
    if (menu) {
      menu.classList.remove("ativo");
    }
  });
});

/* Esconde imagem quebrada dos parceiros para não aparecer texto duplicado */
const logosParceiros = document.querySelectorAll(".logo-parceiro");

logosParceiros.forEach((logo) => {
  logo.addEventListener("error", () => {
    logo.classList.add("erro-imagem");

    const areaLogo = logo.closest(".logo-parceiro-area");
    if (areaLogo) {
      areaLogo.classList.add("sem-imagem");
    }
  });
});

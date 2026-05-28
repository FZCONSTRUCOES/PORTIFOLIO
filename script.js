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

/* Esconde imagem quebrada dos parceiros para não aparecer texto */
const logosParceiros = document.querySelectorAll(".logo-parceiro");

logosParceiros.forEach((logo) => {
  logo.addEventListener("error", () => {
    logo.classList.add("erro-imagem");
    logo.removeAttribute("alt");
  });
});

/* Galeria de obras com ampliação */
const obraCards = document.querySelectorAll(".obra-card img");
const lightbox = document.getElementById("lightbox");
const lightboxImagem = document.getElementById("lightboxImagem");
const lightboxFechar = document.getElementById("lightboxFechar");

obraCards.forEach((imagem) => {
  imagem.addEventListener("click", () => {
    if (!lightbox || !lightboxImagem) return;

    lightboxImagem.src = imagem.src;
    lightboxImagem.alt = imagem.alt || "Imagem ampliada da obra";
    lightbox.classList.add("ativo");
    document.body.classList.add("sem-scroll");
  });
});

function fecharLightbox() {
  if (!lightbox || !lightboxImagem) return;

  lightbox.classList.remove("ativo");
  document.body.classList.remove("sem-scroll");
  lightboxImagem.src = "";
}

if (lightboxFechar) {
  lightboxFechar.addEventListener("click", fecharLightbox);
}

if (lightbox) {
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      fecharLightbox();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    fecharLightbox();
  }
});

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

/* Galeria de obras com ampliação, setas e contador */
const imagensObras = Array.from(document.querySelectorAll(".obra-card img"));
const lightbox = document.getElementById("lightbox");
const lightboxImagem = document.getElementById("lightboxImagem");
const lightboxFechar = document.getElementById("lightboxFechar");
const lightboxAnterior = document.getElementById("lightboxAnterior");
const lightboxProxima = document.getElementById("lightboxProxima");
const lightboxContador = document.getElementById("lightboxContador");

let indiceAtual = 0;

function atualizarLightbox() {
  if (!lightboxImagem || imagensObras.length === 0) return;

  const imagemAtual = imagensObras[indiceAtual];

  lightboxImagem.src = imagemAtual.src;
  lightboxImagem.alt = imagemAtual.alt || "Imagem ampliada da obra";

  if (lightboxContador) {
    lightboxContador.textContent = `${indiceAtual + 1} / ${imagensObras.length}`;
  }
}

function abrirLightbox(indice) {
  if (!lightbox || !lightboxImagem || imagensObras.length === 0) return;

  indiceAtual = indice;
  atualizarLightbox();

  lightbox.classList.add("ativo");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("sem-scroll");
}

function fecharLightbox() {
  if (!lightbox || !lightboxImagem) return;

  lightbox.classList.remove("ativo");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("sem-scroll");
  lightboxImagem.src = "";
}

function imagemAnterior() {
  if (imagensObras.length === 0) return;

  indiceAtual = indiceAtual === 0 ? imagensObras.length - 1 : indiceAtual - 1;
  atualizarLightbox();
}

function proximaImagem() {
  if (imagensObras.length === 0) return;

  indiceAtual = indiceAtual === imagensObras.length - 1 ? 0 : indiceAtual + 1;
  atualizarLightbox();
}

imagensObras.forEach((imagem, indice) => {
  imagem.addEventListener("click", () => {
    abrirLightbox(indice);
  });
});

if (lightboxFechar) {
  lightboxFechar.addEventListener("click", fecharLightbox);
}

if (lightboxAnterior) {
  lightboxAnterior.addEventListener("click", (event) => {
    event.stopPropagation();
    imagemAnterior();
  });
}

if (lightboxProxima) {
  lightboxProxima.addEventListener("click", (event) => {
    event.stopPropagation();
    proximaImagem();
  });
}

if (lightbox) {
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      fecharLightbox();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (!lightbox || !lightbox.classList.contains("ativo")) return;

  if (event.key === "Escape") {
    fecharLightbox();
  }

  if (event.key === "ArrowLeft") {
    imagemAnterior();
  }

  if (event.key === "ArrowRight") {
    proximaImagem();
  }
});

"use strict";

/* MENU RESPONSIVO */

const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

if (menuBtn && menu) {
  menuBtn.addEventListener("click", () => {
    const menuAberto = menu.classList.toggle("ativo");

    menuBtn.setAttribute(
      "aria-expanded",
      String(menuAberto)
    );
  });
}

const linksMenu = document.querySelectorAll(".menu a");

linksMenu.forEach((link) => {
  link.addEventListener("click", () => {
    if (!menu || !menuBtn) {
      return;
    }

    menu.classList.remove("ativo");
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

/* ESCONDE LOGOS QUE NÃO CARREGAREM */

const logosParceiros = document.querySelectorAll(".logo-parceiro");

logosParceiros.forEach((logo) => {
  logo.addEventListener("error", () => {
    logo.classList.add("erro-imagem");
  });
});

/* CARROSSEL DE OBRAS */

const imagensObras = [
  "assets/obras/obra-01.jpeg",
  "assets/obras/obra-02.jpeg",
  "assets/obras/obra-03.jpeg",
  "assets/obras/obra-04.jpeg",
  "assets/obras/obra-05.jpeg",
  "assets/obras/obra-06.jpeg",
  "assets/obras/obra-07.jpeg",
  "assets/obras/obra-08.jpeg",
  "assets/obras/obra-09.jpeg",
  "assets/obras/obra-10.jpeg",
  "assets/obras/obra-11.jpeg",
  "assets/obras/obra-12.jpeg",
  "assets/obras/obra-13.jpeg",
  "assets/obras/obra-14.jpeg",
  "assets/obras/obra-15.jpeg",
  "assets/obras/obra-16.jpeg",
  "assets/obras/obra-17.jpeg",
  "assets/obras/obra-18.jpeg",
  "assets/obras/obra-19.jpeg",
  "assets/obras/obra-20.jpeg",
  "assets/obras/obra-21.jpeg",
  "assets/obras/obra-22.jpeg",
  "assets/obras/obra-23.jpeg",
  "assets/obras/obra-24.jpeg",
  "assets/obras/obra-25.jpeg",
  "assets/obras/obra-26.jpeg"
];

const imagemObraAtual =
  document.getElementById("imagemObraAtual");

const contadorObras =
  document.getElementById("contadorObras");

const carrosselAnterior =
  document.getElementById("carrosselAnterior");

const carrosselProxima =
  document.getElementById("carrosselProxima");

const secaoPortfolio =
  document.getElementById("portfolio");

let indiceObraAtual = 0;
let trocaEmAndamento = false;

function criarTextoAlternativo(indice) {
  const numero = String(indice + 1).padStart(2, "0");

  return `Obra FZ Construções ${numero}`;
}

function atualizarContador() {
  if (!contadorObras) {
    return;
  }

  contadorObras.textContent =
    `${indiceObraAtual + 1} / ${imagensObras.length}`;
}

function trocarImagem(novoIndice) {
  if (
    !imagemObraAtual ||
    imagensObras.length === 0 ||
    trocaEmAndamento
  ) {
    return;
  }

  trocaEmAndamento = true;
  imagemObraAtual.classList.add("trocando");

  window.setTimeout(() => {
    indiceObraAtual = novoIndice;

    imagemObraAtual.src =
      imagensObras[indiceObraAtual];

    imagemObraAtual.alt =
      criarTextoAlternativo(indiceObraAtual);

    atualizarContador();

    imagemObraAtual.classList.remove("trocando");
    trocaEmAndamento = false;
  }, 180);
}

function mostrarAnterior() {
  const novoIndice =
    indiceObraAtual === 0
      ? imagensObras.length - 1
      : indiceObraAtual - 1;

  trocarImagem(novoIndice);
}

function mostrarProxima() {
  const novoIndice =
    indiceObraAtual === imagensObras.length - 1
      ? 0
      : indiceObraAtual + 1;

  trocarImagem(novoIndice);
}

if (carrosselAnterior) {
  carrosselAnterior.addEventListener(
    "click",
    mostrarAnterior
  );
}

if (carrosselProxima) {
  carrosselProxima.addEventListener(
    "click",
    mostrarProxima
  );
}

/* SETAS DO TECLADO FUNCIONAM QUANDO O PORTFÓLIO ESTÁ VISÍVEL */

document.addEventListener("keydown", (event) => {
  if (!secaoPortfolio) {
    return;
  }

  const limites =
    secaoPortfolio.getBoundingClientRect();

  const portfolioVisivel =
    limites.top < window.innerHeight &&
    limites.bottom > 0;

  if (!portfolioVisivel) {
    return;
  }

  if (event.key === "ArrowLeft") {
    mostrarAnterior();
  }

  if (event.key === "ArrowRight") {
    mostrarProxima();
  }
});

/* GESTOS LATERAIS NO CELULAR */

let toqueInicialX = 0;
let toqueFinalX = 0;

if (imagemObraAtual) {
  imagemObraAtual.addEventListener(
    "touchstart",
    (event) => {
      toqueInicialX =
        event.changedTouches[0].screenX;
    },
    {
      passive: true
    }
  );

  imagemObraAtual.addEventListener(
    "touchend",
    (event) => {
      toqueFinalX =
        event.changedTouches[0].screenX;

      const distancia =
        toqueFinalX - toqueInicialX;

      const distanciaMinima = 45;

      if (distancia > distanciaMinima) {
        mostrarAnterior();
      }

      if (distancia < -distanciaMinima) {
        mostrarProxima();
      }
    },
    {
      passive: true
    }
  );
}

/* PRÉ-CARREGA AS FOTOS PARA DEIXAR A TROCA MAIS RÁPIDA */

imagensObras.forEach((caminhoImagem) => {
  const imagem = new Image();
  imagem.src = caminhoImagem;
});

/* INICIALIZAÇÃO */

if (imagemObraAtual && imagensObras.length > 0) {
  imagemObraAtual.src = imagensObras[0];
  imagemObraAtual.alt = criarTextoAlternativo(0);
}

atualizarContador();
});

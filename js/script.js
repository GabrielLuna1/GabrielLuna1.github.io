//Menu Mobile

const btnMobile = document.getElementById("btn-mobile");

function toggleMenu(event) {
  if (event.type === "touchstart") event.preventDefault();
  const nav = document.getElementById("nav");
  nav.classList.toggle("active");
  const active = nav.classList.contains("active");
  event.currentTarget.setAttribute("aria-expanded", active);
  if (active) {
    event.currentTarget.setAttribute("aria-label", "Fechar Menu");
  } else {
    event.currentTarget.setAttribute("aria-label", "Abrir Menu");
  }
}

btnMobile.addEventListener("click", toggleMenu);
btnMobile.addEventListener("touchstart", toggleMenu);

// DROP-BOX

document.querySelectorAll(".skill-header").forEach((button) => {
  button.addEventListener("click", () => {
    const skillCard = button.parentElement;
    const isExpanded = button.getAttribute("aria-expanded") === "true";

    // Fecha todos os outros
    document.querySelectorAll(".skill-card").forEach((card) => {
      if (card !== skillCard) {
        card.classList.remove("active");
        card
          .querySelector(".skill-header")
          .setAttribute("aria-expanded", "false");
      }
    });

    // Alterna o atual
    skillCard.classList.toggle("active");
    button.setAttribute("aria-expanded", !isExpanded);
  });
});

// Anima os itens ao carregar
const skills = document.querySelectorAll(".skill-card");
skills.forEach((skill, index) => {
  setTimeout(() => {
    skill.style.opacity = "1";
    skill.style.transform = "translateY(0)";
  }, 100 * index);
});

// Seleciona o botão
const backToTopButton = document.getElementById("back-to-top");

// Mostra ou esconde o botão com base na posição do scroll
window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    backToTopButton.classList.add("visible");
  } else {
    backToTopButton.classList.remove("visible");
  }
});

// Animação de scroll suave ao clicar no botão
backToTopButton.addEventListener("click", () => {
  // Desativa o botão durante a animação para evitar múltiplos cliques
  backToTopButton.style.pointerEvents = "none";

  // Duração da animação (em milissegundos)
  const scrollDuration = 2000; // 2 segundos

  // Calcula a distância a ser percorrida
  const scrollHeight = window.scrollY;
  const scrollStep = -scrollHeight / (scrollDuration / 15); // Passo de scroll

  // Função de animação
  const scrollAnimation = setInterval(() => {
    if (window.scrollY !== 0) {
      window.scrollBy(0, scrollStep);
    } else {
      clearInterval(scrollAnimation); // Para a animação ao chegar ao topo
      backToTopButton.style.pointerEvents = "auto"; // Reativa o botão
    }
  }, 15); // Intervalo de atualização
});

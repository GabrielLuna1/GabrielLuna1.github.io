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

// chat bot

document.addEventListener("DOMContentLoaded", function () {
  // Elementos do DOM
  const toggleBot = document.getElementById("toggleBot");
  const chatBot = document.getElementById("chatBot");
  const closeChat = document.querySelector(".close-chat");
  const chatForm = document.getElementById("chatForm");
  const userInput = document.getElementById("userInput");
  const chatBox = document.getElementById("chatBox");
  const typingIndicator = document.querySelector(".typing-indicator");

  // Variáveis de estado
  let firstInteraction = true;
  let lastMessageTime = 0;
  const MESSAGE_RATE_LIMIT = 1000; // 1 segundo entre mensagens

  // Toggle do chat
  toggleBot.addEventListener("click", function () {
    const wasHidden = chatBot.classList.contains("hidden");
    chatBot.classList.toggle("hidden");
    chatBot.classList.toggle("visible");

    if (wasHidden && firstInteraction) {
      setTimeout(showWelcomeMessage, 500);
    }

    if (!wasHidden) {
      setTimeout(() => {
        userInput.focus();
      }, 300);
    }
  });

  // Fechar chat
  closeChat.addEventListener("click", function () {
    chatBot.classList.add("hidden");
    chatBot.classList.remove("visible");
  });

  // Enviar mensagem (com todas as novas validações)
  chatForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const message = userInput.value.trim();

    if (!validateMessage(message)) {
      return;
    }

    // Rate limiting
    const now = Date.now();
    if (now - lastMessageTime < MESSAGE_RATE_LIMIT) {
      addMessage(
        "Sistema",
        "Por favor, espere um momento antes de enviar outra mensagem."
      );
      return;
    }
    lastMessageTime = now;

    try {
      addMessage("Você", sanitize(message));
      userInput.value = "";
      typingIndicator.classList.remove("hidden");
      chatBox.scrollTop = chatBox.scrollHeight;

      setTimeout(() => {
        typingIndicator.classList.add("hidden");
        botResponse(message);
      }, 800);
    } catch (error) {
      console.error("Erro ao processar mensagem:", error);
      addMessage(
        "Sistema",
        "Ocorreu um erro ao processar sua mensagem. Tente novamente."
      );
    }
  });

  // Validação de mensagem
  function validateMessage(msg) {
    // Permite números de 1 a 8 como mensagem válida
    if (/^[1-8]$/.test(msg)) {
      return true;
    }

    // Mensagem vazia
    if (!msg || msg.trim().length === 0) {
      addMessage("Sistema", "Por favor, digite uma mensagem válida.");
      return false;
    }

    // Mensagem muito curta (exceto para números)
    if (msg.length < 2) {
      addMessage(
        "Sistema",
        "Mensagem muito curta. Por favor, escreva algo mais substantivo."
      );
      return false;
    }

    // Limite de caracteres
    if (msg.length > 300) {
      addMessage("Sistema", "Mensagem muito longa (máximo 50 caracteres).");
      return false;
    }

    // Padrões proibidos
    const prohibitedPatterns = [
      /<script.*?>.*?<\/script>/gi,
      /<.*?on\w+\s*=.*?>/gi,
      /javascript:/gi,
      /\n{3,}/gi,
      /http[s]?:\/\//gi,
      /[\uD800-\uDFFF]/g,
    ];

    if (prohibitedPatterns.some((regex) => regex.test(msg))) {
      addMessage("Sistema", "Mensagem contém conteúdo não permitido.");
      return false;
    }

    return true;
  }

  // Sanitização de mensagem (versão aprimorada)
  function sanitize(msg) {
    const temp = document.createElement("div");
    temp.textContent = msg;

    // Sanitização adicional para conteúdo HTML
    let sanitized = temp.innerHTML
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

    return sanitized;
  }

  // Sanitização de links nas respostas do bot
  function sanitizeLinks(text) {
    return text.replace(
      /<a href="(.*?)"/g,
      '<a href="$1" rel="noopener noreferrer nofollow" target="_blank"'
    );
  }

  // Função para adicionar mensagem (com tratamento de erro)
  function addMessage(sender, text) {
    try {
      const messageElement = document.createElement("div");
      messageElement.classList.add(
        "message",
        `${sender.toLowerCase()}-message`
      );

      // Sanitiza links apenas para mensagens do bot
      const processedText = sender === "Bot" ? sanitizeLinks(text) : text;

      messageElement.innerHTML = `<strong>${sender}:</strong> ${processedText}`;
      chatBox.appendChild(messageElement);
      chatBox.scrollTop = chatBox.scrollHeight;
    } catch (error) {
      console.error("Erro ao adicionar mensagem:", error);
      // Fallback seguro
      const fallbackElement = document.createElement("div");
      fallbackElement.classList.add("message", "system-message");
      fallbackElement.textContent = `${sender}: [Mensagem não pode ser exibida]`;
      chatBox.appendChild(fallbackElement);
    }
  }
  // Mensagem de boas-vindas
  function showWelcomeMessage() {
    const welcomeMessage = `
    👋 Olá! Eu sou o assistente deste portfólio.<br><br>

    Posso te ajudar com informações sobre:<br><br>

    1️⃣ <strong>O desenvolvedor</strong> (quem sou)<br>
    2️⃣ <strong>Formação</strong> (minha trajetória acadêmica)<br>
    3️⃣ <strong>Sobre este portfólio</strong> (como foi feito e objetivo)<br>
    4️⃣ <strong>Objetivos profissionais</strong> (minhas metas)<br>
    5️⃣ <strong>Estudos e cursos</strong> (o que tenho aprendido)<br>
    6️⃣ <strong>Habilidades e tecnologias</strong> (ferramentas que domino)<br>
    7️⃣ <strong>Idiomas</strong> (meu nível em línguas)<br>
    8️⃣ <strong>Contato</strong> (como falar comigo)<br><br>

    👉 <strong>Digite o número da opção que deseja saber mais!</strong>
    `;
    addMessage("Bot", welcomeMessage);
    firstInteraction = false;
  }

  // Resposta do bot - Versão Aprimorada
  function botResponse(msg) {
    msg = msg.toLowerCase().replace(/[.,?!]/g, "");
    let response = "";
    const horaAtual = new Date().getHours();
    const saudacaoHora =
      horaAtual < 12 ? "Bom dia" : horaAtual < 18 ? "Boa tarde" : "Boa noite";

    // 1. Saudações
    if (
      /^(oi|olá|ola|hello|e aí|ei|fala|salve|hey|hi|bom dia|boa tarde|boa noite)/i.test(
        msg
      )
    ) {
      const respostas = [
        `${saudacaoHora}! 😊 Posso te ajudar com informações sobre:<br><br>
        1️⃣ Quem é o dev do projeto<br>
        2️⃣ Formação acadêmica<br>
        3️⃣ Sobre esse Portfólio<br>
        4️⃣ Objetivo profissional<br>
        5️⃣ Estudos e cursos<br>
        6️⃣ Habilidades/Tecnologias<br>
        7️⃣ Idiomas e Proficiência<br>
        8️⃣ Como entrar em contato<br><br>

        Digite o número da opção que deseja!<br>
        `,
      ];
      response = respostas[Math.floor(Math.random() * respostas.length)];
    }

    // 2. Quem é o desenvolvedor (opção 1)
    else if (
      /(quem fez|quem criou|desenvolvedor web|desenvolvedor|1|Quem é o dev do projeto|quem desenvolveu|programador|dev|Gabriel|autor do site|criador do site|criador desse projeto|quem é o desenvolvedor|quem é o criador|quem programou isso|quem está por trás disso|quem codou isso|quem desenvolveu isso|quem é o autor|quem bolou isso|quem escreveu o código|quem montou o site|quem idealizou isso|quem tá por trás do projeto|quem é o dev|quem criou esse projeto|quem desenvolveu o site|quem é o programador)/i.test(
        msg
      )
    ) {
      response = `👨‍💻 <strong>1️⃣ Sobre Gabriel Luna</strong><br><br>
      • Desenvolvedor Web Júnior<br>
      • Apaixonado por tecnologia<br>
      • Focado em aprender React e TypeScript<br><br>
      <strong>Detalhes:</strong><br>
      • Formado em Análise e Desenvolvimento de Sistemas<br>
      • Experiência com projetos freelancer<br>
      • Constantemente aprendendo novas tecnologias<br><br>
      Digite <strong>2</strong> para saber sobre minha formação.`;
    }

    // 3. Formação acadêmica (opção 2)
    else if (
      /(formação|2|formação acadêmica|faculdade|universidade|você fez faculdade|você cursou o quê|qual sua formação|qual é sua formação|formado em quê|tem ensino superior|tem diploma|fez faculdade de quê|nível de escolaridade|qual curso superior você fez|curso de graduação|você tem graduação|formou em que área|estudou onde|onde estudou|qual|experiencia|Experiências e formação acadêmica| faculdade fez|faculdade cursada)/i.test(
        msg
      )
    ) {
      response = `🎓 <strong>2️⃣ Formação Acadêmica:</strong><br><br>
      • <strong>Tecnólogo em Análise e Desenvolvimento de Sistemas</strong><br>
      • Universidade de Mogi das Cruzes<br>
      • Concluído<br><br>
      • <strong>Cursos Complementares:</strong><br>
      • SQL Server (Faculdade Impacta)<br>
      • WordPress REST API<br>
      • Automação Front End com NPM<br><br>
      
      Digite <strong>5</strong> para saber sobre os cursos que estou fazendo.`;
    }

    // 4. Sobre o portfólio (opção 3)
    else if (
      /(3|portfólio|portfolio|Sobre esse Portfólio|Sobre esse Portifólio|site pessoal|site do dev|mostra seu portfólio|quero ver seu portfólio|página pessoal|projeto principal|link do portfólio|endereço do site)/i.test(
        msg
      )
    ) {
      response = `✨ <strong>3️⃣ Sobre este Portfólio:</strong><br><br>
        <strong>Tecnologias utilizadas:</strong><br>
        • HTML5 Semântico<br>
        • CSS3 Moderno (Variáveis, Grid)<br>
        • JavaScript<br>
        • Integração com GitHub<br><br>
        <strong>Destaques:</strong><br>
        • Design Responsivo<br>
        • Bot de Chat Interativo<br>
        • Performance Otimizada (90+ Lighthouse)<br><br>
        
        Digite <strong>4</strong> para saber sobre meu objetivo profissional.`;
    }

    // 5. Objetivo profissional (opção 4)
    else if (
      /(4|objetivo|objetivo profissional|vaga|vagas|trabalho|trabalhar com o quê|estágio|emprego|procura vaga|qual seu foco|área de atuação|busca por trabalho|meta profissional)/i.test(
        msg
      )
    ) {
      response = `🎯 <strong>4️⃣ Objetivo Atual:</strong><br><br>
        Busco oportunidade como <strong>Desenvolvedor Front-End Júnior</strong><br><br>
        • Desenvolver interfaces modernas e acessíveis<br>
        • Aprender com equipes experientes<br><br>
        <strong>Disponível para:</strong><br>
        • Oportunidades remotas<br>
        • Posições em São Paulo<br>
        • Posições júnior<br><br>
        
        Digite <strong>8</strong> para entrar em contato comigo!`;
    }

    // 6. Estudos e cursos (opção 5)
    else if (
      /(5|estudo|estudando| Gostaria de saber os cursos que estou fazendo?|Quer saber sobre minha formação e cursos|Gostaria de saber os cursos que estou fazendo|curso|cursando|o que você estuda|o que estuda|o que está estudando|quais cursos fez|quais cursos você fez|quais cursos está fazendo|está estudando o quê|está fazendo qual curso|faz algum curso|faz cursos de quê|quais são seus estudos|qual seu foco de estudo|aprendendo o quê|tá estudando o quê|tá fazendo curso de quê|cursos que concluiu|o que tem estudado|tem estudado o quê|o que você aprende)/i.test(
        msg
      )
    ) {
      response = `📘 <strong>5️⃣ Estudos Recentes:</strong><br><br>

      <strong>🚀 Front-end Moderno:</strong><br>
      • React (Hooks, Context API, Redux)<br>
      • TypeScript (Tipagem avançada)<br>
      • Next.js (SSR, SSG)<br>
      • Tailwind CSS<br>
      • Redux com React<br>
      • React com TypeScript<br>
      • CSS com SASS<br>
      • Vue.js 2<br>
      • Bootstrap 4<br>
      • WordPress REST API / WooCommerce / CMS<br>
      • Automação Front-End com NPM<br><br>
      
      <strong>📚 Cursos Concluídos:</strong><br>
      • HTML e CSS Origamid (46h)<br>
      • JavaScript ES6+ Origamid (25h)<br>
      • JavaScript e jQuery Origamid (9h)<br>
      • WordPress REST API Origamid (2h)<br>
      • WooCommerce CMS Origamid (10h)<br>
      • Bootstrap 4 Origamid<br>
      • UI Design Origamid (17h)<br>
      • Automação Front-End com NPM Origamid (4h)<br><br>
      
      <strong>📖 Em andamento:</strong><br>
      • React Completo Origamid (18h)<br>
      • Tailwind CSS Origamid (8h)<br>
      • TypeScript para Iniciantes Origamid (11h)<br>
      • Redux com React Origamid (8h)<br>
      • React com TypeScript Origamid (18h)<br>
      • CSS com SASS Origamid (6h)<br>
      • JavaScript e jQuery Origamid (9h)<br>
      • Vue.js 2 Completo Origamid (22h)<br><br>
      
      Digite <strong>6</strong> para saber sobre minhas habilidades.`;
    }

    // 7. Habilidades/Tecnologias (opção 6)
    else if (
      /(6|habilidade|habilidades|tecnologia|tecnologias|stack|skills|linguagens|linguagem de programação|ferramentas|o que você sabe usar|quais tecnologias você domina|com o que trabalha|o que você usa no dia a dia|tecnologias que usa|frameworks que você conhece)/i.test(
        msg
      )
    ) {
      response = `💻 <strong>6️⃣ Stack Tecnológico:</strong><br><br>
      <strong>Front-end Principal:</strong><br>
      • HTML5 Semântico<br>
      • CSS3 (Flexbox, Grid, Animations) <br>
      • JavaScript ES6+<br>
      • React.js (Hooks, Context API)(Em fase de aprendizado)<br><br>
      <strong>Ferramentas Diárias:</strong><br>
      • Git & GitHub<br>
      • VS Code<br>
      • Figma (UI Design)<br>
      • npm/yarn<br><br>
      <strong>Conhecimentos Adicionais:</strong><br>
      • TypeScript (Em fase de aprendizado)<br>
      • Next.js (Em fase de aprendizado)<br>
      • Tailwind CSS<br><br>
      
      Digite <strong>7</strong> para saber sobre meus idiomas.`;
    }

    // 8. Idiomas (opção 7)
    else if (
      /(7|idioma|idiomas|inglês|espanhol|Nível de Idioma|Idiomas e Proficiência|quais idiomas você fala|você fala inglês|você fala espanhol|sabe outros idiomas|quais línguas você fala|fala alguma língua além do português|fala inglês?|fala espanhol?|nível de inglês|nível de espanhol|fluente em inglês|fluente em espanhol|idiomas que domina|línguas que fala|fala quantos idiomas|conhece algum outro idioma)/i.test(
        msg
      )
    ) {
      response = `🌍 <strong>7️⃣ Idiomas:</strong><br><br>
      • <strong>Inglês</strong> - Intermediário<br>
      • Leitura técnica<br>
      • Compreensão auditiva intermediária<br><br>
      • <strong>Espanhol</strong> - Intermediário<br>
      • Conversação básica<br>
      • Compreensão e escrita boa<br><br>
      <em>Praticando diariamente com apps e conteúdo técnico</em><br><br>
      
      Digite <strong>8</strong> para saber como entrar em contato.`;
    }

    // 9. Contato (opção 8)
    else if (
      /(8|contato|email|e-mail|linkedin|github|telefone|redes sociais|como te acho|como entrar em contato|onde posso falar com você|me passa seu contato|contato do desenvolvedor|formas de contato)/i.test(
        msg
      )
    ) {
      response = `📞 <strong>8️⃣ Contatos Profissionais:</strong><br><br>
          • <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/gabriel-lunaa/" target="_blank">linkedin.com/in/gabriel-luna-dev</a><br><br>
          • <strong>GitHub:</strong> <a href="https://github.com/gabrielluna1" target="_blank">github.com/gabrielluna1</a><br><br>
          • <strong>Email:</strong> <a href="mailto:gabrielluna@gmail.com">gabrielluna@gmail.com</a><br><br>
          Fique à vontade para entrar em contato!<br><br>

          Digite <strong>1-8</strong> para acessar outras informações.`;
    }

    // 10. Identidade do bot
    else if (
      /(quem é você|quem é vc|você é|sua identidade|qual é a sua|quem é tu|quem é|quem tá aí|quem és tu|cê é quem|você é quem|qual é seu nome|qual é o seu nome|quem está falando|quem se apresenta|quem diabos é você|quem raios é você|qual o seu nome|quem é esse|quem se encontra aí|quem se encontra aqui|quem está aí|qual é sua identidade|como devo te chamar|posso saber quem é você|posso saber sua identidade)/i.test(
        msg
      )
    ) {
      response = `🤖 Sou um assistente virtual criado para apresentar o portfólio do Gabriel Luna!<br><br>
      Posso te ajudar com:<br><br>
      1️⃣ Quem é o dev do projeto<br>
      2️⃣ Formação acadêmica<br>
      3️⃣ Sobre esse Portfólio<br>
      4️⃣ Objetivo profissional<br>
      5️⃣ Estudos e cursos<br>
      6️⃣ Habilidades/Tecnologias<br>
      7️⃣ Idiomas e Proficiência<br>
      8️⃣ Como entrar em contato<br><br>
      Digite o número da opção desejada!`;
    }

    // 11. Finalidade do portfólio
    else if (
      /(para que serve|por que fez|sobre o projeto|qual o objetivo|qual é o objetivo|objetivo do site|qual o propósito|finalidade|propósito|por qual motivo criou|pra que isso|pra que serve isso|intenção do site|o que esse site faz|por que criou isso|qual a função disso|motivo da criação|pra que foi feito|o que esse projeto mostra|para que foi criado)/i.test(
        msg
      )
    ) {
      response = `🎯 <strong>Objetivo deste Portfólio:</strong><br><br>
      • Demonstrar habilidades técnicas<br>
      • Apresentar projetos reais<br>
      • Mostrar evolução profissional<br>
      • Facilitar o contato com oportunidades<br><br>
      <strong>Tecnologias usadas no portfólio:</strong><br>
      • HTML5, CSS3, JavaScript<br>
      • Design responsivo e acessível<br><br>
      Digite <strong>3</strong> para mais detalhes sobre o portfólio.`;
    }

    // 12. Projetos/Freelancer
    else if (
      /(projeto|projetos|freelancer|landing page|trabalho freelancer|trabalhos anteriores|já fez algum projeto|exemplos de projetos|portfólio prático|tem algum site publicado)/i.test(
        msg
      )
    ) {
      response = `🚀 <strong>Projetos Destacados:</strong><br><br>
      1. <strong>ESC Cursos</strong> (Freelancer)<br>
      • Landing page responsiva<br>
      • Performance otimizada<br>
      • SEO otimizado<br>
      🔗 <a href="https://esccursos.com.br" target="_blank">Visitar projeto</a><br><br>
      
      2. <strong>Portfólio Pessoal</strong><br>
      • Design original no Figma<br>
      • Performance otimizada<br>
      • 100% responsivo<br>
      🔗 <a href="https://gabrielluna1.github.io" target="_blank">Visitar portfólio</a><br><br>
      
      Digite <strong>6</strong> para saber sobre as tecnologias usadas.`;
    }

    // 13. Detalhes técnicos
    else if (
      /(detalhes técnicos|detalhes tecnicos|tecnicos|aspectos técnicos|tecnicalidades|implementação técnica)/i.test(
        msg
      )
    ) {
      response = `🔧 <strong>Detalhes Técnicos dos Projetos:</strong><br><br>
      <strong>ESC Cursos:</strong><br>
      • Arquitetura: HTML5, CSS3, JavaScript vanilla<br>
      • Features: Formulários com validação customizada<br>
      • Performance: 90+ no Lighthouse<br><br>
      
      <strong>Portfólio:</strong><br>
      • Design System próprio<br>
      • CSS modularizado<br>
      • JavaScript sem dependências<br>
      • Deploy no GitHub Pages<br><br>
      
      Digite <strong>6</strong> para saber sobre minhas habilidades.`;
    }

    // 14. Métodos de estudo
    else if (
      /(métodos de estudo|aprender|métodos para aprender|como você estuda|técnicas de estudo|como aprende|método de aprendizagem|rotina de estudos)/i.test(
        msg
      )
    ) {
      response = `📖 <strong>Métodos de Estudo:</strong><br><br>
      • <strong>Aprendizado Ativo:</strong> Construo projetos reais para aplicar conceitos<br>
      • <strong>Pomodoro:</strong> Sessões de 25-30 minutos com intervalos curtos<br>
      • <strong>Documentação:</strong> Anoto dúvidas e aprendizados no Obsidian<br>
      • <strong>Repetição Espaçada:</strong> Reviso conceitos periodicamente<br>
      <em>Uso combinação de cursos, documentação oficial e projetos práticos</em><br><br>
      
      Digite <strong>5</strong> para saber sobre meus cursos.`;
    }

    // 15. Como posso ajudar
    else if (
      /(como pode me ajudar|como você ajuda|Pode me Ajudar|pode me ajudar|o que você faz|qual sua função|pra que serve você|como funciona você|o que posso perguntar|como usar você|como te uso|o que você sabe fazer)/i.test(
        msg
      )
    ) {
      response = `🤖 <strong>Como posso te ajudar:</strong><br><br>
      Posso te ajudar com:<br><br>
      1️⃣ Quem é o dev do projeto<br>
      2️⃣ Formação acadêmica<br>
      3️⃣ Sobre esse Portfólio<br>
      4️⃣ Objetivo profissional<br>
      5️⃣ Estudos e cursos<br>
      6️⃣ Habilidades/Tecnologias<br>
      7️⃣ Idiomas e Proficiência<br>
      8️⃣ Como entrar em contato<br><br>
      Digite o número da opção desejada! 😊`;
    }

    // 16. Reações positivas
    else if (
      /(legal|massa|show|daora|da hora|top|bacana|maneiro|curti|gostei|ficou bom|muito bom|excelente|parabéns|ótimo trabalho|sensacional)/i.test(
        msg
      )
    ) {
      const respostas = [
        "Que bom que gostou! 😊",
        "Fico feliz com seu feedback!",
        "Obrigado!",
      ];
      response = respostas[Math.floor(Math.random() * respostas.length)];
    }

    // 17. Despedidas
    else if (
      /(tchau|adeus|até mais|flw|vlw|obrigado|obrigada|valeu|fui|bye|até logo|até a próxima|nos vemos|grato)/i.test(
        msg
      )
    ) {
      const respostas = [
        "Até logo! Foi um prazer conversar com você. 👋",
        "Tchau! Volte sempre que precisar. 😊",
        "Até mais! Estarei aqui se quiser conversar novamente.",
      ];
      response = respostas[Math.floor(Math.random() * respostas.length)];
    }

    // Mensagem padrão inteligente
    else {
      response = `🤔 <strong>Não entendi completamente.</strong> Posso te ajudar com:<br><br>
      1️⃣ Quem é o dev do projeto<br>
      2️⃣ Formação acadêmica<br>
      3️⃣ Sobre esse Portfólio<br>
      4️⃣ Objetivo profissional<br>
      5️⃣ Estudos e cursos<br>
      6️⃣ Habilidades/Tecnologias<br>
      7️⃣ Idiomas e Proficiência<br>
      8️⃣ Como entrar em contato<br><br>
      Digite o número da opção desejada!`;
    }

    addMessage("Bot", response);
  }

  // Focar no input quando o chat for aberto
  toggleBot.addEventListener("click", function () {
    setTimeout(() => {
      userInput.focus();
    }, 300);
  });
});

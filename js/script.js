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
  let firstInteraction = true;

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

  // Enviar mensagem
  chatForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const message = userInput.value.trim();

    if (validateMessage(message)) {
      addMessage("Você", sanitize(message));
      userInput.value = "";
      typingIndicator.classList.remove("hidden");
      chatBox.scrollTop = chatBox.scrollHeight;

      setTimeout(() => {
        typingIndicator.classList.add("hidden");
        botResponse(message);
      }, 800);
    }
  });

  // Validação de mensagem
  function validateMessage(msg) {
    if (!msg || msg.length > 300) return false; // Limite de caracteres
    const prohibitedPatterns = [
      /<script.*?>.*?<\/script>/gi,
      /<.*?on\w+\s*=.*?>/gi,
      /javascript:/gi,
      /\n{3,}/gi,
    ];
    return !prohibitedPatterns.some((regex) => regex.test(msg));
  }

  // Sanitização de mensagem
  function sanitize(msg) {
    const temp = document.createElement("div");
    temp.textContent = msg;
    return temp.innerHTML;
  }

  // Função para adicionar mensagem
  function addMessage(sender, text) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", `${sender.toLowerCase()}-message`);
    messageElement.innerHTML = `<strong>${sender}:</strong> ${text}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  // Mensagem de boas-vindas
  function showWelcomeMessage() {
    const welcomeMessage = `
  👋  Olá! Sou o assistente desse portfólio.
        Posso te ajudar com informações sobre<br><br>

          • Quem é o dev do projeto<br>
          • Formação acadêmica<br>
          • Sobre esse Portifólio<br>
          • Objetivo profissional<br>
          • Estudos e cursos<br>
          • Habilidades/Tecnologias<br>
          • Idiomas e Proficiência<br>
          • Como entrar em contato<br><br>

          Por favor, escreva uma das opções sugeridas<br>
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
        `${saudacaoHora}! 😊Posso te ajudar com informações sobre<br><br>
          • Quem é o dev do projeto<br>
          • Formação acadêmica<br>
          • Sobre esse Portfólio<br>
          • Objetivo profissional<br>
          • Estudos e cursos<br>
          • Habilidades/Tecnologias<br>
          • Idiomas e Proficiência<br>
          • Como entrar em contato<br><br>

        Por favor, escreva uma das opções sugeridas<br>
  `,
      ];
      response = respostas[Math.floor(Math.random() * respostas.length)];
    }

    // 2. Quem é o desenvolvedor
    else if (
      /(quem fez|quem criou|desenvolvedor web|desenvolvedor|Quem é o dev do projeto|quem desenvolveu|programador|dev|Gabriel|autor do site|criador do site|criador desse projeto|quem é o desenvolvedor|quem é o criador|quem programou isso|quem está por trás disso|quem codou isso|quem desenvolveu isso|quem é o autor|quem bolou isso|quem escreveu o código|quem montou o site|quem idealizou isso|quem tá por trás do projeto|quem é o dev|quem criou esse projeto|quem desenvolveu o site|quem é o programador)/i.test(
        msg
      )
    ) {
      response = `👨‍💻 Sobre Gabriel Luna<br><br>
      • Desenvolvedor Web Júnior<br>
      • Apaixonado por tecnologia<br>
      • Focado em aprender React e TypeScript<br><br>
      <strong>Detalhes:</strong><br>
      • Formado em Análise e Desenvolvimento de Sistemas<br>
      • Experiência com projetos freelancer<br>
      • Constantemente aprendendo novas tecnologias<br><br>
        Quer saber sobre minha formação?`;
    }

    // 3. Identidade do bot
    else if (
      /(quem é você|quem é vc|você é|sua identidade|qual é a sua|quem é tu|quem é|quem tá aí|quem és tu|cê é quem|você é quem|qual é seu nome|qual é o seu nome|quem está falando|quem se apresenta|quem diabos é você|quem raios é você|qual o seu nome|quem é esse|quem se encontra aí|quem se encontra aqui|quem está aí|qual é sua identidade|como devo te chamar|posso saber quem é você|posso saber sua identidade)/i.test(
        msg
      )
    ) {
      response = `🤖 Sou um assistente virtual criado para apresentar o portfólio do Gabriel Luna!<br><br>
      Posso te ajudar com informações sobre<br><br>
          • Quem é o dev do projeto<br>
          • Formação acadêmica<br>
          • Sobre esse Portifólio<br>
          • Objetivo profissional<br>
          • Estudos e cursos<br>
          • Habilidades/Tecnologias<br>
          • Idiomas e Proficiência<br>
          • Como entrar em contato<br><br>
`;
    }

    // 4. Finalidade do portfólio
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
      • Design responsivo e acessível`;
    }

    // 5. Estudos e cursos
    else if (
      /(estudo|estudando| Gostaria de saber os cursos que estou fazendo?|Quer saber sobre minha formação e cursos|Gostaria de saber os cursos que estou fazendo|curso|cursando|o que você estuda|o que estuda|o que está estudando|quais cursos fez|quais cursos você fez|quais cursos está fazendo|está estudando o quê|está fazendo qual curso|faz algum curso|faz cursos de quê|quais são seus estudos|qual seu foco de estudo|aprendendo o quê|tá estudando o quê|tá fazendo curso de quê|cursos que concluiu|o que tem estudado|tem estudado o quê|o que você aprende)/i.test(
        msg
      )
    ) {
      response = `📘 <strong>Estudos Recentes:</strong><br><br>

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
      
      Quer saber sobre meus métodos para aprender? 😉
      `;
    }

    // 6. Métodos de estudo
    else if (
      /(métodos de estudo|aprender|métodos para aprender|Quer saber sobre meus métodos para aprender?|como você estuda|técnicas de estudo|como aprende|método de aprendizagem|rotina de estudos)/i.test(
        msg
      )
    ) {
      response = `📖 <strong>Métodos de Estudo:</strong><br><br>
      • <strong>Aprendizado Ativo:</strong> Construo projetos reais para aplicar conceitos<br>
      • <strong>Pomodoro:</strong> Sessões de 25-30 minutos com intervalos curtos<br>
      • <strong>Documentação:</strong> Anoto dúvidas e aprendizados no Obsidian<br>
      • <strong>Repetição Espaçada:</strong> Reviso conceitos periodicamente<br>
      <em>Uso combinação de cursos, documentação oficial e projetos práticos</em><br><br>
      
      Gostaria de saber sobre meu Projeto Freelancer?     
      `;
    }

    // 7. Formação acadêmica
    else if (
      /(formação|formação acadêmica|Quer saber sobre minha formação?|faculdade|universidade|você fez faculdade|você cursou o quê|qual sua formação|qual é sua formação|formado em quê|tem ensino superior|tem diploma|fez faculdade de quê|nível de escolaridade|qual curso superior você fez|curso de graduação|você tem graduação|formou em que área|estudou onde|onde estudou|qual|experiencia|Experiências e formação acadêmica| faculdade fez|faculdade cursada)/i.test(
        msg
      )
    ) {
      response = `🎓 <strong>Formação Acadêmica:</strong><br><br>
      • <strong>Tecnólogo em Análise e Desenvolvimento de Sistemas</strong><br>
      • Universidade de Mogi das Cruzes<br>
      • Concluído<br><br>
      • <strong>Cursos Complementares:</strong><br>
      • SQL Server (Faculdade Impacta)<br>
      • WordPress REST API<br>
      • Automação Front End com NPM<br><br>
      
       Gostaria de saber os cursos que estou fazendo?<br>
      

      `;
    }

    // 8. Idiomas
    else if (
      /(idioma|idiomas|inglês|espanhol|Nível de Idioma|Idiomas e Proficiência|quais idiomas você fala|você fala inglês|você fala espanhol|sabe outros idiomas|quais línguas você fala|fala alguma língua além do português|fala inglês?|fala espanhol?|nível de inglês|nível de espanhol|fluente em inglês|fluente em espanhol|idiomas que domina|línguas que fala|fala quantos idiomas|conhece algum outro idioma)/i.test(
        msg
      )
    ) {
      response = `🌍 <strong>Idiomas:</strong><br><br>
      • <strong>Inglês</strong> - Intermediário<br>
      • Leitura técnica<br>
      • Compreensão auditiva intermediária<br><br>
      • <strong>Espanhol</strong> - Intermediário<br>
      • Conversação básica<br>
      • Compreensão e escrita boa<br><br>
      <em>Praticando diariamente com apps e conteúdo técnico</em><br><br>
      
      Quer saber sobre minhas habilidades?
      `;
    }

    // 9. Habilidades/Tecnologias
    else if (
      /(habilidade|Quer saber sobre minhas habilidades?|habilidades|tecnologia|tecnologias|stack|skills|linguagens|linguagem de programação|ferramentas|o que você sabe usar|quais tecnologias você domina|com o que trabalha|o que você usa no dia a dia|tecnologias que usa|frameworks que você conhece)/i.test(
        msg
      )
    ) {
      response = `💻 <strong>Stack Tecnológico:</strong><br><br>
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
      
      Gostaria de saber sobre esse portfólio?
      `;
    }

    // 10. Projetos/Freelancer
    else if (
      /(projeto|projetos|freelancer|Gostaria de saber sobre meu Projeto Freelancer?|Projeto Freelancer|landing page|trabalho freelancer|trabalhos anteriores|já fez algum projeto|exemplos de projetos|portfólio prático|tem algum site publicado)/i.test(
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
      
      Gostaria de saber sobre os detalhes técnicos?`;
    }

    // 12. Detalhes técnicos
    else if (
      /(detalhes técnicos|Gostaria de saber sobre os detalhes técnicos?|detalhes tecnicos|tecnicos|aspectos técnicos|tecnicalidades|implementação técnica)/i.test(
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
      
      Quer saber sobre minhas habilidades?`;
    }

    // 13. Portfólio
    else if (
      /(portfólio|portfolio|Sobre esse Portfólio|Sobre esse Portifólio|site pessoal|site do dev|mostra seu portfólio|quero ver seu portfólio|página pessoal|projeto principal|link do portfólio|endereço do site)/i.test(
        msg
      )
    ) {
      response = `✨ <strong>Sobre este Portfólio:</strong><br><br>
        <strong>Tecnologias utilizadas:</strong><br>
        • HTML5 Semântico<br>
        • CSS3 Moderno (Variáveis, Grid)<br>
        • JavaScript<br>
        • Integração com GitHub<br><br>
        <strong>Destaques:</strong><br>
        • Design Responsivo<br>
        • Bot de Chat Interativo<br>
        • Performance Otimizada (90+ Lighthouse)<br><br>
        
        Gostaria de saber sobre meu Objetivo profissional?
  `;
    }

    // 14. Objetivo profissional
    else if (
      /(objetivo|Gostaria de saber sobre meu Objetivo profissional|objetivo profissional|vaga|vagas|trabalho|trabalhar com o quê|estágio|emprego|procura vaga|qual seu foco|área de atuação|busca por trabalho|meta profissional)/i.test(
        msg
      )
    ) {
      response = `🎯 <strong>Objetivo Atual:</strong><br><br>
        Busco oportunidade como <strong>Desenvolvedor Front-End Júnior</strong><br><br>
        • Desenvolver interfaces modernas e acessíveis<br>
        • Aprender com equipes experientes<br><br>
        <strong>Disponível para:</strong><br>
        • Oportunidades remotas<br>
        • Posições em São Paulo<br>
        • Posições júnior<br><br>
        
        Entre em contato comigo!
      `;
    }

    // 15. Contato
    else if (
      /(contato|email|Entre em contato comigo|Como entro em contato com o Gabriel|e-mail|linkedin|github|telefone|redes sociais|como te acho|como entrar em contato|onde posso falar com você|me passa seu contato|contato do desenvolvedor|formas de contato)/i.test(
        msg
      )
    ) {
      response = `📞 Contatos Profissionais:<br><br>
          • <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/gabriel-lunaa/" target="_blank">linkedin.com/in/gabriel-luna-dev</a><br><br>
          • <strong>GitHub:</strong> <a href="https://github.com/gabrielluna1" target="_blank">github.com/gabrielluna1</a><br><br>
          • <strong>Email:</strong> <a href="mailto:gabrielluna@gmail.com">gabrielluna@gmail.com</a><br><br>
          Fique à vontade para entrar em contato!<br><br>

          Como posso te ajudar?

`;
    }

    // 16. Como posso ajudar
    else if (
      /(como pode me ajudar|Como posso te ajudar|como você ajuda|Pode me Ajudar|pode me ajudar|o que você faz|qual sua função|pra que serve você|como funciona você|o que posso perguntar|como usar você|como te uso|o que você sabe fazer)/i.test(
        msg
      )
    ) {
      response = `🤖 <strong>Como posso te ajudar:</strong><br><br>
      😊Posso te ajudar com informações sobre<br><br>
      
          • Quem é o dev do projeto<br>
          • Formação acadêmica<br>
          • Sobre esse Portifólio<br>
          • Objetivo profissional<br>
          • Estudos e cursos<br>
          • Habilidades/Tecnologias<br>
          • Idiomas e Proficiência<br>
          • Como entrar em contato<br><br>
      
      É só me perguntar sobre qualquer um desses tópicos! 😊`;
    }

    // 17. Reações positivas
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

    // 18. Despedidas
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
      response = `🤔 <strong>Não entendi completamente.</strong> Posso te ajudar com informações sobre<br><br>
          • Quem é o dev do projeto<br>
          • Formação acadêmica<br>
          • Sobre esse Portifólio<br>
          • Objetivo profissional<br>
          • Estudos e cursos<br>
          • Habilidades/Tecnologias<br>
          • Idiomas e Proficiência<br>
          • Como entrar em contato<br><br>

          Por favor, escreva uma das opções sugeridas<br>
      `;
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

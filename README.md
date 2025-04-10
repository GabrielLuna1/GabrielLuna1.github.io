# 🌌 Galactic Luna 🚀🌕

<h1 align="center">Landing Page com HTML, CSS e JavaScript ✨</h1>

Olá, Viajantes! 👨‍🚀

Criei essa Landing Page como parte do meu aprendizado em desenvolvimento web. Todo o layout foi desenhado por mim, desde a ideia até a implementação. Utilizei HTML, CSS e JavaScript puro para construir uma experiência bonita, responsiva e interativa.

---

## 🛠️ Tecnologias Utilizadas

<div style="display: inline_block">
  <img align="center" alt="GL-HTML" height="70" width="50" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg">
  <img align="center" alt="GL-CSS" height="70" width="50" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg">
  <img align="center" alt="GL-JS" height="70" width="50" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-plain.svg">
</div>

---

## ✨ Principais Funcionalidades

- 🎨 **Design próprio**: Layout 100% desenvolvido por mim.
- 🧩 **Ícones personalizados**: Utilizei recursos do Font Awesome e Flaticon para enriquecer a interface.
- ⚙️ **CSS otimizado**: Utilizei o `clean-css-cli` para minificar e melhorar o desempenho do CSS.
- 💬 **Chatbot interativo e seguro**: Um bot simples, porém com diversas proteções contra ataques.
- 📱 **Layout responsivo**: Adaptado para diferentes tamanhos de tela.

---

## 📈 Resultados no Lighthouse

A aplicação foi avaliada com ótimos resultados na auditoria do Lighthouse:

| Categoria         | Nota (%) |
|-------------------|----------|
| **Performance**   | 98       |
| **Accessibility** | 87       |
| **Best Practices**| 100      |
| **SEO**           | 100      |

Esses indicadores reforçam a qualidade do projeto em termos de velocidade, acessibilidade, boas práticas e visibilidade nos mecanismos de busca. 🚀

---


## 🔒 Validações de Segurança no Chatbot

A segurança é um dos pilares do meu projeto. Para garantir uma experiência protegida ao usuário, implementei diversas validações no chatbot com foco na **prevenção de ataques comuns** em aplicações web. Essas proteções foram pensadas para evitar a exploração de brechas e comportamentos maliciosos, garantindo uma interação segura, limpa e estável com o sistema.

> ⚠️ **Nota:** As validações de segurança implementadas neste projeto têm caráter **educativo**. Elas foram desenvolvidas como parte do meu **aprendizado em segurança web**. É importante ressaltar que **nenhum sistema está 100% seguro**.

> ⚠️ **Nota Importante:** Por se tratar de um projeto com fins educativos, **decidi exibir algumas proteções de segurança implementadas no chatbot**, mesmo sabendo que isso pode evidenciar possíveis brechas. Essa escolha foi feita com o objetivo de **aprender e compartilhar conhecimento**, reforçando que **em ambientes de produção, a exposição de detalhes técnicos deve ser cuidadosamente avaliada**.

---

## 🧨 Tipos de Ataques Bloqueados

| Tipo de Ataque                        | Como é Detectado                                      | Como é Bloqueado                                                                 |
|--------------------------------------|--------------------------------------------------------|----------------------------------------------------------------------------------|
| **XSS (Cross-Site Scripting)**       | Uso de `<script>` ou atributos como `onerror`         | Regex (`<script.*?>.*?<\/script>`, `on\w+=`) + `textContent` para sanitização    |
| **SQL Injection (SQLi)**             | Frases como `' OR 1=1 --`, `SELECT * FROM users`       | Regex para bloquear palavras-chave como `SELECT`, `INSERT`, `DELETE`            |
| **CSRF (Cross-Site Request Forgery)**| Formulários falsos vindos de sites externos           | Validação da origem e conteúdo das requisições                                  |
| **SSRF (Server-Side Request Forgery)**| URLs internas como `http://localhost/admin`           | Regex para bloquear padrões + filtro de IPs internos                            |
| **Command Injection**                | Comandos como `; rm -rf /`, `| cat /etc/passwd`        | Whitelist de caracteres permitidos                                              |
| **DoS (Denial of Service)**          | Envio contínuo de mensagens                           | Rate limit de 1 msg/segundo + cooldown de 5 min após 3 violações                |
| **Ataques Invisíveis (Unicode Zero-Width)** | Caracteres como `\u200B`                         | Regex específica: `[\u200B-\u200D\uFEFF]`                                        |
| **Template Injection**               | Expressões como `{{7*7}}`, `${exec('...')}`            | Whitelist de caracteres + bloqueio de padrões suspeitos                         |

---

## 🛡️ Proteções Extras

| Mecanismo                  | Protege Contra                          |
|---------------------------|-----------------------------------------|
| **Cooldown persistente**  | Tentativas de força bruta               |
| **Sanitização de links**  | Redirecionamentos maliciosos           |
| **Logs de segurança**     | Reconhecimento de padrões e auditoria   |

---

## 📦 Instalação

Para tornar o CSS mais leve e eficiente, utilizei o pacote [`clean-css-cli`](https://www.npmjs.com/package/clean-css-cli), que permite **minificar** e **combinar** arquivos CSS diretamente pelo terminal. Isso melhora o tempo de carregamento e a performance da aplicação.

---

## 🙏 Considerações Finais

Foi uma jornada desafiadora e muito gratificante desenvolver esse projeto! Cada parte foi pensada com cuidado — do design à segurança. Fico muito feliz com o resultado e estou aberto a sugestões para continuar melhorando.

---

## 📬 Contato

<div>
  <a href="mailto:gabriellunajob@gmail.com"><img src="https://img.shields.io/badge/-Gmail-%23333?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
  <a href="https://www.linkedin.com/in/gabriel-luna-14b00821b/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a>
</div><br>

---

![Image](https://github.com/user-attachments/assets/455ffe4d-2e98-47a4-a119-b3c8056952de)

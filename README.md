# Galactic Luna 🚀🌕

<h1 align="center">Landing Page com HTML, CSS e JavaScript ✨</h1>

Olá, Viajantes! 👨‍🚀

Criei essa Landing Page como parte do meu aprendizado em desenvolvimento web. Todo o layout foi desenhado por mim, desde a ideia até a implementação. Utilizei **HTML**, **CSS** e **JavaScript puro** para construir uma experiência bonita, responsiva e interativa.

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
- ⚙️ **Automação com Gulp**: Utilizei o Gulp.js para automatizar tarefas como minificação de CSS,
- 💬 **Chatbot interativo e seguro**: Um bot simples, porém com diversas proteções contra ataques.
- 📱 **Layout responsivo**: Adaptado para diferentes tamanhos de tela.

---

## ⚡ Automatização com Gulp

Para facilitar tarefas repetitivas durante o desenvolvimento, como minificação de arquivos, organização de pastas e recarregamento automático do navegador, utilizei o **Gulp**, um automator de tarefas JavaScript muito poderoso e flexível.

### Por que usei Gulp?

- 🔄 Automação de processos como minificação de CSS e JS.
- 🚀 Build mais rápida com organização eficiente de arquivos.
- 🔍 Melhor estrutura de projeto para manutenção e escalabilidade.
- 🔧 Scripts personalizados para limpeza, concatenação e otimização de arquivos.

Essa escolha tornou o fluxo de desenvolvimento mais fluido, garantindo produtividade e um código mais limpo e performático.

---

## 📈 Resultados no Lighthouse

| Categoria      | Nota (%) |
| -------------- | -------- |
| Performance    | 98       |
| Accessibility  | 87       |
| Best Practices | 100      |
| SEO            | 100      |

---

## 🔒 Validações de Segurança no Chatbot

A segurança é um dos pilares do meu projeto. Para garantir uma experiência protegida ao usuário, implementei diversas **validações no chatbot** com foco na prevenção de ataques comuns em aplicações web. Essas proteções foram pensadas para evitar a exploração de brechas e comportamentos maliciosos, garantindo uma interação segura, limpa e estável com o sistema.

> ⚠️ **Nota**: As validações de segurança implementadas neste projeto têm caráter educativo. Elas foram desenvolvidas como parte do meu aprendizado em segurança web.  
> ⚠️ **Nota Importante**: Por se tratar de um projeto com fins educativos, decidi exibir algumas proteções de segurança implementadas no chatbot, mesmo sabendo que isso pode evidenciar possíveis brechas. Essa escolha foi feita com o objetivo de aprender e compartilhar conhecimento, reforçando que em ambientes de produção, a exposição de detalhes técnicos deve ser cuidadosamente avaliada.

---

## 🧨 Tipos de Ataques Bloqueados

| Tipo de Ataque                 | Como é Detectado                                    | Como é Bloqueado                                                              |
| ------------------------------ | --------------------------------------------------- | ----------------------------------------------------------------------------- |
| **XSS (Cross-Site Scripting)** | Uso de `<script>` ou atributos como `onerror`       | Regex (`<script.*?>.*?<\/script>`, `on\w+=`) + `textContent` para sanitização |
| **SQL Injection (SQLi)**       | Frases como `' OR 1=1 --`, `SELECT * FROM users`    | Regex para bloquear palavras-chave como `SELECT`, `INSERT`, `DELETE`          |
| **CSRF**                       | Formulários falsos vindos de sites externos         | Validação da origem e conteúdo das requisições                                |
| **SSRF**                       | URLs internas como `http://localhost/admin`         | Regex para bloquear padrões + filtro de IPs internos                          |
| **Command Injection**          | Comandos como `; rm -rf /`, `` `cat /etc/passwd` `` | Regex e filtros personalizados                                                |
| **DoS (Denial of Service)**    | Envio contínuo de mensagens                         | Rate limit de 1 msg/segundo + cooldown de 5 min após 3 violações              |
| **Ataques Invisíveis**         | Caracteres como `\u200B`                            | Regex específica: `[\u200B-\u200D\uFEFF]`                                     |
| **Template Injection**         | Expressões como `{{7*7}}`, `${exec('...')}`         | Whitelist de caracteres + bloqueio de padrões suspeitos                       |

---

## 🛡️ Proteções Extras

| Mecanismo            | Protege Contra                        |
| -------------------- | ------------------------------------- |
| Cooldown persistente | Tentativas de força bruta             |
| Sanitização de links | Redirecionamentos maliciosos          |
| Logs de segurança    | Reconhecimento de padrões e auditoria |

---

## 📦 Instalação

Além do uso das tecnologias base (HTML, CSS, JS), configurei o Gulp com scripts para automatizar tarefas essenciais no build do projeto, como:

Minificação e concatenação de arquivos CSS e JS

Watch automático com recarregamento no navegador

Organização de diretórios para produção

---

## 🙏 Considerações Finais

Foi uma jornada desafiadora e muito gratificante desenvolver esse projeto!  
Cada parte foi pensada com cuidado, do design à segurança.  
Fico muito feliz com o resultado e estou aberto a sugestões para continuar melhorando.

---

## 📬 Contato

[![Gmail](https://img.shields.io/badge/-Gmail-%23333?style=for-the-badge&logo=gmail&logoColor=white)](mailto:gabriellunajob@gmail.com)
[![LinkedIn](https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/gabriel-luna-14b00821b/)

---

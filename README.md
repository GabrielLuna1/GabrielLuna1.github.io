
🌌 Galactic Luna 🚀🌕
<h1 style="text-align: center;">Landing Page com HTML, CSS e JavaScript ✨</h1>
Olá, Viajantes! 👨‍🚀

Criei essa Landing Page como parte do meu aprendizado em desenvolvimento web. Todo o layout foi desenhado por mim, desde a ideia até a implementação. Utilizei HTML, CSS e JavaScript puro para construir uma experiência bonita, responsiva e interativa.

🛠️ Tecnologias Utilizadas
<div style="display: inline_block"> <img align="center" alt="GL-HTML" height="70" width="50" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg"> <img align="center" alt="GL-CSS" height="70" width="50" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg"> <img align="center" alt="GL-JS" height="70" width="50" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-plain.svg"> </div>
✨ Principais Funcionalidades
🎨 Design próprio: Layout 100% desenvolvido por mim.

🧩 Ícones personalizados: Utilizei recursos do Font Awesome e Flaticon para enriquecer a interface.

⚙️ CSS otimizado: Utilizei o clean-css-cli para minificar e melhorar o desempenho do CSS.

💬 Chatbot interativo e seguro: Um bot simples, porém com diversas proteções contra ataques.

📱 Layout responsivo: Adaptado para diferentes tamanhos de tela.

🧠 Segurança no Chatbot: Validações implementadas
Me preocupei bastante com a segurança do chatbot, e implementei várias camadas de proteção contra ataques comuns. Abaixo estão os principais tipos de ameaças bloqueadas:

---


## 🔒 Validações de Segurança no Chatbot

A segurança é um dos pilares do meu projeto. Para garantir uma experiência protegida ao usuário, implementei diversas validações no chatbot com foco na **prevenção de ataques comuns** em aplicações web. Essas proteções foram pensadas para evitar a exploração de brechas e comportamentos maliciosos, garantindo uma interação segura, limpa e estável com o sistema.

Obviamente, como qualquer sistema em desenvolvimento, ainda podem existir brechas — este projeto foi construído como parte do meu aprendizado em segurança da informação. As validações implementadas são fruto de estudos e testes práticos para entender como mitigar vulnerabilidades comuns de forma eficiente.

Abaixo, apresento uma tabela com os principais **tipos de ataques bloqueados** e as técnicas utilizadas para detecção e neutralização.

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

📦 Instalação
bash
Copiar
Editar
npm install -g clean-css-cli
🚀 Como usar
bash
Copiar
Editar
cleancss -o style.min.css style.css
Esse processo ajudou a melhorar o carregamento da página e a organização do código.

🙏 Considerações Finais
Foi uma jornada desafiadora e muito gratificante desenvolver esse projeto! Cada parte foi pensada com cuidado — do design à segurança. Fico muito feliz com o resultado e estou aberto a sugestões para continuar melhorando.

📬 Contato
<div> <a href = "mailto:gabriellunajob@gmail.com"><img src="https://img.shields.io/badge/-Gmail-%23333?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a> <a href="https://www.linkedin.com/in/gabriel-luna-14b00821b/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a> </div><br>


---

![Image](https://github.com/user-attachments/assets/455ffe4d-2e98-47a4-a119-b3c8056952de)

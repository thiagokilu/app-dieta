# 🥗 App Dieta — Gerador de Dietas com IA

Um aplicativo completo que utiliza **Inteligência Artificial** para gerar planos alimentares personalizados com base nas informações do usuário.  
O sistema é composto por um **Frontend em Next Js** e um **Backend em Node.js/Fastify**, com integração a um modelo de IA para elaboração das dietas.

---

## 🚀 Funcionalidades

- 🧠 **Geração automática de dietas personalizadas** usando IA  
- 📊 Análise de dados do usuário (idade, peso, altura, objetivos, restrições alimentares)  
- 🍎 Sugestões balanceadas de refeições e calorias  
- 💾 Armazenamento local de planos e histórico  
- ⚡ Interface moderna e responsiva  
- 🔒 API segura e rápida construída com Fastify + TypeScript

---

## 🧩 Estrutura do Projeto

```
app-dieta/
├── Backend/           # API Node.js (Fastify + TypeScript)
│   ├── src/
│   │   ├── routes/    # Rotas (ex: /plan)
│   │   ├── agent.ts   # Integração com modelo de IA
│   │   ├── prompt.ts  # Prompt engineering
│   │   └── server.ts  # Inicialização do servidor
│   └── package.json
│
└── Frontend/web/      # Aplicação Web (Next Js)
    ├── src/
    ├── components/
    ├── pages/
    └── package.json
```

---

## ⚙️ Tecnologias Utilizadas

### Backend
- **Node.js**
- **Fastify**
- **TypeScript**
- **Zod** (validação)
- **Dotenv**
- ** Gemini API** (modelo de IA)

### Frontend
- **Next Js** com **TypeScript**
- **TailwindCSS / Shadcn UI**

---

## 🧠 Como Funciona

1. O usuário informa dados como peso, altura, idade, objetivo (ex: perder gordura, ganhar massa).  
2. O backend processa as informações e monta um **prompt personalizado** para a IA.  
3. A IA gera um plano alimentar detalhado (refeições, horários, calorias, observações).  
4. O frontend exibe o resultado de forma visual e organizada.  

---

## 🛠️ Como Rodar Localmente

### 1️⃣ Clonar o repositório
```bash
git clone https://github.com/thiagokilu/app-dieta.git
cd app-dieta
```

### 2️⃣ Instalar dependências do backend
```bash
cd Backend
npm install
```

### 3️⃣ Rodar o servidor backend
```bash
npm run dev
```

### 4️⃣ Rodar o frontend
```bash
cd ../Frontend/web
npm install
npm run dev
```

O app estará disponível em:
- 🌐 **Frontend:** http://localhost:5173  
- 🔗 **Backend API:** http://localhost:3333  

---

## 🧰 Variáveis de Ambiente

Crie um arquivo `.env` dentro da pasta `Backend/` com as chaves necessárias:

```env
PORT=3333
GOOGLE_API_KEY=your_api_key_here
```

---

## 📸 Preview (exemplo)

> Interface moderna e intuitiva com geração de planos em tempo real.

![preview](https://res.cloudinary.com/ds4ptms7d/image/upload/v1762794071/Captura_de_tela_de_2025-11-10_13-45-47_j9ofhy.png)
![preview](https://res.cloudinary.com/ds4ptms7d/image/upload/v1762794413/Captura_de_tela_de_2025-11-10_14-06-37_zpkc1e.png)

---

## 📄 Licença

Este projeto está sob a licença **MIT** — sinta-se livre para usar, modificar e contribuir!

---

## 💬 Autor

**Thiago Alexandre**  
🚀 Desenvolvedor Full Stack | IA • Next.js • Node.js  
🔗 [GitHub](https://github.com/thiagokilu)

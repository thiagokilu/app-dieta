// 🔄 Substitua estas importações
// import OpenAI from "openai";
// import { buildDocsSystemPrompt, buildSystemPrompt, buildUserPrompt } from "./prompt";

// 🚀 Pelas importações do Gemini
import { GoogleGenAI } from "@google/genai"; // Importa o SDK
import fs from "fs";
import {
  buildDocsSystemPrompt,
  buildSystemPrompt,
  buildUserPrompt,
} from "./prompt";
import type { DietPlanRequest } from "./types";

// 🔑 Inicializa o cliente Gemini
// Ele busca automaticamente a chave na variável de ambiente GEMINI_API_KEY
const ai = new GoogleGenAI({});

// ✅ Modelo recomendado para streaming e tarefas complexas/instrutivas
const MODEL_NAME = "gemini-2.5-flash";

export async function* generateDietPlan(input: DietPlanRequest) {
  const diretrizes = fs.readFileSync("knowledge/diretrizes.md", "utf-8");

  // O Gemini usa uma estrutura de array para os prompts de sistema e usuário.
  // As 'diretrizes' (seu segundo prompt 'system') devem ser unidas ao
  // prompt principal do sistema ou enviadas como parte do prompt do usuário.
  // Vou uni-las ao System Prompt principal para manter a intenção.

  const systemPrompt =
    buildSystemPrompt() +
    "\n\n--- DIRETRIZES ---\n\n" +
    buildDocsSystemPrompt(diretrizes);

  const userPrompt = buildUserPrompt(input);

  try {
    // ⚙️ Faz a chamada da API com o método 'generateContentStream'
    const responseStream = await ai.models.generateContentStream({
      model: MODEL_NAME,
      contents: [
        { role: "user", parts: [{ text: userPrompt }] }, // O conteúdo real
      ],
      config: {
        systemInstruction: systemPrompt, // Instrução principal de 'System'
        temperature: 0.6,
        // O Gemini não precisa de um parâmetro 'stream: true'
        // porque 'generateContentStream' já é streaming por padrão.
      },
    });

    // 📩 Itera sobre o stream e retorna o texto
    for await (const chunk of responseStream) {
      const delta = chunk.text;
      if (delta) yield delta;
    }
  } catch (error) {
    console.error("Erro ao gerar plano de dieta com Gemini:", error);
    // Você pode querer lançar ou ceder um erro aqui, dependendo da sua necessidade
  }
}

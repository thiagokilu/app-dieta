"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DietData } from "@/types/diet-data.types";
import { Sparkles } from "lucide-react";
import { useRef, useState } from "react";
import ReactMarkdown, { Components } from "react-markdown";

export default function DietGenerator({ data }: { data: DietData }) {
  const [output, setOutput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [loading, setLoading] = useState(false);
  const controllerRef = useRef<AbortController | null>(null);

  const markdownComponents: Components = {
    h2: ({ node, ...props }) => (
      <h2 className="text-xl font-bold text-green-600 my-1" {...props} />
    ),
    h1: ({ node, ...props }) => (
      <h1 className="text-2xl font-bold text-zinc-900 my-1" {...props} />
    ),
  };

  async function startStreaming() {
    const controller = new AbortController();
    controllerRef.current = controller;

    setOutput("");
    setIsStreaming(true);
    setLoading(true); // ✅ ativa o loading no início

    try {
      const response = await fetch("http://localhost:3333/plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        signal: controller.signal,
      });

      if (!response.ok || !response.body) {
        throw new Error("Erro ao conectar ao servidor");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        setOutput((prev) => prev + chunk);
      }
    } catch (err: any) {
      if (err.name === "AbortError") {
        console.log("Request cancelada");
      } else {
        console.error(err);
      }
    } finally {
      setIsStreaming(false);
      setLoading(false); // ✅ desativa no fim
      controllerRef.current = null;
    }
  }

  async function handleGenerate() {
    if (isStreaming) {
      controllerRef.current?.abort();
      setIsStreaming(false);
      setLoading(false);
      return;
    }

    await startStreaming();
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-4xl border-0 p-4 md:p-6">
        <div className="flex justify-center gap-4">
          <Button
            className="cursor-pointer gap-2"
            size="lg"
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? (
              <>
                <Sparkles className="w-5 h-5 animate-spin" />
                Gerando dieta...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Gerar dieta
              </>
            )}
          </Button>
        </div>

        <div className="bg-card rounded-lg p-6 border border-border max-h-[500px] overflow-auto mt-4">
          <div className="prose prose-sm max-w-none whitespace-pre-wrap">
            <ReactMarkdown components={markdownComponents}>
              {output}
            </ReactMarkdown>
          </div>
        </div>
      </Card>
    </div>
  );
}

import { GoogleGenAI, Type } from "@google/genai";
import { Quote } from '../types';

// Robust API Key retrieval for both Vite (Vercel) and local preview environments
const getApiKey = (): string | undefined => {
  // 1. Try Vite environment (import.meta.env)
  try {
    // @ts-ignore
    if (import.meta && import.meta.env && import.meta.env.VITE_API_KEY) {
      // @ts-ignore
      return import.meta.env.VITE_API_KEY;
    }
  } catch (e) {
    // Ignore errors in environments where import.meta is not supported
  }

  // 2. Try Node/Process environment (standard fallback)
  try {
    if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
      return process.env.API_KEY;
    }
  } catch (e) {
    // Ignore
  }

  return undefined;
};

export const apiKey = getApiKey();

// Initialize genAI only if key is present (handled gracefully in UI if missing)
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const generateInsight = async (authorName: string, authorStyle: string): Promise<Quote> => {
  if (!ai) {
    throw new Error("API Key missing");
  }

  try {
    const model = 'gemini-2.5-flash';
    
    const prompt = `请模仿${authorName}的哲学风格和语气，创作一句关于“自我认知”、“焦虑”或“生命意义”的简短格言（少于50字）。
    风格关键词：${authorStyle}。
    请直接返回JSON格式，包含 text (格言内容) 和 author (作者名)。不要包含 Markdown 标记。`;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            text: { type: Type.STRING },
            author: { type: Type.STRING },
          },
          required: ["text", "author"],
        }
      }
    });

    const result = JSON.parse(response.text || '{}');
    
    return {
      id: Date.now().toString(),
      text: result.text || "无法获取灵感，请重试。",
      author: result.author || authorName,
      isGenerated: true,
      source: 'AI 生成灵感'
    };

  } catch (error) {
    console.error("Error generating insight:", error);
    throw error;
  }
};
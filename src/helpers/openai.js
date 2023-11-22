import OpenAI from "openai";

export const openai = new OpenAI();

const createConfig = {
  model: "gpt-4",
  temperature: 0,
  max_tokens: 1024,
  stream: true,
  n: 1,
};

export const explainCode = async (code) => {
  const response = await openai.chat.completions.create({
    ...createConfig,
    messages: [
      { role: "system", content: "Explain the given code." },
      { role: "user", content: code },
    ],
  });
  return response;
};

export const debugCode = async (code) => {
  const response = await openai.chat.completions.create({
    ...createConfig,
    messages: [
      { role: "system", content: "Debug the given code." },
      { role: "user", content: code },
    ],
  });
  return response;
};

// src/bot/types.ts
export type Sender = "user" | "robot";

export type ChatMessage = {
  id: string;
  message: string;
  sender: Sender;
};

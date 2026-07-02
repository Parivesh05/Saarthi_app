export type BotMessageType = 'text' | 'question' | 'closing';

/** A single bubble item returned in the API messages array */
export interface BotMessageItem {
  type: BotMessageType;
  content: string;
  delay_ms: number;
}

/** UI representation of a chat bubble in the message list */
export type ChatMessage = {
  id: string;
  text: string;
  time: string;
  isSent: boolean;
  isError?: boolean;
  messageType?: BotMessageType;
  isDistress?: boolean;
};

export interface ChatRequest {
  message: string;
  user_id: string;
  is_first_message: boolean;
}

/** New response contract — messages array replaces flat response + followup_question */
export interface ChatResponse {
  messages: BotMessageItem[];
  is_distress: boolean;
}

/** Voice endpoint response — same messages contract plus transcript */
export interface TranscribeResponse {
  transcript: string;
  messages: BotMessageItem[];
  is_distress: boolean;
}

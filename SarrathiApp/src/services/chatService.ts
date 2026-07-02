import axios, { AxiosError } from 'axios';
import { API_ENDPOINTS } from 'src/constants/api/api.constant';
import { AppConfig } from 'src/config/env.config';
import { ChatRequest, ChatResponse } from 'src/interface/Chat/chat.interface';

const chatClient = axios.create({
  baseURL: AppConfig.CHAT_API_BASE_URL,
  timeout: AppConfig.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    client_id: AppConfig.CHAT_CLIENT_ID,
  },
});

export const chatService = {
  sendMessage: async (payload: ChatRequest): Promise<ChatResponse> => {
    const response = await chatClient.post<ChatResponse>(
      API_ENDPOINTS.CHAT.SEND,
      payload,
    );
    return response.data;
  },
};

export const getChatErrorMessage = (err: unknown) => {
  const error = err as AxiosError<{ message?: string; detail?: string }>;
  return (
    error.response?.data?.message ||
    error.response?.data?.detail ||
    error.message ||
    'Unable to send message. Please try again.'
  );
};

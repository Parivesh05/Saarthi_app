import { ChatMessage } from "src/interface/Chat/chat.interface";

export type Message = ChatMessage;

export const CHAT_MESSAGES: Message[] = [
  {
    id: "1",
    text: "Hi there! 👋 I'm Ubudy, your mental wellness companion. How are you feeling today?",
    time: "9:00 AM",
    isSent: false,
  },
  {
    id: "2",
    text: "Hey! I've been feeling a little anxious lately. Not sure why.",
    time: "9:01 AM",
    isSent: true,
  },
  {
    id: "3",
    text: "I hear you. It's completely okay to feel that way. Can you tell me a bit more about when it usually happens?",
    time: "9:01 AM",
    isSent: false,
  },
  {
    id: "4",
    text: "Mostly in the mornings, before I start my day. overthinking everything.",
    time: "9:02 AM",
    isSent: true,
  },
  {
    id: "5",
    text: "Morning anxiety from overthinking is very common! 😊 One helpful technique is the 5-4-3-2-1 grounding method. Would you like to try it?",
    time: "9:03 AM",
    isSent: false,
  },
  {
    id: "6",
    text: "Yes, please! I'd love to try something new.",
    time: "9:03 AM",
    isSent: true,
  },
  {
    id: "7",
    text: "Great! Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste. This brings you back to the present moment. 🌿",
    time: "9:04 AM",
    isSent: false,
  },
  {
    id: "8",
    text: "Wow, that actually sounds really simple. I'll give it a shot tomorrow morning!",
    time: "9:05 AM",
    isSent: true,
  },
  {
    id: "9",
    text: "You've got this! 💪 Remember, small steps every day make a big difference. I'm always here if you need to talk.",
    time: "9:05 AM",
    isSent: false,
  },
];

export const CHAT_USER = {
  name: "Ubudy AI",
  subtitle: "Your wellness companion",
  avatar: "https://cdn-icons-png.flaticon.com/512/9374/9374926.png",
  isOnline: true,
};

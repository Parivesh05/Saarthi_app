export type MoodEntry = {
  id: string;
  mood: string;
  emoji: string;
  value: number; // 1=Awful, 2=Bad, 3=Okay, 4=Good, 5=Great
  note: string;
  date: string;
  time: string;
  color: string;
};

export const MOOD_OPTIONS = [
  { mood: "Great",  emoji: "😍", value: 5, color: "#22C55E", bg: "#DCFCE7" },
  { mood: "Good",   emoji: "😊", value: 4, color: "#3B82F6", bg: "#DBEAFE" },
  { mood: "Okay",   emoji: "😐", value: 3, color: "#F59E0B", bg: "#FEF3C7" },
  { mood: "Bad",    emoji: "😟", value: 2, color: "#F97316", bg: "#FFEDD5" },
  { mood: "Awful",  emoji: "😢", value: 1, color: "#EF4444", bg: "#FEE2E2" },
];

export const MOOD_HISTORY: MoodEntry[] = [
  { id: "1", mood: "Great",  emoji: "😍", value: 5, note: "Had a wonderful morning walk and felt super energized!",         date: "Today",      time: "8:30 AM",  color: "#22C55E" },
  { id: "2", mood: "Good",   emoji: "😊", value: 4, note: "Work went smoothly, finished all my tasks.",                     date: "Today",      time: "3:00 PM",  color: "#3B82F6" },
  { id: "3", mood: "Okay",   emoji: "😐", value: 3, note: "Feeling a bit tired but managing fine.",                         date: "Yesterday",  time: "9:00 AM",  color: "#F59E0B" },
  { id: "4", mood: "Good",   emoji: "😊", value: 4, note: "Caught up with an old friend, made me happy.",                   date: "Yesterday",  time: "7:00 PM",  color: "#3B82F6" },
  { id: "5", mood: "Bad",    emoji: "😟", value: 2, note: "Stressful meeting at work, felt overwhelmed.",                   date: "Mon, Feb 27","time": "11:00 AM", color: "#F97316" },
  { id: "6", mood: "Awful",  emoji: "😢", value: 1, note: "Couldn't sleep well, anxious about upcoming deadlines.",        date: "Sun, Feb 26","time": "7:00 AM",  color: "#EF4444" },
  { id: "7", mood: "Okay",   emoji: "😐", value: 3, note: "Rest day, did some reading and meditation.",                    date: "Sat, Feb 25","time": "10:00 AM", color: "#F59E0B" },
];

// Weekly chart data (Mon → Sun)
export const WEEKLY_MOOD = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [{ data: [2, 3, 4, 3, 5, 3, 4] }],
};

export const MOOD_STATS = {
  streak: 7,
  avgMood: "Good",
  avgEmoji: "😊",
  totalLogs: 24,
};

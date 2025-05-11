export const BASE_URL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_API_BASE_URL
    : "/api";

export const MOCKUP_URL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_API_MOCKUP_URL
    : "/api";

export const CHAT_URL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_CHATBOT_URL
    : "/api";

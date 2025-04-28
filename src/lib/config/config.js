export const BASE_URL =
  import.meta.env.MODE === "development"
    ? import.meta.env.CHATBOT_BASE_URL
    : "/api";

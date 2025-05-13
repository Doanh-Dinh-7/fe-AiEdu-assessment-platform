import { BASE_URL, MOCKUP_URL, CHAT_URL } from "../config/config";
import { checkResponse } from "./jwt";

export const getQuestionList = async (MaChuong) => {
  try {
    const res = await fetch(CHAT_URL + "/topic/exam/" + MaChuong, {
      method: "GET", // Nếu API cần gửi dữ liệu, hãy đặt method GET
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await checkResponse(res);

    return data;
  } catch (error) {
    console.log("Lỗi khi lấy danh sách câu hỏi:", error);
  }
};

export const createQuestion = async (MaChuong, questionData) => {
  try {
    const res = await fetch(CHAT_URL + "/topic/" + MaChuong + "/save", {
      method: "POST", // Nếu API cần gửi dữ liệu, hãy đặt method GET
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(questionData),
    });
    const data = await checkResponse(res);

    return data;
  } catch (error) {
    console.log("Lỗi khi lấy tạo câu hỏi:", error);
  }
};

export const getQuestionSuggestion = async (
  MaHocPhan,
  MaChuong,
  questionData
) => {
  try {
    const res = await fetch(
      CHAT_URL +
        "/chatbot/generate_bot_question/" +
        MaHocPhan +
        "_" +
        MaChuong,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(questionData),
        credentials: "include",
      }
    );
    const data = await checkResponse(res);
    return data;
  } catch (error) {
    console.log("Lỗi khi lấy gợi ý câu hỏi:", error);
  }
};

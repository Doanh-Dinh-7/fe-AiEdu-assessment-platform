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
      CHAT_URL + "/chatbot/generate_bot_question/" + MaHocPhan + "_" + MaChuong,
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

export const deleteQuestion = async (MaCauHoi) => {
  try {
    const res = await fetch(CHAT_URL + "/topic/exam/" + MaCauHoi, {
      method: "DELETE", // Nếu API cần gửi dữ liệu, hãy đặt method GET
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await checkResponse(res);

    return data;
  } catch (error) {
    console.log("Lỗi khi xóa câu hỏi:", error);
  }
};

export const updateQuestion = async (MaCauHoi, questionData) => {
  try {
    const res = await fetch(CHAT_URL + "/topic/question/" + MaCauHoi, {
      method: "PATCH", // Nếu API cần gửi dữ liệu, hãy đặt method PATCH
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(questionData),
    });
    const data = await checkResponse(res);

    return data;
  } catch (error) {
    console.log("Lỗi khi cập nhật câu hỏi:", error);
  }
};

export const updateAnswer = async (MaDapAn, questionData) => {
  try {
    const res = await fetch(CHAT_URL + "/topic/answer/" + MaDapAn, {
      method: "PATCH", // Nếu API cần gửi dữ liệu, hãy đặt method PATCH
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(questionData),
    });
    const data = await checkResponse(res);

    return data;
  } catch (error) {
    console.log("Lỗi khi cập nhật câu hỏi:", error);
  }
};

export const updateIdeas = async (MaYChinh, questionData) => {
  try {
    const res = await fetch(CHAT_URL + "/topic/answer_detail/" + MaYChinh, {
      method: "PATCH", // Nếu API cần gửi dữ liệu, hãy đặt method PATCH
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(questionData),
    });
    const data = await checkResponse(res);

    return data;
  } catch (error) {
    console.log("Lỗi khi cập nhật câu hỏi:", error);
  }
};

export const updateSubQnA = async (MaCauBoSung, questionData) => {
  try {
    const res = await fetch(
      CHAT_URL + "/topic/supplementary_info/" + MaCauBoSung,
      {
        method: "PATCH", // Nếu API cần gửi dữ liệu, hãy đặt method PATCH
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(questionData),
      }
    );
    const data = await checkResponse(res);

    return data;
  } catch (error) {
    console.log("Lỗi khi cập nhật câu hỏi:", error);
  }
};

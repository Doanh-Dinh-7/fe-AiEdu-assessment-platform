import { BASE_URL, MOCKUP_URL, CHAT_URL } from "../config/config";
import { checkResponse } from "./jwt";

export const getExamTakingDetail = async (MaCuocThi) => {
  try {
    const res = await fetch(CHAT_URL + `/exam/process/${MaCuocThi}/start`, {
      method: "GET", // Nếu API cần gửi dữ liệu, hãy đặt method GET
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await checkResponse(res);

    return data.data;
  } catch (error) {
    console.log("Lỗi khi bắt đầu cuộc thi:", error);
  }
};

// sài URL MOCKUP
export const checkAnswerExamTaking = async (MaCuocThi, answerData) => {
  try {
    const res = await fetch(CHAT_URL + `/exam/process/${MaCuocThi}/answer`, {
      method: "POST", // Nếu API cần gửi dữ liệu, hãy đặt method POST
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(answerData),
    });
    const data = await checkResponse(res);

    return data.data;
  } catch (error) {
    console.log("Lỗi khi xử lý đáp án cuộc thi:", error);
  }
};

// sài URL MOCKUP
export const finishedExamTaking = async (MaCuocThi) => {
  try {
    const res = await fetch(
      CHAT_URL + `/exam/process/${MaCuocThi}/complete`,
      {
        method: "POST", // Nếu API cần gửi dữ liệu, hãy đặt method POST
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    const data = await checkResponse(res);

    return data.data;
  } catch (error) {
    console.log("Lỗi khi hoàn thành cuộc thi:", error);
  }
};

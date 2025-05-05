import { BASE_URL, MOCKUP_URL } from "../config/config";
import { checkResponse } from "./jwt";

export const getExamPracticeDetail = async (MaCuocThi) => {
  try {
    const res = await fetch(
      BASE_URL + `/pratice/bat-dau-luyen-thi/` + MaCuocThi,
      {
        method: "GET", // Nếu API cần gửi dữ liệu, hãy đặt method GET
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    const data = await checkResponse(res);

    return data;
  } catch (error) {
    console.log("Lỗi khi bắt đầu luyện thi:", error);
  }
};
// sài URL MOCKUP
export const checkAnswerExamPractice = async (MaLuyenThi, answerData) => {
  try {
    const res = await fetch(
      MOCKUP_URL + `/pratice/xu-ly-cau-tra-loi-luyen-thi/` + MaLuyenThi,
      {
        method: "POST", // Nếu API cần gửi dữ liệu, hãy đặt method POST
        headers: {
          "Content-Type": "application/json",
        },
        // credentials: "include",
        body: JSON.stringify(answerData),
      }
    );
    const data = await checkResponse(res);

    return data.data;
  } catch (error) {
    console.log("Lỗi khi xử lý đáp án luyện thi:", error);
  }
};

// sài URL MOCKUP
export const finishedExamPractice = async (MaLuyenThi) => {
  try {
    const res = await fetch(
      MOCKUP_URL + `/pratice/ket-thuc-phien-luyen-thi/` + MaLuyenThi,
      {
        method: "GET", // Nếu API cần gửi dữ liệu, hãy đặt method GET
        headers: {
          "Content-Type": "application/json",
        },
        // credentials: "include",
      }
    );
    const data = await checkResponse(res);

    return data;
  } catch (error) {
    console.log("Lỗi khi kết thúc luyện thi:", error);
  }
};

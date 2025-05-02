import { BASE_URL } from "../config/config";
import { checkResponse } from "./jwt";

export const getExamsStudentList = async () => {
  try {
    const res = await fetch(BASE_URL + "/exam/sv", {
      method: "GET", // Nếu API cần gửi dữ liệu, hãy đặt method GET
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await checkResponse(res);

    return data.data;
  } catch (error) {
    console.log("Lỗi khi lấy danh sách cuộc thi:", error);
  }
};
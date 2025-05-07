import { BASE_URL, MOCKUP_URL } from "../config/config";
import { checkResponse } from "./jwt";

export const speechToText = async (MaCuocThi) => {
    try {
      const res = await fetch(BASE_URL + "/audio/" + MaCuocThi , {
        method: "POST", // Nếu API cần gửi dữ liệu, hãy đặt method GET
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await checkResponse(res);
  
      return data;
    } catch (error) {
      console.log("Lỗi khi lấy tạo câu hỏi:", error);
    }
  };
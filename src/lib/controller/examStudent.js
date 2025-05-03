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

export const getExamsStudentDetail = async (MaCuocThi) => {
  try {
    const res = await fetch(BASE_URL + "/exam/sv/" + MaCuocThi, {
      method: "GET", // Nếu API cần gửi dữ liệu, hãy đặt method GET
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await checkResponse(res);

    return data.data;
  } catch (error) {
    console.log("Lỗi khi lấy thông tin cuộc thi:", error);
  }
};

export const joinExam = async (MaCuocThi, mat_khau) => {
  console.log("mat khau", mat_khau);

  try {
    const res = await fetch(BASE_URL + "/exam/tham-gia-cuoc-thi/" + MaCuocThi, {
      method: "POST", // Nếu API cần gửi dữ liệu, hãy đặt method POST
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(mat_khau),
    });
    const data = await checkResponse(res);

    return data.data;
  } catch (error) {
    console.log("Lỗi khi tham gia THI:", error);
  }
};

export const joinPracticeExam = async (MaCuocThi) => {
  try {
    const res = await fetch(
      BASE_URL + "/pratice/tham-gia-luyen-thi/" + MaCuocThi,
      {
        method: "GET", // Nếu API cần gửi dữ liệu, hãy đặt method GET
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    const data = await checkResponse(res);

    return data.data;
  } catch (error) {
    console.log("Lỗi khi tham gia LUYỆN thi:", error);
  }
};

export const speechToText = async (MaCuocThi) => {
  try {
    const res = await fetch(
      BASE_URL + "/pratice/tham-gia-luyen-thi/" + MaCuocThi,
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
    console.log("Lỗi khi đang chuyển GIỌNG NÓI thành VĂN BẢN thi:", error);
  }
};

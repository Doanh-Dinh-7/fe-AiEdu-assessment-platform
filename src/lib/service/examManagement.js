import { BASE_URL, MOCKUP_URL, CHAT_URL } from "../config/config";
import { checkResponse } from "./jwt";

export const getExamsList = async () => {
  try {
    const res = await fetch(CHAT_URL + "/exam", {
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

export const createExam = async (examData) => {
  try {
    const res = await fetch(CHAT_URL + "/exam", {
      method: "POST", // Nếu API cần gửi dữ liệu, hãy đặt method POST
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(examData),
    });
    const data = await checkResponse(res);

    return data;
  } catch (error) {
    console.log("Lỗi khi tạo cuộc thi:", error);
  }
};

export const updateExam = async (MaCuocThi, examData) => {
  try {
    const res = await fetch(CHAT_URL + "/exam/" + MaCuocThi, {
      method: "PUT", // Nếu API cần gửi dữ liệu, hãy đặt method PUT
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(examData),
    });
    const data = await checkResponse(res);
    console.log("data", data);

    return data;
  } catch (error) {
    console.log("Lỗi khi cập nhật cuộc thi:", error);
  }
};

export const deleteExam = async (MaCuocThi) => {
  try {
    const res = await fetch(CHAT_URL + "/exam/" + MaCuocThi, {
      method: "DELETE", // Nếu API cần gửi dữ liệu, hãy đặt method DELETE
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await checkResponse(res);

    return data;
  } catch (error) {
    console.log("Lỗi khi xoá cuộc thi:", error);
  }
};

export const getExamDetail = async (MaCuocThi) => {
  try {
    const res = await fetch(CHAT_URL + "/exam/" + MaCuocThi, {
      method: "GET", // Nếu API cần gửi dữ liệu, hãy đặt method GET
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await checkResponse(res);

    return data.data;
  } catch (error) {
    console.log("Lỗi khi lấy thông tin chi tiết cuộc thi:", error);
  }
};

// sài URL MOCKUP
export const getExamResult = async (MaCuocThi) => {
  try {
    const res = await fetch(CHAT_URL + "/result/" + MaCuocThi + "/gv", {
      method: "GET", // Nếu API cần gửi dữ liệu, hãy đặt method GET
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await checkResponse(res);

    return data.data;
  } catch (error) {
    console.log("Lỗi khi lấy danh sách kết quả cuộc thi:", error);
  }
};

// sài URL MOCKUP
export const getExamResultDetail = async (MaCuocThi, MaSinhVien) => {
  try {
    const res = await fetch(
      CHAT_URL + "/result/" + MaCuocThi + "/chitiet/" + MaSinhVien + "/gv",
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
    console.log("Lỗi khi lấy danh sách kết quả cuộc thi:", error);
  }
};

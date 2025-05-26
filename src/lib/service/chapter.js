import { BASE_URL, CHAT_URL } from "../config/config";
import { checkResponse } from "./jwt";

export const AddChapterDocument = async (MaHocPhan, MaChuong, chapterData) => {
  try {
    const res = await fetch(
      CHAT_URL + "/academic/chapter/" + MaHocPhan + "/" + MaChuong,
      {
        method: "POST", // Nếu API cần gửi dữ liệu, hãy đặt method POST
        credentials: "include",
        body: chapterData,
      }
    );
    const data = await checkResponse(res);

    return data;
  } catch (error) {
    console.log("Lỗi khi thêm chương:", error);
  }
};

export const updateChapter = async (MaHocPhan, MaChuong, chapterData) => {
  try {
    const res = await fetch(
      CHAT_URL + "/academic/chapter/" + MaHocPhan + "/" + MaChuong,
      {
        method: "PUT", // Nếu API cần gửi dữ liệu, hãy đặt method PUT
        credentials: "include",
        body: chapterData,
      }
    );
    const data = await checkResponse(res);

    return data;
  } catch (error) {
    console.log("Lỗi khi cập nhật chương:", error);
  }
};

export const getDocumentChapter = async (MaHocPhan, MaChuong) => {
  try {
    const res = await fetch(
      CHAT_URL + "/academic/chapter/" + MaHocPhan + "/" + MaChuong,
      {
        method: "GET", // Nếu API cần gửi dữ liệu, hãy đặt method PUT
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await checkResponse(res);

    return data;
  } catch (error) {
    console.log("Lỗi khi lấy danh sách tài liệu chương:", error);
  }
};

export const deleteChapter = async (MaHocPhan, MaChuong) => {
  try {
    const res = await fetch(
      CHAT_URL + "/academic/chapter/" + MaHocPhan + "/" + MaChuong,
      {
        method: "DELETE", // Nếu API cần gửi dữ liệu, hãy đặt method DELETE
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await checkResponse(res);

    return data;
  } catch (error) {
    console.log("Lỗi khi xoá liệu chương:", error);
  }
};

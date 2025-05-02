import { BASE_URL } from "../config/config";
import { checkResponse } from "./jwt";

export const updateChapter = async (MaHocPhan, MaChuong, chapterData) => {
  try {
    const res = await fetch(
      BASE_URL + "/academic/chapter/" + MaHocPhan + "/" + MaChuong,
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
      BASE_URL + "/academic/chapter/" + MaHocPhan + "/" + MaChuong,
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

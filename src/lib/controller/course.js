import { BASE_URL } from "../config/config";
import { checkResponse } from "./jwt";

export const getCoursesList = async () => {
  try {
    const res = await fetch(BASE_URL + "/academic/course", {
      method: "GET", // Nếu API cần gửi dữ liệu, hãy đặt method GET
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await checkResponse(res);

    return data.courses;
  } catch (error) {
    console.log("Lỗi khi lấy danh sách học phần:", error);
  }
};

export const getCourseDetail = async (MaHocPhan) => {
  try {
    const res = await fetch(BASE_URL + "/academic/course/" + MaHocPhan, {
      method: "GET", // Nếu API cần gửi dữ liệu, hãy đặt method GET
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await checkResponse(res);

    return data;
  } catch (error) {
    console.log("Lỗi khi lấy chi tiết học phần:", error);
  }
};

export const createCourse = async (courseData) => {
  try {
    const res = await fetch(BASE_URL + "/academic/course", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(courseData),
    });

    const data = await checkResponse(res);

    return data;
  } catch (error) {
    console.log("Lỗi khi tạo học phần:", error);
  }
};

export const deleteCourse = async (MaHocPhan) => {
  try {
    const res = await fetch(BASE_URL + "/academic/course/" + MaHocPhan, {
      method: "DELETE", // Nếu API cần gửi dữ liệu, hãy đặt method DELETE
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await checkResponse(res);

    return data;
  } catch (error) {
    console.log("Lỗi khi xóa học phần:", error);
  }
};

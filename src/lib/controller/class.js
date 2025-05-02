import { BASE_URL } from "../config/config";
import { checkResponse } from "./jwt";

export const getClassList = async () => {
  try {
    const res = await fetch(BASE_URL + "/academic/class", {
      method: "GET", // Nếu API cần gửi dữ liệu, hãy đặt method GET
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await checkResponse(res);

    return data;
  } catch (error) {
    console.log("Lỗi khi lấy danh sách lớp học phần:", error);
  }
};

export const createClass = async (classData) => {
  try {
    const res = await fetch(BASE_URL + "/academic/class", {
      method: "POST", // Nếu API cần gửi dữ liệu, hãy đặt method POST
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(classData),
    });
    const data = await checkResponse(res);

    return data;
  } catch (error) {
    console.log("Lỗi khi tạo lớp học phần:", error);
  }
};

export const updateClass = async (classData, MaLopHocPhan) => {
  try {
    const res = await fetch(BASE_URL + "/academic/class/" + MaLopHocPhan, {
      method: "PUT", // Nếu API cần gửi dữ liệu, hãy đặt method PUT
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(classData),
    });
    const data = await checkResponse(res);

    return data;
  } catch (error) {
    console.log("Lỗi khi cập nhật lớp học phần:", error);
  }
};

export const deleteClass = async (MaLopHocPhan) => {
  try {
    const res = await fetch(BASE_URL + "/academic/class/" + MaLopHocPhan, {
      method: "DELETE", // Nếu API cần gửi dữ liệu, hãy đặt method DELETE
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await checkResponse(res);

    return data;
  } catch (error) {
    console.log("Lỗi khi xoá lớp học phần:", error);
  }
};

export const getClassStudenList = async (MaLopHocPhan) => {
  try {
    const res = await fetch(
      BASE_URL + "/academic/class/" + MaLopHocPhan + "/students",
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
    console.log("Lỗi khi lấy danh sách sinh viên lớp học phần:", error);
  }
};

export const importFileStudentList = async (MaLopHocPhan, fileStudentsData) => {
  try {
    const res = await fetch(
      BASE_URL + "/academic/class/" + MaLopHocPhan + "/import_students",
      {
        method: "POST", // Nếu API cần gửi dữ liệu, hãy đặt method POST
        credentials: "include",
        body: fileStudentsData,
      }
    );
    const data = await checkResponse(res);

    return data;
  } catch (error) {
    console.log("Lỗi khi import file sinh viên chương:", error);
  }
};

import { BASE_URL } from "../config/config";

export const login = async (username, password) => {
  try {
    const response = await fetch(BASE_URL + "/account/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ TenDangNhap: username, MatKhau: password }),
    });

    if (!response.ok) {
      throw new Error("Sai tên đăng nhập hoặc mật khẩu!");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

export const logout = async () => {
  try {
    const response = await fetch(BASE_URL + "/account/logout", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Đăng xuất thất bại!");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

export const checkResponse = async (response) => {

  if (!response.ok) {
    if (response.status === 401) {
      // Nếu mã lỗi là 401, xóa token và chuyển hướng đến trang đăng nhập
      localStorage.removeItem("accessToken");
      localStorage.removeItem("VaiTro");

      window.location.href = "/login"; // Chuyển hướng đến trang đăng nhập
    }
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
};

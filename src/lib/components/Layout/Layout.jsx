// src/components/Layout/Layout.jsx
import {
  Box,
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import { Outlet, useLocation, Link as RouterLink } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const breadcrumbNameMap = {
    // Giảng viên
    "exam-bank": "Ngân hàng đề thi",
    "exam-bank-form": "Tạo ngân hàng đề thi",
    "class-form": "Tạo/Sửa lớp học phần",
    questions: "Danh sách câu hỏi",
    class: "Danh sách lớp học phần",
    "create-question": "Tạo câu hỏi",
    "upload-document-exam": "Danh sách tài liệu",
    "exam-management": "Quản lý bài thi",
    "exam-form": "Tạo/Sửa bài thi",
    "exam-result": "Kết quả bài thi",
    detail: "Chi tiết kết quả bài thi",

    // Sinh viên
    exams: "Danh sách bài thi",
    taking: "Thực hiện thi",
  };

  // // Tách id từ URL nếu có
  // const id = pathnames.find((p) => /^\d+$/.test(p)); // id là số (ví dụ: "3")

  return (
    <Flex h="100vh" bg="gray.50">
      <Flex>
        <Sidebar />
      </Flex>
      <Box flex="1" overflow="auto" p={4}>
        {/* Breadcrumb */}
        <Breadcrumb mb={2} fontWeight="medium" fontSize="md">
          {pathnames.map((name, idx) => {
            const routeTo = `/${pathnames.slice(0, idx + 1).join("/")}`;
            const isLast = idx === pathnames.length - 1;

            let displayName = breadcrumbNameMap[name];

            if (!displayName) {
              if (/^\d+$/.test(name) && pathnames[idx - 1] === "exam-bank") {
                // Nếu name là id số và phía trước là exam-bank
                displayName = `Chi tiết ngân hàng đề thi ${name}`;
              } else if (
                /^\d+$/.test(name) &&
                pathnames[idx - 1] === "questions"
              ) {
                // Nếu name là id số và phía trước là questions
                displayName = `Chi tiết câu hỏi ${name}`;
              } else if (pathnames[idx - 1] === "class") {
                displayName = `Lớp học phần ${name}`;
              } else {
                displayName = decodeURIComponent(name);
              }
            }

            return (
              <BreadcrumbItem key={routeTo} isCurrentPage={isLast}>
                <BreadcrumbLink
                  as={RouterLink}
                  to={routeTo}
                  fontWeight={isLast ? "bold" : "medium"}
                  color={isLast ? "blue.600" : undefined}
                >
                  {displayName}
                </BreadcrumbLink>
              </BreadcrumbItem>
            );
          })}
        </Breadcrumb>
        <Outlet />
      </Box>
    </Flex>
  );
};

export default Layout;

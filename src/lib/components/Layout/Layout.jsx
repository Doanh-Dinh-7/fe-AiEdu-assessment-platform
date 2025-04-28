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
    "exam-bank": "Ngân hàng đề thi",
    "form": "Tạo ngân hàng đề thi",
    "questions": "Danh sách câu hỏi",
    "class": "Danh sách lớp học phần",
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
        <Breadcrumb mb={4} fontWeight="medium" fontSize="md">
          {pathnames.map((name, idx) => {
            const routeTo = `/${pathnames.slice(0, idx + 1).join("/")}`;
            const isLast = idx === pathnames.length - 1;

            let displayName = breadcrumbNameMap[name];

            if (!displayName) {
              if (/^\d+$/.test(name)) {
                // Nếu name là id số
                displayName = `Chi tiết ngân hàng đề thi ${name}`;
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

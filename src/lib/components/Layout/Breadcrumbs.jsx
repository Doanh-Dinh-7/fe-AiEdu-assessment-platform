import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { useLocation, Link as RouterLink } from "react-router-dom";

const breadcrumbNameMap = {
  // Giảng viên
  "exam-bank": "Ngân hàng đề thi",
  "exam-bank-form": "Tạo-Sửa ngân hàng đề thi",
  "class-form": "Tạo-Sửa lớp học phần",
  qestions: "Danh sách câu hỏi",
  "detail-questions": "Chi tiết câu hỏi",
  class: "Danh sách lớp học phần",
  "create-question": "Tạo câu hỏi",
  "upload-document-exam": "Danh sách tài liệu",
  "exam-management": "Quản lý cuộc thi",
  "exam-form": "Tạo-Sửa bài thi",
  "exam-result": "Kết quả bài thi",
  detail: "Chi tiết kết quả bài thi",

  // Sinh viên
  exams: "Danh sách bài thi",
  taking: "Thực hiện thi",
};

const Breadcrumbs = ({ disableBreadcrumb = false }) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const filteredPathnames = pathnames.filter(
    (name) => name !== "questions" && name !== "detail-questions"
  );

  return (
    <Breadcrumb mb={2} fontWeight="medium" fontSize="md">
      {filteredPathnames.map((name, idx) => {
        const isLast = idx === filteredPathnames.length - 1;
        // Tạo routeTo đúng với các path thực sự có route
        const routeTo =
          "/" +
          pathnames
            .slice(0, pathnames.findIndex((n, i) => n === name && i >= idx) + 1)
            .filter((n) => n !== "questions" && n !== "detail-questions")
            .join("/");

        let displayName = breadcrumbNameMap[name];

        // Xử lý động cho các tham số id, maChuong, maCauHoi
        if (!displayName) {
          // Với path bắt đầu bằng "exam-bank"
          if (filteredPathnames[0] === "exam-bank") {
            if (idx === 1) {
              displayName = "Chi tiết ngân hàng đề thi";
            } else if (idx === 2) {
              displayName = "Danh sách câu hỏi";
            } else if (
              idx === filteredPathnames.length - 1 &&
              filteredPathnames.length > 3
            ) {
              displayName = "Chi tiết câu hỏi";
            }
          }

          // Với path bắt đầu bằng "class"
          else if (filteredPathnames[0] === "class") {
            if (idx === 1) {
              displayName = "Lớp học phần";
            }
          }

          // Với path bắt đầu bằng "class"
          else if (filteredPathnames[0] === "exam-management") {
            if (idx === 1) {
              displayName = "Thông tin cuộc thi";
            }
          }

          // Fallback chung: chuyển path thành dạng đọc được
          else {
            displayName = decodeURIComponent(name)
              .replace(/-/g, " ")
              .replace(/\b\w/g, (char) => char.toUpperCase());
          }
        }

        return (
          <BreadcrumbItem
            key={routeTo}
            isCurrentPage={isLast || disableBreadcrumb}
          >
            <BreadcrumbLink
              as={!disableBreadcrumb ? RouterLink : undefined}
              to={!disableBreadcrumb ? routeTo : undefined}
              fontWeight={isLast ? "bold" : "medium"}
              color={
                disableBreadcrumb ? "gray.400" : isLast ? "blue.600" : undefined
              }
              pointerEvents={disableBreadcrumb ? "none" : undefined}
            >
              {displayName}
            </BreadcrumbLink>
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
};

export default Breadcrumbs;

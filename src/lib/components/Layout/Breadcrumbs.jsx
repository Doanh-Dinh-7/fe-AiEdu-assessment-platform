import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { useLocation, Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";

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
  "exam-management": "Quản lý kỳ thi",
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
    <Breadcrumb
      mb={4}
      fontWeight="medium"
      fontSize="md"
      bg="surface"
      borderRadius="md"
      boxShadow="0 1px 4px rgba(0,0,0,0.04)"
      px={3}
      py={2}
      fontFamily="Inter, sans-serif"
    >
      {filteredPathnames.map((name, idx) => {
        const isLast = idx === filteredPathnames.length - 1;
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

          // Với path bắt đầu bằng "exam-management"
          else if (filteredPathnames[0] === "exam-management") {
            // /exam-management/result/:maCuocThi
            if (
              filteredPathnames[1] === "result" &&
              filteredPathnames.length === 3 &&
              idx === 2
            ) {
              displayName = "Thông tin cuộc thi";
            }
            // /exam-management/result/:maCuocThi/:maSinhVien
            else if (
              filteredPathnames[1] === "result" &&
              filteredPathnames.length === 4 &&
              idx === 3
            ) {
              displayName = "Chi tiết kết quả bài thi";
            } else if (idx === 1) {
              displayName = "Thông tin cuộc thi";
            } else if (idx === 2) {
              displayName = "Kết quả bài thi";
            } else if (idx === 3) {
              displayName = "Chi tiết kết quả bài thi";
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
                disableBreadcrumb
                  ? "textSecondary"
                  : isLast
                  ? "textPrimary"
                  : "primary"
              }
              _hover={{
                color: "brand.600",
                textDecoration: "underline",
                bg: "background",
              }}
              pointerEvents={disableBreadcrumb ? "none" : undefined}
              bg="surface"
              borderRadius="md"
              px={2}
              py={1}
              fontFamily="Inter, sans-serif"
            >
              {displayName}
            </BreadcrumbLink>
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
};

Breadcrumbs.propTypes = {
  disableBreadcrumb: PropTypes.bool,
};

export default Breadcrumbs;

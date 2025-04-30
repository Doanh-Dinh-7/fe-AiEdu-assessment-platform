import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import HomePage from "../../pages/HomePage";
import LoginPage from "../../pages/LoginPage";

import ExamBank from "../../pages/ExamBank";
import ExamBankDetail from "../components/ExamBank/ExamBankDetail";
import ExamBankForm from "../components/ExamBank/ExamBankForm";
import ExamQuestion from "../components/ExamBank/ExamQuestion";
import QuestionDetail from "../components/ExamBank/QuestionDetail";
import CreateQuestion from "../components/ExamBank/CreateQuestion";
import ExamDocuments from "../components/ExamBank/ExamDocuments";

import Class from "../../pages/Class";
import ClassDetail from "../components/Class/ClassDetail";
import ClassForm from "../components/Class/ClassForm";

import ExamManagement from "../../pages/ExamManagement";
import ExamForm from "../components/ExamManagement/ExamForm";
import ExamResult from "../components/ExamManagement/ExamResult";
import ExamResultDetail from "../components/ExamManagement/ExamResultDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/", // Trang chủ
        element: <HomePage />,
      },
      {
        path: "/exam-bank", // Danh sách ngân hàng đề
        element: <ExamBank />,
      },
      {
        path: "/exam-bank/exam-bank-form", // Trang tạo/sửa ngân hàng đề
        element: <ExamBankForm />,
      },
      {
        path: "/exam-bank/:id", // Trang chi tiết ngân hàng đề
        element: <ExamBankDetail />,
      },
      {
        path: "/exam-bank/:id/questions", // Danh sách câu hỏi trong ngân hàng đề
        element: <ExamQuestion />,
      },
      {
        path: "/exam-bank/:id/questions/:id", // Chi tiết câu hỏi
        element: <QuestionDetail />,
      },
      {
        path: "/exam-bank/:id/questions/create-question", // Tạo câu hỏi mới
        element: <CreateQuestion />,
      },
      {
        path: "/exam-bank/:id/upload-document-exam", // Danh sách tài liệu
        element: <ExamDocuments />,
      },
      {
        path: "/class", // Trang danh sách lớp học phần
        element: <Class />,
      },
      {
        path: "/class/:id", // Chi tiết lớp học phần
        element: <ClassDetail />,
      },
      {
        path: "/class/class-form", // Thêm/sửa lớp học phần
        element: <ClassForm />,
      },
      {
        path: "/exam-management", // Quản lý bài thi
        element: <ExamManagement />,
      },
      {
        path: "/exam-management/exam-form", // Thêm/sửa bài thi
        element: <ExamForm />,
      },
      {
        path: "/exam-management/exam-result/", // Kết quả bài thi
        element: <ExamResult />,
      },
      {
        path: "/exam-management/exam-result/detail", // Chi tiết kết quả bài thi
        element: <ExamResultDetail />,
      },
    ],
  },
  {
    path: "/login", // Trang đăng nhập
    element: <LoginPage />,
  },
]);

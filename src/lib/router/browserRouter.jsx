import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import HomePage from "../../pages/HomePage";
import LoginPage from "../../pages/LoginPage";

import ExamBank from "../../pages/ExamBank";
import ExamBankDetail from "../components/ExamBank/ExamBankDetail";
import ExamBankForm from "../components/ExamBank/ExamBankForm";
import ExamQuestion from "../components/ExamBank/ExamQuestion";
import QuestionDetail from "../components/ExamBank/QuestionDetail";

import Class from "../../pages/Class";

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
        path: "/exam-bank/form", // Trang tạo ngân hàng đề
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
        path: "/class", // Trang danh sách lớp học phần
        element: <Class />,
      },
    ],
  },
  {
    path: "/login", // Trang đăng nhập
    element: <LoginPage />,
  },
]);

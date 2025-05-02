import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import HomePage from "../../pages/HomePage";
import LoginPage from "../../pages/LoginPage";

import ExamBank from "../../pages/Lecturer/ExamBank";
import ExamBankDetail from "../components/ExamBank/ExamBankDetail";
import ExamBankForm from "../components/ExamBank/ExamBankForm";
import ExamQuestion from "../components/ExamBank/ExamQuestion";
import QuestionDetail from "../components/ExamBank/QuestionDetail";
import CreateQuestion from "../components/ExamBank/CreateQuestion";
import ExamDocuments from "../components/ExamBank/ExamDocuments";

import Class from "../../pages/Lecturer/Class";
import ClassDetail from "../components/Class/ClassDetail";
import ClassForm from "../components/Class/ClassForm";

import ExamManagement from "../../pages/Lecturer/ExamManagement";
import ExamForm from "../components/ExamManagement/ExamForm";
import ExamResult from "../components/ExamManagement/ExamResult";
import ExamResultDetail from "../components/ExamManagement/ExamResultDetail";

import Exam from "../../pages/Student/Exam";
import ExamTaking from "../../pages/Student/ExamTaking";
import ExamPractice from "../../pages/Student/ExamPractice";

import RoleProtectedRoute from "../components/Auth/RoleProtectedRoute";

// Giảng viên
const lecturerRoutes = {
  element: <RoleProtectedRoute allowedRoles={["lecturer"]} />,
  children: [
    // Ngân hàng đề thi
    { path: "/exam-bank", element: <ExamBank /> },
    { path: "/exam-bank/exam-bank-form", element: <ExamBankForm /> },
    { path: "/exam-bank/:maHocPhan", element: <ExamBankDetail /> },
    { path: "/exam-bank/:maHocPhan/:maChuong", element: <ExamQuestion /> },
    {
      path: "/exam-bank/:maHocPhan/:maChuong/:maCauHoi",
      element: <QuestionDetail />,
    },
    {
      path: "/exam-bank/:maHocPhan/:maChuong/create-question",
      element: <CreateQuestion />,
    },
    {
      path: "/exam-bank/:maHocPhan/:maChuong/upload-document-exam",
      element: <ExamDocuments />,
    },

    // Quản lý lớp học phần
    { path: "/class", element: <Class /> },
    { path: "/class/:maLopHocPhan", element: <ClassDetail /> },
    { path: "/class/class-form", element: <ClassForm /> },

    // Quản lý cuộc thi
    { path: "/exam-management", element: <ExamManagement /> },
    { path: "/exam-management/exam-form", element: <ExamForm /> },
    { path: "/exam-management/exam-result", element: <ExamResult /> },
    {
      path: "/exam-management/exam-result/detail",
      element: <ExamResultDetail />,
    },
  ],
};

// Sinh viên
const studentRoutes = {
  element: <RoleProtectedRoute allowedRoles={["student"]} />,
  children: [
    { path: "/exams", element: <Exam /> },
    { path: "/exams/taking", element: <ExamTaking /> },
    { path: "/exams/practice", element: <ExamPractice /> },
  ],
};

// Router chính
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      lecturerRoutes,
      studentRoutes,
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

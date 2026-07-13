import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import LandingPage from "./pages/LandingPage/LandingPage";

// Auth
import Register from "./auth/Register/Register";
import Login from "./auth/Login/Login";
import VerifyOtp from "./auth/VerifyOtp/VerifyOtp";
import VerifyCollegeId from "./auth/VerifyCollegeId/VerifyCollegeId";

// Student
import StudentDashboard from "./student/StudentDashboard/StudentDashboard";
import StudentProfile from "./student/StudentProfile/StudentProfile";
import StudentAnnouncement from "./student/StudentAnnouncement/StudentAnnouncement";
import StudentComplaint from "./student/StudentComplaint/StudentComplaint";
import StudentComplaintDetails from "./student/StudentComplaintDetails/StudentComplaintDetails";
import ProtectedRoute from "./routes/ProtectedRoute";
import MainAdminComplaint from "./admin/MainAdminComplaint/MainAdminComplaint";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import VerifyForgotPasswordOtp from "./pages/VerifyForgotPasswordOtp/VerifyForgotPasswordOtp";
import SetNewPassword from "./pages/SetNewPassword/SetNewPassword";
import MainAdminDashboard from "./admin/MainAdminDashboard/MainAdminDashboard";
import CreateAnnouncement from "./admin/CreateAnnouncement/CreateAnnouncement";
// Student Only Components
import ComplaintCategory from "./components/Complaint/ComplaintCategory/ComplaintCategory";
import ComplaintForm from "./components/Complaint/ComplaintForm/ComplaintForm";
import ComplaintSubmitted from "./components/Complaint/ComplaintSubmitted/ComplaintSubmitted";
import Feedback from "./components/Complaint/Feedback/Feedback";
// Lost & Found
import LostFoundList from "./student/LostFound/LostFoundList";
import AddLostFound from "./student/LostFound/AddLostFound";
import LostFoundDetails from "./student/LostFound/LostFoundDetails";
import MainAdminAnnouncement from "./admin/MainAdminAnnouncement/MainAdminAnnouncement";
// Admin
import AdminDashboard from "./admin/AdminDashboard/AdminDashboard";

import AdminAnnouncement from "./admin/AdminAnnouncement/AdminAnnouncement";
import AdminComplaint from "./admin/AdminComplaint/AdminComplaint";
import AdminComplaintDetails from "./admin/AdminComplaintDetails/AdminComplaintDetails";
import OAuthSuccess from "./auth/OAuthSuccess";
function App() {
  return (
    <BrowserRouter>
      <Routes>



        <Route path="/" element={<LandingPage />} />

        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<Login />} />

        <Route path="/verify-otp" element={<VerifyOtp />} />

        <Route
            path="/verify-college"
            element={<VerifyCollegeId />}
        />

        <Route
            path="/oauth-success"
            element={<OAuthSuccess />}
        />

        <Route
            path="/forgot-password"
            element={<ForgotPassword />}
        />

        <Route
            path="/verify-forgot-password-otp"
            element={<VerifyForgotPasswordOtp />}
        />

        <Route
            path="/reset-password"
            element={<SetNewPassword />}
        />









<Route
    path="/student/dashboard"
    element={
        <ProtectedRoute allowedRoles={["STUDENT"]}>
            <StudentDashboard />
        </ProtectedRoute>
    }
/>

<Route
    path="/student/profile"
    element={
        <ProtectedRoute allowedRoles={["STUDENT"]}>
            <StudentProfile />
        </ProtectedRoute>
    }
/>

<Route
    path="/student/announcements"
    element={
        <ProtectedRoute allowedRoles={["STUDENT"]}>
            <StudentAnnouncement />
        </ProtectedRoute>
    }
/>

<Route
    path="/student/complaints"
    element={
        <ProtectedRoute allowedRoles={["STUDENT"]}>
            <StudentComplaint />
        </ProtectedRoute>
    }
/>

<Route
    path="/student/complaints/:id"
    element={
        <ProtectedRoute allowedRoles={["STUDENT"]}>
            <StudentComplaintDetails />
        </ProtectedRoute>
    }
/>

<Route
    path="/student/complaints/category"
    element={
        <ProtectedRoute allowedRoles={["STUDENT"]}>
            <ComplaintCategory />
        </ProtectedRoute>
    }
/>

<Route
    path="/student/complaints/:id/feedback"
    element={
        <ProtectedRoute allowedRoles={["STUDENT"]}>
            <Feedback />
        </ProtectedRoute>
    }
/>

<Route
    path="/student/complaints/new"
    element={
        <ProtectedRoute allowedRoles={["STUDENT"]}>
            <ComplaintForm />
        </ProtectedRoute>
    }
/>

<Route
    path="/student/complaints/submitted"
    element={
        <ProtectedRoute allowedRoles={["STUDENT"]}>
            <ComplaintSubmitted />
        </ProtectedRoute>
    }
/>

<Route
    path="/student/lost-found"
    element={
        <ProtectedRoute allowedRoles={["STUDENT"]}>
            <LostFoundList />
        </ProtectedRoute>
    }
/>

<Route
    path="/student/lost-found/new"
    element={
        <ProtectedRoute allowedRoles={["STUDENT"]}>
            <AddLostFound />
        </ProtectedRoute>
    }
/>

<Route
    path="/student/lost-found/:id"
    element={
        <ProtectedRoute allowedRoles={["STUDENT"]}>
            <LostFoundDetails />
        </ProtectedRoute>
    }
/>





     <Route
    path="/admin/dashboard"
    element={
        <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminDashboard />
        </ProtectedRoute>
    }
/>


<Route
    path="/admin/announcements"
    element={
        <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminAnnouncement />
        </ProtectedRoute>
    }
/>

<Route
    path="/admin/complaints"
    element={
        <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminComplaint />
        </ProtectedRoute>
    }
/>

<Route
    path="/admin/complaints/:id"
    element={
        <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminComplaintDetails />
        </ProtectedRoute>
    }
/>

<Route
    path="/main-admin/dashboard"
    element={
        <ProtectedRoute allowedRoles={["ADMIN"]}>
            <MainAdminDashboard />
        </ProtectedRoute>
    }
/>

<Route
    path="/main-admin/announcement/new"
    element={
        <ProtectedRoute allowedRoles={["ADMIN"]}>
            <CreateAnnouncement />
        </ProtectedRoute>
    }
/>

<Route
    path="/main-admin/announcements"
    element={
        <ProtectedRoute allowedRoles={["ADMIN"]}>
            <MainAdminAnnouncement />
        </ProtectedRoute>
    }
/>


<Route
    path="/main-admin/complaints"
    element={
        <ProtectedRoute allowedRoles={["ADMIN"]}>
            <MainAdminComplaint />
        </ProtectedRoute>
    }
/>

<Route
    path="/main-admin/complaints/:id"
    element={
        <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminComplaintDetails />
        </ProtectedRoute>
    }
/>







      </Routes>
    </BrowserRouter>
  );
}

export default App;
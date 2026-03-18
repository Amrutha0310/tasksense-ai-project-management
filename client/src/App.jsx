import { Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthContext'
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import ManagerDashboard from "./pages/dashboards/ManagerDashboard";
import MemberDashboard from "./pages/dashboards/MemberDashboard";

function App() {
  return (
    <>
     <AuthProvider>
      <Toaster position="top-center" />
       <Navbar />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/manager-dashboard" element={<ManagerDashboard />} />
        <Route path="/member-dashboard" element={<MemberDashboard/>} />
      </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
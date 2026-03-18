import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import api from "../config/api";

export default function Login() {
  // Simple form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  // Animation states
  const [pageLoaded, setPageLoaded] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);

  const navigate = useNavigate();

  // Trigger animations after page load
  useEffect(() => {
    setPageLoaded(true);
    setTimeout(() => setFormVisible(true), 200);
    setTimeout(() => setStatsVisible(true), 400);
  }, []);

  // Handle login submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email.trim() || !password.trim()) {
      toast.error("Please enter both email and password");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      // API call to your backend
      const response = await api.post("/auth/login", {
        email,
        password
      });

      console.log("Login response:", response.data);

      // Get user data from response
      const userData = response.data.data || response.data.user || response.data;
      const token = response.data.token;

      // Store token and user data based on remember me
      if (rememberMe) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
      } else {
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("user", JSON.stringify(userData));
      }

      toast.success(
        <div className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-[#10b981]" />
          <span>Login successful! Redirecting...</span>
        </div>
      );
      
      // Redirect based on user role
      const userRole = userData.role;
      console.log("User role:", userRole);
      
      setTimeout(() => {
        switch (userRole) {
          case 'admin':
            navigate("/admin-dashboard");
            break;
          case 'manager':
            navigate("/manager-dashboard");
            break;
          case 'member':
            navigate("/member-dashboard");
            break;
          default:
            navigate("/dashboard");
        }
      }, 1500);

    } catch (error) {
      console.error("Login error:", error);
      console.error("Error response:", error.response?.data);
      
      // Handle different error cases
      if (error.response?.status === 401) {
        toast.error("Invalid email or password");
      } else if (error.response?.status === 404) {
        toast.error("Account not found. Please register first.");
      } else {
        toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Quick fill demo credentials with different roles for testing
  const fillDemoCredentials = (role) => {
    switch(role) {
      case 'admin':
        setEmail("admin@tasksense.com");
        setPassword("admin123");
        toast.success("Admin credentials filled!");
        break;
      case 'manager':
        setEmail("manager@tasksense.com");
        setPassword("manager123");
        toast.success("Manager credentials filled!");
        break;
      case 'member':
        setEmail("member@tasksense.com");
        setPassword("member123");
        toast.success("Member credentials filled!");
        break;
      default:
        setEmail("john.doe@tasksense.com");
        setPassword("password123");
        toast.success("Demo credentials filled!");
    }
  };

  return (
    <div className={`min-h-screen bg-[#f8fafc] transition-opacity duration-700 ${pageLoaded ? 'opacity-100' : 'opacity-0'} flex flex-col`}>
      
      {/* Simple Navigation */}
      <nav className="bg-white border-b border-[#e2e8f0] px-6 py-3 sticky top-0 z-10 animate-slideDown">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo with hover animation */}
          <div className="flex items-center space-x-2 group cursor-pointer">
            <div className="w-7 h-7 bg-[#2563eb] rounded-lg flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-300">
              <span className="text-white font-bold text-base">T</span>
            </div>
            <span className="text-lg font-semibold text-[#1e293b] group-hover:text-[#2563eb] transition-colors">
              TaskSense AI
            </span>
          </div>

          {/* Nav Links */}
          <div className="flex items-center space-x-3">
            <Link 
              to="/login" 
              className="bg-[#2563eb] text-white px-4 py-1.5 rounded-lg text-sm hover:bg-[#1d4ed8] hover:shadow-md hover:scale-105 transition-all"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-[#2563eb] text-white px-4 py-1.5 rounded-lg text-sm hover:bg-[#1d4ed8] hover:shadow-md hover:scale-105 transition-all"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content - Flex grow to take remaining space */}
      <div className="flex-1 flex items-center justify-center px-4 py-6">
        <div className="max-w-6xl w-full">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            
            {/* Left Side - Brand Message */}
            <div className={`space-y-4 transition-all duration-1000 transform ${statsVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h1 className="text-3xl md:text-4xl font-bold text-[#1e293b] leading-tight">
                Manage your projects
                <span className="text-[#2563eb] block relative">
                  with AI intelligence
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#2563eb] animate-slideIn"></span>
                </span>
              </h1>
              
              <p className="text-base text-[#64748b] animate-fadeIn max-w-md" style={{ animationDelay: '0.3s' }}>
                TaskSense AI helps teams streamline workflows, track progress, 
                and deliver projects faster with smart automation.
              </p>

              {/* Feature List with staggered animation */}
              <div className="space-y-4">
                {[
                  "AI-powered task prioritization",
                  "Real-time team collaboration",
                  "Automated progress tracking",
                  "Smart deadline predictions"
                ].map((feature, index) => (
                  <div 
                    key={index} 
                    className="flex items-center space-x-3 group cursor-pointer"
                    style={{ animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both` }}
                  >
                    <div className="w-5 h-5 bg-[#dbeafe] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <div className="w-2 h-2 bg-[#2563eb] rounded-full group-hover:animate-ping"></div>
                    </div>
                    <span className="text-[#475569] group-hover:text-[#2563eb] transition-colors">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Stats hard coded */}
              <div className="grid grid-cols-3 gap-3 pt-4">
                {[
                  { value: "10k+", label: "Active users" },
                  { value: "50k+", label: "Projects" },
                  { value: "4.9", label: "User rating" }
                ].map((stat, index) => (
                  <div 
                    key={index}
                    className="text-center p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all cursor-pointer transform hover:-translate-y-1"
                    style={{ animation: `fadeIn 0.5s ease-out ${index * 0.1 + 0.5}s both` }}
                  >
                    <div className="text-xl font-bold text-[#1e293b]">{stat.value}</div>
                    <div className="text-xs text-[#64748b]">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div 
              className={`bg-white rounded-xl shadow-lg p-6 border border-[#e2e8f0] transform transition-all duration-700 ${
                formVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
              }`}
            >
              
              {/* Form Header */}
              <div className="mb-5">
                <h2 className="text-xl font-bold text-[#1e293b] animate-slideRight">Welcome back</h2>
                <p className="text-xs text-[#64748b] mt-0.5 animate-slideRight" style={{ animationDelay: '0.1s' }}>
                  Sign in to your account
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Email Field */}
                <div className="group">
                  <label className="block text-xs font-medium text-[#1e293b] mb-1 group-focus-within:text-[#2563eb] transition-colors">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8] group-focus-within:text-[#2563eb] transition-colors" size={16} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-[#e2e8f0] rounded-lg focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-all text-[#1e293b] disabled:bg-gray-100"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="group">
                  <label className="block text-xs font-medium text-[#1e293b] mb-1 group-focus-within:text-[#2563eb] transition-colors">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8] group-focus-within:text-[#2563eb] transition-colors" size={16} />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading}
                      className="w-full pl-9 pr-9 py-2 text-sm border border-[#e2e8f0] rounded-lg focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-all text-[#1e293b] disabled:bg-gray-100"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#2563eb] transition-colors"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-3.5 h-3.5 border-[#e2e8f0] rounded text-[#2563eb] focus:ring-[#2563eb] transition-transform group-hover:scale-110"
                    />
                    <span className="text-xs text-[#475569] group-hover:text-[#2563eb] transition-colors">
                      Remember me
                    </span>
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-xs text-[#2563eb] hover:text-[#1d4ed8] hover:scale-105 transition-transform"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#2563eb] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-[#1d4ed8] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-md hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign in</span>
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>

                {/* Register Link */}
                <p className="text-center text-xs text-[#64748b]">
                  Don't have an account?{" "}
                  <Link 
                    to="/register" 
                    className="text-[#2563eb] font-medium hover:text-[#1d4ed8] hover:underline transition-all"
                  >
                    Register Now
                  </Link>
                </p>

                {/* Demo Credentials with Multiple Roles */}
                <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-3 hover:border-[#2563eb] transition-all group">
                  <p className="text-xs font-medium text-[#1e293b] mb-2 group-hover:text-[#2563eb] transition-colors">
                    Demo Credentials (Click to fill):
                  </p>
                  
                  {/* Admin Demo */}
                  <div className="flex items-center justify-between mb-2 pb-2 border-b border-[#e2e8f0]">
                    <div>
                      <p className="text-xs font-medium text-[#1e293b]">Admin</p>
                      <p className="text-xs text-[#64748b]">admin@tasksense.com</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => fillDemoCredentials('admin')}
                      className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded hover:bg-purple-200 transition"
                    >
                      Fill Admin
                    </button>
                  </div>

                  {/* Manager Demo */}
                  <div className="flex items-center justify-between mb-2 pb-2 border-b border-[#e2e8f0]">
                    <div>
                      <p className="text-xs font-medium text-[#1e293b]">Manager</p>
                      <p className="text-xs text-[#64748b]">manager@tasksense.com</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => fillDemoCredentials('manager')}
                      className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition"
                    >
                      Fill Manager
                    </button>
                  </div>

                  {/* Member Demo */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-[#1e293b]">Member</p>
                      <p className="text-xs text-[#64748b]">member@tasksense.com</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => fillDemoCredentials('member')}
                      className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200 transition"
                    >
                      Fill Member
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#e2e8f0] py-3 animate-fadeIn" style={{ animationDelay: '0.8s' }}>
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-[#64748b]">
          <p>© 2024 TaskSense AI. All rights reserved.</p>
        </div>
      </footer>

      {/* Animations */}
      <style>{`
        @keyframes slideDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes slideIn {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideRight {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.5s ease-out;
        }
        
        .animate-slideIn {
          animation: slideIn 0.8s ease-out forwards;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        
        .animate-slideRight {
          animation: slideRight 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle, User, Phone } from "lucide-react";
import toast from "react-hot-toast";
import api from "../config/api";

export default function Register() {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  
  // Animation states
  const [pageLoaded, setPageLoaded] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

  const navigate = useNavigate();

  // Trigger animations after page load
  useEffect(() => {
    setPageLoaded(true);
    setTimeout(() => setFormVisible(true), 200);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle register submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.password.trim() || !formData.confirmPassword.trim()) {
      toast.error("Please fill all fields");
      return;
    }

    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (formData.phone.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!agreeTerms) {
      toast.error("Please agree to terms and conditions");
      return;
    }

    setLoading(true);

    try {
      // API call to your backend
      const response = await api.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      });

      toast.success(
        <div className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-[#10b981]" />
          <span>Registration successful! Redirecting to login...</span>
        </div>
      );
      
      // Redirect to login page
      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (error) {
      if (error.response?.status === 409) {
        toast.error("Email already exists. Please use a different email.");
      } else {
        toast.error(error?.response?.data?.message || "Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Quick fill demo credentials
  const fillDemoCredentials = () => {
    setFormData({
      name: "John Doe",
      email: "john.doe@tasksense.com",
      phone: "9876543210",
      password: "password123",
      confirmPassword: "password123"
    });
    setAgreeTerms(true);
    toast.success("Demo credentials filled!");
  };

  return (
    <div className={`min-h-screen bg-linear-to-br from-[#f8fafc] to-[#eef2f6] transition-opacity duration-700 ${pageLoaded ? 'opacity-100' : 'opacity-0'} flex flex-col`}>
      
      {/* Simple Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-[#e2e8f0] px-6 py-3 sticky top-0 z-10 animate-slideDown">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo with hover animation */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-[#2563eb] rounded-lg flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-300">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="text-xl font-semibold text-[#1e293b] group-hover:text-[#2563eb] transition-colors">
              TaskSense AI
            </span>
          </Link>

          {/* Nav Links */}
          <div className="flex items-center space-x-4">
            <Link 
              to="/login" 
              className="bg-[#2563eb] text-white px-5 py-2 rounded-lg text-sm hover:bg-[#1d4ed8] hover:shadow-md hover:scale-105 transition-all"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-[#2563eb] text-white px-5 py-2 rounded-lg text-sm hover:bg-[#1d4ed8] hover:shadow-md hover:scale-105 transition-all"
            >
              Register
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content - Centered Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          
          {/* Centered Register Form */}
          <div 
            className={`bg-white rounded-2xl shadow-xl p-8 border border-[#e2e8f0] transform transition-all duration-700 ${
              formVisible ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'
            }`}
          >
            
            {/* Form Header - Centered */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-[#dbeafe] rounded-full flex items-center justify-center mx-auto mb-3">
                <User className="w-8 h-8 text-[#2563eb]" />
              </div>
              <h2 className="text-2xl font-bold text-[#1e293b]">Create Account</h2>
              <p className="text-sm text-[#64748b] mt-1">
                Join TaskSense AI today
              </p>
            </div>

            

            {/* Register Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Name Field */}
              <div className="group">
                <label className="block text-sm font-medium text-[#1e293b] mb-1 group-focus-within:text-[#2563eb] transition-colors">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8] group-focus-within:text-[#2563eb] transition-colors" size={18} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2.5 text-sm border border-[#e2e8f0] rounded-lg focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-all text-[#1e293b]"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="group">
                <label className="block text-sm font-medium text-[#1e293b] mb-1 group-focus-within:text-[#2563eb] transition-colors">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8] group-focus-within:text-[#2563eb] transition-colors" size={18} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2.5 text-sm border border-[#e2e8f0] rounded-lg focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-all text-[#1e293b]"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div className="group">
                <label className="block text-sm font-medium text-[#1e293b] mb-1 group-focus-within:text-[#2563eb] transition-colors">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8] group-focus-within:text-[#2563eb] transition-colors" size={18} />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2.5 text-sm border border-[#e2e8f0] rounded-lg focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-all text-[#1e293b]"
                    placeholder="9876543210"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="group">
                <label className="block text-sm font-medium text-[#1e293b] mb-1 group-focus-within:text-[#2563eb] transition-colors">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8] group-focus-within:text-[#2563eb] transition-colors" size={18} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-10 py-2.5 text-sm border border-[#e2e8f0] rounded-lg focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-all text-[#1e293b]"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#2563eb] transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <p className="text-xs text-[#94a3b8] mt-1">Minimum 6 characters</p>
              </div>

              {/* Confirm Password Field */}
              <div className="group">
                <label className="block text-sm font-medium text-[#1e293b] mb-1 group-focus-within:text-[#2563eb] transition-colors">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8] group-focus-within:text-[#2563eb] transition-colors" size={18} />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-10 pr-10 py-2.5 text-sm border border-[#e2e8f0] rounded-lg focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-all text-[#1e293b]"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#2563eb] transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Terms & Conditions - Centered */}
              <div className="flex items-center justify-center space-x-2 py-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 border-[#e2e8f0] rounded text-[#2563eb] focus:ring-[#2563eb] transition-transform hover:scale-110"
                />
                <label htmlFor="terms" className="text-xs text-[#475569]">
                  I agree to the{" "}
                  <Link to="/terms" className="text-[#2563eb] hover:underline">
                    Terms
                  </Link>{" "}
                  &{" "}
                  <Link to="/privacy" className="text-[#2563eb] hover:underline">
                    Privacy
                  </Link>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#2563eb] text-white py-3 rounded-lg text-sm font-medium hover:bg-[#1d4ed8] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>

              {/* Login Link - Centered */}
              <p className="text-center text-sm text-[#64748b] pt-2">
                Already have an account?{" "}
                <Link 
                  to="/login" 
                  className="text-[#2563eb] font-medium hover:text-[#1d4ed8] hover:underline transition-all"
                >
                  Sign in
                </Link>
              </p>
              {/* Demo Credentials - Centered */}
            <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-4 mb-6 hover:border-[#2563eb] transition-all group text-center">
              <p className="text-xs font-medium text-[#1e293b] mb-2 group-hover:text-[#2563eb] transition-colors">
                Quick Demo Fill
              </p>
              <button
                onClick={fillDemoCredentials}
                className="text-xs text-[#2563eb] hover:underline hover:translate-x-1 transition-transform inline-flex items-center gap-1"
              >
                Fill with demo data <ArrowRight size={12} />
              </button>
            </div>
            </form>
          </div>

          {/* Footer Note - Centered */}
          <p className="text-center text-xs text-[#64748b] mt-6">
            By creating an account, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>

      {/* Simple Footer */}
      <footer className="border-t border-[#e2e8f0] py-4">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-[#64748b]">
          <p>© 2024 TaskSense AI. All rights reserved.</p>
        </div>
      </footer>

      {/* Animations */}
      <style jsx>{`
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
        
        .animate-slideDown {
          animation: slideDown 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
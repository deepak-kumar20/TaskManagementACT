import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { registerUser, loginUser } from "../services/api";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const validateEmail = (email) => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      const registerResponse = await registerUser(formData);

      if (registerResponse.data.success) {
        const loginResponse = await loginUser({
          email: formData.email,
          password: formData.password,
        });

        if (loginResponse.data.success) {
          login(loginResponse.data.user, loginResponse.data.token);
          navigate("/dashboard");
        }
      } else {
        setError(registerResponse.data.message || "Registration failed");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  const formVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  return (
    <div
      style={{ backgroundColor: "#E6E8F0" }}
      className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-indigo-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-indigo-500/5 rounded-full blur-3xl"></div>

      <motion.div
        className="w-full max-w-5xl relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div
          style={{ backgroundColor: "#D9DCE5" }}
          className="rounded-2xl shadow-2xl overflow-hidden border border-gray-300"
        >
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left Side - Image Section */}
            <motion.div
              style={{ backgroundColor: "#111111" }}
              className="hidden md:flex items-center justify-center p-12"
              variants={imageVariants}
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                  className="mb-6"
                >
                  <div
                    style={{
                      backgroundColor: "#E6E8F0",
                      borderColor: "#7C83FD",
                    }}
                    className="w-32 h-32 rounded-full shadow-lg flex items-center justify-center mx-auto border-2"
                  >
                    <svg
                      style={{ color: "#7C83FD" }}
                      className="w-16 h-16"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </motion.div>
                <motion.h2
                  className="text-4xl font-black mb-4"
                  style={{ color: "#E6E8F0" }}
                  variants={itemVariants}
                >
                  JOIN TODAY
                </motion.h2>
                <motion.p
                  style={{ color: "#D9DCE5" }}
                  className="text-lg font-medium"
                  variants={itemVariants}
                >
                  Get started with your account instantly
                </motion.p>
              </div>
            </motion.div>

            {/* Right Side - Form Section */}
            <motion.div className="p-8 md:p-12" variants={formVariants}>
              <motion.h1
                style={{ color: "#000000" }}
                className="text-3xl font-black mb-2"
                variants={itemVariants}
              >
                CREATE ACCOUNT
              </motion.h1>
              <motion.p
                style={{ color: "#4B5563" }}
                className="mb-8 font-medium"
                variants={itemVariants}
              >
                Sign up to unlock powerful features
              </motion.p>

              {error && (
                <motion.div
                  className="mb-6 p-4 border-l-4 border-red-500 rounded"
                  style={{ backgroundColor: "#FFE6E6" }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <p
                    className="text-sm font-medium"
                    style={{ color: "#7C0000" }}
                  >
                    {error}
                  </p>
                </motion.div>
              )}

              <motion.form
                onSubmit={handleSubmit}
                className="space-y-5"
                variants={containerVariants}
              >
                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="name"
                    className="block text-sm font-bold mb-2 uppercase tracking-wide"
                    style={{ color: "#000000" }}
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={loading}
                    placeholder="John Doe"
                    style={{
                      backgroundColor: "#E6E8F0",
                      color: "#000000",
                      borderColor: "#D9DCE5",
                    }}
                    className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition"
                    onFocus={(e) => (e.target.style.borderColor = "#7C83FD")}
                    onBlur={(e) => (e.target.style.borderColor = "#D9DCE5")}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="email"
                    className="block text-sm font-bold mb-2 uppercase tracking-wide"
                    style={{ color: "#000000" }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={loading}
                    placeholder="you@example.com"
                    style={{
                      backgroundColor: "#E6E8F0",
                      color: "#000000",
                      borderColor: "#D9DCE5",
                    }}
                    className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition"
                    onFocus={(e) => (e.target.style.borderColor = "#7C83FD")}
                    onBlur={(e) => (e.target.style.borderColor = "#D9DCE5")}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="password"
                    className="block text-sm font-bold mb-2 uppercase tracking-wide"
                    style={{ color: "#000000" }}
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={loading}
                    placeholder="At least 6 characters"
                    style={{
                      backgroundColor: "#E6E8F0",
                      color: "#000000",
                      borderColor: "#D9DCE5",
                    }}
                    className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition"
                    onFocus={(e) => (e.target.style.borderColor = "#7C83FD")}
                    onBlur={(e) => (e.target.style.borderColor = "#D9DCE5")}
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ backgroundColor: "#7C83FD" }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#6B75E8")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#7C83FD")
                  }
                  className="w-full text-white font-bold py-3 px-4 rounded-lg transition duration-200 uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Creating Account...
                    </span>
                  ) : (
                    "Create Account"
                  )}
                </motion.button>
              </motion.form>

              <motion.div
                className="mt-8 pt-8 text-center"
                style={{ borderTop: "1px solid #D9DCE5" }}
                variants={itemVariants}
              >
                <p className="text-sm" style={{ color: "#4B5563" }}>
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-bold transition"
                    style={{ color: "#7C83FD" }}
                  >
                    Sign In
                  </Link>
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

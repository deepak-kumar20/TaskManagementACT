import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function About() {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: "#E6E8F0" }} className="min-h-screen">
      {/* Header Navigation */}
      <nav
        style={{ backgroundColor: "#111111" }}
        className="shadow-lg border-b border-indigo-900/50 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-black" style={{ color: "#7C83FD" }}>
              FULLSTACK ACT
            </h1>
            <button
              onClick={() => navigate("/dashboard")}
              style={{ backgroundColor: "#7C83FD" }}
              className="px-6 py-2 text-white font-bold rounded-lg transition duration-200 uppercase text-sm tracking-wide hover:opacity-90"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1
              className="text-6xl md:text-7xl font-black mb-6 leading-tight"
              style={{ color: "#000000" }}
            >
              TASK MANAGEMENT
              <br />
              <span style={{ color: "#7C83FD" }}>EVOLVED</span>
            </h1>
            <p
              className="text-xl max-w-3xl mx-auto mb-8"
              style={{ color: "#4B5563" }}
            >
              A powerful platform designed to streamline your workflow, manage
              leads, and organize teams with cutting-edge technology.
            </p>
          </motion.div>
        </div>

        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-indigo-500/10 rounded-full blur-3xl"></div>
      </section>

      {/* Features Section - 3 Column Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-3 gap-8 mb-20"
        >
          {/* Feature 1 */}
          <motion.div
            whileHover={{ y: -8 }}
            style={{ backgroundColor: "#D9DCE5", borderColor: "#7C83FD" }}
            className="rounded-lg p-8 border hover:border-opacity-100 transition"
          >
            <div
              style={{ backgroundColor: "#7C83FD" }}
              className="w-16 h-16 rounded-lg flex items-center justify-center mb-6"
            >
              <span className="text-2xl">📋</span>
            </div>
            <h3
              className="text-2xl font-black mb-4"
              style={{ color: "#000000" }}
            >
              TASK MASTERY
            </h3>
            <p style={{ color: "#4B5563" }}>
              Create, organize, and track tasks with intuitive workflows. Never
              miss a deadline with real-time updates and status tracking.
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            whileHover={{ y: -8 }}
            style={{ backgroundColor: "#D9DCE5", borderColor: "#7C83FD" }}
            className="rounded-lg p-8 border hover:border-opacity-100 transition"
          >
            <div
              style={{ backgroundColor: "#7C83FD" }}
              className="w-16 h-16 rounded-lg flex items-center justify-center mb-6"
            >
              <span className="text-2xl">👥</span>
            </div>
            <h3
              className="text-2xl font-black mb-4"
              style={{ color: "#000000" }}
            >
              LEAD GENERATION
            </h3>
            <p style={{ color: "#4B5563" }}>
              Manage sales leads efficiently. Track prospects through every
              stage of your sales pipeline with professional contact management.
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            whileHover={{ y: -8 }}
            style={{ backgroundColor: "#D9DCE5", borderColor: "#7C83FD" }}
            className="rounded-lg p-8 border hover:border-opacity-100 transition"
          >
            <div
              style={{ backgroundColor: "#7C83FD" }}
              className="w-16 h-16 rounded-lg flex items-center justify-center mb-6"
            >
              <span className="text-2xl">⚡</span>
            </div>
            <h3
              className="text-2xl font-black mb-4"
              style={{ color: "#000000" }}
            >
              HIGH PERFORMANCE
            </h3>
            <p style={{ color: "#4B5563" }}>
              Built on modern tech stack. Lightning-fast performance with
              real-time synchronization across all your devices.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Why Choose Us Section */}
      <section
        style={{ backgroundColor: "#D9DCE5" }}
        className="py-24 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2
                className="text-5xl font-black mb-6 leading-tight"
                style={{ color: "#000000" }}
              >
                WHY CHOOSE
                <br />
                <span style={{ color: "#7C83FD" }}>FULLSTACK ACT?</span>
              </h2>
              <p className="text-lg mb-8" style={{ color: "#4B5563" }}>
                We believe in creating a productive environment where you can
                thrive. Our platform is engineered to help you achieve your
                goals and unlock your full potential.
              </p>

              <div className="space-y-4">
                {[
                  "Seamless Integration - All tools in one place",
                  "Secure Authentication - Industry-standard JWT security",
                  "Real-time Updates - See changes instantly",
                  "Intuitive Interface - Easy to learn, powerful to use",
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-4"
                  >
                    <div
                      style={{ backgroundColor: "#7C83FD" }}
                      className="w-2 h-2 rounded-full"
                    ></div>
                    <p style={{ color: "#000000" }} className="font-medium">
                      {item}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              style={{ backgroundColor: "#111111" }}
              className="rounded-lg p-12 border border-gray-800 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-indigo-500/5"></div>
              <div className="relative">
                <h3
                  className="text-3xl font-black mb-8"
                  style={{ color: "#FFFFFF" }}
                >
                  BY THE NUMBERS
                </h3>
                <div className="grid grid-cols-2 gap-8">
                  {[
                    { number: "99.9%", label: "Uptime" },
                    { number: "10K+", label: "Users" },
                    { number: "50K+", label: "Tasks Managed" },
                    { number: "5x", label: "Faster Than Others" },
                  ].map((stat, index) => (
                    <div key={index} className="text-center">
                      <div
                        className="text-4xl font-black mb-2"
                        style={{ color: "#7C83FD" }}
                      >
                        {stat.number}
                      </div>
                      <p
                        className="uppercase tracking-wider text-sm font-bold"
                        style={{ color: "#D9DCE5" }}
                      >
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-black mb-6" style={{ color: "#000000" }}>
            BUILT WITH POWER TOOLS
          </h2>
          <p className="text-xl" style={{ color: "#4B5563" }}>
            Modern technology stack for superior performance
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            { name: "React", desc: "Frontend UI" },
            { name: "Node.js", desc: "Backend Server" },
            { name: "MongoDB", desc: "Database" },
            { name: "JWT", desc: "Authentication" },
          ].map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              style={{ backgroundColor: "#D9DCE5", borderColor: "#7C83FD" }}
              className="rounded-lg p-8 border hover:border-opacity-100 transition text-center"
            >
              <div
                className="text-4xl font-black mb-3"
                style={{ color: "#7C83FD" }}
              >
                {tech.name}
              </div>
              <p
                className="text-sm uppercase tracking-wide"
                style={{ color: "#4B5563" }}
              >
                {tech.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section
        style={{ backgroundColor: "#E6E8F0" }}
        className="py-20 relative overflow-hidden"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2
              className="text-5xl font-black mb-6"
              style={{ color: "#000000" }}
            >
              READY TO TRANSFORM
              <br />
              YOUR WORKFLOW?
            </h2>
            <p className="text-xl mb-8" style={{ color: "#4B5563" }}>
              Join thousands of productive professionals using FullStack ACT
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/dashboard")}
              style={{ backgroundColor: "#7C83FD" }}
              className="px-10 py-4 text-white font-black rounded-lg transition duration-200 uppercase tracking-wide text-lg shadow-lg hover:opacity-90"
            >
              Get Started Now
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-indigo-900/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-lg font-black text-white mb-4">
                FULLSTACK ACT
              </h3>
              <p className="text-gray-400">
                Professional task management for modern teams.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-black text-gray-300 mb-4 uppercase tracking-wide">
                Product
              </h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-blue-500 transition">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500 transition">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500 transition">
                    Security
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-black text-gray-300 mb-4 uppercase tracking-wide">
                Support
              </h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-blue-500 transition">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500 transition">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500 transition">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-black text-gray-300 mb-4 uppercase tracking-wide">
                Legal
              </h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-blue-500 transition">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500 transition">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500 transition">
                    License
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-900 pt-8">
            <p className="text-center text-sm" style={{ color: "#4B5563" }}>
              © 2026 FullStack ACT. All rights reserved. | Built with ❤️ by the
              development team
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

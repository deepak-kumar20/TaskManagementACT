import React, { useState } from "react";
import { motion } from "framer-motion";

export default function ContactLeadModal({ isOpen, onClose, lead }) {
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);

  if (!isOpen || !lead) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate sending message
    setShowSuccess(true);
    setTimeout(() => {
      setFormData({ subject: "", message: "" });
      setShowSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-lg shadow-2xl w-full max-w-md"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-600 to-blue-600 p-6 text-white flex justify-between items-center rounded-t-lg">
          <div>
            <h2 className="text-2xl font-bold">Contact Lead</h2>
            <p className="text-sky-100 text-sm mt-1">{lead.name}</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1 w-8 h-8 flex items-center justify-center"
          >
            ✕
          </motion.button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {showSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-8 text-center"
            >
              <div className="text-4xl mb-3">✓</div>
              <p className="text-green-600 font-semibold">
                Message sent to {lead.name}!
              </p>
            </motion.div>
          ) : (
            <>
              {/* Lead Info */}
              <div className="bg-sky-50 p-4 rounded-lg border border-sky-200">
                <p className="text-xs text-gray-600 uppercase tracking-wide font-semibold mb-1">
                  Sending to
                </p>
                <p className="text-sm text-gray-900 font-medium">
                  {lead.email}
                </p>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g., Following up on our discussion"
                  className="w-full px-4 py-2 border border-sky-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Type your message here..."
                  rows="4"
                  className="w-full px-4 py-2 border border-sky-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <motion.button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-semibold transition"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send
                </motion.button>
              </div>
            </>
          )}
        </form>
      </motion.div>
    </motion.div>
  );
}

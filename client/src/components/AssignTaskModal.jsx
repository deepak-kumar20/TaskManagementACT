import React, { useState } from "react";
import { motion } from "framer-motion";

export default function AssignTaskModal({ isOpen, onClose, task, onAssign }) {
  const [selectedMember, setSelectedMember] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!isOpen || !task) return null;

  const teamMembers = [
    { id: 1, name: "Alice Johnson" },
    { id: 2, name: "Bob Wilson" },
    { id: 3, name: "Carol Davis" },
    { id: 4, name: "David Miller" },
  ];

  const handleAssign = (e) => {
    e.preventDefault();
    if (!selectedMember) return;

    // Call the onAssign callback with the selected member
    if (onAssign) {
      onAssign(selectedMember);
    }

    setShowSuccess(true);
    setTimeout(() => {
      setSelectedMember(null);
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
            <h2 className="text-2xl font-bold">Assign Task</h2>
            <p className="text-sky-100 text-sm mt-1">{task.title}</p>
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
        <form onSubmit={handleAssign} className="p-6 space-y-4">
          {showSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-8 text-center"
            >
              <div className="text-4xl mb-3">✓</div>
              <p className="text-green-600 font-semibold">
                Task assigned successfully!
              </p>
            </motion.div>
          ) : (
            <>
              {/* Task Info */}
              <div className="bg-sky-50 p-4 rounded-lg border border-sky-200">
                <p className="text-xs text-gray-600 uppercase tracking-wide font-semibold mb-1">
                  Task Priority
                </p>
                <p
                  className={`text-sm font-semibold ${
                    task.priority === "High"
                      ? "text-red-600"
                      : task.priority === "Medium"
                        ? "text-yellow-600"
                        : "text-green-600"
                  }`}
                >
                  {task.priority}
                </p>
              </div>

              {/* Team Member Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Assign to Team Member
                </label>
                <div className="space-y-2">
                  {teamMembers.map((member) => (
                    <motion.label
                      key={member.id}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center p-3 border-2 rounded-lg cursor-pointer transition"
                      style={{
                        borderColor:
                          selectedMember?.id === member.id
                            ? "#0284c7"
                            : "#e5e7eb",
                        backgroundColor:
                          selectedMember?.id === member.id
                            ? "#f0f9ff"
                            : "#ffffff",
                      }}
                    >
                      <input
                        type="radio"
                        name="member"
                        value={member.id}
                        checked={selectedMember?.id === member.id}
                        onChange={() => setSelectedMember(member)}
                        className="w-4 h-4 text-sky-600"
                      />
                      <span className="ml-3 font-medium text-gray-900">
                        {member.name}
                      </span>
                    </motion.label>
                  ))}
                </div>
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
                  disabled={!selectedMember}
                  className="flex-1 px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-semibold transition disabled:opacity-50"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Assign
                </motion.button>
              </div>
            </>
          )}
        </form>
      </motion.div>
    </motion.div>
  );
}

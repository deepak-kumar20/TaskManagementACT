import React from "react";
import { motion } from "framer-motion";

export default function LeadCard({ lead, onContactClick, onDetailsClick }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 p-6 border-l-4 border-sky-500"
    >
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-sky-500 rounded-full flex items-center justify-center text-white font-bold">
          {lead.name.charAt(0)}
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-900">{lead.name}</h3>
          <p className="text-sm text-gray-600">{lead.company}</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-start">
          <span className="text-sm text-gray-600 font-medium">Email:</span>
          <a
            href={`mailto:${lead.email}`}
            className="text-sm text-sky-500 hover:text-sky-600 ml-2 break-all"
          >
            {lead.email}
          </a>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 flex gap-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onContactClick(lead)}
          className="flex-1 text-center px-3 py-2 bg-sky-50 text-sky-600 hover:bg-sky-100 font-semibold text-sm rounded-lg transition"
        >
          Contact
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onDetailsClick(lead)}
          className="flex-1 text-center px-3 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 font-semibold text-sm rounded-lg transition"
        >
          Details
        </motion.button>
      </div>
    </motion.div>
  );
}

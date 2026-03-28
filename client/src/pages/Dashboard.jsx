import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import {
  getDashboardData,
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../services/api";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import UserCard from "../components/UserCard";
import TaskDetailsModal from "../components/TaskDetailsModal";
import AssignTaskModal from "../components/AssignTaskModal";
import UserDetailsModal from "../components/UserDetailsModal";
import TaskFormModal from "../components/TaskFormModal";
import LeadCard from "../components/LeadCard";
import LeadDetailsModal from "../components/LeadDetailsModal";
import ContactLeadModal from "../components/ContactLeadModal";

export default function Dashboard() {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [userTasks, setUserTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [taskLoading, setTaskLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedLead, setSelectedLead] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDashboardData();
        if (response.data.success) {
          setDashboardData(response.data.data);
        } else {
          setError("Failed to fetch dashboard data");
        }

        // Load user's created tasks
        const tasksResponse = await getTasks();
        if (tasksResponse.data.success) {
          setUserTasks(tasksResponse.data.data || []);
        }
      } catch (err) {
        setError(err.message || "Failed to fetch dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCreateTask = async (taskData) => {
    try {
      setTaskLoading(true);
      const response = await createTask(taskData);
      if (response.data.success) {
        setUserTasks([...userTasks, response.data.data]);
        setShowTaskForm(false);
        setError("");
      }
    } catch (err) {
      setError("Failed to create task");
      console.error(err);
    } finally {
      setTaskLoading(false);
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      setTaskLoading(true);
      const response = await updateTask(editingTask._id, taskData);
      if (response.data.success) {
        setUserTasks(
          userTasks.map((t) =>
            t._id === editingTask._id ? response.data.data : t,
          ),
        );
        setShowTaskForm(false);
        setEditingTask(null);
        setError("");
      }
    } catch (err) {
      setError("Failed to update task");
      console.error(err);
    } finally {
      setTaskLoading(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        setTaskLoading(true);
        const response = await deleteTask(taskId);
        if (response.data.success) {
          setUserTasks(userTasks.filter((t) => t._id !== taskId));
          setError("");
        }
      } catch (err) {
        setError("Failed to delete task");
        console.error(err);
      } finally {
        setTaskLoading(false);
      }
    }
  };

  const openEditForm = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleAssignSampleTask = (memberObject) => {
    if (selectedTask && dashboardData) {
      // Update the selected task with assigned member name
      const updatedTask = { ...selectedTask, assignedTo: memberObject.name };
      setSelectedTask(updatedTask);

      // Update dashboardData
      const updatedTasks = dashboardData.tasks.map((t) =>
        t.id === selectedTask.id ? updatedTask : t,
      );
      setDashboardData({ ...dashboardData, tasks: updatedTasks });
    }
  };

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#E6E8F0" }}
      >
        <div className="text-center">
          <div
            className="inline-block animate-spin rounded-full h-12 w-12 border-b-2"
            style={{ borderColor: "#7C83FD" }}
          ></div>
          <p className="mt-4" style={{ color: "#000000" }}>
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#E6E8F0" }}>
      <Navbar user={user} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ backgroundColor: "#111111" }}
            className="mb-8 p-4 border-l-4 border-red-500 rounded"
          >
            <p className="text-white font-medium">{error}</p>
          </motion.div>
        )}

        {dashboardData && (
          <>
            {/* Dashboard Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, staggerChildren: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12"
            >
              {[
                {
                  label: "My Tasks",
                  value: userTasks.length,
                  icon: "✓",
                },
                {
                  label: "Total Tasks",
                  value: dashboardData.tasks.length,
                  icon: "📋",
                },
                {
                  label: "Total Leads",
                  value: dashboardData.leads.length,
                  icon: "👥",
                },
                {
                  label: "Users",
                  value: dashboardData.users.length,
                  icon: "👤",
                },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{
                    y: -6,
                    boxShadow: "0 12px 24px rgba(124,131,253,0.15)",
                  }}
                  style={{ backgroundColor: "#D9DCE5" }}
                  className="rounded-lg shadow-md hover:shadow-xl p-6 border-t-4 border-indigo-500 transition-all duration-300"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p
                        style={{ color: "#4B5563" }}
                        className="text-sm font-bold uppercase tracking-wide"
                      >
                        {stat.label}
                      </p>
                      <p
                        style={{ color: "#7C83FD" }}
                        className="text-4xl font-black mt-3"
                      >
                        {stat.value}
                      </p>
                    </div>
                    <div
                      style={{ color: "#7C83FD" }}
                      className="text-3xl opacity-30"
                    >
                      {stat.icon}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* My Tasks Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-12"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <h2
                    style={{ color: "#000000" }}
                    className="text-3xl font-black"
                  >
                    MY TASKS
                  </h2>
                  <div
                    style={{ backgroundColor: "#7C83FD" }}
                    className="ml-4 h-1 w-16 rounded"
                  ></div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setEditingTask(null);
                    setShowTaskForm(true);
                  }}
                  className="px-6 py-2 text-white rounded-lg font-bold transition-all"
                  style={{ backgroundColor: "#7C83FD" }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#6B75E8")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#7C83FD")
                  }
                >
                  + Create Task
                </motion.button>
              </div>

              {userTasks.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ backgroundColor: "#D9DCE5" }}
                  className="rounded-lg p-12 text-center border border-gray-300"
                >
                  <p style={{ color: "#4B5563" }} className="text-lg">
                    No tasks yet. Create one to get started!
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  layout
                >
                  {userTasks.map((task) => (
                    <motion.div
                      key={task._id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                      layoutId={task._id}
                      whileHover={{
                        y: -6,
                        boxShadow: "0 12px 24px rgba(124,131,253,0.15)",
                      }}
                      style={{ backgroundColor: "#D9DCE5" }}
                      className="rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 border-l-4 border-indigo-500 hover:border-indigo-400"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <h3
                          style={{ color: "#000000" }}
                          className="text-lg font-bold flex-1"
                        >
                          {task.title}
                        </h3>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span
                            style={{ color: "#4B5563" }}
                            className="text-sm font-medium"
                          >
                            Status
                          </span>
                          <span
                            className={`text-sm font-semibold ${
                              task.status === "Completed"
                                ? "text-green-600"
                                : task.status === "In Progress"
                                  ? "text-indigo-600"
                                  : "text-yellow-600"
                            }`}
                          >
                            {task.status}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span
                            style={{ color: "#4B5563" }}
                            className="text-sm font-medium"
                          >
                            Priority
                          </span>
                          <span
                            className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                              task.priority === "High"
                                ? "bg-red-900 text-red-300 border-red-700"
                                : task.priority === "Medium"
                                  ? "bg-yellow-900 text-yellow-300 border-yellow-700"
                                  : "bg-green-900 text-green-300 border-green-700"
                            }`}
                          >
                            {task.priority}
                          </span>
                        </div>
                      </div>

                      <div
                        className="mt-4 pt-4 border-t flex gap-2"
                        style={{ borderColor: "#D9DCE5" }}
                      >
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => openEditForm(task)}
                          style={{ backgroundColor: "#7C83FD" }}
                          className="flex-1 text-center px-3 py-2 text-white hover:opacity-90 font-bold text-sm rounded-lg transition"
                        >
                          Edit
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleDeleteTask(task._id)}
                          className="flex-1 text-center px-3 py-2 bg-red-600 text-white hover:bg-red-500 font-bold text-sm rounded-lg transition"
                        >
                          Delete
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.section>

            {/* Tasks Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-12"
            >
              <div className="flex items-center mb-6">
                <h2
                  style={{ color: "#000000" }}
                  className="text-3xl font-black"
                >
                  SAMPLE TASKS
                </h2>
                <div
                  style={{ backgroundColor: "#7C83FD" }}
                  className="ml-4 h-1 w-16 rounded"
                ></div>
              </div>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
              >
                {dashboardData.tasks.map((task) => (
                  <motion.div
                    key={task.id}
                    variants={{
                      hidden: { opacity: 0, scale: 0.8 },
                      visible: { opacity: 1, scale: 1 },
                    }}
                  >
                    <TaskCard
                      task={task}
                      onViewClick={(t) => {
                        setSelectedTask(t);
                        setShowTaskModal(true);
                      }}
                      onAssignClick={(t) => {
                        setSelectedTask(t);
                        setShowAssignModal(true);
                      }}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>

            {/* Leads Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-12"
            >
              <div className="flex items-center mb-6">
                <h2
                  style={{ color: "#000000" }}
                  className="text-3xl font-black"
                >
                  LEADS
                </h2>
                <div
                  style={{ backgroundColor: "#7C83FD" }}
                  className="ml-4 h-1 w-16 rounded"
                ></div>
              </div>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
              >
                {dashboardData.leads && dashboardData.leads.length > 0 ? (
                  dashboardData.leads.map((lead) => (
                    <motion.div
                      key={lead.id}
                      variants={{
                        hidden: { opacity: 0, scale: 0.8 },
                        visible: { opacity: 1, scale: 1 },
                      }}
                    >
                      <LeadCard
                        lead={lead}
                        onDetailsClick={(l) => {
                          setSelectedLead(l);
                          setShowLeadModal(true);
                        }}
                        onContactClick={(l) => {
                          setSelectedLead(l);
                          setShowContactModal(true);
                        }}
                      />
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{ backgroundColor: "#D9DCE5" }}
                    className="col-span-full rounded-lg p-12 text-center border border-gray-300"
                  >
                    <p style={{ color: "#4B5563" }} className="text-lg">
                      No leads available
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </motion.section>

            {/* Users Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="flex items-center mb-6">
                <h2
                  style={{ color: "#000000" }}
                  className="text-3xl font-black"
                >
                  USERS
                </h2>
                <div
                  style={{ backgroundColor: "#7C83FD" }}
                  className="ml-4 h-1 w-16 rounded"
                ></div>
              </div>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
              >
                {dashboardData.users.map((userItem) => (
                  <motion.div
                    key={userItem.id}
                    variants={{
                      hidden: { opacity: 0, scale: 0.8 },
                      visible: { opacity: 1, scale: 1 },
                    }}
                  >
                    <UserCard
                      userItem={userItem}
                      onViewClick={(u) => {
                        setSelectedUser(u);
                        setShowUserModal(true);
                      }}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>
          </>
        )}
      </main>

      {/* Task Details Modal */}
      <TaskDetailsModal
        isOpen={showTaskModal}
        onClose={() => {
          setShowTaskModal(false);
          setSelectedTask(null);
        }}
        task={selectedTask}
      />

      {/* Assign Task Modal */}
      <AssignTaskModal
        isOpen={showAssignModal}
        onClose={() => {
          setShowAssignModal(false);
          setSelectedTask(null);
        }}
        task={selectedTask}
        onAssign={handleAssignSampleTask}
      />

      {/* Lead Details Modal */}
      <LeadDetailsModal
        isOpen={showLeadModal}
        onClose={() => {
          setShowLeadModal(false);
          setSelectedLead(null);
        }}
        lead={selectedLead}
      />

      {/* Contact Lead Modal */}
      <ContactLeadModal
        isOpen={showContactModal}
        onClose={() => {
          setShowContactModal(false);
          setSelectedLead(null);
        }}
        lead={selectedLead}
      />

      {/* Task Form Modal */}
      <TaskFormModal
        isOpen={showTaskForm}
        onClose={() => {
          setShowTaskForm(false);
          setEditingTask(null);
        }}
        onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
        editingTask={editingTask}
        loading={taskLoading}
      />

      {/* User Details Modal */}
      <UserDetailsModal
        isOpen={showUserModal}
        onClose={() => {
          setShowUserModal(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
      />
    </div>
  );
}

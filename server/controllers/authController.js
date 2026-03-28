import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate all fields
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide all fields" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password,
    });

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: userResponse,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate inputs
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide email and password" });
    }

    // Check user exists
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Compare password
    const isPasswordValid = await user.matchPassword(password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Create JWT token (use environment variable with fallback)
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "your_secret_key",
      {
        expiresIn: "7d",
        algorithm: "HS256",
      },
    );

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: userResponse,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Dashboard Data
export const getDashboardData = async (req, res) => {
  try {
    const userData = {
      tasks: [
        {
          id: 1,
          title: "Complete project",
          status: "In Progress",
          priority: "High",
        },
        { id: 2, title: "Review code", status: "Pending", priority: "Medium" },
        { id: 3, title: "Deploy app", status: "Pending", priority: "High" },
      ],
      leads: [
        {
          id: 1,
          name: "John Smith",
          company: "Tech Corp",
          email: "john@techcorp.com",
        },
        {
          id: 2,
          name: "Jane Doe",
          company: "Innovate Inc",
          email: "jane@innovate.com",
        },
        {
          id: 3,
          name: "Mike Johnson",
          company: "Future Labs",
          email: "mike@futurelabs.com",
        },
      ],
      users: [
        {
          id: 1,
          name: "Alice Brown",
          email: "alice@example.com",
          role: "Admin",
        },
        { id: 2, name: "Bob Wilson", email: "bob@example.com", role: "User" },
        {
          id: 3,
          name: "Carol Davis",
          email: "carol@example.com",
          role: "User",
        },
      ],
    };

    res.status(200).json({
      success: true,
      message: "Dashboard data retrieved",
      data: userData,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Valid email required",
      ],
    },
    phone: String,
    status: {
      type: String,
      enum: ["New", "Contacted", "Qualified", "Negotiating", "Won", "Lost"],
      default: "New",
    },
    notes: String,
  },
  { timestamps: true },
);

export default mongoose.model("Lead", leadSchema);

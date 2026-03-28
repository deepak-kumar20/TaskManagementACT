import Lead from "../models/Lead.js";

// Create Lead
export const createLead = async (req, res) => {
  try {
    const { name, company, email, phone, status, notes } = req.body;

    if (!name || !company || !email) {
      return res.status(400).json({
        success: false,
        message: "Name, company, and email required",
      });
    }

    const lead = await Lead.create({
      userId: req.user.id,
      name,
      company,
      email,
      phone,
      status: status || "New",
      notes,
    });

    res.status(201).json({
      success: true,
      message: "Lead created",
      data: lead,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all leads
export const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      message: "Leads retrieved",
      data: leads,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single lead
export const getLead = async (req, res) => {
  try {
    const lead = await Lead.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!lead) {
      return res
        .status(404)
        .json({ success: false, message: "Lead not found" });
    }

    res.status(200).json({
      success: true,
      message: "Lead retrieved",
      data: lead,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Lead
export const updateLead = async (req, res) => {
  try {
    let lead = await Lead.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!lead) {
      return res
        .status(404)
        .json({ success: false, message: "Lead not found" });
    }

    lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Lead updated",
      data: lead,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Lead
export const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!lead) {
      return res
        .status(404)
        .json({ success: false, message: "Lead not found" });
    }

    await Lead.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Lead deleted",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

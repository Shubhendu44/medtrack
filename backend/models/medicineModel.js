import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    dosage: {
      type: String,
      required: true,
    },

    // 🔹 Existing
    times: [
      {
        type: Date,
      },
    ],

    frequency: {
      type: String,
      enum: ["Daily", "Weekly", "Custom"],
      default: "Daily",
    },

    // 🔹 NEW (for advanced frequency logic later)
    frequencyCount: {
      type: Number,
      default: 1, // e.g., 2 times a day
    },

    customDays: [
      {
        type: String, // e.g., ["Monday", "Wednesday"]
      },
    ],

    startDate: {
      type: Date,
      default: Date.now,
    },

    endDate: {
      type: Date,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    // 🔹 NEW — Soft delete support
    isDeleted: {
      type: Boolean,
      default: false,
    },

    reminderEnabled: {
      type: Boolean,
      default: true,
    },

    expiryDate: {
      type: Date,
    },

    quantity: {
      type: Number,
      min: 0,
    },

    // ✅ DAILY TRACKING (unchanged but preserved)
    dailyLogs: [
      {
        date: {
          type: String, // DD-MM-YYYY
        },
        taken: {
          type: Boolean,
          default: false,
        },
      },
    ],

    notes: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Medicine = mongoose.model("Medicine", medicineSchema);
export default Medicine;
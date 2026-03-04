import Medicine from "../models/medicineModel.js";

/* ===============================
   ADD NEW MEDICINE
================================ */
export const addMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.create({
      ...req.body,
      user: req.user._id,
    });

    res.status(201).json(medicine);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/* ===============================
   GET USER MEDICINES
   (Auto-handle expired)
================================ */
export const getMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    const today = new Date();

    // Auto mark expired medicines inactive
    for (let med of medicines) {
      if (med.endDate && today > new Date(med.endDate)) {
        med.isActive = false;
        await med.save();
      }
    }

    res.status(200).json(medicines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   UPDATE MEDICINE
================================ */
export const updateMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!medicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    Object.assign(medicine, req.body);
    await medicine.save();

    res.status(200).json(medicine);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/* ===============================
   SOFT DELETE (Move to History)
================================ */
export const deleteMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!medicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    medicine.isDeleted = true;
    medicine.isActive = false;
    await medicine.save();

    res.status(200).json({
      message: "Medicine moved to history",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   TOGGLE TODAY STATUS
================================ */
export const toggleTodayStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const medicine = await Medicine.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!medicine) {
      return res.status(404).json({
        message: "Medicine not found",
      });
    }

    if (medicine.isDeleted) {
      return res.status(400).json({
        message: "Cannot update deleted medicine",
      });
    }

    const now = new Date();

    const formattedDate =
      String(now.getDate()).padStart(2, "0") +
      "-" +
      String(now.getMonth() + 1).padStart(2, "0") +
      "-" +
      now.getFullYear();

    const start = new Date(medicine.startDate);
    const end = medicine.endDate
      ? new Date(medicine.endDate)
      : null;

    const todayOnly = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );

    const startOnly = new Date(
      start.getFullYear(),
      start.getMonth(),
      start.getDate()
    );

    if (todayOnly < startOnly) {
      return res.status(400).json({
        message: "Medicine not started yet",
      });
    }

    if (end) {
      const endOnly = new Date(
        end.getFullYear(),
        end.getMonth(),
        end.getDate()
      );

      if (todayOnly > endOnly) {
        return res.status(400).json({
          message: "Medicine tenure ended",
        });
      }
    }

    const existingLog = medicine.dailyLogs.find(
      (log) => log.date === formattedDate
    );

    if (existingLog) {
      existingLog.taken = !existingLog.taken;
    } else {
      medicine.dailyLogs.push({
        date: formattedDate,
        taken: true,
      });
    }

    await medicine.save();

    res.status(200).json(medicine);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
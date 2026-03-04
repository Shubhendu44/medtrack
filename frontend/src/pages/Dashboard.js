import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  /* =========================
     STATE
  ========================= */

  const [medicines, setMedicines] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const medsPerPage = 6;

  const [form, setForm] = useState({
    name: "",
    dosage: "",
    frequency: "Daily",
    startDate: "",
    endDate: "",
  });

  const userName = localStorage.getItem("name");

  /* =========================
     PROTECT ROUTE
  ========================= */

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  /* =========================
     FETCH MEDICINES
  ========================= */

  const fetchMedicines = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("https://medtrack-mqas.onrender.com/api/medicines", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setMedicines(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }, []);

  useEffect(() => {
    fetchMedicines();
  }, [fetchMedicines]);

  /* =========================
     FILTER SECTIONS
  ========================= */

  const activeMeds = medicines.filter(
    (m) => !m.isDeleted && m.isActive !== false
  );

  const historyMeds = medicines.filter(
    (m) => m.isDeleted || m.isActive === false
  );

  /* =========================
     PAGINATION
  ========================= */

  const totalPages = Math.ceil(activeMeds.length / medsPerPage);
  const indexOfLast = currentPage * medsPerPage;
  const indexOfFirst = indexOfLast - medsPerPage;
  const currentActiveMeds = activeMeds.slice(indexOfFirst, indexOfLast);

  /* =========================
     ADD OR UPDATE
  ========================= */

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      if (editingId) {
        await fetch(
          `https://medtrack-mqas.onrender.com/api/medicines/${editingId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(form),
          }
        );
        setEditingId(null);
      } else {
        await fetch("https://medtrack-mqas.onrender.com/medicines", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        });
      }

      setForm({
        name: "",
        dosage: "",
        frequency: "Daily",
        startDate: "",
        endDate: "",
      });

      fetchMedicines();

    } catch (error) {
      console.error("Add/Update error:", error);
    }
  };

  const handleEdit = (med) => {
    setEditingId(med._id);
    setForm({
      name: med.name,
      dosage: med.dosage,
      frequency: med.frequency,
      startDate: med.startDate?.slice(0, 10),
      endDate: med.endDate?.slice(0, 10),
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({
      name: "",
      dosage: "",
      frequency: "Daily",
      startDate: "",
      endDate: "",
    });
  };

  /* =========================
     DELETE (SOFT)
  ========================= */

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    await fetch(`https://medtrack-mqas.onrender.com/api/medicines/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchMedicines();
  };

  /* =========================
     TOGGLE TODAY
  ========================= */

  const toggleToday = async (id) => {
    const token = localStorage.getItem("token");

    await fetch(
      `https://medtrack-mqas.onrender.com/api/medicines/toggle/${id}`,
      {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    fetchMedicines();
  };

  const getTodayString = () => {
    const today = new Date();
    return (
      String(today.getDate()).padStart(2, "0") +
      "-" +
      String(today.getMonth() + 1).padStart(2, "0") +
      "-" +
      today.getFullYear()
    );
  };

  /* =========================
     RENDER
  ========================= */

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#d8f3dc] to-[#b7e4c7] pt-28 pb-16 px-6 text-[#1b4332]">
      <div className="max-w-6xl mx-auto relative">

        <h1 className="text-3xl font-semibold mb-6">
          Welcome, {userName}
        </h1>

        {/* ================= ADD FORM ================= */}

        <div className="bg-white p-6 rounded-xl shadow border border-[#95d5b2] mb-12">

          <h3 className="text-lg font-semibold mb-6">
            {editingId ? "Edit Medicine" : "Add Medicine"}
          </h3>

          <form onSubmit={handleAddOrUpdate} className="grid md:grid-cols-2 gap-6">

            <input
              type="text"
              placeholder="Medicine Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="p-3 border rounded"
            />

            <input
              type="text"
              placeholder="Dosage"
              value={form.dosage}
              onChange={(e) => setForm({ ...form, dosage: e.target.value })}
              required
              className="p-3 border rounded"
            />

            <select
              value={form.frequency}
              onChange={(e) => setForm({ ...form, frequency: e.target.value })}
              className="p-3 border rounded"
            >
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Custom">Custom</option>
            </select>

            <input
              type="date"
              value={form.startDate}
              onChange={(e) => setForm({ ...form, startDate: e.target.value })}
              required
              className="p-3 border rounded"
            />

            <input
              type="date"
              value={form.endDate}
              onChange={(e) => setForm({ ...form, endDate: e.target.value })}
              required
              className="p-3 border rounded"
            />

            <div className="col-span-2 flex gap-4">

              <button
                className="bg-[#2d6a4f] text-white px-4 py-2 rounded text-sm"
              >
                {editingId ? "Update" : "Add"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="bg-gray-300 px-4 py-2 rounded text-sm"
                >
                  Cancel
                </button>
              )}

              <button
                type="button"
                onClick={() => setShowHistory(true)}
                className="ml-auto underline text-sm"
              >
                View History
              </button>

            </div>

          </form>
        </div>

        {/* ================= ACTIVE ================= */}

        <h2 className="text-xl mb-6">Active Medicines</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {currentActiveMeds.map((med) => {
            const today = getTodayString();
            const todayLog = med.dailyLogs?.find(
              (log) => log.date === today
            );
            const isTaken = todayLog?.taken || false;

            const bgColor = isTaken
              ? "bg-green-100 border-green-400"
              : "bg-yellow-100 border-yellow-400";

            return (
              <div key={med._id} className={`p-5 rounded-xl shadow border ${bgColor}`}>

                <h3 className="font-semibold">{med.name}</h3>
                <p>Dosage: {med.dosage}</p>
                <p>Frequency: {med.frequency}</p>
                <p>Start: {med.startDate?.slice(0,10)}</p>
                <p>End: {med.endDate?.slice(0,10)}</p>

                <div className="flex items-center mt-3 space-x-2">
                  <input
                    type="checkbox"
                    checked={isTaken}
                    onChange={() => toggleToday(med._id)}
                  />
                  <label>Mark as Taken</label>
                </div>

                <div className="flex justify-between mt-4 text-sm">
                  <button
                    onClick={() => handleEdit(med)}
                    className="text-blue-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(med._id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* ================= PAGINATION ================= */}

        {totalPages > 1 && (
          <div className="flex justify-center mt-8 space-x-6">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-white border rounded"
            >
              ◀ Prev
            </button>

            <span>
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-white border rounded"
            >
              Next ▶
            </button>
          </div>
        )}

        {/* ================= HISTORY SIDEBAR ================= */}

        {showHistory && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-40"
              onClick={() => setShowHistory(false)}
            />

            <div className="fixed top-0 right-0 w-96 h-full bg-white shadow-2xl p-6 overflow-y-auto transition-transform duration-300">

              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">History</h2>
                <button
                  onClick={() => setShowHistory(false)}
                  className="bg-gray-200 px-3 py-1 rounded text-sm"
                >
                  Back
                </button>
              </div>

              {historyMeds.length === 0 ? (
                <p>No history medicines.</p>
              ) : (
                historyMeds.map((med) => (
                  <div key={med._id} className="p-4 border rounded mb-4 bg-gray-100">
                    <h3 className="font-semibold">{med.name}</h3>
                    <p>{med.dosage}</p>
                    <p>
                      {med.startDate?.slice(0,10)} → {med.endDate?.slice(0,10)}
                    </p>
                  </div>
                ))
              )}
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default Dashboard;
import React, { useState } from "react";
import { motion } from "framer-motion";

const RateManagement = () => {
  const [search, setSearch] = useState("");
  const [sportFilter, setSportFilter] = useState("All");
  const [rateFilter, setRateFilter] = useState("All");
  const [editModal, setEditModal] = useState(false);
  const [currentRate, setCurrentRate] = useState(null);
  const [rates, setRates] = useState([
    {
      id: 1,
      coach: "Juan Dela Cruz",
      sport: "Basketball",
      rate: 800,
      status: "Active",
      updated: "2025-08-20",
    },
    {
      id: 2,
      coach: "Maria Santos",
      sport: "Volleyball",
      rate: 1200,
      status: "Active",
      updated: "2025-08-21",
    },
    {
      id: 3,
      coach: "Pedro Reyes",
      sport: "Swimming",
      rate: 600,
      status: "Inactive",
      updated: "2025-08-18",
    },
  ]);

  // Filtering logic
  const filteredRates = rates.filter((r) => {
    const matchesSearch = r.coach.toLowerCase().includes(search.toLowerCase());
    const matchesSport = sportFilter === "All" || r.sport === sportFilter;
    const matchesRate =
      rateFilter === "All" ||
      (rateFilter === "Low" && r.rate < 800) ||
      (rateFilter === "Medium" && r.rate >= 800 && r.rate <= 1200) ||
      (rateFilter === "High" && r.rate > 1200);

    return matchesSearch && matchesSport && matchesRate;
  });

  const openEditModal = (rate) => {
    setCurrentRate(rate);
    setEditModal(true);
  };

  const saveRateChanges = () => {
    setRates((prevRates) =>
      prevRates.map((r) =>
        r.id === currentRate.id
          ? {
              ...r,
              rate: currentRate.rate,
              status: currentRate.status,
              updated: new Date().toISOString().slice(0, 10),
            }
          : r
      )
    );
    setEditModal(false);
  };

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2
        className="text-3xl font-extrabold mb-6 flex items-center"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        ⭐ Manage Rate
      </motion.h2>

      {/* Filters */}
      <motion.div
        className="flex flex-col md:flex-row gap-3 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <select
          className="border rounded-lg px-4 py-2 bg-green-600 shadow text-white"
          value={sportFilter}
          onChange={(e) => setSportFilter(e.target.value)}
        >
          <option value="All">All Sports</option>
          <option value="Basketball">Basketball</option>
          <option value="Volleyball">Volleyball</option>
          <option value="Swimming">Swimming</option>
        </select>
        <select
          className="border rounded-lg px-4 py-2 bg-green-600 shadow text-white"
          value={rateFilter}
          onChange={(e) => setRateFilter(e.target.value)}
        >
          <option value="All">All Rates</option>
          <option value="Low">₱ Below 800</option>
          <option value="Medium">₱ 800 - 1200</option>
          <option value="High">₱ Above 1200</option>
        </select>
        <input
          type="text"
          placeholder="Search by coach name..."
          className="border rounded-lg px-4 py-2 flex-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </motion.div>

      {/* Table */}
      <motion.div
        className="overflow-x-auto shadow-lg rounded-xl bg-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <table className="min-w-full text-center border-collapse">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="p-4 border">Coach Name</th>
              <th className="p-4 border">Sport</th>
              <th className="p-4 border">Rate (₱)</th>
              <th className="p-4 border">Status</th>
              <th className="p-4 border">Last Update</th>
              <th className="p-4 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRates.length > 0 ? (
              filteredRates.map((r) => (
                <tr
                  key={r.id}
                  className="hover:bg-green-50 transition cursor-pointer"
                >
                  <td className="p-4 border">{r.coach}</td>
                  <td className="p-4 border">{r.sport}</td>
                  <td className="p-4 border">₱ {r.rate}</td>
                  <td
                    className={`p-4 border font-semibold ${
                      r.status === "Active" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {r.status}
                  </td>
                  <td className="p-4 border">{r.updated}</td>
                  <td className="p-4 border">
                    <button
                      onClick={() => openEditModal(r)}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-4 border text-center" colSpan={6}>
                  No rates found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>

      {/* Edit Modal */}
      {editModal && currentRate && (
        <motion.div
            className="bg-white p-6 rounded-xl w-11/12 md:w-3/4 lg:w-2/3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            drag
            dragElastic={0.2}
            dragMomentum={false}
           className="bg-white rounded-30x5 shadow-2xl w-full h-full overflow-hidden"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl bg-green-600 text-white font-bold mb-4 py-2 rounded text-center cursor-grab">
              Edit Rate - {currentRate.coach}
            </h2>

            <form className="flex flex-col gap-3">
              <input
                type="number"
                className="border px-4 py-2 rounded-lg"
                value={currentRate.rate}
                onChange={(e) =>
                  setCurrentRate({
                    ...currentRate,
                    rate: Number(e.target.value),
                  })
                }
                placeholder="Rate"
              />

              <select
                className="border px-4 py-2 rounded-lg"
                value={currentRate.status}
                onChange={(e) =>
                  setCurrentRate({ ...currentRate, status: e.target.value })
                }
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setEditModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={saveRateChanges}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Save
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default RateManagement;

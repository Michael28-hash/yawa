import React, { useState, useEffect } from "react";
import { TbSearch, TbStar, TbUser, TbEye, TbPlus, TbFilter, TbX } from "react-icons/tb";
import { motion } from "framer-motion";

const ViewCoaches = () => {
  const [coaches, setCoaches] = useState([]);
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState("All");
  const [showAddCoachModal, setShowAddCoachModal] = useState(false);
  const [newCoach, setNewCoach] = useState({
    name: "",
    email: "",
    phone: "",
    specialization: "",
    rate: "",
  });
  const [generatedCredentials, setGeneratedCredentials] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    setCoaches([
      {
        id: 1,
        name: "Coach John",
        email: "john@example.com",
        phone: "09123456789",
        specialization: "Basketball",
        status: "Active",
        rate: 500,
        rating: 4.5,
        submittedAt: "2025-08-20",
      },
      {
        id: 2,
        name: "Coach Maria",
        email: "maria@example.com",
        phone: "09123456788",
        specialization: "Volleyball",
        status: "Pending",
        rate: 400,
        rating: 4.8,
        submittedAt: "2025-08-21",
      },
      {
        id: 3,
        name: "Coach Alex",
        email: "alex@example.com",
        phone: "09123456787",
        specialization: "Swimming",
        status: "Inactive",
        rate: 600,
        rating: 4.2,
        submittedAt: "2025-08-22",
      },
    ]);
  }, []);

  // Generate random credentials
  const generateCredentials = () => {
    const username = newCoach.email.split('@')[0] + Math.floor(Math.random() * 100);
    const password = Math.random().toString(36).slice(-8);
    setGeneratedCredentials({ username, password });
  };

  // Handle input changes for new coach form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCoach({ ...newCoach, [name]: value });
    
    // Auto-generate credentials when email changes
    if (name === "email" && value.includes('@')) {
      generateCredentials();
    }
  };

  // Approve coach -> create account credentials & send email
  const handleApprove = (coach) => {
    const generatedPassword = Math.random().toString(36).slice(-8);
    const newCoach = {
      ...coach,
      status: "Active",
      username: coach.email,
      password: generatedPassword,
    };

    // Update in UI
    setCoaches((prev) =>
      prev.map((c) => (c.id === coach.id ? newCoach : c))
    );

    // ⚡ Backend needed: call API to save + send email
    console.log("Send email to:", coach.email);
    console.log("Credentials:", {
      username: coach.email,
      password: generatedPassword,
    });

    alert(
      `✅ Coach Approved!\n\nCredentials sent to Gmail:\nUsername: ${coach.email}\nPassword: ${generatedPassword}`
    );
    setSelectedCoach(null);
  };

  // Add new coach
  const handleAddCoach = () => {
    if (!newCoach.name || !newCoach.email || !newCoach.specialization || !newCoach.rate) {
      alert("Please fill all required fields");
      return;
    }

    const coach = {
      id: coaches.length + 1,
      name: newCoach.name,
      email: newCoach.email,
      phone: newCoach.phone,
      specialization: newCoach.specialization,
      status: "Active",
      rate: parseInt(newCoach.rate),
      rating: 0,
      submittedAt: new Date().toISOString().split('T')[0],
      username: generatedCredentials.username,
      password: generatedCredentials.password,
    };

    // Add to coaches list
    setCoaches([...coaches, coach]);
    
    // Send email with credentials (simulated)
    console.log("Send email to:", coach.email);
    console.log("Credentials:", generatedCredentials);
    
    alert(
      `✅ Coach Added!\n\nCredentials sent to Gmail:\nUsername: ${generatedCredentials.username}\nPassword: ${generatedCredentials.password}`
    );
    
    // Reset form and close modal
    setNewCoach({
      name: "",
      email: "",
      phone: "",
      specialization: "",
      rate: "",
    });
    setGeneratedCredentials({
      username: "",
      password: "",
    });
    setShowAddCoachModal(false);
  };

  const filteredCoaches = coaches.filter((coach) => {
    const matchesSearch =
      coach.name.toLowerCase().includes(searchText.toLowerCase()) ||
      coach.specialization.toLowerCase().includes(searchText.toLowerCase());
    const matchesFilter =
      filter === "All" ? true : coach.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <motion.div className="w-full min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
        {/* Header + Actions */}
        <div className="flex justify-between items-center">
          <motion.h2
            className="text-3xl font-extrabold flex items-center gap-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            🏅 View Available Coaches
          </motion.h2>

          <div className="flex gap-3">
            {/* Filter */}
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border rounded-lg px-3 py-2"
            >
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Inactive">Inactive</option>
            </select>

            {/* Add Coach */}
            <button 
              onClick={() => setShowAddCoachModal(true)}
              className="bg-green-600 text-center text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700"
            >
              <TbPlus /> Add Coach
            </button>
          </div>
        </div>

        {/* Search Input */}
        <motion.div
          className="flex items-center bg-white shadow rounded-lg px-4 py-2 w-full lg:w-1/3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <TbSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search by coach name..."
            className="w-full outline-none text-gray-700"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </motion.div>

        {/* Coaches Table */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <table className="w-full table-auto text-center">
            <thead className="bg-green-600 text-white text-lg">
              <tr>
                <th className="p-5 border">Name</th>
                <th className="p-5 border">Email</th>
                <th className="p-5 border">Phone</th>
                <th className="p-5 border">Specialization</th>
                <th className="p-5 border">Rate (₱)</th>
                <th className="p-5 border">Rating</th>
                <th className="p-5 border">Status</th>
                <th className="p-5 border">Submitted At</th>
                <th className="p-5 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCoaches.map((coach) => (
                <motion.tr
                  key={coach.id}
                  className="hover:bg-gray-50 text-gray-800"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="p-5 border font-semibold flex items-center gap-2 justify-center">
                    <TbUser /> {coach.name}
                  </td>
                  <td className="p-5 border">{coach.email}</td>
                  <td className="p-5 border">{coach.phone}</td>
                  <td className="p-5 border">{coach.specialization}</td>
                  <td className="p-5 border">₱{coach.rate}</td>
                  <td className="p-5 border flex justify-center items-center gap-1 text-yellow-500">
                    <TbStar /> {coach.rating}
                  </td>
                  <td
                    className={`p-5 border font-medium ${
                      coach.status === "Active"
                        ? "text-green-600"
                        : coach.status === "Pending"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {coach.status}
                  </td>
                  <td className="p-5 border">{coach.submittedAt}</td>
                  <td className="p-5 border text-center">
                    <button
                      onClick={() => setSelectedCoach(coach)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 mx-auto hover:bg-green-700"
                    >
                      <TbEye /> View
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Add Coach Modal */}
        {showAddCoachModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Modal Header */}
              <div className="bg-green-600 text-white px-6 py-4 flex justify-between items-center">
                <h3 className="text-2xl font-bold">Add New Coach</h3>
                <button 
                  onClick={() => setShowAddCoachModal(false)}
                  className="text-white hover:text-gray-200"
                >
                  <TbX size={24} />
                </button>
              </div>

              {/* Form Content */}
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={newCoach.name}
                      onChange={handleInputChange}
                      className="w-full border rounded-lg px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={newCoach.email}
                      onChange={handleInputChange}
                      className="w-full border rounded-lg px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={newCoach.phone}
                      onChange={handleInputChange}
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Specialization *
                    </label>
                    <input
                      type="text"
                      name="specialization"
                      value={newCoach.specialization}
                      onChange={handleInputChange}
                      className="w-full border rounded-lg px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Rate (₱) *
                    </label>
                    <input
                      type="number"
                      name="rate"
                      value={newCoach.rate}
                      onChange={handleInputChange}
                      className="w-full border rounded-lg px-3 py-2"
                      required
                    />
                  </div>
                </div>

                {/* Generated Credentials */}
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Generated Credentials</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Username
                      </label>
                      <input
                        type="text"
                        value={generatedCredentials.username}
                        className="w-full border rounded-lg px-3 py-2 bg-white"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                      </label>
                      <input
                        type="text"
                        value={generatedCredentials.password}
                        className="w-full border rounded-lg px-3 py-2 bg-white"
                        readOnly
                      />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    These credentials will be sent to the coach's email.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={handleAddCoach}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                  >
                    Add Coach & Send Email
                  </button>
                  <button
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                    onClick={() => setShowAddCoachModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Coach Profile Modal */}
        {selectedCoach && (
          <motion.div
            className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Modal Header */}
              <div className="bg-green-600 text-white px-6 py-4 flex justify-between items-center">
                <h3 className="text-2xl font-bold">Coach Profile</h3>
                <button 
                  onClick={() => setSelectedCoach(null)}
                  className="text-white hover:text-gray-200"
                >
                  <TbX size={24} />
                </button>
              </div>

              {/* Profile Details */}
              <div className="p-6">
                <table className="w-full border-collapse">
                  <tbody>
                    <tr>
                      <td className="border p-3 font-semibold bg-green-600 text-white">Name</td>
                      <td className="border p-3">{selectedCoach.name}</td>
                    </tr>
                    <tr>
                      <td className="border p-3 font-semibold bg-green-600 text-white">Email</td>
                      <td className="border p-3">{selectedCoach.email}</td>
                    </tr>
                    <tr>
                      <td className="border p-3 font-semibold bg-green-600 text-white">Phone</td>
                      <td className="border p-3">{selectedCoach.phone}</td>
                    </tr>
                    <tr>
                      <td className="border p-3 font-semibold bg-green-600 text-white">Specialization</td>
                      <td className="border p-3">{selectedCoach.specialization}</td>
                    </tr>
                    <tr>
                      <td className="border p-3 font-semibold bg-green-600 text-white">Rate</td>
                      <td className="border p-3">₱{selectedCoach.rate}</td>
                    </tr>
                    <tr>
                      <td className="border p-3 font-semibold bg-green-600 text-white">Rating</td>
                      <td className="border p-3">{selectedCoach.rating}</td>
                    </tr>
                    <tr>
                      <td className="border p-3 font-semibold bg-green-600 text-white">Status</td>
                      <td className="border p-3">{selectedCoach.status}</td>
                    </tr>
                    <tr>
                      <td className="border p-3 font-semibold bg-green-600 text-white">Submitted At</td>
                      <td className="border p-3">{selectedCoach.submittedAt}</td>
                    </tr>
                  </tbody>
                </table>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 mt-6">
                  {selectedCoach.status === "Pending" && (
                    <>
                      <button
                        onClick={() => handleApprove(selectedCoach)}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                      >
                        Approve & Create Account
                      </button>
                      <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
                        Reject
                      </button>
                    </>
                  )}
                  <button
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                    onClick={() => setSelectedCoach(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ViewCoaches;
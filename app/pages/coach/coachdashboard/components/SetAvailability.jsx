import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TbCalendar, TbClock, TbMapPin, TbUsers, TbUser } from "react-icons/tb";

const SetAvailability = () => {
  const [availabilities, setAvailabilities] = useState([]);
  const [customVenue, setCustomVenue] = useState("");
  const [form, setForm] = useState({
    coachName: "",
    coachImage: null,
    sport: "",
    date: "",
    start: "",
    end: "",
    venue: "",
    slots: 1,
  });

  const sports = [
    "Basketball",
    "Volleyball",
    "Swimming",
    "Tennis",
    "Badminton",
  ];

  const venues = [
    "City Gym Court",
    "Sports Complex Hall",
    "Community Pool",
    "Other (type below)",
  ];

  // ✅ fetch availabilities from PHP backend
  useEffect(() => {
    fetch(
      "http://localhost/sportscoach/app/api_sports/CoachSide/Add_Availability.php"
    )
      .then((res) => res.json())
      .then((data) => setAvailabilities(data))
      .catch((err) => console.error("Error fetching availabilities:", err));
  }, []);

  // handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, coachImage: file });
    }
  };

  // ✅ add availability via API
  const addAvailability = async () => {
    const finalVenue =
      form.venue === "Other (type below)" ? customVenue : form.venue;

    if (
      !form.coachName ||
      !form.sport ||
      !form.date ||
      !form.start ||
      !form.end ||
      !finalVenue
    ) {
      alert("⚠ Please fill in all fields!");
      return;
    }

    const formData = new FormData();
    formData.append("coach_name", form.coachName);
    formData.append("sport", form.sport);
    formData.append("date", form.date);
    formData.append("start", form.start);
    formData.append("end", form.end);
    formData.append("venue", finalVenue);
    formData.append("slots", form.slots);
    if (form.coachImage) {
      formData.append("coach_image", form.coachImage);
    }

    try {
      const response = await fetch(
        "http://localhost/sportscoach/app/api_sports/CoachSide/Add_Availability.php",
        {
          method: "POST",
          body: formData,
        }
      );
      const result = await response.json();

      if (result.success) {
        // refresh list after insert
        fetch(
          "http://localhost/sportscoach/app/api_sports/CoachSide/Add_Availability.php"
        )
          .then((res) => res.json())
          .then((data) => setAvailabilities(data));

        // reset form
        setForm({
          coachName: "",
          coachImage: null,
          sport: "",
          date: "",
          start: "",
          end: "",
          venue: "",
          slots: 1,
        });
        setCustomVenue("");
      } else {
        alert(result.error || "❌ Failed to save availability");
      }
    } catch (error) {
      console.error("Error saving availability:", error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6">
      <motion.h2
        className="text-3xl font-extrabold mb-8 flex items-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        📅 Set Availability
      </motion.h2>

      {/* Form */}
      <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Coach Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Coach Name
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2">
              <TbUser className="text-gray-500 mr-2" />
              <input
                type="text"
                name="coachName"
                value={form.coachName}
                onChange={handleChange}
                placeholder="Enter coach name"
                className="w-full outline-none"
              />
            </div>
          </div>

          {/* Coach Image */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Coach Picture
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* Sport */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Sport
            </label>
            <select
              name="sport"
              value={form.sport}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="">Select a sport</option>
              {sports.map((s, idx) => (
                <option key={idx} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Date
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2">
              <TbCalendar className="text-gray-500 mr-2" />
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full outline-none"
              />
            </div>
          </div>

          {/* Start Time */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Start Time
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2">
              <TbClock className="text-gray-500 mr-2" />
              <input
                type="time"
                name="start"
                value={form.start}
                onChange={handleChange}
                className="w-full outline-none"
              />
            </div>
          </div>

          {/* End Time */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              End Time
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2">
              <TbClock className="text-gray-500 mr-2" />
              <input
                type="time"
                name="end"
                value={form.end}
                onChange={handleChange}
                className="w-full outline-none"
              />
            </div>
          </div>

          {/* Venue */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-semibold mb-1">
              Venue
            </label>
            <div className="flex flex-col gap-2">
              <div className="flex items-center border rounded-lg px-3 py-2">
                <TbMapPin className="text-gray-500 mr-2" />
                <select
                  name="venue"
                  value={form.venue}
                  onChange={handleChange}
                  className="w-full outline-none"
                >
                  <option value="">Select a venue</option>
                  {venues.map((v, idx) => (
                    <option key={idx} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>

              {form.venue === "Other (type below)" && (
                <input
                  type="text"
                  placeholder="Enter custom venue"
                  value={customVenue}
                  onChange={(e) => setCustomVenue(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2"
                />
              )}
            </div>
          </div>

          {/* Slots */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Slots
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2">
              <TbUsers className="text-gray-500 mr-2" />
              <input
                type="number"
                name="slots"
                value={form.slots}
                onChange={handleChange}
                min="1"
                className="w-full outline-none"
              />
            </div>
          </div>
        </div>

        {/* Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={addAvailability}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow-lg"
          >
            ➕ Add Availability
          </button>
        </div>
      </div>

      {/* Availability Table */}
      <motion.div
        className="bg-white rounded-2xl shadow-lg p-6 overflow-x-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-xl font-semibold mb-4">📋 Current Availability</h3>
        {availabilities.length === 0 ? (
          <p className="text-gray-500">No availability set yet.</p>
        ) : (
          <table className="w-full table-auto border-collapse border border-gray-200 text-center">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="p-3 border">Coach</th>
                <th className="p-3 border">Sport</th>
                <th className="p-3 border">Date</th>
                <th className="p-3 border">Start</th>
                <th className="p-3 border">End</th>
                <th className="p-3 border">Venue</th>
                <th className="p-3 border">Slots</th>
              </tr>
            </thead>
            <tbody>
              {availabilities.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50">
                  <td className="p-3 border flex items-center gap-2">
                    {a.coach_image && (
                      <img
                        src={`http://localhost/sportscoach/${a.coach_image}`}
                        alt="coach"
                        className="w-10 h-10 rounded-full object-cover border"
                      />
                    )}
                    <span>{a.coach_name}</span>
                  </td>
                  <td className="p-3 border">{a.sport}</td>
                  <td className="p-3 border">{a.date}</td>
                  <td className="p-3 border">{a.start}</td>
                  <td className="p-3 border">{a.end}</td>
                  <td className="p-3 border">{a.venue}</td>
                  <td className="p-3 border">{a.slots}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </motion.div>
    </div>
  );
};

export default SetAvailability;

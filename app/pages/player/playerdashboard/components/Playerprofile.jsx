import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Profile = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    sport: "",
    bio: "",
    profileImage: null,
  });

  const [previewImage, setPreviewImage] = useState("/default-coach.png");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const storedName = sessionStorage.getItem("coach_name");
    const storedEmail = sessionStorage.getItem("coach_email");
    const storedPhone = sessionStorage.getItem("coach_phone");
    const storedSport = sessionStorage.getItem("coach_sport");
    const storedBio = sessionStorage.getItem("coach_bio");
    const storedImage = sessionStorage.getItem("coach_image");

    setForm({
      name: storedName || "",
      email: storedEmail || "",
      phone: storedPhone || "",
      sport: storedSport || "",
      bio: storedBio || "",
      profileImage: null,
      password: "",
    });

    if (storedImage) {
      setPreviewImage(storedImage);
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, profileImage: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    console.log("Profile saved:", form);
    toast.success("✅ Profile updated successfully!");
    setIsEditing(false); // Return to view mode
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="px-6 py-4 shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-bold">🏋️ Player Profile</h1>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-green-600 text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-green-700"
          >
            ✏️ Change
          </button>
        )}
      </header>

      {/* Content */}
      <main className="flex-1 p-10">
        {!isEditing ? (
          // View mode with table
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Left Side - Profile Picture */}
            <div className="flex flex-col items-center gap-4">
              <img
                src={previewImage}
                alt="Profile"
                className="w-72 h-72 rounded-full border object-cover shadow"
              />
            </div>

            {/* Right Side - Info Table */}
            <div className="grid-cols-30 md:grid-cols-10 gap-20">
              <table className="min-w-full border-3 border-gray-300 rounded-lg">
                <tbody>
                  <tr className="border-b border-gray-200">
                    <th className="text-left px-4 py-2 bg-gray-100">Full Name</th>
                    <td className="px-25 py-5">{form.name || "-"}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <th className="text-left px-4 py-2 bg-gray-100">Email</th>
                    <td className="px-25 py-5">{form.email || "-"}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <th className="text-left px-4 py-2 bg-gray-100">Phone</th>
                    <td className="px-25 py-5">{form.phone || "-"}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <th className="text-left px-4 py-2 bg-gray-100">Sport</th>
                    <td className="px-25 py-5">{form.sport || "-"}</td>
                  </tr>
                  <tr>
                    <th className="text-left px-4 py-2 bg-gray-100">Bio</th>
                    <td className="px-25 py-5">{form.bio || "-"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          // Edit mode
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Left Side - Profile Picture */}
            <div className="flex flex-col items-center gap-4">
              <img
                src={previewImage}
                alt="Profile"
                className="w-72 h-72 rounded-full border object-cover shadow"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="border rounded-lg px-3 py-2 w-full"
              />
              <p className="text-gray-500 text-sm text-center">
                Upload a clear profile picture (JPG/PNG)
              </p>
            </div>

            {/* Right Side - Info Form */}
            <div className="space-y-6">
              <div>
                <label className="block font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Sport</label>
                <input
                  type="text"
                  name="sport"
                  value={form.sport}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Bio</label>
                <textarea
                  name="bio"
                  value={form.bio}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2"
                  rows={4}
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Change Password</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="Enter new password"
                />
              </div>

              <button
                onClick={handleSave}
                className="bg-green-600 text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-green-700"
              >
                💾 Save
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Profile;

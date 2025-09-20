import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const CoachProfile = () => {
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

  useEffect(() => {
    // Load coach info from sessionStorage or API
    const storedName = sessionStorage.getItem("coach_name");
    const storedEmail = sessionStorage.getItem("coach_email");
    const storedPhone = sessionStorage.getItem("coach_phone");
    const storedSport = sessionStorage.getItem("coach_sport");
    const storedBio = sessionStorage.getItem("coach_bio");
    const storedImage = sessionStorage.getItem("coach_image");

    setForm((prev) => ({
      ...prev,
      name: storedName || "",
      email: storedEmail || "",
      phone: storedPhone || "",
      sport: storedSport || "",
      bio: storedBio || "",
    }));

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
    // Only send password if it was changed
    const saveData = { ...form };
    if (!saveData.password) delete saveData.password;

    console.log("Profile saved:", saveData);
    toast.success("✅ Profile updated successfully!");

    // Optional: Save updated info back to sessionStorage
    sessionStorage.setItem("coach_name", saveData.name);
    sessionStorage.setItem("coach_email", saveData.email);
    sessionStorage.setItem("coach_phone", saveData.phone);
    sessionStorage.setItem("coach_sport", saveData.sport);
    sessionStorage.setItem("coach_bio", saveData.bio);
    if (saveData.profileImage) {
      const imageUrl = URL.createObjectURL(saveData.profileImage);
      sessionStorage.setItem("coach_image", imageUrl);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="px-6 py-4 shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-bold">🏋️ Coach Profile</h1>
        <button
          onClick={handleSave}
          className="bg-white text-green-600 font-semibold px-4 py-2 rounded-lg shadow hover:bg-gray-100"
        >
          💾 Save
        </button>
      </header>

      {/* Content */}
      <main className="flex-1 p-10">
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
            {/* Name */}
            <div>
              <label className="block font-semibold mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block font-semibold mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block font-semibold mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            {/* Sport */}
            <div>
              <label className="block font-semibold mb-1">Sport</label>
              <input
                type="text"
                name="sport"
                value={form.sport}
                onChange={handleChange}
                placeholder="Enter your main sport"
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block font-semibold mb-1">Bio</label>
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                placeholder="Write a short description about yourself"
                className="w-full border rounded-lg px-3 py-2"
                rows={4}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block font-semibold mb-1">Change Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter new password (leave blank to keep current)"
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CoachProfile;

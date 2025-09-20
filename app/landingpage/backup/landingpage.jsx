"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  FaCalendarCheck,
  FaChartLine,
  FaUserFriends,
  FaMobileAlt,
} from "react-icons/fa";
import { AiOutlineBarChart, AiOutlineBell } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";

import { Checkbox } from "@/components/ui/checkbox";
import { FaPaperPlane } from "react-icons/fa";
import { FiRefreshCw, FiCheckCircle } from "react-icons/fi";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import CryptoJS from "crypto-js";

export default function Landingpage() {
  const navigate = useNavigate();
  const SECRET_KEY = "my_secret_key_123456";
  const [isLogin, setIsLogin] = useState(false); // 👈 FIXED: State added
  const [showSplash, setShowSplash] = useState(true);
  const [showFirst, setShowFirst] = useState(true);
  const [captchaText, setCaptchaText] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const DEFAULT_ROLE_ID = 5;
  const [fullname, setfullname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [age, setage] = useState("");
  const [address, setaddress] = useState("");
  const [contact, setcontact] = useState("");
  const [fetchGenders, setFetchGenders] = useState([]); // list from API
  const [selectedGender, setSelectedGender] = useState(""); // ✅ single value for <select>
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Fetch genders
  const fetchGenderPlayer = async () => {
    try {
      const response = await axios.get(
        "http://localhost/sportscoach/app/api_sports/gender/gender.php"
      );

      if (response.data.success && Array.isArray(response.data.data)) {
        setFetchGenders(response.data.data);
      } else {
        setFetchGenders([]);
      }
    } catch (error) {
      console.error("Error fetching gender:", error);
      setFetchGenders([]);
    }
  };

  useEffect(() => {
    // 1. Generate captcha
    generateCaptcha();

    // 2. Fetch genders
    fetchGenderPlayer();

    // 3. Auth check
    const isAuthenticated = decryptData(
      sessionStorage.getItem("isAuthenticated")
    );
    const userRole = decryptData(sessionStorage.getItem("role"));

    if (isAuthenticated && userRole === "player") {
      navigate("/player-dashboard");
    }

    // 4. Splash timer
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    // 5. Image loop
    const imageLoop = setInterval(() => {
      setShowFirst((prev) => !prev);
    }, 4000);

    // 6. Cleanup
    return () => {
      clearTimeout(splashTimer);
      clearInterval(imageLoop);
    };
  }, [isLogin, navigate]);

  const encryptData = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
  };

  const decryptData = (ciphertext) => {
    if (!ciphertext) return null;
    try {
      const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
      const decryptedString = bytes.toString(CryptoJS.enc.Utf8);

      if (!decryptedString) {
        console.warn(
          "Decryption returned empty string — possibly wrong key or corrupt data"
        );
        return null;
      }

      return JSON.parse(decryptedString);
    } catch (error) {
      console.error("Decryption failed", error);
      return null;
    }
  };

  useEffect(() => {
    generateCaptcha();
    fetchGenderPlayer();

    const isAuthenticated = decryptData(
      sessionStorage.getItem("isAuthenticated")
    );
    const userRole = decryptData(sessionStorage.getItem("role"));

    if (isAuthenticated && userRole === "player") {
      navigate("/player-dashboard");
    }

    const splashTimer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    const imageLoop = setInterval(() => {
      setShowFirst((prev) => !prev);
    }, 4000);

    return () => {
      clearTimeout(splashTimer);
      clearInterval(imageLoop);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ CAPTCHA check before sending request
    if (captchaInput !== captchaText) {
      toast.error("Invalid CAPTCHA. Please try again.");
      generateCaptcha();
      setCaptchaInput("");
      return;
    }

    // ✅ Gmail-only check (frontend)
    if (!email.endsWith("@gmail.com")) {
      toast.error("Only Gmail addresses are allowed.");
      return;
    }

    // ✅ Confirm password check
    if (password !== confirmpassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost/sportscoach/app/api_sports/studentlogin/student-register.php",
        {
          player_fullname: fullname,
          player_email: email,
          player_password: password,
          player_confirmpassword: confirmpassword,
          player_age: age,
          player_address: address,
          player_contact: contact,
          gender_id: parseInt(selectedGender),
          role_id: DEFAULT_ROLE_ID,
        }
      );

      if (response.data.success) {
        const {
          player_id,
          player_fullname,
          player_email,
          player_address,
          player_age,
          player_contact,
          gender_id,
        } = response.data.data || {};

        sessionStorage.setItem("player_id", encryptData(player_id));
        sessionStorage.setItem("player_fullname", encryptData(player_fullname));
        sessionStorage.setItem("player_email", encryptData(player_email));
        sessionStorage.setItem("player_address", encryptData(player_address));
        sessionStorage.setItem("player_age", encryptData(player_age));
        sessionStorage.setItem("player_contact", encryptData(player_contact));
        sessionStorage.setItem("gender_id", encryptData(gender_id));

        toast.success(response.data.message);

        // ✅ Clear fields
        setfullname("");
        setemail("");
        setpassword("");
        setconfirmpassword("");
        setage("");
        setaddress("");
        setcontact("");
        setSelectedGender("");
        setCaptchaInput("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
      generateCaptcha();
      setCaptchaInput("");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // ✅ CAPTCHA check
    if (captchaInput !== captchaText) {
      toast.error("Invalid CAPTCHA. Please try again.");
      generateCaptcha();
      setCaptchaInput("");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost/sportscoach/app/api_sports/studentlogin/student-login.php",
        {
          player_email: loginEmail,
          player_password: loginPassword,
        }
      );

      if (response.data.success) {
        const {
          player_id,
          player_fullname,
          player_email,
          player_address,
          player_age,
          player_contact,
          gender_id,
          role_name,
        } = response.data.data || {};

        // ✅ Store session
        sessionStorage.setItem("isAuthenticated", encryptData("true"));
        sessionStorage.setItem("player_id", encryptData(player_id));
        sessionStorage.setItem("player_fullname", encryptData(player_fullname));
        sessionStorage.setItem("player_email", encryptData(player_email));
        sessionStorage.setItem("player_address", encryptData(player_address));
        sessionStorage.setItem("player_age", encryptData(player_age));
        sessionStorage.setItem("player_contact", encryptData(player_contact));
        sessionStorage.setItem("gender_id", encryptData(gender_id));
        sessionStorage.setItem("role", encryptData(role_name.toLowerCase()));
        toast.success("Login successful!");
        setLoginEmail("");
        setLoginPassword("");
        setCaptchaInput("");

        setTimeout(() => {
          switch (role_name.toLowerCase()) {
            case "player":
              navigate("/player-dashboard");
              break;

            default:
              toast.error("Unauthorized role!");
              sessionStorage.clear();
              navigate("/");
          }
        }, 3000);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during login.");
      generateCaptcha();
      setCaptchaInput("");
    }
  };

  const captchaCanvasRef = useRef(null);

  const generateCaptcha = () => {
    const canvas = captchaCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let captcha = "";
    for (let i = 0; i < 6; i++) {
      captcha += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }

    setCaptchaText(captcha);

    // Canvas setup
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.font = "28px Arial";
    ctx.fillStyle = "#000";

    // Centered letters with spacing
    const letterSpacing = 30;
    const totalWidth = (captcha.length - 1) * letterSpacing;
    let startX = (canvasWidth - totalWidth) / 2;
    const y = (canvasHeight + 28) / 2 - 5;

    for (let i = 0; i < captcha.length; i++) {
      const letter = captcha[i];
      ctx.fillText(letter, startX + i * letterSpacing, y);
    }

    // Interference lines
    for (let i = 0; i < 8; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvasWidth, Math.random() * canvasHeight);
      ctx.lineTo(Math.random() * canvasWidth, Math.random() * canvasHeight);
      ctx.strokeStyle = getRandomColor();
      ctx.lineWidth = Math.random() * 1.5 + 0.5;
      ctx.stroke();
    }

    // Add random dots
    for (let i = 0; i < 50; i++) {
      ctx.beginPath();
      ctx.arc(
        Math.random() * canvasWidth,
        Math.random() * canvasHeight,
        1,
        0,
        2 * Math.PI
      );
      ctx.fillStyle = getRandomColor();
      ctx.fill();
    }

    // Optional: random bezier curves
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvasWidth, Math.random() * canvasHeight);
      ctx.bezierCurveTo(
        Math.random() * canvasWidth,
        Math.random() * canvasHeight,
        Math.random() * canvasWidth,
        Math.random() * canvasHeight,
        Math.random() * canvasWidth,
        Math.random() * canvasHeight
      );
      ctx.strokeStyle = getRandomColor();
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  };

  // Helper function to generate random color
  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 150);
    const g = Math.floor(Math.random() * 150);
    const b = Math.floor(Math.random() * 150);
    const a = (Math.random() * 0.5 + 0.3).toFixed(2); // semi-transparent
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  };

  return (
    <div className="font-sans">
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

      <header className="flex flex-col md:flex-row justify-between items-center py-4 px-4 sm:px-6 md:px-20 shadow-sm gap-4 md:gap-0">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="bg-[#4CA771] p-2 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <span className="text-xl font-bold text-[#4CAF7D]">
            Sports<span className="text-black">Coach</span>
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="w-full md:w-auto flex flex-col md:flex-row md:space-x-6 space-y-2 md:space-y-0 text-sm text-gray-700 items-center">
          <a href="#features" className="hover:text-[#4CA771]">
            Core features
          </a>

          <a href="#reviews" className="hover:text-[#4CA771]">
            About
          </a>
          <a href="#contact" className="hover:text-[#4CA771]">
            Contact
          </a>
          <Dialog>
            <DialogTrigger asChild>
              <button className="ml-2 bg-[#4CA771] hover:bg-[#013237] text-white px-4 py-2 rounded-md text-sm sm:text-base">
                Register as Player
              </button>
            </DialogTrigger>

            <DialogContent className="w-[95vw] sm:w-[90vw] md:w-full max-w-md p-4 sm:p-6 rounded-lg">
              <DialogHeader>
                <DialogTitle className="text-lg sm:text-xl font-bold">
                  {isLogin ? "Hello Welcome!" : "Register as Player"}
                </DialogTitle>
                <DialogDescription className="text-sm sm:text-base">
                  {isLogin
                    ? "Please login your credentials as player"
                    : "Please fill out the form to register."}
                </DialogDescription>
              </DialogHeader>

              {/* REGISTER FORM */}
              {!isLogin && (
                <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#4CA771]"
                      placeholder="Enter fullname"
                      value={fullname}
                      onChange={(e) => setfullname(e.target.value)}
                    />
                  </div>

                  {/* Age */}
                  <div>
                    <label className="block text-sm font-medium">Age</label>
                    <input
                      type="text"
                      className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#4CA771]"
                      placeholder="Enter age"
                      value={age}
                      onChange={(e) => setage(e.target.value)}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium">Email</label>
                    <input
                      type="email"
                      className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#4CA771]"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium">
                      Password
                    </label>
                    <input
                      type="password"
                      className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#4CA771]"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setpassword(e.target.value)}
                    />
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-medium">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#4CA771]"
                      placeholder="Enter confirm password"
                      value={confirmpassword}
                      onChange={(e) => setconfirmpassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Gender</label>
                    <select
                      className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#4CA771]"
                      value={selectedGender} // ✅ one scalar value
                      onChange={(e) => setSelectedGender(e.target.value)} // ✅ update value
                    >
                      <option value="">Select gender</option>
                      {fetchGenders.length > 0 ? (
                        fetchGenders.map((g) => (
                          <option key={g.gender_id} value={g.gender_id}>
                            {g.gender_name}
                          </option>
                        ))
                      ) : (
                        <option disabled>No genders available</option>
                      )}
                    </select>
                  </div>
                  {/* Address */}
                  <div>
                    <label className="block text-sm font-medium">Address</label>
                    <input
                      type="text"
                      className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#4CA771]"
                      placeholder="Enter address"
                      value={address}
                      onChange={(e) => setaddress(e.target.value)}
                    />
                  </div>

                  {/* Contact */}
                  <div>
                    <label className="block text-sm font-medium">
                      Contact Number
                    </label>
                    <input
                      type="text"
                      className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#4CA771]"
                      placeholder="Enter contact number"
                      value={contact}
                      onChange={(e) => setcontact(e.target.value)}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full bg-[#4CA771] text-white py-2 rounded-md text-sm sm:text-base hover:bg-[#013237] transition"
                  >
                    Register
                  </button>

                  <p className="text-sm text-center mt-2">
                    Already have an account?{" "}
                    <button
                      type="button"
                      className="text-[#4CA771] hover:underline"
                      onClick={() => setIsLogin(true)}
                    >
                      Login here
                    </button>
                  </p>
                </form>
              )}

              {/* LOGIN FORM */}
              {isLogin && (
                <form className="space-y-4 mt-4" onSubmit={handleLogin}>
                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium">Email</label>
                    <input
                      type="email"
                      className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#4CA771]"
                      placeholder="Enter email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium">
                      Password
                    </label>
                    <input
                      type="password"
                      className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#4CA771]"
                      placeholder="Enter password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                    />
                  </div>

                  {/* CAPTCHA */}
                  <div className="mt-4">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                      <canvas
                        ref={captchaCanvasRef}
                        width="250"
                        height="70"
                        className="border border-black"
                      />
                      <button
                        type="button"
                        onClick={generateCaptcha}
                        className="p-2 rounded-md text-[#4CA771] border border-transparent hover:border-[#4CA771] transition"
                      >
                        <FiRefreshCw size={20} />
                      </button>
                    </div>
                    <input
                      type="text"
                      value={captchaInput}
                      onChange={(e) => setCaptchaInput(e.target.value)}
                      className="w-full p-2 border border-gray rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      placeholder="Enter Captcha"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#4CA771] text-white py-2 rounded-md text-sm sm:text-base hover:bg-[#013237] transition"
                  >
                    Login
                  </button>

                  <p className="text-sm text-center mt-2">
                    Don’t have an account?{" "}
                    <button
                      type="button"
                      className="text-[#4CA771] hover:underline"
                      onClick={() => setIsLogin(false)}
                    >
                      Register here
                    </button>
                  </p>
                </form>
              )}
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <button className="ml-2 bg-[#4CA771] hover:bg-[#013237] text-white px-4 py-2 rounded-md text-sm">
                Apply as Coach
              </button>
            </DialogTrigger>

            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Coach application form</DialogTitle>
                <DialogDescription>
                  Please fill out the form to apply as a coach.
                </DialogDescription>
              </DialogHeader>

              {/* FORM STARTS */}
              <form className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#4CA771] outline-none"
                    placeholder="Enter name"
                  />
                </div>

                {/* Age */}
                <div>
                  <label className="block text-sm font-medium">Age</label>
                  <input
                    type="number"
                    name="age"
                    className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#4CA771] outline-none"
                    placeholder="Enter age"
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium">Gender</label>
                  <select
                    name="gender"
                    className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#4CA771] outline-none"
                  >
                    <option value="">Select gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#4CA771] outline-none"
                    placeholder="Enter contact"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#4CA771] outline-none"
                    placeholder="Enter email"
                  />
                </div>

                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-2 text-sm font-medium">
                    <Checkbox id="valid-id" />I have a Valid ID
                  </label>
                  <label className="flex items-center gap-2 text-sm font-medium">
                    <Checkbox id="certificate" />I have a Coaching Certificate
                  </label>
                  <label className="flex items-center gap-2 text-sm font-medium">
                    <Checkbox id="resume" />I have a Resume
                  </label>
                </div>

                {/* Single File Upload Area */}
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-2">
                    Upload Documents
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer hover:border-[#4CA771]">
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      id="upload-documents"
                    />
                    <label
                      htmlFor="upload-documents"
                      className="flex flex-col items-center justify-center h-full"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-8 h-8 text-gray-400 mb-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M16 12l-4-4m0 0l-4 4m4-4v12"
                        />
                      </svg>
                      <p className="text-sm text-gray-500">
                        Drag & drop files here <br /> or{" "}
                        <span className="text-[#4CA771] font-medium">
                          Browse Files
                        </span>
                      </p>
                    </label>
                  </div>
                </div>

                {/* Submit */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-[#4CA771] text-white py-2 rounded-md hover:bg-[#013237] transition flex items-center justify-center gap-2"
                  >
                    Submit Application
                    <FaPaperPlane className="ml-1" />
                  </button>
                </div>
              </form>
              {/* FORM ENDS */}
            </DialogContent>
          </Dialog>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-purple-50 py-12 px-4 sm:px-6 md:px-20 flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="w-full md:w-1/2 max-w-xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Booking & Revenue Management System for{" "}
            <span className="text-[#4CAF7D]">Sports Coaches</span>
          </h1>
          <p className="text-gray-600 mt-4 text-base sm:text-lg">
            Streamline client bookings, automate payments, and track revenue
            growth with our comprehensive coaching business platform. Trusted by
            coaches.
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-6 text-sm text-gray-600">
            <span className="flex items-center gap-2">
              <FiCheckCircle className="text-[#4CA771] w-5 h-5" />
              Instant setup
            </span>
            <span className="flex items-center gap-2">
              <FiCheckCircle className="text-[#4CA771] w-5 h-5" />
              24/7 support included
            </span>
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <div className="relative w-full h-64 sm:h-96 md:h-[500px] rounded-lg overflow-hidden shadow-lg">
            <img
              src="/images/maxresdefault.jpg"
              alt="Splash"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                showSplash ? "opacity-100" : "opacity-0"
              }`}
            />
            <img
              src="/images/sports1.jpg"
              alt="Sports 1"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                !showSplash && showFirst ? "opacity-100" : "opacity-0"
              }`}
            />
            <img
              src="/images/sports2.jpg"
              alt="Sports 2"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                !showSplash && !showFirst ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 md:px-20 text-center">
        <h2 className="text-[#4CAF7D] font-semibold uppercase tracking-widest mb-2 text-sm sm:text-base">
          Core Features
        </h2>
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
          Everything You Need to Manage Your Coaching Business
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12 text-base sm:text-lg">
          From automated bookings to revenue analytics, CoachFlow provides all
          the tools you need to focus on what you do best - coaching.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<FaCalendarCheck className="text-blue-500 text-3xl" />}
            title="Smart Booking System"
            description="Let clients book sessions 24/7 with automated scheduling, conflict prevention, and instant confirmations."
          />
          <FeatureCard
            icon={<FaChartLine className="text-green-500 text-3xl" />}
            title="Revenue Tracking"
            description="Monitor your income with detailed analytics, payment tracking, and automated invoicing for all sessions."
          />
          <FeatureCard
            icon={<FaUserFriends className="text-purple-500 text-3xl" />}
            title="Client Management"
            description="Keep detailed client profiles, track progress, and maintain communication history in one place."
          />
          <FeatureCard
            icon={<AiOutlineBarChart className="text-orange-500 text-3xl" />}
            title="Performance Analytics"
            description="Get insights into your business performance with detailed reports and growth metrics."
          />
          <FeatureCard
            icon={<AiOutlineBell className="text-red-500 text-3xl" />}
            title="Automated Reminders"
            description="Reduce no-shows with automatic email and SMS reminders sent to clients before sessions."
          />
          <FeatureCard
            icon={<FaMobileAlt className="text-teal-500 text-3xl" />}
            title="Mobile App"
            description="Manage your coaching business on the go with our mobile app for iOS and Android."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#4CA771] text-white py-10 px-4 sm:px-6 md:px-20">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 text-center md:text-left">
          <div className="flex-1">
            <h4 className="text-lg font-bold">CoachFlow</h4>
            <p className="text-white mt-2 max-w-sm mx-auto md:mx-0 text-sm sm:text-base">
              Streamline your coaching business with all-in-one booking,
              payment, and client management tools.
            </p>
          </div>

          <div>
            <h5 className="font-semibold text-base sm:text-lg">Quick Links</h5>
            <ul className="text-white mt-2 space-y-1 text-sm sm:text-base">
              <li>Core features</li>
              <li>About</li>
              <li>Contact</li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-base sm:text-lg">Follow Us</h5>
            <div className="flex justify-center md:justify-start gap-4 mt-2 text-white text-xl">
              <span>🌐</span>
              <span>🐦</span>
              <span>📘</span>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white pt-4 text-center text-white text-sm">
          © {new Date().getFullYear()} CoachFlow. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white rounded-lg shadow-md p-6 text-left">
    <div className="mb-4">{icon}</div>
    <h4 className="text-lg font-bold">{title}</h4>
    <p className="text-gray-600 mt-2 text-sm">{description}</p>
  </div>
);

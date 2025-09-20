import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TbStar } from "react-icons/tb";

const RateCoach = ({ session }) => {
  // ✅ fallback if session is missing
  const safeSession = session || {
    id: "demo123",
    coach: "Coach Mark Dela Cruz",
    date: "2025-08-25",
    time: "3:00 PM",
  };

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!safeSession?.id) return; // ✅ prevents crash

    const fetchReviews = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/api/reviews/${safeSession.id}`
        );
        const data = await res.json();
        setReviews(data);
      } catch (err) {
        console.error("❌ Failed to fetch reviews:", err);
      }
    };

    fetchReviews();
  }, [safeSession?.id]);

  const handleSubmit = async () => {
    if (!rating || !feedback.trim()) {
      alert("⚠️ Please provide both a rating and feedback.");
      return;
    }

    const newReview = {
      session_id: safeSession.id,
      coach: safeSession.coach,
      rating,
      feedback,
      date: new Date().toISOString(),
    };

    try {
      await fetch("http://localhost:8000/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReview),
      });

      setReviews([newReview, ...reviews]); // ✅ instant update
      setRating(0);
      setFeedback("");
      alert("✅ Review submitted!");
    } catch (error) {
      console.error("❌ Failed to submit review:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg"
    >
      <h2 className="text-xl font-bold border-b pb-2 mb-4">Rate Your Coach</h2>

      {/* Session Summary */}
      <div className="mb-4 text-gray-700">
        <p>
          <strong>Coach:</strong> {safeSession.coach}
        </p>
        <p>
          <strong>Date:</strong> {safeSession.date}
        </p>
        <p>
          <strong>Time:</strong> {safeSession.time}
        </p>
      </div>

      {/* Star Rating */}
      <div className="flex items-center mb-4">
        {Array.from({ length: 5 }).map((_, i) => {
          const starValue = i + 1;
          return (
            <TbStar
              key={i}
              size={28}
              className={`cursor-pointer transition ${
                starValue <= (hoverRating || rating)
                  ? "text-yellow-500"
                  : "text-gray-300"
              }`}
              onClick={() => setRating(starValue)}
              onMouseEnter={() => setHoverRating(starValue)}
              onMouseLeave={() => setHoverRating(0)}
            />
          );
        })}
        <span className="ml-3 text-gray-600">{rating}/5</span>
      </div>

      {/* Feedback Box */}
      <textarea
        className="w-full border rounded-lg p-3 mb-4 outline-none resize-none"
        rows={4}
        placeholder="Write your feedback here..."
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition"
      >
        Submit Review
      </button>

      {/* Reviews List */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Your Reviews</h3>
        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((rev, idx) => (
              <div key={idx} className="border p-4 rounded-lg bg-gray-50">
                <div className="flex items-center mb-1">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <TbStar key={i} className="text-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-700">{rev.feedback}</p>
                <p className="text-xs text-gray-500 mt-2">
                  📅 {new Date(rev.date).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </div>
    </motion.div>
  );
};

export default RateCoach;

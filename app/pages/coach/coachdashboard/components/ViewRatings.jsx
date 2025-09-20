import React, { useState, useEffect } from "react";
import { TbStar, TbMessageCircle } from "react-icons/tb";
import { motion } from "framer-motion";

const ViewRatings = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const data = [
      {
        id: 1,
        player: "John Doe",
        rating: 4,
        comment: "Great session, very helpful!",
      },
      {
        id: 2,
        player: "Jane Smith",
        rating: 5,
        comment: "Coach explained everything clearly.",
      },
      {
        id: 3,
        player: "Alex Tan",
        rating: 3,
        comment: "Good session, but could be longer.",
      },
    ];
    setFeedbacks(data);

    const avg = data.reduce((sum, f) => sum + f.rating, 0) / data.length;
    setAverageRating(avg.toFixed(1));
  }, []);

  // Animations
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <motion.div
      className="w-full min-h-screen bg-gray-100 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Header */}
      <motion.h2
        className="text-4xl font-extrabold mb-8"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        custom={0}
      >
        ⭐ View Ratings & Feedback
      </motion.h2>

      {/* Stat Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            title: "Average Rating",
            value: (
              <h2 className="text-3xl font-bold flex items-center mt-1 text-gray-800">
                {averageRating} <TbStar className="ml-2 text-green-600" />
              </h2>
            ),
            icon: (
              <div className="bg-green-600 text-white p-4 rounded-full shadow">
                <TbStar className="text-2xl" />
              </div>
            ),
          },
          {
            title: "Total Feedbacks",
            value: (
              <h2 className="text-3xl font-bold mt-1 text-gray-800">
                {feedbacks.length}
              </h2>
            ),
            icon: (
              <div className="bg-green-600 text-white p-4 rounded-full shadow">
                <TbMessageCircle className="text-2xl" />
              </div>
            ),
          },
        ].map((card, i) => (
          <motion.div
            key={i}
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={i + 1}
            className="bg-white border rounded-2xl shadow-lg p-6 flex justify-between items-center"
          >
            <div>
              <p className="text-gray-500 text-sm font-medium">{card.title}</p>
              {card.value}
            </div>
            {card.icon}
          </motion.div>
        ))}
      </div>

      {/* Feedback Table */}
      <motion.div
        className="bg-white border rounded-2xl shadow-lg p-6"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        custom={3}
      >
        <h3 className="text-2xl font-bold mb-6 flex items-center text-gray-800">
          <TbMessageCircle className="mr-2 text-green-600" /> Player Feedback
        </h3>
        <table className="w-full table-auto border-collapse border border-gray-200 text-center">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="p-4 border text-white-600">Player</th>
              <th className="p-4 border text-white-600">Rating</th>
              <th className="p-4 border text-white-600">Comment</th>
            </tr>
          </thead>
          <motion.tbody>
            {feedbacks.map((f, i) => (
              <motion.tr
                key={f.id}
                className="hover:bg-gray-50"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                custom={i + 4}
              >
                <td className="p-4 border font-medium text-gray-800">
                  {f.player}
                </td>
                <td className="p-4 border flex justify-center items-center gap-1 text-yellow-500">
                  {Array.from({ length: f.rating }).map((_, i) => (
                    <TbStar key={i} />
                  ))}
                </td>
                <td className="p-4 border text-left text-gray-700">
                  {f.comment}
                </td>
              </motion.tr>
            ))}
          </motion.tbody>
        </table>
      </motion.div>
    </motion.div>
  );
};

export default ViewRatings;

// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { TbSearch } from "react-icons/tb";

// const CoachList = () => {
//   const [coaches, setCoaches] = useState([]);
//   const [search, setSearch] = useState("");
//   const [filters, setFilters] = useState({
//     price: "",
//     rating: "",
//   });

//   useEffect(() => {
//     const fetchCoaches = async () => {
//       try {
//         const response = await fetch("http://localhost:8000/api/coaches");
//         const data = await response.json();
//         setCoaches(data);
//       } catch (error) {
//         console.error("❌ Failed to fetch coaches:", error);
//       }
//     };
//     fetchCoaches();
//   }, []);

//   // Filtering logic
//   const filteredCoaches = coaches.filter((coach) => {
//     const matchesSearch =
//       coach.name.toLowerCase().includes(search.toLowerCase()) ||
//       coach.sport.toLowerCase().includes(search.toLowerCase()) ||
//       coach.location.toLowerCase().includes(search.toLowerCase());

//     const matchesPrice =
//       filters.price === "" ||
//       (filters.price === "low" && coach.rate <= 500) ||
//       (filters.price === "mid" && coach.rate > 500 && coach.rate <= 1000) ||
//       (filters.price === "high" && coach.rate > 1000);

//     const matchesRating =
//       filters.rating === "" || coach.rating >= parseInt(filters.rating);

//     return matchesSearch && matchesPrice && matchesRating;
//   });

//   return (
//     <motion.div
//       initial={{ opacity: 0, x: -20 }}
//       animate={{ opacity: 1, x: 0 }}
//       transition={{ duration: 0.6 }}
//       className="min-h-screen bg-gray-50 p-6"
//     >
//       {/* Search & Filters */}
//       <div className="mb-6 flex flex-wrap gap-4 items-center">
//         <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-md">
//           <TbSearch className="text-gray-500 mr-2 text-lg" />
//           <input
//             type="text"
//             placeholder="Search by name, sport, or location..."
//             className="w-full text-sm outline-none"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>

//         <select
//           className="px-4 py-2 rounded-lg shadow-md text-sm"
//           onChange={(e) => setFilters({ ...filters, price: e.target.value })}
//         >
//           <option value="">Price Range</option>
//           <option value="low">₱0 - ₱500</option>
//           <option value="mid">₱500 - ₱1000</option>
//           <option value="high">₱1000+</option>
//         </select>

//         <select
//           className="px-4 py-2 rounded-lg shadow-md text-sm"
//           onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
//         >
//           <option value="">Rating</option>
//           <option value="4">⭐ 4 & up</option>
//           <option value="3">⭐ 3 & up</option>
//         </select>
//       </div>

//       {/* Table View */}
//       <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
//         <table className="min-w-full text-sm text-left">
//           <thead className="bg-green-600 text-white">
//             <tr>
//               <th className="px-4 py-3">Coach</th>
//               <th className="px-4 py-3">Sport</th>
//               <th className="px-4 py-3">Location</th>
//               <th className="px-4 py-3">Rating</th>
//               <th className="px-4 py-3">Rate</th>
//               <th className="px-4 py-3">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredCoaches.length > 0 ? (
//               filteredCoaches.map((coach, idx) => (
//                 <tr
//                   key={idx}
//                   className="border-b hover:bg-gray-50 transition"
//                 >
//                   <td className="px-4 py-3 font-medium flex items-center gap-2">
//                     <img
//                       src={coach.profile_picture || "https://via.placeholder.com/40"}
//                       alt={coach.name}
//                       className="w-8 h-8 rounded-full"
//                     />
//                     {coach.name}
//                   </td>
//                   <td className="px-4 py-3">{coach.sport}</td>
//                   <td className="px-4 py-3">{coach.location}</td>
//                   <td className="px-4 py-3">⭐ {coach.rating}</td>
//                   <td className="px-4 py-3">₱{coach.rate}/session</td>
//                   <td className="px-4 py-3">
//                     <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg">
//                       View Profile
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td
//                   colSpan="6"
//                   className="px-4 py-6 text-center text-gray-500"
//                 >
//                   No coaches found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </motion.div>
//   );
// };

// export default CoachList;

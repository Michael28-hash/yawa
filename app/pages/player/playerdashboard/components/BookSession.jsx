import { TbZoom } from "react-icons/tb";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { FiEye } from "react-icons/fi"; // 👈 Add this at the top with your other imports

const BookSession = () => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Basketball",
      description: "Train with professional basketball coaches.",
      image: "/images/basketball.jpg",
      price: 500,
      duration: "8 hours",
      availableSlots: ["8:00 AM - 4:00 PM", "4:00 PM - 12:00 AM"],
    },

    {
      id: 2,
      name: "Volleyball",
      description: "Improve your volleyball skills and teamwork.",
      image: "/images/volleyball.jpg",
      price: 500,
      duration: "8 hours",
      availableSlots: ["8:00 AM - 4:00 PM", "4:00 PM - 12:00 AM"],
    },
    {
      id: 3,
      name: "Football",
      description: "Master the fundamentals of football.",
      image: "/images/football.jpg",
      price: 500,
      duration: "8 hours",
      availableSlots: ["8:00 AM - 4:00 PM", "4:00 PM - 12:00 AM"],
    },
    {
      id: 4,
      name: "Badminton",
      description: "Sharpen your badminton smashes and reflexes.",
      image: "/images/badmintonjpg.jpg",
      price: 500,
      duration: "8 hours",
      availableSlots: ["8:00 AM - 4:00 PM", "4:00 PM - 12:00 AM"],
    },
    {
      id: 5,
      name: "Long Tennis",
      description: "Learn tennis techniques from expert coaches.",
      image: "/images/Tennis.jpg",
      price: 500,
      duration: "8 hours",
      availableSlots: ["8:00 AM - 4:00 PM", "4:00 PM - 12:00 AM"],
    },
    {
      id: 6,
      name: "Swimming",
      description: "Enhance your swimming speed and stamina.",
      image: "/images/swimming.jpg",
      price: 350,
      duration: "8 hours",
      availableSlots: ["8:00 AM - 4:00 PM", "4:00 PM - 12:00 AM"],
    },

    {
      id: 7,
      name: "Teakwondo",
      description: "Tabang",
      image: "/images/teakwondo.jpg",
      price: 500,
      duration: "8 hours",
      availableSlots: ["8:00 AM - 4:00 PM", "4:00 PM - 12:00 AM"],
    },

    {
      id: 8,
      name: "Sepak Takraw",
      description: "Aray ko",
      image: "/images/sepaktakraw.jpg",
      price: 500,
      duration: "8 hours",
      availableSlots: ["8:00 AM - 4:00 PM", "4:00 PM - 12:00 AM"],
    },

    {
      id: 9,
      name: "Baseball",
      description: "Logita ko",
      image: "/images/baseball.jpeg",
      price: 500,
      duration: "8 hours",
      availableSlots: ["8:00 AM - 4:00 PM", "4:00 PM - 12:00 AM"],
    },

    {
      id: 10,
      name: "Table tennis",
      description: "Sawadika",
      image: "/images/tabletennis.jpg",
      price: 500,
      duration: "8 hours",
      availableSlots: ["8:00 AM - 4:00 PM", "4:00 PM - 12:00 AM"],
    },
  ]);

  const coaches = [
    {
      coachName: "Coach Miming",
      specialty: "Basketball",
      availableDate: "Sept 5, 2025",
      availableSlots: [
        { start: "09:00", end: "11:00" },
        { start: "14:00", end: "16:00" },
      ],
      price: 500,
      image: "/images/Coachmings.jpg",
    },
    {
      coachName: "Coach Juan",
      specialty: "Volleyball",
      availableDate: "Sept 7, 2025",
      availableSlots: [
        { start: "10:00", end: "12:00" },
        { start: "16:00", end: "18:00" },
      ],
      price: 600,
      image: "/images/banana.jpg",
    },

    {
      coachName: "Kael Garcia",
      specialty: "Tennis",
      availableDate: "Sept 7, 2025",
      availableSlots: [
        { start: "10:00", end: "12:00" },
        { start: "16:00", end: "18:00" },
      ],
      price: 600,
      image: "/images/pakito.jpg",
    },
  ];

  const [filteredCategories, setFilteredCategories] = useState(categories);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [searchText, setSearchText] = useState("");
  const [selectedSportFilter, setSelectedSportFilter] = useState("");
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedSport, setSelectedSport] = useState(null);
  const [selectedCoach, setSelectedCoach] = useState(null);

  const [selectedSlot, setSelectedSlot] = useState("");
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    date: "",
    notes: "",
  });

  // Helper: format slot times
  const formatTimeRange = (slot) => {
    const format = (timeString) => {
      let [hours, minutes] = timeString.split(":").map(Number);
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      return `${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
    };

    return `${format(slot.start)} - ${format(slot.end)}`;
  };

  useEffect(() => {
    let filtered = categories;

    // Filter by search text
    if (searchText) {
      filtered = filtered.filter((cat) =>
        cat.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Filter by dropdown sport
    if (selectedSportFilter) {
      filtered = filtered.filter(
        (cat) => cat.name.toLowerCase() === selectedSportFilter.toLowerCase()
      );
    }

    setFilteredCategories(filtered);
    setCurrentPage(1);
  }, [searchText, selectedSportFilter, categories]);

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCategories.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Start booking
  const handleBook = (sport) => {
    setSelectedSport(sport);
    setSelectedSlot("");
    setShowModal(true);
    setFormData({
      name: "",
      email: "",
      date: new Date().toISOString().split("T")[0],
      notes: "",
    });
  };

  // ✅ PayMongo Checkout Redirect
  const handlePayMongoCheckout = async () => {
    if (!formData.name || !formData.email || !formData.date || !selectedSlot) {
      alert("⚠️ Please fill up all required fields before booking!");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8000/api/create-checkout",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: selectedSport.price,
            description: `${selectedSport.name} Training Session`,
            email: formData.email,
          }),
        }
      );

      const data = await response.json();
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        alert("❌ Failed to start payment. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error connecting to payment gateway.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gray-50 p-6"
    >
      <div className="bg-white p-6 rounded-lg shadow-md">
        <motion.h2
          className="text-3xl font-extrabold mb-8 flex items-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          📋 Book Sports Training Sessions
        </motion.h2>

        {/* Search Input */}
        <div className="flex items-center justify-between pt-2 mb-6">
          <div className="flex gap-4 items-center w-full max-w-2xl">
            {/* Search Input */}
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search sports..."
                className="w-full border border-gray-300 rounded-lg pl-4 pr-10 py-3 shadow-sm text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <TbZoom className="absolute right-3 top-3.5 text-gray-500 h-5 w-5" />
            </div>
            <select
              className="border border-gray-300 rounded-lg px-4 py-3 shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              value={selectedSportFilter}
              onChange={(e) => setSelectedSportFilter(e.target.value)}
            >
              <option value="">All Sports</option>
              <option value="Basketball">Basketball</option>
              <option value="Volleyball">Volleyball</option>
              <option value="Football">Football</option>
              <option value="Badminton">Badminton</option>
              <option value="Tennis">Tennis</option>
              <option value="Swimming">Swimming</option>
              <option value="Swimming">Teakwondo</option>
              <option value="Swimming">Sepak Takraw</option>
              <option value="Swimming">Baseball</option>
              <option value="Swimming">Table tennis </option>
            </select>
          </div>
        </div>

        {/* Sports Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentItems.length > 0 ? (
            currentItems.map((cat) => (
              <div
                key={cat.id}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="h-48 bg-gray-200 relative">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                    ₱{cat.price} / {cat.duration}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {cat.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{cat.description}</p>
                  <button
                    onClick={() => handleBook(cat)}
                    className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-500 text-lg">
                No sports found matching your search.
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
          <span className="text-sm text-gray-600">
            Showing {indexOfFirstItem + 1} to{" "}
            {Math.min(indexOfLastItem, filteredCategories.length)} of{" "}
            {filteredCategories.length} entries
          </span>

          {totalPages > 0 && (
            <Pagination className="w-full">
              <PaginationContent className="flex items-center justify-between w-full">
                {/* Previous button on the left */}
                <div className="flex gap-2">
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={goToPreviousPage}
                      disabled={currentPage === 1}
                      className={
                        currentPage === 1
                          ? "opacity-50 cursor-not-allowed"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>
                </div>

                {/* Page numbers centered */}
                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <PaginationItem key={index}>
                      <PaginationLink
                        onClick={() => goToPage(index + 1)}
                        isActive={currentPage === index + 1}
                        className={
                          currentPage === index + 1
                            ? "bg-blue-800 text-white cursor-pointer"
                            : "cursor-pointer"
                        }
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                </div>

                {/* Next button on the right */}
                <div className="flex gap-2">
                  <PaginationItem>
                    <PaginationNext
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages}
                      className={
                        currentPage === totalPages
                          ? "opacity-50 cursor-not-allowed"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>
                </div>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>

      {/* Modal for Venue + Coaches */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Venue of Sports</DialogTitle>
            <DialogDescription>
              Check the venue, location, and available coaches.
            </DialogDescription>
          </DialogHeader>

          {/* ✅ Venue Section */}
          {selectedSport && (
            <div className="mb-6">
              <img
                src={selectedSport.image}
                alt={selectedSport.name}
                className="w-full h-56 object-cover rounded-lg shadow-md"
              />
              <h2 className="text-xl font-bold mt-2">{selectedSport.name}</h2>
              <p className="text-gray-600">{selectedSport.description}</p>

              {/* ✅ Location + Time */}
              <p className="text-sm text-gray-700 mt-2">
                📍 Location: City Sports Complex, Main Avenue, El Salvador City
              </p>
              <p className="text-sm text-gray-700">
                ⏰ Training Hours: {selectedSport.availableSlots.join(" | ")}
              </p>
            </div>
          )}

          {/* ✅ Coaches Section */}
          <div className="grid gap-4 py-4">
            {coaches.map((coach, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row border rounded-2xl overflow-hidden shadow-md p-4"
              >
                {/* ❌ Removed inline coach image here */}

                {/* ✅ Only View Coach Button inside Venue */}
                <div className="flex-1 flex items-center justify-center">
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-md transition-colors">
                        View Coach
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>{coach.coachName}</DialogTitle>
                        <DialogDescription>Coach Credentials</DialogDescription>
                      </DialogHeader>

                      {/* ✅ Show Coach Image here only */}
                      <img
                        src={coach.image}
                        alt={coach.coachName}
                        className="w-full h-64 object-cover rounded-lg"
                      />

                      {/* ✅ Coach Details */}
                      <div className="mt-3 space-y-2">
                        <p className="text-sm text-gray-700">
                          Specialty: {coach.specialty}
                        </p>
                        <p className="text-sm text-gray-700">
                          📅 Available Date: {coach.availableDate}
                        </p>
                        <p className="text-sm text-gray-700">
                          ⏰ Slots:{" "}
                          {coach.availableSlots
                            .map((slot) => `${slot.start} - ${slot.end}`)
                            .join(" | ")}
                        </p>
                        <p className="text-sm text-gray-700">
                          💰 Rate: ₱{coach.price} per session
                        </p>
                        <p className="text-sm text-gray-700">
                          🎓 Licensed and certified sports coach
                        </p>
                        <p className="text-sm text-gray-700">
                          🏅 5+ years coaching experience
                        </p>
                      </div>

                      {/* ✅ Select Coach Button */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <button
                            onClick={() => setSelectedCoach(coach)}
                            className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg"
                          >
                            Select Coach
                          </button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Book {coach.coachName}</DialogTitle>
                            <DialogDescription>
                              Please fill up your booking details.
                            </DialogDescription>
                          </DialogHeader>

                          {/* ✅ Booking Form */}
                          <form className="space-y-3">
                            <input
                              type="text"
                              placeholder="First Name"
                              className="w-full border rounded-lg p-2"
                              value={formData.firstname}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  firstname: e.target.value,
                                })
                              }
                            />
                            <input
                              type="text"
                              placeholder="Last Name"
                              className="w-full border rounded-lg p-2"
                              value={formData.lastname}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  lastname: e.target.value,
                                })
                              }
                            />
                            <input
                              type="email"
                              placeholder="Email"
                              className="w-full border rounded-lg p-2"
                              value={formData.email}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  email: e.target.value,
                                })
                              }
                            />
                            <input
                              type="text"
                              placeholder="Contact Number"
                              className="w-full border rounded-lg p-2"
                              value={formData.contact}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  contact: e.target.value,
                                })
                              }
                            />

                            <button
                              type="button"
                              onClick={handlePayMongoCheckout}
                              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg"
                            >
                              Confirm & Pay
                            </button>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default BookSession;

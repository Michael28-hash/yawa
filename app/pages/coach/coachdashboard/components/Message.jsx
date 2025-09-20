import React, { useState, useEffect } from "react";
import { FiSend } from "react-icons/fi";
import io from "socket.io-client";

const socket = io("http://localhost:3000"); // ⚡ Change to your backend socket URL

const Messages = ({ currentUser }) => {
  const [players, setPlayers] = useState([
    { id: 1, name: "Player Juan" },
    { id: 2, name: "Player Maria" },
    { id: 3, name: "Player Jose" },
  ]);

  const [recipient, setRecipient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // ✅ Load old messages when recipient changes
  useEffect(() => {
    if (!recipient?.id) return; // stop if recipient is null

    fetch(`http://localhost:8000/api/messages/${recipient.id}`)
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch(() => setMessages([]));

    socket.on("receiveMessage", (message) => {
      if (
        message.sender_id === recipient.id ||
        message.recipient_id === recipient.id
      ) {
        setMessages((prev) => [...prev, message]);
      }
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [recipient]);

  const handleSend = async () => {
    if (!newMessage.trim() || !recipient?.id || !currentUser?.id) return;

    const messageData = {
      sender_id: currentUser.id,
      recipient_id: recipient.id,
      text: newMessage,
      timestamp: new Date(),
    };

    // ✅ Show instantly in UI
    setMessages((prev) => [...prev, messageData]);

    try {
      // ✅ Send via Socket.IO (if running)
      socket.emit("sendMessage", messageData);

      // ✅ Save to Laravel API
      await fetch("http://localhost:8000/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(messageData),
      });
    } catch (err) {
      console.error("Send failed", err);
    }

    setNewMessage("");
  };

  return (
    <div className="flex h-[80vh] max-w-5xl mx-auto border rounded-2xl shadow-lg bg-white">
      {/* Sidebar - Players */}
      <div className="w-1/4 border-r bg-gray-100 rounded-l-2xl">
        <div className="p-4 font-semibold border-b bg-green-600 text-white rounded-tl-2xl">
          Players
        </div>
        <div className="divide-y">
          {players.map((player) => (
            <button
              key={player.id}
              onClick={() => setRecipient(player)}
              className={`w-full text-left p-3 hover:bg-green-100 transition ${
                recipient?.id === player.id ? "bg-green-200 font-medium" : ""
              }`}
            >
              {player.name}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b bg-green-600 text-white rounded-tr-2xl font-semibold">
          {recipient
            ? `Chat with ${recipient?.name}`
            : "Select a player to start chatting"}
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
          {recipient ? (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender_id === currentUser?.id
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-2xl shadow ${
                    msg.sender_id === currentUser?.id
                      ? "bg-green-600 text-white rounded-br-none"
                      : "bg-gray-200 text-gray-800 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center mt-10">
              Please select a player from the left to start chatting.
            </p>
          )}
        </div>

        {/* Input */}
        {recipient && (
          <div className="p-4 border-t flex items-center gap-2 bg-white rounded-b-2xl">
            <input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={handleSend}
              className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-full transition"
            >
              <FiSend size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;

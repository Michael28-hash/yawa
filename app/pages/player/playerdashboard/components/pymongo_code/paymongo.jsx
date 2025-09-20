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
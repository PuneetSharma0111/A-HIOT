document.getElementById("filterBtn").addEventListener("click", async () => {
  const n = parseInt(prompt("Enter how many SDF files to move to Active:"));

  const messageEl = document.getElementById("message");

  if (isNaN(n) || n < 0) {
    messageEl.textContent = "❌ Please enter a valid non-negative number.";
    return;
  }

  messageEl.textContent = "⏳ Filtering SDF files...";

  try {
    const res = await fetch("/filter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ n })
    });

    const msg = await res.text();
    messageEl.textContent = msg;
  } catch (err) {
    console.error("❌ Error:", err);
    messageEl.textContent = "❌ Failed to filter files. Check server logs.";
  }
});

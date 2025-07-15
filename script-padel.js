const padelBtn = document.getElementById("padelBtn");
const message = document.getElementById("message");
const downloadLinkA = document.getElementById("downloadLinkA");
const downloadLinkB = document.getElementById("downloadLinkB");

padelBtn.addEventListener("click", async () => {
  message.textContent = "⏳ Running PaDEL Descriptor...";
  downloadLinkA.hidden = true;
  downloadLinkB.hidden = true;

  try {
    const res = await fetch("/padel", { method: "POST" });
    const text = await res.text();
    message.textContent = text;

    if (res.ok && text.includes("✅")) {
      downloadLinkA.hidden = false;
      downloadLinkB.hidden = false;
    }
  } catch (err) {
    message.textContent = "❌ Failed to run PaDEL.";
  }
});

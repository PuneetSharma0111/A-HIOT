const correlateBtn = document.getElementById("correlateBtn");
const correlationMsg = document.getElementById("correlationMsg");
const downloadCorrCSV = document.getElementById("downloadCorrCSV");
const downloadCorrPNG = document.getElementById("downloadCorrPNG");

correlateBtn.addEventListener("click", async () => {
  correlationMsg.textContent = "⏳ Generating correlation heatmap...";
  downloadCorrCSV.hidden = true;
  downloadCorrPNG.hidden = true;

  try {
    const res = await fetch("/api/correlation-heatmap");
    const text = await res.text();
    correlationMsg.textContent = text;

    if (res.ok && text.includes("✅")) {
      downloadCorrCSV.hidden = false;
      downloadCorrPNG.hidden = false;
    }
  } catch (err) {
    correlationMsg.textContent = "❌ Failed to generate correlation.";
  }
});

const uploadForm = document.getElementById("uploadForm");
const filterBtn = document.getElementById("filterBtn");
const padelBtn = document.getElementById("padelBtn");
const message = document.getElementById("message");
const downloadLink = document.getElementById("downloadLink");        // For single file
const downloadLinkA = document.getElementById("downloadLinkA");      // For descriptorsA.csv
const downloadLinkB = document.getElementById("downloadLinkB");      // For descriptorsB.csv

// Upload CSV & Generate SDF
if (uploadForm) {
  uploadForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(uploadForm);
    message.textContent = "📤 Uploading & generating SDFs...";

    try {
      const res = await fetch("/upload", {
        method: "POST",
        body: formData,
      });
      const text = await res.text();
      message.textContent = text;
    } catch (err) {
      message.textContent = "❌ Upload failed.";
    }
  });
}

// Filter Active/Decoy SDFs
if (filterBtn) {
  filterBtn.addEventListener("click", async () => {
    message.textContent = "🔍 Filtering SDFs...";

    try {
      const res = await fetch("/filter");
      const text = await res.text();
      message.textContent = text;
    } catch (err) {
      message.textContent = "❌ Filtering failed.";
    }
  });
}

// Run PaDEL Descriptor Generation
if (padelBtn) {
  padelBtn.addEventListener("click", async () => {
    message.textContent = "⏳ Running PaDEL Descriptor...";
    if (downloadLink) downloadLink.hidden = true;
    if (downloadLinkA) downloadLinkA.hidden = true;
    if (downloadLinkB) downloadLinkB.hidden = true;

    try {
      const res = await fetch("/padel", { method: "POST" });
      const text = await res.text();
      message.textContent = text;

      if (res.ok && text.includes("✅")) {
        if (downloadLink) downloadLink.hidden = false;
        if (downloadLinkA) downloadLinkA.hidden = false;
        if (downloadLinkB) downloadLinkB.hidden = false;
      }
    } catch (err) {
      message.textContent = "❌ PaDEL execution failed.";
    }
  });
}

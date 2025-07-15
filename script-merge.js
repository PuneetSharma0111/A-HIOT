const mergeBtn = document.getElementById("mergeBtn");
const mergeMsg = document.getElementById("mergeMsg");
const mergedDownload = document.getElementById("mergedDownload");

mergeBtn.addEventListener("click", async () => {
  mergeMsg.textContent = "⏳ Merging descriptors...";
  mergedDownload.hidden = true;

  try {
    const res = await fetch("/merge", { method: "POST" });
    const text = await res.text();
    mergeMsg.textContent = text;

    if (res.ok && text.includes("✅")) {
      mergedDownload.hidden = false;
    }
  } catch (err) {
    mergeMsg.textContent = "❌ Merge failed.";
  }
});

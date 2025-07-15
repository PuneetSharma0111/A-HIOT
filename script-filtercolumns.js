const filterColsBtn = document.getElementById("filterColsBtn");
const filterColsMsg = document.getElementById("filterColsMsg");
const downloadFiltered = document.getElementById("downloadFiltered");

filterColsBtn.addEventListener("click", async () => {
  filterColsMsg.textContent = "⏳ Filtering columns based on standard deviation...";
  downloadFiltered.hidden = true;

  try {
    const res = await fetch("/filter-columns");
    const text = await res.text();
    filterColsMsg.textContent = text;

    if (res.ok && text.includes("✅")) {
      downloadFiltered.hidden = false;
    }
  } catch (err) {
    filterColsMsg.textContent = "❌ Error filtering columns.";
  }
});

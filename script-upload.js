document.getElementById("uploadForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const response = await fetch("/upload", {
    method: "POST",
    body: formData,
  });
  const msg = await response.text();
  document.getElementById("message").textContent = msg;
});
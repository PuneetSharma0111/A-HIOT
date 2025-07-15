const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");

const app = express();
const PORT = 5000;

// 🔸 Step 1: Logging server start
console.log("🟡 Step 1: Starting server.js...");

// 🔸 Step 2: Middleware
app.use(express.json()); // For JSON requests
app.use(fileUpload());   // For file uploads

// 🔸 Step 3: Serve static frontend files
app.use(express.static(path.join(__dirname, "public"))); // HTML, CSS, JS

// 🔸 Step 4: Serve download directories
app.use("/descriptors", express.static(path.join(__dirname, "descriptors")));         // e.g., correlation heatmap
app.use("/output", express.static(path.join(__dirname, "public", "output")));         // for labeled CSV download

console.log("🟢 Step 2: Middleware and static setup complete.");

// 🔸 Step 5: Load backend routes
try {
  app.use("/upload", require("./routes/upload"));
  app.use("/filter", require("./routes/filter"));
  app.use("/padel", require("./routes/padel"));
  app.use("/merge", require("./routes/merge"));
  app.use("/filter-columns", require("./routes/filter_columns"));
  app.use("/api/correlation-heatmap", require("./routes/correlation_heatmap"));
  app.use("/filter-final", require("./routes/filter_final_columns"));
  app.use("/add-label", require("./routes/add_label")); // ✅ New route
  app.use("/ensemble", require("./routes/ensemble_pipeline")); 

  console.log("✅ Routes loaded successfully.");
} catch (err) {
  console.error("❌ Route loading error:", err.message);
}

// 🔸 Step 6: Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running at: http://localhost:${PORT}`);
});

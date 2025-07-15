const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");

const app = express();
const PORT = 5000;

console.log("🟡 Step 1: Starting server.js...");

app.use(express.json()); 
app.use(fileUpload());   

app.use(express.static(path.join(__dirname, "public"))); 

app.use("/descriptors", express.static(path.join(__dirname, "descriptors")));         
app.use("/output", express.static(path.join(__dirname, "public", "output")));        

console.log("🟢 Step 2: Middleware and static setup complete.");

try {
  app.use("/upload", require("./routes/upload"));
  app.use("/filter", require("./routes/filter"));
  app.use("/padel", require("./routes/padel"));
  app.use("/merge", require("./routes/merge"));
  app.use("/filter-columns", require("./routes/filter_columns"));
  app.use("/api/correlation-heatmap", require("./routes/correlation_heatmap"));
  app.use("/filter-final", require("./routes/filter_final_columns"));
  app.use("/add-label", require("./routes/add_label")); 
  app.use("/ensemble", require("./routes/ensemble_pipeline")); 

  console.log("✅ Routes loaded successfully.");
} catch (err) {
  console.error("❌ Route loading error:", err.message);
}

app.listen(PORT, () => {
  console.log(`✅ Server running at: http://localhost:${PORT}`);
});

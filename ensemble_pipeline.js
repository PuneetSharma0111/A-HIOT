const express = require("express");
const { exec } = require("child_process");
const path = require("path");

const router = express.Router();

router.post("/", (req, res) => {
  const scriptPath = path.join(__dirname, "..", "scripts", "ensemble_pipeline.py");

  console.log("▶️ Running ensemble pipeline...");

  exec(`python "${scriptPath}"`, (error, stdout, stderr) => {
    if (error) {
      console.error("[❌ Python Error]", stderr);
      return res.status(500).json({ success: false, error: stderr });
    }

    console.log("[✅ Ensemble script output]\n", stdout);
    return res.json({ success: true, output: stdout });
  });
});

module.exports = router;

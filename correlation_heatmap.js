const express = require("express");
const { exec } = require("child_process");
const path = require("path");

const router = express.Router();

router.get("/", (req, res) => {
  const scriptPath = path.join(__dirname, "../scripts/correlation_heatmap.py");

  exec(`python "${scriptPath}"`, (error, stdout, stderr) => {
    if (error) {
      console.error("❌ Heatmap Script Error:", stderr || error.message);
      return res.status(500).send("❌ Error generating correlation heatmap.");
    }

    console.log("✅ Heatmap Script Output:\n", stdout);
    res.send("✅ Correlation heatmap generated! Download CSV & PNG.");
  });
});

module.exports = router;

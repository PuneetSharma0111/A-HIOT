const express = require("express");
const router = express.Router();
const path = require("path");
const { spawn } = require("child_process");

router.post("/", (req, res) => {
  const scriptPath = path.join(__dirname, "../scripts/filter_final_columns.py");

  const pythonProcess = spawn("python", ["-u", scriptPath]);

  pythonProcess.stdout.on("data", (data) => {
    console.log(`[✅ Python] ${data}`);
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(`[❌ Python Error] ${data}`);
  });

  pythonProcess.on("close", (code) => {
    if (code === 0) {
      res.json({
        success: true,
        message: "✅ Final ML-ready CSV generated.",
        csvPath: "/output/BOTH_Final_ML_ready_file.csv",
      });
    } else {
      res.status(500).json({
        success: false,
        message: "❌ Error generating final ML-ready CSV.",
      });
    }
  });
});

module.exports = router;

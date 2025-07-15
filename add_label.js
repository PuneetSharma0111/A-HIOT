const express = require("express");
const router = express.Router();
const { exec } = require("child_process");
const path = require("path");

router.post("/", (req, res) => {
  const numOnes = req.body.numOnes;

  if (!numOnes || isNaN(numOnes)) {
    return res.status(400).json({ error: "Invalid input. Please provide a number." });
  }

  const scriptPath = path.join(__dirname, "../scripts/add_binary_label.py");

  exec(`python "${scriptPath}" ${numOnes}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`[❌ Python Error] ${stderr}`);
      return res.status(500).json({ error: "Error running Python script." });
    }
    console.log(`[✅ Python Output] ${stdout}`);
    res.json({ message: "Labeling complete.", output: stdout });
  });
});

module.exports = router;

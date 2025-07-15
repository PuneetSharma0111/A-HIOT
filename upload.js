const express = require("express");
const router = express.Router();
const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

router.post("/", (req, res) => {
  if (!req.files || !req.files.smiles) {
    return res.status(400).send("No SMILES file uploaded.");
  }

  const file = req.files.smiles;
  const inputPath = path.join(__dirname, "../uploads/smile.txt");

  file.mv(inputPath, (err) => {
    if (err) return res.status(500).send(err);

    const py = spawn("python", ["scripts/generate_sdf.py"]);

    py.stdout.on("data", (data) => console.log(`PYTHON: ${data}`));
    py.stderr.on("data", (data) => console.error(`PYTHON ERROR: ${data}`));

    py.on("close", (code) => {
      if (code === 0) {
        res.send("✅ SDF generation complete.");
      } else {
        res.status(500).send("❌ Error generating SDFs.");
      }
    });
  });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const { spawn } = require("child_process");
const path = require("path");

// GET request will serve a default UI or message (optional)
router.get("/", (req, res) => {
  res.send("Use POST /filter with JSON: { \"n\": number_of_files_to_move }");
});

// POST route to run Python filter script
router.post("/", (req, res) => {
  const n = req.body.n;

  if (!Number.isInteger(n) || n < 0) {
    return res.status(400).send("❌ Invalid value for 'n'. Must be a non-negative integer.");
  }

  const pythonScriptPath = path.join(__dirname, "../scripts/filter_by_number.py");
  const process = spawn("python", [pythonScriptPath, n.toString()]);

  let output = "";
  let errorOutput = "";

  process.stdout.on("data", (data) => {
    output += data.toString();
  });

  process.stderr.on("data", (data) => {
    errorOutput += data.toString();
  });

  process.on("close", (code) => {
    if (code === 0) {
      res.send(`✅ Filtering complete.\n\n${output}`);
    } else {
      res.status(500).send(`❌ Error in filtering script.\n\n${errorOutput}`);
    }
  });
});

module.exports = router;

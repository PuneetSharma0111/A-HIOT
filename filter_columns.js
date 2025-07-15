const express = require("express");
const { exec } = require("child_process");
const path = require("path");

const router = express.Router();

router.get("/", (req, res) => {
  const scriptPath = path.join(__dirname, "../scripts/filter_columns.py");

  const command = `python "${scriptPath}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error("❌ Filter Columns Error:", stderr || error.message);
      return res.status(500).send("❌ Error filtering columns.");
    }

    console.log("✅ Filter Columns Output:\n", stdout);
    res.send("✅ Columns filtered successfully! You can now download filtered.csv.");
  });
});

module.exports = router;

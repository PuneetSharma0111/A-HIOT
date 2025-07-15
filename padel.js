const express = require("express");
const { exec } = require("child_process");
const path = require("path");

const router = express.Router();

router.post("/", (req, res) => {
  const pythonScript = path.join(__dirname, "../scripts/run_padel.py");

  exec(`python "${pythonScript}"`, (error, stdout, stderr) => {
    if (error) {
      console.error("❌ PYTHON ERROR:", stderr || error.message);
      return res.status(500).send("❌ Error running PaDEL script.");
    }

    console.log("✅ PaDEL Output:\n", stdout);
    res.send("✅ PaDEL descriptor generation complete. Check descriptorsA.csv and descriptorsB.csv.");
  });
});

module.exports = router;

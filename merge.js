const express = require("express");
const { exec } = require("child_process");
const path = require("path");

const router = express.Router();

router.post("/", (req, res) => {
  const pythonScript = path.join(__dirname, "../scripts/merge_descriptors.py");

  exec(`python "${pythonScript}"`, (error, stdout, stderr) => {
    if (error) {
      console.error("❌ Merge Error:", stderr || error.message);
      return res.status(500).send("❌ Error merging descriptors.");
    }

    console.log("✅ Merge Output:\n", stdout);
    res.send("✅ Descriptors merged successfully! Download is ready.");
  });
});

module.exports = router;

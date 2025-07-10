import sys
from pathlib import Path
import pandas as pd

# ✅ Adjusted paths to match frontend-accessible directory
BASE_DIR = Path("D:/molecule-processor")
INPUT_FILE = BASE_DIR / "output" / "BOTH_Final_ML_ready_file.csv"
OUTPUT_FILE = BASE_DIR / "public" / "output" / "BOTH_Final_ML_ready_file_with_label.csv"
NEW_COL_NAME = "y"

try:
    num_ones = int(sys.argv[1])
except (IndexError, ValueError):
    print("❌ Please provide a valid number as argument.")
    sys.exit(1)

# Load input data
df = pd.read_csv(INPUT_FILE)
total_rows = len(df)

# Validate user input
if not (0 <= num_ones <= total_rows):
    print("❌ Number of 1s must be between 0 and total rows.")
    sys.exit(1)

# Generate binary label column
labels = [1] * num_ones + [0] * (total_rows - num_ones)
df[NEW_COL_NAME] = labels

# Ensure the output directory exists
OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)

# Save the labeled file
df.to_csv(OUTPUT_FILE, index=False)
print(f"Created: {OUTPUT_FILE} with {num_ones} 1s and {total_rows - num_ones} 0s.")

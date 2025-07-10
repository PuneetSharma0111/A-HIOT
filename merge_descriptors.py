import os
import sys
import pandas as pd
import shutil

# Paths (Windows-compatible)
base_dir = "D:\\molecule-processor\\public"
file1_path  = os.path.join(base_dir, "descriptorsA.csv")
file2_path  = os.path.join(base_dir, "descriptorsB.csv")
output_path = os.path.join(base_dir, "descriptors", "merged.csv")

# 1️⃣ Check inputs exist
for f in (file1_path, file2_path):
    if not os.path.isfile(f):
        sys.exit(f"❌ Input file not found: {f}")

# 2️⃣ Ensure output folder exists
os.makedirs(os.path.dirname(output_path), exist_ok=True)

# 3️⃣ Read & Merge
df1 = pd.read_csv(file1_path)
df2 = pd.read_csv(file2_path, skiprows=1, header=None)
df2.columns = df1.columns
merged_df = pd.concat([df1, df2], ignore_index=True)

# 4️⃣ Save Merged CSV
merged_df.to_csv(output_path, index=False)
print(f"[SUCCESS] Merged CSV saved to: {output_path}")

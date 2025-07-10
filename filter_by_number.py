import os
import shutil
import re
import sys

# Get 'n' from command line
try:
    n = int(sys.argv[1])
    if n < 0:
        print("❌ N must be non-negative.")
        sys.exit(1)
except (IndexError, ValueError):
    print("❌ Invalid input. Please provide a valid number.")
    sys.exit(1)

# Windows paths
source_dir = "D:/molecule-processor/output_sdf"
active_dir = "D:/molecule-processor/Active"
decoy_dir = "D:/molecule-processor/Decoy"

os.makedirs(active_dir, exist_ok=True)
os.makedirs(decoy_dir, exist_ok=True)

def extract_number(filename):
    match = re.search(r"molecule_(\d+)\.sdf", filename)
    return int(match.group(1)) if match else float('inf')

sdf_files = sorted(
    [f for f in os.listdir(source_dir) if f.endswith(".sdf")],
    key=extract_number
)

for idx, filename in enumerate(sdf_files):
    src_path = os.path.join(source_dir, filename)
    try:
        if idx < n:
            shutil.move(src_path, os.path.join(active_dir, filename))
            print(f"Moved to Active: {filename}")
        else:
            shutil.move(src_path, os.path.join(decoy_dir, filename))
            print(f"Moved to Decoy: {filename}")
    except Exception as e:
        print(f"Error moving {filename}: {e}")


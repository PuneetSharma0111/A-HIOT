import csv
import math
import os
from statistics import mean

# File paths
input_file = "public/descriptors/merged.csv"
output_file = "public/descriptors/filtered.csv"

# Ensure input file exists
if not os.path.isfile(input_file):
    print("[ERROR] Input file not found:", input_file)
    exit(1)

# Read CSV
try:
    with open(input_file, 'r', newline='') as f:
        reader = list(csv.reader(f))
        header = reader[0]
        data = reader[1:]
except Exception as e:
    print("[ERROR] Failed to read input file:", e)
    exit(1)

row_count = len(data)
num_cols = len(header)
selected_indices = [0]  # Always keep the first column (ID or compound name)

# Thresholds (loosened)
nonzero_ratio_threshold = 0.05  # only 5% non-zero required
stddev_threshold = 0.001        # allow low variation columns

# Filter descriptor columns
for i in range(1, num_cols):
    column = [row[i] for row in data]
    non_zero = []

    for val in column:
        try:
            num = float(val)
            if num != 0:
                non_zero.append(num)
        except ValueError:
            continue  # skip invalid numbers

    if len(non_zero) == 0:
        continue

    if len(non_zero) < nonzero_ratio_threshold * row_count:
        continue

    avg = mean(non_zero)
    stddev = math.sqrt(sum((x - avg) ** 2 for x in non_zero) / len(non_zero))

    if stddev >= stddev_threshold:
        selected_indices.append(i)

# If no columns are selected other than name, show warning
if len(selected_indices) <= 1:
    print("[WARNING] No descriptor columns passed the filter. Output will contain only the first column.")
else:
    print(f"[INFO] Selected {len(selected_indices)-1} descriptor columns out of {num_cols-1}.")

# Ensure output directory exists
os.makedirs(os.path.dirname(output_file), exist_ok=True)

# Write filtered CSV
try:
    with open(output_file, 'w', newline='') as f:
        writer = csv.writer(f)
        writer.writerow([header[i] for i in selected_indices])
        for row in data:
            writer.writerow([row[i] for i in selected_indices])
except PermissionError:
    print("[ERROR] Output file is open. Close it and retry.")
    exit(1)
except Exception as e:
    print("[ERROR] Failed to write output file:", e)
    exit(1)

print("[OK] Filtered CSV saved to:", output_file)

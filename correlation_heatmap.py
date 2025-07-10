import os
import sys
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import shutil

# ✅ Avoid UnicodeEncodeError in Windows terminals
try:
    sys.stdout.reconfigure(encoding='utf-8')
except Exception:
    pass  # Safe fallback for older Python versions

# Input CSV path
input_path = "public/descriptors/filtered.csv"

# Output directories
temp_output_dir = "output"
final_output_dir = "public/descriptors"

# Filenames
csv_name = "correlation_matrix.csv"
png_name = "correlation_matrix_heatmap.png"

# Create directories if not exist
os.makedirs(temp_output_dir, exist_ok=True)
os.makedirs(final_output_dir, exist_ok=True)

# Full paths
temp_csv_path = os.path.join(temp_output_dir, csv_name)
temp_png_path = os.path.join(temp_output_dir, png_name)
final_csv_path = os.path.join(final_output_dir, csv_name)
final_png_path = os.path.join(final_output_dir, png_name)

try:
    # Load CSV and drop first column (assumed compound names)
    data = pd.read_csv(input_path)
    if data.shape[1] <= 1:
        print("Error: CSV has no descriptor columns.")
        exit(1)

    numeric_data = data.iloc[:, 1:]

    # Check if numeric_data has valid values
    if numeric_data.select_dtypes(include='number').empty:
        print("Error: No numeric data found in filtered.csv")
        exit(1)

    # Correlation matrix
    corr = numeric_data.corr(method="pearson")
    corr.to_csv(temp_csv_path)

    # Heatmap
    plt.figure(figsize=(12, 10))
    sns.heatmap(corr, cmap="coolwarm", center=0, square=True, linewidths=0.5)
    plt.title("Correlation Matrix of Descriptors")
    plt.tight_layout()
    plt.savefig(temp_png_path, dpi=300)

    # Move to final public directory
    shutil.move(temp_csv_path, final_csv_path)
    shutil.move(temp_png_path, final_png_path)

    print("OK: Correlation heatmap generated.")
    print(f"CSV saved to: {final_csv_path}")
    print(f"PNG saved to: {final_png_path}")

except Exception as e:
    print(f"Error: Failed to generate correlation heatmap – {str(e)}")
    exit(1)

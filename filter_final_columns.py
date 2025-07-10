import pandas as pd

# ── Input Files ──────────────────────────────────────────────
descriptor_file = "public/descriptors/merged.csv"
keep_file = "public/descriptors/correlation_matrix.csv"
output_file = "output/BOTH_Final_ML_ready_file.csv"
# ─────────────────────────────────────────────────────────────

# Read the descriptors to keep from the header of the corr_processed.csv
keep_df = pd.read_csv(keep_file, nrows=0)
keep_names = list(keep_df.columns)

# Read the full descriptor data
df = pd.read_csv(descriptor_file)

# Always keep the first column (e.g., molecule name)
first_col = df.columns[0]
columns_to_keep = [first_col] + [col for col in df.columns if col in keep_names]

# Filter and save
df[columns_to_keep].to_csv(output_file, index=False)
print(f"Final ML-ready file saved to: {output_file}")

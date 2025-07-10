import subprocess
import os
import sys

# Force UTF-8 encoding for Windows terminal (especially on Windows)
sys.stdout.reconfigure(encoding='utf-8')

# Define base and input/output paths
base_path = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
padel_jar = os.path.join(base_path, "PaDEL-Descriptor", "PaDEL-Descriptor.jar")
active_dir = os.path.join(base_path, "Active")
decoy_dir = os.path.join(base_path, "Decoy")
outputA = os.path.join(base_path, "public", "descriptorsA.csv")
outputB = os.path.join(base_path, "public", "descriptorsB.csv")

def run_padel(input_dir, output_file):
    print(f"🚀 Processing {input_dir} --> {output_file}")

    command = [
        "java", "-Xms512M", "-Xmx2G",
        "-jar", padel_jar,
        "-dir", input_dir,
        "-file", output_file,
        "-2d",  # Optional: Only compute 2D descriptors
        "-fingerprints"  # Include fingerprints like in padelpy
    ]

    try:
        result = subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        print(result.stdout)
        if result.stderr:
            print("⚠️ Warnings/Errors:\n", result.stderr)
        if os.path.exists(output_file):
            print(f"✅ Output saved to: {output_file}")
        else:
            print(f"❌ Output file not generated: {output_file}")
    except subprocess.CalledProcessError as e:
        print("❌ PaDEL-Descriptor execution failed:", e)

if __name__ == "__main__":
    run_padel(active_dir, outputA)
    run_padel(decoy_dir, outputB)

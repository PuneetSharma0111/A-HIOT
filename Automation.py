import os
import subprocess

base_path = "/home/vishal/A_HIOT_NEW/AUTO_MATION"

# STEP 1: Create folders
folders = [
    "ACTIVE_SDF_PADEL", "CHEMICAL_SPACE", "DECOYS_SDF_PADEL",
    "MERGE_ACTIVE_DECOYS", "PRE_PROCESSING", "SDF_FILE"
]
print("STEP 1: Creating required folders...")
try:
    for folder in folders:
        os.makedirs(os.path.join(base_path, folder), exist_ok=True)
    print("✅ Folders created.\n")
except Exception as e:
    print(f"❌ Folder creation failed: {e}")
    exit(1)

# Function to run and verify Python scripts
def run_script(script_path, step_name):
    print(f"{step_name}: Running {script_path}")
    result = subprocess.run(["python3", script_path], capture_output=True, text=True)
    if result.returncode != 0:
        print(f"❌ {step_name} failed.\nError:\n{result.stderr}")
        exit(1)
    print(f"✅ {step_name} completed.\n")

# STEP 2: Run sdf.py
run_script(os.path.join(base_path, "/home/vishal/A_HIOT_NEW/AUTO_MATION/sdf.py"), "STEP 2")

# STEP 3: Run move_sdf.py
run_script(os.path.join(base_path, "/home/vishal/A_HIOT_NEW/AUTO_MATION/move_sdf.py"), "STEP 3")

# STEP 4: Run ACTIVE_SDF_PADEL/run_padel.py
run_script(os.path.join(base_path, "/home/vishal/A_HIOT_NEW/AUTO_MATION/run_padel1.py"), "STEP 4")

# STEP 5: Run DECOYS_SDF_PADEL/run_padel.py
run_script(os.path.join(base_path, "/home/vishal/A_HIOT_NEW/AUTO_MATION/run_padel0.py"), "STEP 5")

# STEP 6: Check descriptor files
print("STEP 6: Checking if descriptor files were generated...")
desc1 = os.path.join(base_path, "/home/vishal/A_HIOT_NEW/AUTO_MATION/ACTIVE_SDF_PADEL/descriptors_output1.csv")
desc0 = os.path.join(base_path, "/home/vishal/A_HIOT_NEW/AUTO_MATION/DECOYS_SDF_PADEL/descriptors_output0.csv")

if os.path.exists(desc1) and os.path.exists(desc0):
    print("✅ Descriptor files exist.\n")
else:
    print("❌ Descriptor files not found. Halting pipeline.")
    exit(1)

# STEP 7: Run merge.py
run_script(os.path.join(base_path, "/home/vishal/A_HIOT_NEW/AUTO_MATION/merge.py"), "STEP 7")

# STEP 8: Run removal_of_zeros1.py
run_script(os.path.join(base_path, "/home/vishal/A_HIOT_NEW/AUTO_MATION/removal_of_zeros1.py"), "STEP 8")

# STEP 9: Run sd_csv2.py
run_script(os.path.join(base_path, "/home/vishal/A_HIOT_NEW/AUTO_MATION/sd_csv2.py"), "STEP 9")

# STEP 10: Run R_scrpt_python3.py
run_script(os.path.join(base_path, "/home/vishal/A_HIOT_NEW/AUTO_MATION/R_scrpt_python3.py"), "STEP 10")

# STEP 11: Run corr4.py
run_script(os.path.join(base_path, "/home/vishal/A_HIOT_NEW/AUTO_MATION/corr4.py"), "STEP 11")

# STEP 12: Run ext_final5.py
run_script(os.path.join(base_path, "/home/vishal/A_HIOT_NEW/AUTO_MATION/ext_final5.py"), "STEP 12")

# STEP 13: Run MACHINE_LEARNING_PREPARTION.py
run_script(os.path.join(base_path, "/home/vishal/A_HIOT_NEW/AUTO_MATION/MACHINE_LEARNING_PREPARTION.py"), "STEP 13")

# STEP 14: Run move_file.py
run_script(os.path.join(base_path, "/home/vishal/A_HIOT_NEW/AUTO_MATION/move_file.py"), "STEP 14")

# STEP 15: Run new_script_feature_csv.py
run_script(os.path.join(base_path, "/home/vishal/A_HIOT_NEW/AUTO_MATION/new_script_feature_csv.py"), "STEP 15")

print("🎉 Automation pipeline completed successfully!")


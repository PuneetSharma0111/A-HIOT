import os
from rdkit import Chem
from rdkit.Chem import AllChem

input_path = "uploads/smile.txt"
output_dir = "output_sdf"
os.makedirs(output_dir, exist_ok=True)

with open(input_path, "r") as f:
    for idx, line in enumerate(f, start=1):
        smi = line.strip()
        if not smi:
            continue
        mol = Chem.MolFromSmiles(smi)
        if mol is None:
            print(f"[ERROR] Invalid SMILES at line {idx}: {smi}")
            continue
        mol = Chem.AddHs(mol)
        AllChem.EmbedMolecule(mol, randomSeed=0xf00d)
        AllChem.UFFOptimizeMolecule(mol)  
        fname = os.path.join(output_dir, f"molecule_{idx:03d}.sdf")
        writer = Chem.SDWriter(fname)
        writer.write(mol)
        writer.close()
        print(f"[OK] Wrote {fname}")

# DSPYRepo

A repository for DSPY experimentation.

## Getting Started

Clone the repository:

```bash
cd DMP

pip install -r requirements.txt

# Without Chain of Thought, Process default (min of 50 or total stories)
python modifiedHierarcy.py

# With Chain of Thought reasoning
python modifiedHierarcy.py --cot

# Custom stpries folder
python modifiedHierarcy.py --folder /path/to/stories --cot

# Process only 10 stories
python modifiedHierarcy.py --num_rows 10  

```

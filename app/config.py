import torch
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
from IndicTransToolkit import IndicProcessor

DEVICE = "cuda" if torch.cuda.is_available() else "cpu"

MODEL_NAME = "ai4bharat/indictrans2-indic-en-1B"

print("Loading model and tokenizer...")
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME, trust_remote_code=True)
model = AutoModelForSeq2SeqLM.from_pretrained(MODEL_NAME, trust_remote_code=True).to(DEVICE)
ip = IndicProcessor(inference=True)
print("Model loaded.")

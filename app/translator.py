import torch
from transformers import AutoModelForSeq2SeqLM, AutoTokenizer
from IndicTransToolkit import IndicProcessor

model_name = "ai4bharat/indictrans2-en-indic-1B"  # <-- Correct model for English to Hindi

tokenizer = AutoTokenizer.from_pretrained(model_name, trust_remote_code=True)
model = AutoModelForSeq2SeqLM.from_pretrained(model_name, trust_remote_code=True)
ip = IndicProcessor(inference=True)

DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
model.to(DEVICE)

input_sentences = [
    "No recent rain. Weather is clear.",
    "Cloudy sky expected in the evening.",
]

src_lang, tgt_lang = "eng_Latn", "hin_Deva"  # English to Hindi

def translate_text(input_sentences, src_lang, tgt_lang):
    batch = ip.preprocess_batch(
        input_sentences,
        src_lang=src_lang,
        tgt_lang=tgt_lang,
    )

    inputs = tokenizer(
        batch,
        truncation=True,
        padding="longest",
        return_tensors="pt",
        return_attention_mask=True,
    ).to(DEVICE)

    with torch.no_grad():
        generated_tokens = model.generate(
            **inputs,
            use_cache=True,
            min_length=0,
            max_length=256,
            num_beams=5,
            num_return_sequences=1,
        )

    with tokenizer.as_target_tokenizer():
        generated_tokens = tokenizer.batch_decode(
            generated_tokens.detach().cpu().tolist(),
            skip_special_tokens=True,
            clean_up_tokenization_spaces=True,
        )

    translations = ip.postprocess_batch(generated_tokens, lang=tgt_lang)

    for src, tgt in zip(input_sentences, translations):
        print(f"{src_lang}: {src}")
        print(f"{tgt_lang}: {tgt}")
        print()

translate_text(input_sentences, src_lang, tgt_lang)

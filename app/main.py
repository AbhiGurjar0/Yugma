from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from app.translator import translate_text

app = FastAPI(title="IndicTrans2 API")

class TranslateRequest(BaseModel):
    sentences: List[str]
    src_lang: str
    tgt_lang: str

class TranslateResponse(BaseModel):
    translations: List[str]

@app.post("/translate", response_model=TranslateResponse)
def translate(req: TranslateRequest):
    try:
        results = translate_text(req.sentences, req.src_lang, req.tgt_lang)
        return TranslateResponse(translations=results)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

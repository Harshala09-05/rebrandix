import os
import re
from PIL import Image
import pytesseract
from PyPDF2 import PdfReader

pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

TRUSTED_ISSUERS = [
    "TUV NORD", "TUV SUD", "SGS", "BSI", "URS", "Intertek",
    "DNV", "Bureau Veritas", "LRQA"
]

def extract_text(path):
    ext = os.path.splitext(path)[1].lower()
    text = ""
    try:
        if ext == ".pdf":
            reader = PdfReader(path)
            if reader.is_encrypted:
                reader.decrypt("")
            for page in reader.pages:
                text += page.extract_text() or ""
        elif ext in [".jpg", ".jpeg", ".png"]:
            image = Image.open(path)
            text = pytesseract.image_to_string(image)
    except Exception as e:
        print("Extraction failed:", e)
    return text

def analyze_certificate(text):
    result = {}
    result['iso_9001_found'] = bool(
        re.search(r'(ISO|DIN\s*EN\s*ISO|ISO/IEC)[\s\-:]*9001[\s\-:]*2015', text, re.IGNORECASE)
    )
    cert_match = re.search(
        r'(Certificate\s*(No\.?|Registration\s*No\.?))[:\-]?\s*(\S+)', text, re.IGNORECASE
    )
    result['certificate_number'] = cert_match.group(3) if cert_match else "Not Found"
    normalized_text = text.lower().replace("ü", "u").replace("ö", "o").replace("ä", "a")
    result['issuer'] = next(
        (issuer for issuer in TRUSTED_ISSUERS if issuer.lower().replace("ü", "u") in normalized_text),
        "Untrusted / Unknown"
    )
    score = 0
    if result['iso_9001_found']:
        score += 50
    if result['certificate_number'] != "Not Found":
        score += 20
    if result['issuer'] != "Untrusted / Unknown":
        score += 30
    result['trust_score'] = score
    result['verdict'] = (
        "✅ ORIGINAL" if score >= 80 else
        "⚠️ SUSPICIOUS" if score >= 50 else
        "❌ LIKELY FAKE"
    )
    return result

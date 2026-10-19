import fitz
import json

doc = fitz.open(r'C:\Users\swami\.gemini\antigravity-ide\brain\3bdc6eae-149b-406d-b6a8-ffdfa3f9ae23\.user_uploaded\media_1792419064098.pdf')
for i, page in enumerate(doc):
    print(f"=== PAGE {i+1} ===")
    d = page.get_text("dict")
    for block in d.get("blocks", []):
        if block.get("type") == 0: # text block
            for line in block.get("lines", []):
                for span in line.get("spans", []):
                    text = span.get("text", "").strip()
                    if text:
                        font = span.get("font")
                        size = span.get("size")
                        color = span.get("color")
                        bbox = [round(x, 1) for x in span.get("bbox")]
                        # convert color int to hex
                        r = (color >> 16) & 255
                        g = (color >> 8) & 255
                        b = color & 255
                        print(f"  bbox: {bbox} | font: {font} {size:.1f}pt | color: #{r:02x}{g:02x}{b:02x} | text: {text}")

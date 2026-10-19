import pymupdf

pdf_path = r"d:\ITR Project\lamiwood-ecom-website\report\Lamiwood_Industrial_Training_Report.pdf"
doc = pymupdf.open(pdf_path)
print(f"Total pages: {len(doc)}")

for i, page in enumerate(doc):
    text = [line.strip() for line in page.get_text().split("\n") if line.strip()]
    first_line = text[0] if text else "EMPTY"
    last_line = text[-1] if text else "EMPTY"
    print(f"Page {i+1:2d}: lines={len(text):2d} | 1st: {first_line[:40]:40s} | Last: {last_line}")

doc.close()

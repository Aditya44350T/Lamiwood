import fitz # PyMuPDF
import os

pdf_path = r"C:\Users\swami\.gemini\antigravity-ide\brain\301d9166-ee6f-4823-aa41-4e5eba684ac4\.user_uploaded\media_1792411819323.pdf"
doc = fitz.open(pdf_path)

print(f"Total pages: {len(doc)}")
assets_dir = r"d:\ITR Project\lamiwood-ecom-website\report\assets"
os.makedirs(assets_dir, exist_ok=True)

# Extract images from all pages
img_count = 0
for page_num in range(len(doc)):
    page = doc[page_num]
    image_list = page.get_images(full=True)
    print(f"Page {page_num + 1}: {len(image_list)} images, rect: {page.rect}")
    for img_idx, img in enumerate(image_list):
        xref = img[0]
        base_image = doc.extract_image(xref)
        image_bytes = base_image["image"]
        image_ext = base_image["ext"]
        image_filename = os.path.join(assets_dir, f"page_{page_num+1}_img_{img_idx+1}.{image_ext}")
        with open(image_filename, "wb") as f:
            f.write(image_bytes)
        print(f"  Saved {image_filename} ({base_image['width']}x{base_image['height']})")

doc.close()

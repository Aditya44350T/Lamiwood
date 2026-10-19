import os
import base64
import subprocess
import pymupdf

def get_base64_image(image_path):
    if not os.path.exists(image_path):
        print(f"Warning: {image_path} does not exist")
        return ""
    ext = os.path.splitext(image_path)[1].lower().replace(".", "")
    if ext == "jpg": ext = "jpeg"
    with open(image_path, "rb") as f:
        data = base64.b64encode(f.read()).decode("utf-8")
    return f"data:image/{ext};base64,{data}"

# Assets
skit_logo = get_base64_image(r"d:\ITR Project\lamiwood-ecom-website\report\assets\page_1_img_1.png")
cert_img = get_base64_image(r"d:\ITR Project\lamiwood-ecom-website\report\assets\aditya_swami_certificate.png")
fig_3_1 = get_base64_image(r"d:\ITR Project\lamiwood-ecom-website\report\assets\figure_3_1.png")
fig_3_2 = get_base64_image(r"d:\ITR Project\lamiwood-ecom-website\report\assets\figure_3_2.png")
shot_home = get_base64_image(r"d:\ITR Project\lamiwood-ecom-website\report\screenshots\home.png")
shot_products = get_base64_image(r"d:\ITR Project\lamiwood-ecom-website\report\screenshots\products.png")
shot_detail = get_base64_image(r"d:\ITR Project\lamiwood-ecom-website\report\screenshots\product_detail.png")
shot_pattern = get_base64_image(r"d:\ITR Project\lamiwood-ecom-website\report\screenshots\pattern_designer.png")
shot_calc = get_base64_image(r"d:\ITR Project\lamiwood-ecom-website\report\screenshots\calculator.png")
shot_compare = get_base64_image(r"d:\ITR Project\lamiwood-ecom-website\report\screenshots\compare.png")

print("Assets encoded into Base64 successfully.")

from PIL import Image, ImageDraw, ImageFont

cert_img_path = r"d:\ITR Project\lamiwood-ecom-website\report\assets\page_3_img_1.png"
out_img_path = r"d:\ITR Project\lamiwood-ecom-website\report\assets\aditya_swami_certificate.png"

img = Image.open(cert_img_path).convert("RGBA")
draw = ImageDraw.Draw(img)

# Clear areas
draw.rectangle([(250, 215), (750, 265)], fill=(255, 255, 255, 255))
draw.rectangle([(250, 325), (750, 355)], fill=(255, 255, 255, 255))
draw.rectangle([(160, 355), (830, 440)], fill=(255, 255, 255, 255))
draw.rectangle([(320, 520), (660, 555)], fill=(255, 255, 255, 255))

try:
    # Use script or serif italic if possible, or Times
    font_name = ImageFont.truetype("timesi.ttf", 34)
    font_domain = ImageFont.truetype("timesbd.ttf", 19)
    font_desc = ImageFont.truetype("times.ttf", 14)
    font_id = ImageFont.truetype("timesbd.ttf", 15)
except:
    font_name = ImageFont.load_default()
    font_domain = font_name
    font_desc = font_name
    font_id = font_name

# Draw Aditya Swami
draw.text((493, 238), "Aditya Swami", fill=(30, 30, 30), font=font_name, anchor="mm")
# Draw line under name
draw.line([(280, 260), (705, 260)], fill=(40, 40, 40), width=1)

# Draw Domain
draw.text((493, 340), "Full Stack Web & Frontend Engineering", fill=(15, 15, 15), font=font_domain, anchor="mm")

# Draw Description lines
desc_lines = [
    "This program is designed to develop foundational and advanced skills in Modern React,",
    "TypeScript, Component-Driven Design, Responsive UI Systems, Interactive Web Tools,",
    "and Production Web Engineering using modern industry tools and frameworks."
]
y_start = 372
for line in desc_lines:
    draw.text((493, y_start), line, fill=(50, 50, 50), font=font_desc, anchor="mm")
    y_start += 21

# Draw Certificate ID
draw.text((493, 538), "Certificate ID: TR/2026-27/#00054", fill=(20, 20, 20), font=font_id, anchor="mm")

img.save(out_img_path)
print("Updated certificate saved!")

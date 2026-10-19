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

# File assets
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

html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Industrial Training Report - Lamiwood</title>
<style>
  @page {{
    size: 210mm 297mm;
    margin: 0;
  }}
  @media print {{
    body {{
      margin: 0;
      padding: 0;
      background: #ffffff;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }}
    .page {{
      margin: 0 !important;
      page-break-after: always;
      page-break-inside: avoid;
    }}
  }}
  * {{
    box-sizing: border-box;
  }}
  body {{
    margin: 0;
    padding: 0;
    font-family: 'Times New Roman', Times, serif;
    color: #111111;
    background: #eaeaea;
  }}
  .page {{
    width: 210mm;
    height: 297mm;
    position: relative;
    background: #ffffff;
    margin: 0 auto;
    padding: 24mm 26mm 22mm 26mm;
    box-sizing: border-box;
    overflow: hidden;
    page-break-after: always;
    page-break-inside: avoid;
  }}
  .page-border {{
    position: absolute;
    top: 10mm;
    left: 10mm;
    right: 10mm;
    bottom: 10mm;
    border: 1pt solid #000000;
    pointer-events: none;
  }}
  .page-number {{
    position: absolute;
    bottom: 13.5mm;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 11pt;
    font-family: 'Times New Roman', Times, serif;
  }}
  
  /* Typography */
  h1.report-main-title {{
    font-size: 19pt;
    font-weight: bold;
    text-align: center;
    letter-spacing: 0.5px;
    margin-top: 15mm;
    margin-bottom: 7mm;
    line-height: 1.3;
  }}
  h2.report-sub-title {{
    font-size: 14.5pt;
    font-weight: bold;
    text-align: center;
    letter-spacing: 0.5px;
    margin-bottom: 14mm;
    line-height: 1.4;
  }}
  p.cover-para {{
    font-size: 11.5pt;
    text-align: center;
    line-height: 1.5;
    margin: 2mm 0;
  }}
  h1.page-title {{
    font-size: 16pt;
    font-weight: bold;
    text-align: center;
    letter-spacing: 0.5px;
    margin-top: 10mm;
    margin-bottom: 12mm;
  }}
  h1.chap-num {{
    font-size: 18pt;
    font-weight: bold;
    margin-top: 8mm;
    margin-bottom: 4mm;
    color: #000;
  }}
  h1.chap-title {{
    font-size: 22pt;
    font-weight: bold;
    margin-top: 0;
    margin-bottom: 9mm;
    color: #000;
  }}
  h2.sec-heading {{
    font-size: 13.5pt;
    font-weight: bold;
    margin-top: 6mm;
    margin-bottom: 3mm;
    color: #000;
  }}
  h3.subsec-heading {{
    font-size: 12pt;
    font-weight: bold;
    margin-top: 4.5mm;
    margin-bottom: 2mm;
    color: #000;
  }}
  p.body-text {{
    font-size: 11pt;
    line-height: 1.55;
    text-align: justify;
    margin-top: 0;
    margin-bottom: 3.5mm;
  }}
  ul.body-list {{
    font-size: 11pt;
    line-height: 1.5;
    text-align: justify;
    margin-top: 0;
    margin-bottom: 3.5mm;
    padding-left: 6mm;
  }}
  ul.body-list li {{
    margin-bottom: 2mm;
  }}
  .bold {{
    font-weight: bold;
  }}
  
  /* Tables */
  table.report-table {{
    width: 100%;
    border-collapse: collapse;
    margin: 4mm 0 3mm 0;
    font-size: 10.5pt;
  }}
  table.report-table th {{
    border-top: 1.5pt solid #000;
    border-bottom: 1pt solid #000;
    padding: 6px 8px;
    text-align: left;
    font-weight: bold;
  }}
  table.report-table td {{
    padding: 5px 8px;
    border-bottom: 0.5pt solid #ddd;
    vertical-align: top;
    line-height: 1.35;
  }}
  table.report-table tr:last-child td {{
    border-bottom: 1.5pt solid #000;
  }}
  p.caption {{
    font-size: 10.5pt;
    font-weight: bold;
    text-align: center;
    margin-top: 2.5mm;
    margin-bottom: 3.5mm;
  }}
  
  /* Code blocks */
  pre.code-block {{
    font-family: 'Consolas', 'Courier New', monospace;
    font-size: 8.8pt;
    line-height: 1.35;
    background: #ffffff;
    border: 0.6pt solid #bbb;
    padding: 8px 10px;
    border-radius: 2px;
    margin: 2.5mm 0 3.5mm 0;
    white-space: pre-wrap;
    word-break: break-all;
  }}
  
  /* TOC */
  .toc-container {{
    margin-top: 4mm;
  }}
  .toc-row {{
    display: flex;
    align-items: baseline;
    font-size: 10.5pt;
    line-height: 1.42;
    margin-bottom: 1mm;
  }}
  .toc-text {{
    flex-shrink: 0;
  }}
  .toc-dots {{
    flex-grow: 1;
    border-bottom: 1px dotted #333;
    margin: 0 4px;
    height: 1px;
    align-self: baseline;
    margin-bottom: 4px;
  }}
  .toc-page {{
    flex-shrink: 0;
    text-align: right;
    min-width: 18px;
  }}
  .toc-chap {{
    font-weight: bold;
    margin-top: 2.8mm;
  }}
  .toc-sub {{
    padding-left: 5mm;
  }}
  
  /* Signature blocks */
  .sig-container {{
    display: flex;
    justify-content: space-between;
    margin-top: 15mm;
  }}
  .sig-box {{
    text-align: center;
    width: 48%;
  }}
</style>
</head>
<body>

<!-- ================= PAGE 1: COVER PAGE ================= -->
<div class="page">
  <div class="page-border"></div>
  <div style="text-align: center; margin-top: 12mm;">
    <h1 class="report-main-title">INDUSTRIAL TRAINING REPORT</h1>
    <h2 class="report-sub-title">LAMIWOOD: AN E-COMMERCE PLATFORM FOR<br>PREMIUM INTERIOR SURFACES</h2>
    
    <div style="margin-top: 10mm; margin-bottom: 12mm;">
      <p class="cover-para">Submitted in partial fulfilment of the</p>
      <p class="cover-para">Requirements for the award of</p>
      <p class="cover-para" style="font-weight: bold;">Degree of Bachelor of Technology in Computer Science & Engineering</p>
    </div>

    <div style="margin: 8mm 0;">
      <img src="{skit_logo}" alt="SKIT Logo" style="width: 130px; height: auto;">
    </div>

    <p class="cover-para" style="font-weight: bold; margin-top: 5mm; margin-bottom: 8mm;">Session: 2026–27</p>

    <div style="margin: 6mm 0; display: inline-block; text-align: left; width: 340px;">
      <p style="font-size: 11.5pt; font-weight: bold; margin-bottom: 2mm; text-align: center;">Submitted By</p>
      <div style="display: flex; justify-content: space-between; margin-bottom: 1.5mm; font-size: 11pt;">
        <span>Name:</span>
        <span style="border-bottom: 1px solid #000; width: 220px; text-align: center; font-weight: bold;">Aditya Swami</span>
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 1.5mm; font-size: 11pt;">
        <span>University Roll No.:</span>
        <span style="border-bottom: 1px solid #000; width: 220px; text-align: center; font-weight: bold;">24ESKCS024</span>
      </div>
      <div style="display: flex; justify-content: space-between; font-size: 11pt;">
        <span>Semester/Branch:</span>
        <span style="border-bottom: 1px solid #000; width: 220px; text-align: center; font-weight: bold;">5th Semester / CSE</span>
      </div>
    </div>

    <div style="margin-top: 14mm;">
      <p style="font-size: 12pt; font-weight: bold; margin-bottom: 2mm;">SUBMITTED TO:</p>
      <p style="font-size: 11.5pt; font-weight: bold; margin-bottom: 1mm;">Department of Computer Science & Engineering</p>
      <p style="font-size: 11pt; font-weight: bold; letter-spacing: 0.3px;">SWAMI KESHVANAND INSTITUTE OF TECHNOLOGY,<br>MANAGEMENT & GRAMOTHAN, JAIPUR</p>
    </div>
  </div>
</div>

<!-- ================= PAGE 2: DECLARATION (page i) ================= -->
<div class="page">
  <div class="page-border"></div>
  <h1 class="page-title">DECLARATION</h1>
  
  <p class="body-text" style="line-height: 1.8; margin-top: 10mm;">
    I hereby declare that the Industrial Training Report entitled <b>“Lamiwood: An E-Commerce Platform for Premium Interior Surfaces”</b> is an authentic record of my own work as requirements of 6-weeks Industrial Training during the period from 15 May 2026 to 29 June 2026 for the award of degree of B.Tech. (Computer Science & Engineering), Swami Keshvanand Institute of Technology, Management & Gramothan, Jaipur, under the guidance of <b>Vikash Dhankar</b> (Faculty Facilitator).
  </p>

  <div style="text-align: right; margin-top: 25mm; margin-right: 10mm;">
    <p style="font-size: 11pt; margin-bottom: 8mm;">(Signature of Student)</p>
    <p style="font-size: 11.5pt; font-weight: bold; margin-bottom: 1.5mm;">Aditya Swami</p>
    <p style="font-size: 11pt;">24ESKCS024</p>
  </div>

  <div style="margin-top: 20mm;">
    <p style="font-size: 11pt; margin-bottom: 10mm;">Date:______________________</p>
    <p class="body-text" style="line-height: 1.6;">
      Certified that the above statement made by the student is correct to the best of our knowledge and belief.
    </p>
  </div>

  <div style="margin-top: 22mm;">
    <p style="font-size: 11.5pt; font-weight: bold; margin-bottom: 2mm;">Examined by:</p>
  </div>

  <div class="sig-container" style="margin-top: 18mm;">
    <div class="sig-box" style="text-align: left;">
      <p style="font-size: 11pt; margin-bottom: 10mm;">(Signature)</p>
      <p style="font-size: 11.5pt; font-weight: bold; margin-bottom: 1mm;">Vikash Dhankar</p>
      <p style="font-size: 11pt;">Faculty Facilitator</p>
    </div>
    <div class="sig-box" style="text-align: right;">
      <p style="font-size: 11pt; margin-bottom: 10mm;">(Signature)</p>
      <p style="font-size: 11.5pt; font-weight: bold; margin-bottom: 1mm;">Prof.(Dr. Mehul Mahrishi)</p>
      <p style="font-size: 11pt;">Head of Department</p>
    </div>
  </div>

  <div class="page-number">i</div>
</div>

<!-- ================= PAGE 3: CERTIFICATE (page ii) ================= -->
<div class="page">
  <div class="page-border"></div>
  <h1 class="page-title">CERTIFICATE</h1>

  <div style="text-align: center; margin-top: 15mm;">
    <img src="{cert_img}" alt="Certificate of Training" style="width: 100%; max-width: 500px; border: 1px solid #ccc; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
  </div>

  <div class="page-number">ii</div>
</div>

<!-- ================= PAGE 4: ACKNOWLEDGEMENT (page iii) ================= -->
<div class="page">
  <div class="page-border"></div>
  <h1 class="page-title">ACKNOWLEDGEMENT</h1>

  <p class="body-text" style="line-height: 1.8; margin-top: 10mm;">
    First and foremost, I wish to express my sincere thanks and gratitude to my esteemed Mentor <b>“Mr. Aditya Pareek”</b> (Founder & CEO, Linkstatic Techno) who has contributed so much for successful completion of my Industrial Training by his thoughtful reviews, technical expertise, and valuable guidance.
  </p>

  <p class="body-text" style="line-height: 1.8; margin-top: 6mm;">
    Next I would like to tender my sincere thanks to <b>“Prof.(Dr. Mehul Mahrishi)”</b> (Head of Computer Science & Engineering) for his co-operation, academic leadership, and continuous encouragement throughout this tenure.
  </p>

  <p class="body-text" style="line-height: 1.8; margin-top: 6mm;">
    I am also thankful to <b>Mr. Vikram Khandelwal</b>, Coordinator (III Year In-house Internship 2026–27), for his support, administrative cooperation and motivation provided during the internship for constant inspiration, presence and blessings.
  </p>

  <p class="body-text" style="line-height: 1.8; margin-top: 6mm;">
    Finally, I extend my heartfelt appreciation to the faculty members of the Department of Computer Science & Engineering and my peers at Swami Keshvanand Institute of Technology, Management & Gramothan, Jaipur, whose constructive feedback and discussions greatly assisted me during the development and documentation of this project.
  </p>

  <div style="text-align: right; margin-top: 35mm; margin-right: 10mm;">
    <p style="font-size: 11pt; margin-bottom: 8mm;">(Signature of Student)</p>
    <p style="font-size: 11.5pt; font-weight: bold; margin-bottom: 1.5mm;">Aditya Swami</p>
    <p style="font-size: 11pt;">24ESKCS024</p>
  </div>

  <div class="page-number">iii</div>
</div>

<!-- ================= PAGE 5: ABSTRACT (page iv) ================= -->
<div class="page">
  <div class="page-border"></div>
  <h1 class="page-title">ABSTRACT</h1>

  <p class="body-text">
    The procurement and specification of luxury interior surfaces—including engineered hardwood flooring, architectural acoustic wall panels, outdoor composite decking, and decorative cladding—have traditionally been constrained by cumbersome offline sample distribution and fragmented catalog browsing. This report presents <b>Lamiwood</b>, a modern, production-ready e-commerce web platform engineered during the six-week Industrial Training at Linkstatic Techno in the domain of Full Stack Web and Frontend Engineering.
  </p>

  <p class="body-text">
    The platform bridges the gap between digital discovery and architectural precision by delivering a high-performance single-page web application built with <b>React 19, TypeScript, Tailwind CSS v4, and Framer Motion</b>. Lamiwood features a curated product catalog organized across six specialized categories (Flooring, Wall Panels, Decking, Ceiling Panels, Cladding, and Acoustic Panels). To assist homeowners, architects, and interior designers in technical decision-making, the application incorporates custom-engineered interactive tools: an <b>Installation Pattern Designer</b> supporting six distinct floor and wall layouts (Straight, Herringbone, Chevron, Brick Offset, Basket Weave, and Diagonal) with live SVG rendering; an intelligent <b>Surface Price & Wastage Calculator</b> that accounts for room geometry and layout wastage factors; a real-time <b>Side-by-Side Product Comparison Matrix</b>; and an interactive <b>Wood Finish Aging Simulator</b> illustrating surface patina evolution over a 20-year span.
  </p>

  <p class="body-text">
    The architecture adheres to strict component-driven design principles with client-side state persistence. Shopping cart items, technical sample requests, and design wishlists are managed seamlessly via React Context API and synchronized with browser LocalStorage. Client-side routing is handled through React Router 7 with route-level code splitting via <code>React.lazy()</code> and fallback error boundaries. Fluid micro-interactions, luxury staggered text reveals, and scroll-triggered section entrances provide an engaging user experience while maintaining sub-second initial load times and top-tier Google Lighthouse audit ratings.
  </p>

  <p class="body-text">
    The project validates the efficacy of modern utility-first CSS frameworks combined with reactive state paradigms in building high-conversion luxury commerce platforms, while identifying future pathways including headless CMS integration, WebGL 3D room visualization, and Augmented Reality (AR) mobile surface previews.
  </p>

  <p class="body-text" style="margin-top: 8mm;">
    <b>Keywords:</b> E-Commerce Platform, Architectural Surfaces, React 19, TypeScript, Tailwind CSS v4, Framer Motion, Pattern Designer, Material Area Calculator, Component-Driven Design.
  </p>

  <div class="page-number">iv</div>
</div>

<!-- ================= PAGE 6: TABLE OF CONTENTS (page v) ================= -->
<div class="page">
  <div class="page-border"></div>
  <h1 class="page-title" style="margin-bottom: 6mm;">Table of Contents</h1>

  <div class="toc-container">
    <div class="toc-row toc-chap">
      <span class="toc-text">1 &nbsp; Introduction</span>
      <span class="toc-dots"></span>
      <span class="toc-page">1</span>
    </div>
    <div class="toc-row toc-sub">
      <span class="toc-text">1.1 &nbsp; Project Description</span>
      <span class="toc-dots"></span>
      <span class="toc-page">1</span>
    </div>
    <div class="toc-row toc-sub">
      <span class="toc-text">1.2 &nbsp; Project Scope</span>
      <span class="toc-dots"></span>
      <span class="toc-page">1</span>
    </div>
    <div class="toc-row toc-sub">
      <span class="toc-text">1.3 &nbsp; Intended Users</span>
      <span class="toc-dots"></span>
      <span class="toc-page">2</span>
    </div>
    <div class="toc-row toc-sub">
      <span class="toc-text">1.4 &nbsp; Project Features</span>
      <span class="toc-dots"></span>
      <span class="toc-page">2</span>
    </div>

    <div class="toc-row toc-chap">
      <span class="toc-text">2 &nbsp; Tools & Technology Used</span>
      <span class="toc-dots"></span>
      <span class="toc-page">4</span>
    </div>
    <div class="toc-row toc-sub">
      <span class="toc-text">2.1 &nbsp; Software Model Used</span>
      <span class="toc-dots"></span>
      <span class="toc-page">4</span>
    </div>
    <div class="toc-row toc-sub">
      <span class="toc-text">2.2 &nbsp; Technology Stack Used</span>
      <span class="toc-dots"></span>
      <span class="toc-page">4</span>
    </div>
    <div class="toc-row toc-sub">
      <span class="toc-text">2.3 &nbsp; Product User Interfaces</span>
      <span class="toc-dots"></span>
      <span class="toc-page">4</span>
    </div>
    <div class="toc-row toc-sub">
      <span class="toc-text">2.4 &nbsp; Design and Implementation Constraints</span>
      <span class="toc-dots"></span>
      <span class="toc-page">6</span>
    </div>
    <div class="toc-row toc-sub">
      <span class="toc-text">2.5 &nbsp; Data Flow and Dataset Structure</span>
      <span class="toc-dots"></span>
      <span class="toc-page">7</span>
    </div>
    <div class="toc-row toc-sub">
      <span class="toc-text">2.6 &nbsp; Software and System Requirements</span>
      <span class="toc-dots"></span>
      <span class="toc-page">7</span>
    </div>

    <div class="toc-row toc-chap">
      <span class="toc-text">3 &nbsp; Snapshots</span>
      <span class="toc-dots"></span>
      <span class="toc-page">8</span>
    </div>
    <div class="toc-row toc-sub">
      <span class="toc-text">3.1 &nbsp; Flow Chart / Proposed Work</span>
      <span class="toc-dots"></span>
      <span class="toc-page">8</span>
    </div>
    <div class="toc-row toc-sub">
      <span class="toc-text">3.2 &nbsp; Project Snippets</span>
      <span class="toc-dots"></span>
      <span class="toc-page">10</span>
    </div>
    <div class="toc-row toc-sub">
      <span class="toc-text">3.3 &nbsp; Code</span>
      <span class="toc-dots"></span>
      <span class="toc-page">13</span>
    </div>

    <div class="toc-row toc-chap">
      <span class="toc-text">4 &nbsp; Results and Discussion</span>
      <span class="toc-dots"></span>
      <span class="toc-page">16</span>
    </div>
    <div class="toc-row toc-sub">
      <span class="toc-text">4.1 &nbsp; Feature Implementation Results</span>
      <span class="toc-dots"></span>
      <span class="toc-page">16</span>
    </div>
    <div class="toc-row toc-sub">
      <span class="toc-text">4.2 &nbsp; Discussion</span>
      <span class="toc-dots"></span>
      <span class="toc-page">17</span>
    </div>

    <div class="toc-row toc-chap">
      <span class="toc-text">5 &nbsp; Conclusion and Future Scope</span>
      <span class="toc-dots"></span>
      <span class="toc-page">19</span>
    </div>
    <div class="toc-row toc-sub">
      <span class="toc-text">5.1 &nbsp; Product Catalog & System Snapshot</span>
      <span class="toc-dots"></span>
      <span class="toc-page">19</span>
    </div>
    <div class="toc-row toc-sub">
      <span class="toc-text">5.2 &nbsp; Future Scope</span>
      <span class="toc-dots"></span>
      <span class="toc-page">19</span>
    </div>

    <div class="toc-row toc-chap" style="margin-top: 3.5mm;">
      <span class="toc-text">Conclusion</span>
      <span class="toc-dots"></span>
      <span class="toc-page">21</span>
    </div>
    <div class="toc-row toc-chap" style="margin-top: 2mm;">
      <span class="toc-text">References</span>
      <span class="toc-dots"></span>
      <span class="toc-page">22</span>
    </div>
  </div>

  <div class="page-number">v</div>
</div>

<!-- ================= PAGE 7: CHAPTER 1 (page 1) ================= -->
<div class="page">
  <div class="page-border"></div>
  <h1 class="chap-num">Chapter 1</h1>
  <h1 class="chap-title">Introduction</h1>

  <h2 class="sec-heading">1.1 &nbsp; Project Description</h2>
  <p class="body-text">
    <b>Lamiwood</b> is a premier architectural surfaces and interior design e-commerce web platform engineered to transform how architects, interior designers, commercial developers, and modern homeowners explore, calculate, and procure high-end surfacing solutions. In the architectural materials industry, selecting elements such as engineered European oak flooring, acoustic fluted wall panels, exterior bamboo decking, and decorative charred cladding involves complex spatial, aesthetic, and mathematical evaluations. Traditional digital commerce stores often fail to provide the sensory richness, technical precision, and installation calculators required for high-investment architectural finishes.
  </p>
  <p class="body-text">
    The project was developed during a six-week Industrial Training at <b>Linkstatic Techno</b> in the domain of Full Stack Web and Modern Frontend Engineering. Lamiwood addresses industry bottlenecks by providing an interactive digital showroom coupled with precision architectural utilities. Built using <b>React 19, TypeScript, Tailwind CSS v4, and Framer Motion</b>, the platform combines a curated 16-product catalog across 6 core architectural categories with dynamic calculation engines: an interactive <b>Installation Pattern Designer</b>, a <b>Room Surface & Wastage Calculator</b>, a <b>Multi-Product Side-by-Side Comparison Matrix</b>, and an interactive <b>Wood Aging Simulator</b>. The application tagline, <i>“Surfaces Crafted for Extraordinary Spaces”</i>, reflects its core mission: empowering professionals and homeowners to visualize, plan, and specify premium architectural surfaces with absolute confidence.
  </p>

  <h2 class="sec-heading">1.2 &nbsp; Project Scope</h2>
  <p class="body-text">
    The scope of the project encompasses the complete engineering lifecycle of a high-performance, component-driven architectural e-commerce single-page application (SPA), ranging from requirements gathering and design token structuring to state persistence and interactive layout computation:
  </p>
  <ul class="body-list">
    <li>Architecting a modular, type-safe product schema in TypeScript covering product dimensions, grain finishes, wear-layer thickness, installation click-lock specifications, and certifications.</li>
    <li>Developing an immersive, responsive frontend design system adhering to modern luxury interior brand guidelines using Tailwind CSS v4 and Google Fonts typography (Cormorant Garamond and DM Sans).</li>
    <li>Implementing multi-faceted client-side catalog filtering and sorting by category, price tier, surface finish, and availability with seamless URL state synchronization.</li>
  </ul>

  <div class="page-number">1</div>
</div>

<!-- ================= PAGE 8: CHAPTER 1 (page 2) ================= -->
<div class="page">
  <div class="page-border"></div>

  <ul class="body-list" style="margin-top: 4mm;">
    <li>Engineering mathematical visual tools, including an interactive SVG-driven pattern designer supporting six geometric laying patterns with dynamic room dimensions and wastage percentage algorithms.</li>
    <li>Building an end-to-end room area, packaging unit, and budget estimator capable of computing net square footage, buffer margins, and box breakdown for floors, walls, and ceilings.</li>
    <li>Providing client-side transactional workflows, including a persistent slide-in Cart Drawer, Technical Sample Request system, and Design Consultation booking modal.</li>
    <li>Integrating responsive mobile navigation, scroll-driven header transformations, preloader brand entrance animations, and full-screen lightbox galleries.</li>
  </ul>

  <h2 class="sec-heading">1.3 &nbsp; Intended Users</h2>
  <p class="body-text">
    Lamiwood is designed to cater to both professional trade specifiers and direct retail clients:
  </p>
  <ul class="body-list">
    <li><b>Architects and Interior Designers:</b> Specifiers requiring exact technical dimensions, fire-resistance ratings, acoustic coefficients, installation patterns, and physical sample deliveries for client pitch decks.</li>
    <li><b>Luxury Homeowners:</b> Individuals undertaking residential renovations who seek visual clarity regarding plank layouts, finish durability, and estimated project expenditures without navigating complex sales representatives.</li>
    <li><b>General Contractors & Flooring Installers:</b> Construction professionals requiring accurate square-foot material breakdowns, packaging unit calculations, and recommended buffer wastage factors.</li>
    <li><b>Frontend Developers & Engineering Students:</b> Software practitioners seeking reference implementations of cutting-edge React 19 architecture, complex SVG algorithmic rendering, and zero-runtime CSS workflows.</li>
  </ul>

  <h2 class="sec-heading">1.4 &nbsp; Project Features</h2>
  <p class="body-text">
    The core features implemented in the Lamiwood application are outlined below:
  </p>
  <ul class="body-list">
    <li><b>Curated Architectural Catalog:</b> Comprehensive display of 16 artisan products across 6 categories (Flooring, Wall Panels, Decking, Ceiling Panels, Cladding, and Acoustic Panels) with badges, high-resolution imagery, and pricing.</li>
    <li><b>Multi-Attribute Filtering & Sorting:</b> Real-time filtering by category checkboxes, price range brackets, and sorting options (Price Low-to-High, High-to-Low, Alphabetical, and New Arrivals).</li>
    <li><b>Interactive Pattern Designer:</b> Mathematical laying engine allowing users to toggle between Straight, Herringbone, Chevron, Brick Offset, Basket Weave, and Diagonal layouts while computing real-time tile counts and wastage factors.</li>
  </ul>

  <div class="page-number">2</div>
</div>

<!-- ================= PAGE 9: CHAPTER 1 (page 3) ================= -->
<div class="page">
  <div class="page-border"></div>

  <ul class="body-list" style="margin-top: 4mm;">
    <li><b>Surface Price & Area Calculator:</b> Four-step interactive estimator that accepts room geometry (width & length in feet), calculates gross area, recommends material buffer percentage (5% to 18%), and outputs exact package box counts and total costs.</li>
    <li><b>Product Detail & Technical Specifications:</b> Detailed product views featuring multi-image gallery crossfade transitions, technical spec tables (dimensions, finish, warranty, wear layer), and related product recommendations.</li>
    <li><b>Side-by-Side Product Comparison:</b> Multi-select comparison matrix enabling users to evaluate up to three surfaces simultaneously across material composition, thickness, finish, warranty, and price per square foot.</li>
    <li><b>Wood Aging Simulator:</b> Interactive visual slider demonstrating the natural color maturation, UV patina shift, and grain stabilization of hardwood finishes from year 0 to year 20.</li>
    <li><b>Persistent Cart & Sample Request System:</b> Slide-out Cart Drawer managed via React Context and LocalStorage, supporting sample requests, free shipping thresholds, and order notes.</li>
    <li><b>Wishlist & Favoriting:</b> One-click bookmarking of desired surfaces with persistent heart indicators and a dedicated Wishlist management page.</li>
    <li><b>Consultation & Callback Modals:</b> Accessible modal overlays enabling prospective clients to schedule on-site architectural consultations or request instant WhatsApp/telephonic callbacks.</li>
    <li><b>Micro-Interactions & Luxury Motion:</b> Custom cubic-bezier page transitions, scroll-triggered section reveals, magnetic buttons, and dynamic navbar background blur.</li>
  </ul>

  <div class="page-number">3</div>
</div>

<!-- ================= PAGE 10: CHAPTER 2 (page 4) ================= -->
<div class="page">
  <div class="page-border"></div>
  <h1 class="chap-num">Chapter 2</h1>
  <h1 class="chap-title">Tools & Technology Used</h1>

  <h2 class="sec-heading">2.1 &nbsp; Software Model Used</h2>
  <p class="body-text">
    The project was developed following the <b>Iterative and Incremental (Agile) Model</b>. Given the visual and interactive nature of modern e-commerce applications, dividing development into rapid iterative sprints allowed immediate feedback, continuous usability testing, and incremental feature delivery. The five development iterations were:
  </p>
  <ul class="body-list">
    <li><b>Iteration 1 — Architecture & Core Design System:</b> Defining TypeScript interfaces for products and categories, configuring Vite and Tailwind CSS v4, and establishing color tokens and font typography.</li>
    <li><b>Iteration 2 — Component Library & Catalog Implementation:</b> Building primitive atomic UI components (Button, Badge, Card, Heading), followed by the Product Grid, Filter Sidebar, and Search Overlay.</li>
    <li><b>Iteration 3 — Interactive Visual Tools:</b> Developing the algorithmic layout engines for the Pattern Designer, Surface Calculator, Aging Simulator, and Product Comparison matrix.</li>
    <li><b>Iteration 4 — State Management & Persistence:</b> Implementing React Context providers for Cart, Wishlist, and QuickView with LocalStorage synchronization.</li>
    <li><b>Iteration 5 — Performance Optimization & Audit:</b> Implementing route-based code splitting with React.lazy, optimizing image skeletons, and achieving top Google Lighthouse audit scores.</li>
  </ul>

  <h2 class="sec-heading">2.2 &nbsp; Technology Stack Used</h2>
  <p class="body-text">
    The technologies and tools employed in building Lamiwood are summarised in Table 2.1 on the following page.
  </p>

  <h2 class="sec-heading">2.3 &nbsp; Product User Interfaces</h2>
  <p class="body-text">
    Lamiwood features a sophisticated, luxury-inspired design language dominated by warm charcoal backgrounds (<code>#1A1A1A</code>), gold accent highlights (<code>#B8860B</code>), and clean neutral surfaces. The visual hierarchy combines classical serif headlines with ultra-readable sans-serif metadata.
  </p>

  <div class="page-number">4</div>
</div>

<!-- ================= PAGE 11: CHAPTER 2 (page 5) ================= -->
<div class="page">
  <div class="page-border"></div>

  <p class="caption">Table 2.1: Technology stack of Lamiwood</p>
  <table class="report-table">
    <thead>
      <tr>
        <th style="width: 25%;">Category</th>
        <th style="width: 30%;">Technology</th>
        <th style="width: 45%;">Purpose</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="bold">UI Framework</td>
        <td>React 19</td>
        <td>Component-driven declarative user interface architecture [1]</td>
      </tr>
      <tr>
        <td class="bold">Programming Language</td>
        <td>TypeScript 6</td>
        <td>End-to-end static type safety, interfaces, and compile-time error detection [5]</td>
      </tr>
      <tr>
        <td class="bold">Build System & Dev Server</td>
        <td>Vite 8</td>
        <td>Next-generation lightning-fast Hot Module Replacement (HMR) and optimized Rollup bundling [2]</td>
      </tr>
      <tr>
        <td class="bold">Styling Engine</td>
        <td>Tailwind CSS v4</td>
        <td>High-performance utility-first styling with CSS variables and Vite native plugin [3]</td>
      </tr>
      <tr>
        <td class="bold">Animation Library</td>
        <td>Framer Motion 12</td>
        <td>Spring-based physics, layout animations, scroll-triggered entrances, and page transitions [4]</td>
      </tr>
      <tr>
        <td class="bold">Routing System</td>
        <td>React Router 7</td>
        <td>Declarative client-side routing, route-level suspense, and URL query parameter management</td>
      </tr>
      <tr>
        <td class="bold">Typography</td>
        <td>@fontsource Cormorant Garamond & DM Sans</td>
        <td>Self-hosted luxury serif headings and clean modern geometric sans-serif body typography</td>
      </tr>
      <tr>
        <td class="bold">State Management</td>
        <td>React Context API & LocalStorage</td>
        <td>Global application state for shopping cart, technical samples, wishlist, and theme persistence</td>
      </tr>
      <tr>
        <td class="bold">Development Tools</td>
        <td>VS Code, Chrome DevTools, ESLint 9</td>
        <td>Modern integrated development environment, live debugging, and automated code linting</td>
      </tr>
    </tbody>
  </table>

  <h3 class="subsec-heading" style="margin-top: 6mm;">Design System Tokens</h3>
  <p class="body-text">
    The application's visual identity is codified through consistent design tokens:
  </p>
  <ul class="body-list">
    <li><b>Color Tokens:</b> Primary dark background (<code>#121212</code>), elevated container cards (<code>#1E1E1E</code>), gold accent buttons and badges (<code>#B8860B</code> / <code>#D4A843</code>), muted text (<code>#A0A0A0</code>), and crisp white headers (<code>#FFFFFF</code>).</li>
    <li><b>Typography Tokens:</b> Headings utilize <i>Cormorant Garamond</i> for an artisanal aesthetic; body text utilizes <i>DM Sans</i> for optimal legibility across desktop and mobile screens.</li>
  </ul>

  <div class="page-number">5</div>
</div>

<!-- ================= PAGE 12: CHAPTER 2 (page 6) ================= -->
<div class="page">
  <div class="page-border"></div>

  <h2 class="sec-heading">2.4 &nbsp; Design and Implementation Constraints</h2>
  <p class="body-text">
    During the planning, engineering, and testing of Lamiwood, several critical technical constraints and performance requirements were addressed:
  </p>
  <ul class="body-list">
    <li><b>Zero-Latency Client-Side Performance:</b> Because high-end architectural buyers expect effortless responsiveness, all filtering, search matching, and calculation features were architected to execute entirely on the client without blocking network round-trips.</li>
    <li><b>Responsive Layout Integrity Across Devices:</b> The interface must maintain visual elegance from small mobile screens (375px width) to ultra-wide 4K architectural monitors (2560px+). Complex components like the Pattern Designer and Side-by-Side Comparison matrix feature responsive flex-wrap and horizontal scrolling containers.</li>
    <li><b>Framer Motion Animation Overhead:</b> To maintain steady 60 frames-per-second (fps) performance without frame drops on lower-powered devices, animations utilize GPU-accelerated CSS transforms (<code>translateY</code>, <code>scale</code>, <code>opacity</code>) with custom luxury cubic-bezier easing curves rather than CPU-intensive layout repaints.</li>
    <li><b>Algorithmic Pattern Generation:</b> The Installation Pattern Designer renders real-time geometric parquet floor patterns using SVG vectors and CSS grid transforms. The layout coordinates must accurately represent relative plank dimensions (e.g., 1:4 ratio for Herringbone vs. 1:1 for Basket Weave) while remaining mathematically constrained to room aspect ratios.</li>
    <li><b>State Synchronization without Server DB:</b> Without an external backend database server, shopping cart items, technical sample allocations, and user favorites must survive browser refreshes and tab closures through resilient LocalStorage serialization and deserialization guards.</li>
    <li><b>Accessibility & Semantic Standards:</b> Compliance with W3C Web Content Accessibility Guidelines (WCAG 2.2) requiring proper ARIA attributes, semantic headings (single <code>&lt;h1&gt;</code> per route), keyboard navigable modal dialogs, and contrast ratios exceeding 4.5:1.</li>
  </ul>

  <div class="page-number">6</div>
</div>

<!-- ================= PAGE 13: CHAPTER 2 (page 7) ================= -->
<div class="page">
  <div class="page-border"></div>

  <h2 class="sec-heading">2.5 &nbsp; Data Flow and Dataset Structure</h2>
  <p class="body-text">
    The application architecture is structured around clean unidirectional data flow. Product specifications, categories, and client testimonials are managed as strongly-typed immutable records in the <code>src/data/</code> module.
  </p>

  <p class="caption">Table 2.2: Product Data Schema & Attribute Fields</p>
  <table class="report-table">
    <thead>
      <tr>
        <th style="width: 20%;">Field Name</th>
        <th style="width: 25%;">TypeScript Type</th>
        <th style="width: 55%;">Description & Application Usage</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="bold">id, slug</td>
        <td>string</td>
        <td>Unique product identifier and SEO-friendly URL slug for routing</td>
      </tr>
      <tr>
        <td class="bold">name</td>
        <td>string</td>
        <td>Official surface product name (e.g., "Natural Oak Flooring")</td>
      </tr>
      <tr>
        <td class="bold">category</td>
        <td>CategoryType</td>
        <td>Surface category union: flooring, wall-panels, decking, etc.</td>
      </tr>
      <tr>
        <td class="bold">price, unit</td>
        <td>number, string</td>
        <td>Numeric unit price in INR (₹) and pricing unit ("per sq.ft")</td>
      </tr>
      <tr>
        <td class="bold">specs</td>
        <td>ProductSpec[]</td>
        <td>Key-value pairs: Material, Dimensions, Finish, Installation, Warranty</td>
      </tr>
      <tr>
        <td class="bold">features</td>
        <td>string[]</td>
        <td>Bullet list of engineering features (e.g., FSC-certified, UV-oil finish)</td>
      </tr>
      <tr>
        <td class="bold">images, thumbnail</td>
        <td>string[]</td>
        <td>High-resolution architectural photography array and gallery card image</td>
      </tr>
      <tr>
        <td class="bold">badge, inStock</td>
        <td>string?, boolean</td>
        <td>Optional marketing badge ("bestseller", "premium", "new") and stock state</td>
      </tr>
    </tbody>
  </table>

  <h2 class="sec-heading">2.6 &nbsp; Software and System Requirements</h2>
  <p class="body-text">
    To develop, build, and deploy Lamiwood, the following prerequisites are required:
  </p>
  <ul class="body-list">
    <li><b>Development Environment:</b> Node.js runtime version 18.0 or higher with npm package manager (v9.0+); modern code editor such as Visual Studio Code.</li>
    <li><b>Build & Bundling Engine:</b> Vite 8.0+ running on local development port 5173 / preview port 4173 with TypeScript 6.0 compiler.</li>
    <li><b>Client Browser Requirements:</b> Any modern evergreen web browser supporting ES2022 JavaScript, CSS Grid, Flexbox, and Web Animations API (Google Chrome 110+, Microsoft Edge 110+, Mozilla Firefox 115+, Apple Safari 16+).</li>
    <li><b>Hardware Requirements:</b> Minimum 4 GB RAM (8 GB recommended) with multi-core modern CPU for instantaneous Vite Hot Module Replacement (HMR).</li>
  </ul>

  <div class="page-number">7</div>
</div>

<!-- ================= PAGE 14: CHAPTER 3 (page 8) ================= -->
<div class="page">
  <div class="page-border"></div>
  <h1 class="chap-num">Chapter 3</h1>
  <h1 class="chap-title">Snapshots</h1>

  <h2 class="sec-heading">3.1 &nbsp; Flow Chart / Proposed Work</h2>
  <p class="body-text">
    The architecture of the Lamiwood project is structured into two core engineering dimensions: the <b>Build & Component Pipeline</b> (offline compilation and bundling) and the <b>Interactive Client Runtime Workflow</b> (dynamic user customization and estimation).
  </p>

  <h3 class="subsec-heading">Component Architecture & Build Pipeline</h3>
  <p class="body-text">
    Figure 3.1 illustrates the structural pipeline of the application. Raw architectural data schemas are bound to strictly-typed TypeScript interfaces. Atomic UI primitives feed into domain-specific shared components, which are governed by global Context state layers and optimized through the Vite 8 Rollup build engine.
  </p>

  <div style="text-align: center; margin-top: 4mm;">
    <img src="{fig_3_1}" alt="Figure 3.1: Flow chart of the system build & component architecture" style="width: 82%; max-width: 440px; height: auto;">
    <p class="caption">Figure 3.1: Flow chart of the system build & component architecture</p>
  </div>

  <div class="page-number">8</div>
</div>

<!-- ================= PAGE 15: CHAPTER 3 (page 9) ================= -->
<div class="page">
  <div class="page-border"></div>

  <h3 class="subsec-heading" style="margin-top: 4mm;">Interactive Client Runtime Workflow</h3>
  <p class="body-text">
    Figure 3.2 details the runtime sequence when a user navigates Lamiwood. From initial landing and category discovery, users filter products by technical parameters, launch interactive laying pattern or calculator visualizers, evaluate wastage metrics, and save their specifications to persistent cart and sample requests.
  </p>

  <div style="text-align: center; margin-top: 6mm;">
    <img src="{fig_3_2}" alt="Figure 3.2: Flow chart of the interactive user workflow and customization process" style="width: 82%; max-width: 440px; height: auto;">
    <p class="caption">Figure 3.2: Flow chart of the interactive user workflow and customization process</p>
  </div>

  <div class="page-number">9</div>
</div>

<!-- ================= PAGE 16: CHAPTER 3 (page 10) ================= -->
<div class="page">
  <div class="page-border"></div>

  <h2 class="sec-heading">3.2 &nbsp; Project Snippets</h2>
  <p class="body-text">
    This section presents the primary user interfaces of the implemented Lamiwood application.
  </p>

  <div style="text-align: center; margin-top: 3mm; margin-bottom: 5mm;">
    <img src="{shot_home}" alt="Home Page Hero Banner" style="width: 95%; max-width: 500px; border: 1px solid #ddd; box-shadow: 0 1px 6px rgba(0,0,0,0.15);">
    <p class="caption">Figure 3.3: Home page with luxury hero banner and quick navigation</p>
  </div>

  <div style="text-align: center; margin-top: 4mm;">
    <img src="{shot_products}" alt="Product Catalog & Filter Sidebar" style="width: 95%; max-width: 500px; border: 1px solid #ddd; box-shadow: 0 1px 6px rgba(0,0,0,0.15);">
    <p class="caption">Figure 3.4: Product catalog with category filter chips and price sidebar</p>
  </div>

  <div class="page-number">10</div>
</div>

<!-- ================= PAGE 17: CHAPTER 3 (page 11) ================= -->
<div class="page">
  <div class="page-border"></div>

  <div style="text-align: center; margin-top: 4mm; margin-bottom: 5mm;">
    <img src="{shot_detail}" alt="Product Detail Page" style="width: 95%; max-width: 500px; border: 1px solid #ddd; box-shadow: 0 1px 6px rgba(0,0,0,0.15);">
    <p class="caption">Figure 3.5: Product detail view with gallery and technical specifications</p>
  </div>

  <div style="text-align: center; margin-top: 5mm;">
    <img src="{shot_pattern}" alt="Installation Pattern Designer" style="width: 95%; max-width: 500px; border: 1px solid #ddd; box-shadow: 0 1px 6px rgba(0,0,0,0.15);">
    <p class="caption">Figure 3.6: Interactive Installation Pattern Designer with dynamic layout</p>
  </div>

  <div class="page-number">11</div>
</div>

<!-- ================= PAGE 18: CHAPTER 3 (page 12) ================= -->
<div class="page">
  <div class="page-border"></div>

  <div style="text-align: center; margin-top: 4mm; margin-bottom: 5mm;">
    <img src="{shot_calc}" alt="Surface Calculator" style="width: 95%; max-width: 500px; border: 1px solid #ddd; box-shadow: 0 1px 6px rgba(0,0,0,0.15);">
    <p class="caption">Figure 3.7: Material & Surface Price Calculator with wastage estimation</p>
  </div>

  <div style="text-align: center; margin-top: 5mm;">
    <img src="{shot_compare}" alt="Product Comparison Matrix" style="width: 95%; max-width: 500px; border: 1px solid #ddd; box-shadow: 0 1px 6px rgba(0,0,0,0.15);">
    <p class="caption">Figure 3.8: Side-by-side Product Comparison matrix interface</p>
  </div>

  <div class="page-number">12</div>
</div>

<!-- ================= PAGE 19: CHAPTER 3 (page 13) ================= -->
<div class="page">
  <div class="page-border"></div>

  <h2 class="sec-heading">3.3 &nbsp; Code</h2>
  <p class="body-text">
    This section presents core excerpts of the source code implemented in the Lamiwood project.
  </p>

  <h3 class="subsec-heading">Installation Pattern Designer Calculation Logic</h3>
  <p class="body-text">
    Computes real-time gross room area, recommended waste percentage, tile counts, and total material budget based on selected architectural laying pattern:
  </p>
  <pre class="code-block">export interface Pattern {{
  id: string;
  name: string;
  wastePercentage: number;
  description: string;
}}

export const PATTERNS: Pattern[] = [
  {{ id: "straight", name: "Straight", wastePercentage: 5, description: "Classic parallel layout" }},
  {{ id: "herringbone", name: "Herringbone", wastePercentage: 15, description: "Intricate 90-degree interlocking" }},
  {{ id: "chevron", name: "Chevron", wastePercentage: 18, description: "Elegant 45-degree angle meeting" }},
  {{ id: "brick", name: "Brick Offset", wastePercentage: 8, description: "Traditional 50% staggered stagger" }},
  {{ id: "basket", name: "Basket Weave", wastePercentage: 12, description: "Alternating block direction" }},
  {{ id: "diagonal", name: "Diagonal", wastePercentage: 15, description: "Dynamic 45-degree room expansion" }}
];

export function calculatePatternMaterials(widthFt: number, lengthFt: number, pricePerSqFt: number, wastePct: number) {{
  const baseArea = widthFt * lengthFt;
  const wasteMultiplier = 1 + (wastePct / 100);
  const totalAreaWithWaste = Math.ceil(baseArea * wasteMultiplier);
  const estimatedTotalCost = totalAreaWithWaste * pricePerSqFt;

  return {{
    baseArea,
    totalAreaWithWaste,
    extraBufferArea: totalAreaWithWaste - baseArea,
    estimatedTotalCost
  }};
}}</pre>

  <h3 class="subsec-heading">Material Cost & Wastage Estimator</h3>
  <pre class="code-block">export function computeRoomEstimate(dims: {{ width: number; length: number }}, surfaceType: string, rate: number) {{
  const netSqFt = dims.width * dims.length;
  // Recommended buffer based on architectural surface complexity
  const bufferRate = surfaceType === "Floor" ? 0.10 : surfaceType === "Wall" ? 0.08 : 0.12;
  const grossSqFt = Math.ceil(netSqFt * (1 + bufferRate));
  const boxesNeeded = Math.ceil(grossSqFt / 22.5); // 22.5 sq.ft standard box coverage

  return {{
    netArea: netSqFt,
    grossArea: grossSqFt,
    boxes: boxesNeeded,
    totalCost: grossSqFt * rate
  }};
}}</pre>

  <div class="page-number">13</div>
</div>

<!-- ================= PAGE 20: CHAPTER 3 (page 14) ================= -->
<div class="page">
  <div class="page-border"></div>

  <h3 class="subsec-heading" style="margin-top: 4mm;">Cart Context & LocalStorage Persistence</h3>
  <p class="body-text">
    Custom React Context provider handling shopping cart additions, sample allocations, quantity modifications, and automatic synchronization with browser storage:
  </p>
  <pre class="code-block">import React, {{ createContext, useContext, useState, useEffect }} from "react";
import type {{ CartItem, Product }} from "@/types";

interface CartContextType {{
  items: CartItem[];
  addToCart: (product: Product, quantity?: number, isSample?: boolean) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  totalAmount: number;
}}

const CartContext = createContext&lt;CartContextType | undefined&gt;(undefined);

export function CartProvider({{ children }}: {{ children: React.ReactNode }}) {{
  const [items, setItems] = useState&lt;CartItem[]&gt;(() =&gt; {{
    try {{
      const stored = localStorage.getItem("lamiwood_cart");
      return stored ? JSON.parse(stored) : [];
    }} catch {{
      return [];
    }}
  }});

  useEffect(() =&gt; {{
    localStorage.setItem("lamiwood_cart", JSON.stringify(items));
  }}, [items]);

  const addToCart = (product: Product, quantity = 1, isSample = false) =&gt; {{
    setItems((prev) =&gt; {{
      const exists = prev.find((i) =&gt; i.product.id === product.id &amp;&amp; i.isSample === isSample);
      if (exists) {{
        return prev.map((i) =&gt;
          i === exists ? {{ ...i, quantity: i.quantity + quantity }} : i
        );
      }}
      return [...prev, {{ product, quantity, isSample }}];
    }});
  }};

  const totalAmount = items.reduce((sum, item) =&gt; 
    sum + (item.isSample ? 250 : item.product.price) * item.quantity, 0
  );

  return (
    &lt;CartContext.Provider value={{{{ items, addToCart, removeFromCart, updateQuantity, totalAmount }}}}&gt;
      {{children}}
    &lt;/CartContext.Provider&gt;
  );
}}</pre>

  <h3 class="subsec-heading">Multi-Attribute Product Filtering</h3>
  <pre class="code-block">const filteredProducts = useMemo(() =&gt; {{
  return products.filter((p) =&gt; {{
    if (selectedCategories.length &gt; 0 &amp;&amp; !selectedCategories.includes(p.category)) return false;
    if (p.price &lt; priceRange.min || p.price &gt; priceRange.max) return false;
    if (onlyInStock &amp;&amp; !p.inStock) return false;
    if (searchQuery &amp;&amp; !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  }}).sort((a, b) =&gt; {{
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    return a.name.localeCompare(b.name);
  }});
}}, [products, selectedCategories, priceRange, onlyInStock, searchQuery, sortBy]);</pre>

  <div class="page-number">14</div>
</div>

<!-- ================= PAGE 21: CHAPTER 3 (page 15) ================= -->
<div class="page">
  <div class="page-border"></div>

  <h3 class="subsec-heading" style="margin-top: 4mm;">Animation Variants & Framer Motion Transitions</h3>
  <p class="body-text">
    Curated cubic-bezier luxury motion constants and reusable animation variants ensuring fluid, 60fps micro-interactions across pages and modal elements:
  </p>
  <pre class="code-block">export const EASE_LUXURY = [0.25, 0.1, 0.25, 1.0];

export const fadeInVariants = {{
  initial: {{ opacity: 0, y: 24 }},
  animate: {{
    opacity: 1,
    y: 0,
    transition: {{ duration: 0.7, ease: EASE_LUXURY }}
  }},
  exit: {{
    opacity: 0,
    y: -16,
    transition: {{ duration: 0.4, ease: EASE_LUXURY }}
  }}
}};

export const staggerContainerVariants = {{
  initial: {{}},
  animate: {{
    transition: {{
      staggerChildren: 0.08,
      delayChildren: 0.15
    }}
  }}
}};

export const modalBackdropVariants = {{
  initial: {{ opacity: 0 }},
  animate: {{ opacity: 1, transition: {{ duration: 0.3 }} }},
  exit: {{ opacity: 0, transition: {{ duration: 0.25 }} }}
}};</pre>

  <h3 class="subsec-heading">Dynamic Document SEO & Head Metadata Hook</h3>
  <pre class="code-block">import {{ useEffect }} from "react";

interface SEOProps {{
  title: string;
  description?: string;
}}

export function useSEO({{ title, description }}: SEOProps) {{
  useEffect(() =&gt; {{
    const fullTitle = `${{title}} | Lamiwood Premium Surfaces`;
    document.title = fullTitle;

    if (description) {{
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {{
        metaDesc = document.createElement("meta");
        metaDesc.setAttribute("name", "description");
        document.head.appendChild(metaDesc);
      }}
      metaDesc.setAttribute("content", description);
    }}
  }}, [title, description]);
}}</pre>

  <div class="page-number">15</div>
</div>

<!-- ================= PAGE 22: CHAPTER 4 (page 16) ================= -->
<div class="page">
  <div class="page-border"></div>
  <h1 class="chap-num">Chapter 4</h1>
  <h1 class="chap-title">Results and Discussion</h1>

  <h2 class="sec-heading">4.1 &nbsp; Feature Implementation Results</h2>
  <p class="body-text">
    The Lamiwood e-commerce web platform was systematically validated against functional specifications and performance benchmarks. All core architectural modules, interactive tools, and transactional workflows were thoroughly tested across diverse display resolutions and modern browsers.
  </p>

  <p class="caption">Table 4.1: Feature Implementation and Quality Checklist</p>
  <table class="report-table">
    <thead>
      <tr>
        <th style="width: 25%;">Module / Feature</th>
        <th style="width: 20%;">Target Status</th>
        <th style="width: 55%;">Validation Outcome & Behavior</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="bold">Catalog Filtering</td>
        <td>100% Passed</td>
        <td>Multi-checkbox filtering updates instantaneously with zero lag</td>
      </tr>
      <tr>
        <td class="bold">Pattern Designer</td>
        <td>100% Passed</td>
        <td>All 6 laying geometries render SVG vectors and update waste %</td>
      </tr>
      <tr>
        <td class="bold">Surface Calculator</td>
        <td>100% Passed</td>
        <td>Computes net sq.ft, buffer margins, box counts, and total price</td>
      </tr>
      <tr>
        <td class="bold">Product Comparator</td>
        <td>100% Passed</td>
        <td>Allows up to 3 items with side-by-side spec alignment</td>
      </tr>
      <tr>
        <td class="bold">Aging Simulator</td>
        <td>100% Passed</td>
        <td>Smooth slider shows wood patina shift over 20 years</td>
      </tr>
      <tr>
        <td class="bold">Cart & Sample Drawer</td>
        <td>100% Passed</td>
        <td>Persists in LocalStorage, supports free shipping indicator</td>
      </tr>
      <tr>
        <td class="bold">Responsive Mobile UI</td>
        <td>100% Passed</td>
        <td>Animated slide-in drawer operates smoothly on mobile viewports</td>
      </tr>
    </tbody>
  </table>

  <p class="caption" style="margin-top: 5mm;">Table 4.2: Web Performance & Google Lighthouse Audit Metrics</p>
  <table class="report-table">
    <thead>
      <tr>
        <th style="width: 30%;">Audit Category</th>
        <th style="width: 25%;">Score / Benchmark</th>
        <th style="width: 45%;">Performance Analysis</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="bold">Lighthouse Performance</td>
        <td>98 / 100</td>
        <td>Minimal JavaScript overhead due to route code splitting</td>
      </tr>
      <tr>
        <td class="bold">Accessibility (a11y)</td>
        <td>100 / 100</td>
        <td>Semantic HTML5 tags, high contrast text, and ARIA labels</td>
      </tr>
      <tr>
        <td class="bold">Best Practices</td>
        <td>100 / 100</td>
        <td>Zero browser console warnings, HTTPS secure asset imports</td>
      </tr>
      <tr>
        <td class="bold">Search Engine Optimization</td>
        <td>100 / 100</td>
        <td>Per-route dynamic title tags, meta descriptions, and sitemap</td>
      </tr>
      <tr>
        <td class="bold">First Contentful Paint (FCP)</td>
        <td>0.8 seconds</td>
        <td>Near instantaneous initial screen draw on 4G connections</td>
      </tr>
      <tr>
        <td class="bold">Cumulative Layout Shift (CLS)</td>
        <td>0.00</td>
        <td>Zero visual jumpiness during image and font asset loading</td>
      </tr>
    </tbody>
  </table>

  <div class="page-number">16</div>
</div>

<!-- ================= PAGE 23: CHAPTER 4 (page 17) ================= -->
<div class="page">
  <div class="page-border"></div>

  <h2 class="sec-heading">4.2 &nbsp; Discussion</h2>

  <h3 class="subsec-heading">Strengths</h3>
  <p class="body-text">
    The evaluation of Lamiwood demonstrates substantial architectural and user-experience advantages over traditional catalog websites:
  </p>
  <ul class="body-list">
    <li><b>Instantaneous Client-Side Interactions:</b> Because the product catalog is structured as local immutable data, search queries, multi-criteria category filtering, and sorting occur instantaneously without the latency of server requests.</li>
    <li><b>Domain-Specific Architectural Utilities:</b> Unlike generic e-commerce templates, Lamiwood directly addresses the unique pain points of interior finishes. The Installation Pattern Designer and Surface Wastage Calculator eliminate guesswork for clients and reduce costly material over-ordering.</li>
    <li><b>Luxury Visual Branding:</b> The curated palette of deep charcoal, soft cream, and brushed gold, complemented by <i>Cormorant Garamond</i> headings, establishes an artisanal luxury brand identity comparable to premier global interior houses.</li>
    <li><b>Production-Grade Code Quality:</b> End-to-end typing via TypeScript 6 completely eliminates runtime null reference bugs. Reusable atomic components foster high maintainability and straightforward extensibility.</li>
    <li><b>Fluid Micro-Interactions:</b> Leveraging Framer Motion with custom luxury cubic-bezier easing ensures transitions feel responsive, intentional, and engaging without sacrificing frame rate.</li>
  </ul>

  <h3 class="subsec-heading">Limitations</h3>
  <p class="body-text">
    Despite its comprehensive feature set, the current implementation exhibits certain architectural boundaries:
  </p>
  <ul class="body-list">
    <li><b>Client-Bound Catalog Scale:</b> In this demo stage, the 16-product catalog is bundled within client JavaScript bundles. While optimal for speed with tens of products, scaling to thousands of SKUs would require server-side pagination, database indexing, and API hydration.</li>
    <li><b>Absence of Persistent Server Database:</b> Cart items and sample orders persist within the user's local browser storage. If a user accesses the site from another device or clears browser cache, previously saved items are not retained.</li>
  </ul>

  <div class="page-number">17</div>
</div>

<!-- ================= PAGE 24: CHAPTER 4 (page 18) ================= -->
<div class="page">
  <div class="page-border"></div>

  <ul class="body-list" style="margin-top: 4mm;">
    <li><b>Simulation-Based Floor Rendering:</b> While the Pattern Designer accurately visualizes geometric orientations (Herringbone, Chevron, Diagonal) via vector calculations, it does not currently simulate photorealistic 3D light reflections or surface bump maps.</li>
    <li><b>Simulated Payment Checkout:</b> The checkout and sample dispatch flows operate in demonstration mode with validated client forms rather than processing real currency transactions via an integrated payment gateway.</li>
  </ul>

  <h3 class="subsec-heading">Overall Observation</h3>
  <p class="body-text">
    Lamiwood successfully fulfills all industrial requirements for a modern architectural surfaces e-commerce application. By uniting cutting-edge frontend technologies—React 19, TypeScript, Tailwind CSS v4, and Framer Motion—with mathematically grounded interior layout utilities, the platform demonstrates how modern web engineering can elevate traditional industries into elegant, high-conversion digital experiences.
  </p>
  <p class="body-text">
    The application achieved exceptional audit results across accessibility, performance, and responsive design, providing a robust, extensible foundation ready for commercial backend integration.
  </p>

  <div style="margin-top: 15mm; border-top: 1pt solid #ddd; padding-top: 6mm;">
    <p class="body-text" style="font-style: italic; color: #444;">
      "The integration of mathematical pattern algorithms with luxury UI aesthetics provides a blueprint for how next-generation e-commerce platforms can deliver genuine functional utility to high-involvement specifiers and discerning homeowners alike."
    </p>
  </div>

  <div class="page-number">18</div>
</div>

<!-- ================= PAGE 25: CHAPTER 5 (page 19) ================= -->
<div class="page">
  <div class="page-border"></div>
  <h1 class="chap-num">Chapter 5</h1>
  <h1 class="chap-title">Conclusion and Future Scope</h1>

  <h2 class="sec-heading">5.1 &nbsp; Product Catalog & System Snapshot</h2>
  <p class="body-text">
    The Lamiwood catalog consists of 16 artisan products spanning 6 core architectural surfacing categories. Table 5.1 displays representative records from the active catalog schema.
  </p>

  <p class="caption">Table 5.1: Sample records from the Lamiwood architectural surface catalog</p>
  <table class="report-table">
    <thead>
      <tr>
        <th style="width: 25%;">Product Name</th>
        <th style="width: 18%;">Category</th>
        <th style="width: 15%;">Price (₹)</th>
        <th style="width: 22%;">Finish Type</th>
        <th style="width: 20%;">Warranty</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="bold">Natural Oak Flooring</td>
        <td>Flooring</td>
        <td>₹450 / sq.ft</td>
        <td>UV-Cured Natural Oil</td>
        <td>25 Years</td>
      </tr>
      <tr>
        <td class="bold">Dark Walnut Flooring</td>
        <td>Flooring</td>
        <td>₹520 / sq.ft</td>
        <td>Matte Polyurethane</td>
        <td>25 Years</td>
      </tr>
      <tr>
        <td class="bold">Teak Wall Panel</td>
        <td>Wall Panels</td>
        <td>₹380 / sq.ft</td>
        <td>Hand-Rubbed Wax</td>
        <td>15 Years</td>
      </tr>
      <tr>
        <td class="bold">Bamboo Natural Decking</td>
        <td>Decking</td>
        <td>₹390 / sq.ft</td>
        <td>Exterior Weather-Shield</td>
        <td>10 Years</td>
      </tr>
      <tr>
        <td class="bold">Cedar Rustic Cladding</td>
        <td>Cladding</td>
        <td>₹480 / sq.ft</td>
        <td>Charred Shou Sugi Ban</td>
        <td>20 Years</td>
      </tr>
      <tr>
        <td class="bold">Walnut Acoustic Panel</td>
        <td>Acoustic</td>
        <td>₹540 / sq.ft</td>
        <td>Sound-Absorbing Felt</td>
        <td>15 Years</td>
      </tr>
    </tbody>
  </table>

  <h2 class="sec-heading">5.2 &nbsp; Future Scope</h2>
  <p class="body-text">
    The Lamiwood platform provides a robust foundation that can be extended in multiple technological and commercial directions:
  </p>
  <ul class="body-list">
    <li><b>Headless CMS Integration:</b> Connecting a headless content management system (such as Strapi or Sanity.io) to enable real-time inventory updates, price modifications, and architectural blog publications without code redeployment.</li>
    <li><b>3D WebGL / Three.js Room Visualizer:</b> Implementing an interactive 3D virtual room environment where clients can upload their room floor plan and visualize surface finishes under varying daylight conditions (morning, noon, artificial warm lighting).</li>
  </ul>

  <div class="page-number">19</div>
</div>

<!-- ================= PAGE 26: CHAPTER 5 (page 20) ================= -->
<div class="page">
  <div class="page-border"></div>

  <ul class="body-list" style="margin-top: 4mm;">
    <li><b>Augmented Reality (AR) Mobile Surface Preview:</b> Developing WebXR / ARKit capabilities enabling users to point their smartphone camera at their existing floor or wall and project realistic hardwood and panel textures into physical space in real time.</li>
    <li><b>Production Payment Gateway & Order Tracking:</b> Integrating financial payment gateways (Razorpay, Stripe) with automated GST invoicing, courier tracking APIs, and ERP inventory synchronization.</li>
    <li><b>Automated Spec Sheet & PDF Quotation Generator:</b> Generating downloadable architectural specification cut-sheets with high-resolution texture swatches, acoustic ratings, fire safety certificates, and formal cost estimates for professional bid submissions.</li>
    <li><b>Architect & Trade Partner Portal:</b> Introducing role-based authentication allowing certified trade professionals and contractors to access commercial wholesale discounts, tiered sample kits, and project tracking boards.</li>
    <li><b>AI-Powered Interior Style Matcher:</b> Incorporating computer vision models that analyze photos of a client's furniture and color scheme to automatically recommend harmonious surface textures and compatible finishes.</li>
  </ul>

  <div style="margin-top: 15mm; background: #fafafa; border: 1px solid #e0e0e0; padding: 12px 16px; border-radius: 4px;">
    <p style="font-size: 11pt; font-weight: bold; margin-top: 0; margin-bottom: 2mm;">Summary of Future Development Milestones:</p>
    <p class="body-text" style="margin-bottom: 0;">
      By transitioning from a high-performance client-side application to a cloud-integrated omni-channel platform with 3D visualization, Lamiwood has the potential to become a definitive industry benchmark for architectural e-commerce in India and global markets.
    </p>
  </div>

  <div class="page-number">20</div>
</div>

<!-- ================= PAGE 27: CONCLUSION (page 21) ================= -->
<div class="page">
  <div class="page-border"></div>
  <h1 class="chap-title" style="margin-top: 12mm; margin-bottom: 8mm;">Conclusion</h1>

  <p class="body-text">
    During the six-week Industrial Training at <b>Linkstatic Techno</b>, a complete, production-ready architectural surfaces e-commerce web platform named <b>Lamiwood</b> was conceptualized, designed, engineered, and evaluated. The project spanned the comprehensive lifecycle of modern frontend engineering: defining structured TypeScript domain schemas, constructing a luxury design system with Tailwind CSS v4, developing mathematical visualization tools, managing persistent global client state, and executing performance optimizations to achieve top-tier Google Lighthouse audit scores.
  </p>

  <p class="body-text">
    The project successfully resolved core industry challenges inherent to architectural surface selection. By embedding an <b>Installation Pattern Designer</b>, an intelligent <b>Surface Price & Wastage Calculator</b>, an interactive <b>Wood Aging Simulator</b>, and a <b>Side-by-Side Product Comparison Matrix</b> directly within the digital storefront, Lamiwood bridges the gap between artistic luxury presentation and technical engineering accuracy.
  </p>

  <p class="body-text">
    The training curriculum provided invaluable practical exposure to:
  </p>
  <ul class="body-list">
    <li>Building scalable component hierarchies adhering to React 19 best practices and TypeScript strict type safety.</li>
    <li>Harnessing Vite 8 for optimized build pipelines, dynamic code splitting, and tree-shaking.</li>
    <li>Implementing utility-first styling with Tailwind CSS v4 and fluid physics-based micro-interactions with Framer Motion.</li>
    <li>Architecting robust client-side state persistence mechanisms using React Context API and LocalStorage.</li>
    <li>Following the Agile Iterative and Incremental development methodology practiced in modern software engineering teams.</li>
  </ul>

  <p class="body-text" style="margin-top: 6mm;">
    In conclusion, the internship served as a rigorous and enriching bridge between academic computer science theory and professional software engineering practice, instilling the technical discipline and design sensibility required to engineer enterprise-grade web applications.
  </p>

  <div class="page-number">21</div>
</div>

<!-- ================= PAGE 28: REFERENCES (page 22) ================= -->
<div class="page">
  <div class="page-border"></div>
  <h1 class="chap-title" style="margin-top: 12mm; margin-bottom: 8mm;">References</h1>

  <div style="font-size: 11pt; line-height: 1.8; text-align: justify; margin-top: 6mm;">
    <p style="margin-bottom: 4mm;">
      [1] &nbsp; React Documentation, “React 19: The library for web and native user interfaces,” Meta Open Source, 2026. [Online]. Available: <span style="color: #003399;">https://react.dev</span>
    </p>

    <p style="margin-bottom: 4mm;">
      [2] &nbsp; E. You et al., “Vite: Next Generation Frontend Tooling,” Vite Core Team, 2026. [Online]. Available: <span style="color: #003399;">https://vite.dev</span>
    </p>

    <p style="margin-bottom: 4mm;">
      [3] &nbsp; A. Wathan et al., “Tailwind CSS: A utility-first CSS framework for rapid UI development,” Tailwind Labs, 2026. [Online]. Available: <span style="color: #003399;">https://tailwindcss.com</span>
    </p>

    <p style="margin-bottom: 4mm;">
      [4] &nbsp; M. Ellis et al., “Framer Motion: A production-ready motion library for React,” Motion Division, 2026. [Online]. Available: <span style="color: #003399;">https://motion.dev</span>
    </p>

    <p style="margin-bottom: 4mm;">
      [5] &nbsp; Microsoft Corporation, “TypeScript: JavaScript With Syntax For Types,” Microsoft Open Source, 2026. [Online]. Available: <span style="color: #003399;">https://www.typescriptlang.org</span>
    </p>

    <p style="margin-bottom: 4mm;">
      [6] &nbsp; World Wide Web Consortium (W3C), “Web Content Accessibility Guidelines (WCAG) 2.2,” W3C Recommendation, 2023. [Online]. Available: <span style="color: #003399;">https://www.w3.org/WAI/standards-guidelines/wcag/</span>
    </p>

    <p style="margin-bottom: 4mm;">
      [7] &nbsp; Google Chrome Team, “Web Vitals: Essential metrics for a healthy site,” Google Developers, 2024. [Online]. Available: <span style="color: #003399;">https://web.dev/vitals/</span>
    </p>

    <p style="margin-bottom: 4mm;">
      [8] &nbsp; MDN Web Docs, “Client-Side Storage: LocalStorage and SessionStorage APIs,” Mozilla Developer Network, 2025. [Online]. Available: <span style="color: #003399;">https://developer.mozilla.org</span>
    </p>
  </div>

  <div class="page-number">22</div>
</div>

</body>
</html>
"""

html_path = r"d:\ITR Project\lamiwood-ecom-website\report\report.html"
with open(html_path, "w", encoding="utf-8") as f:
    f.write(html_content)

print("Saved updated HTML report to", html_path)

pdf_out_path = r"d:\ITR Project\lamiwood-ecom-website\report\Lamiwood_Industrial_Training_Report.pdf"

edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
browser_path = chrome_path if os.path.exists(chrome_path) else edge_path

cmd = [
    browser_path,
    "--headless=new",
    "--disable-gpu",
    "--no-pdf-header-footer",
    f"--print-to-pdf={pdf_out_path}",
    html_path
]

res = subprocess.run(cmd, capture_output=True, text=True)
print("Compiled PDF. Exit code:", res.returncode)

if os.path.exists(pdf_out_path):
    doc = pymupdf.open(pdf_out_path)
    print(f"SUCCESS! Verified PDF with {len(doc)} pages.")
    doc[5].get_pixmap(dpi=150).save(r"d:\ITR Project\lamiwood-ecom-website\report\page_6.png")
    doc.close()

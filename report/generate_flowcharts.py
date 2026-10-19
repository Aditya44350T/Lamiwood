import matplotlib.pyplot as plt
import matplotlib.patches as patches

def create_flowchart_1(output_path):
    fig, ax = plt.subplots(figsize=(8, 10), dpi=300)
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 12)
    ax.axis('off')

    steps = [
        "Architectural Surface Catalog & Schema\n(16 Curated Products across 6 Surface Categories)",
        "Component-Driven Modular Architecture\n(React 19 + TypeScript Strict Interfaces & Prop Types)",
        "Design System & UI Theme Engine\n(Tailwind CSS v4 + Playfair Display & Inter Typography)",
        "State Management & Custom Reactive Hooks\n(Cart Context, Wishlist Context, Scroll Observers, SEO)",
        "Interactive Surface & Calculation Engines\n(Pattern Designer, Area/Wastage Calculator, Aging Simulator)",
        "Vite 8 Build & Production Pipeline\n(Route Code-Splitting, Tree-Shaking & Static Bundling)"
    ]

    box_w, box_h = 7.6, 1.1
    y_positions = [10.5, 8.7, 6.9, 5.1, 3.3, 1.5]

    for i, (text, y) in enumerate(zip(steps, y_positions)):
        # Box background
        rect = patches.FancyBboxPatch(
            ((10 - box_w)/2, y - box_h/2), box_w, box_h,
            boxstyle="round,pad=0.2,rounding_size=0.15",
            ec="#2e5b44", fc="#eef7f2", lw=1.2
        )
        ax.add_patch(rect)
        ax.text(5, y, text, ha='center', va='center', fontsize=11, fontfamily='serif', color='#111111')

        # Arrow down
        if i < len(steps) - 1:
            ax.annotate(
                '', xy=(5, y_positions[i+1] + box_h/2 + 0.05),
                xytext=(5, y - box_h/2 - 0.05),
                arrowprops=dict(facecolor='#2e5b44', edgecolor='#2e5b44', width=1.5, headwidth=7, headlength=7)
            )

    plt.tight_layout()
    plt.savefig(output_path, bbox_inches='tight', dpi=300)
    plt.close()

def create_flowchart_2(output_path):
    fig, ax = plt.subplots(figsize=(8, 10), dpi=300)
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 12)
    ax.axis('off')

    steps = [
        "User explores Lamiwood catalog via\nHero Navigation, Categories, or Search",
        "Client-side Filter Engine processes active criteria\n(Category, Price Range, Surface Finish, Stock)",
        "User selects Surface Product to inspect\nGallery, Specifications, and Dimensional Properties",
        "User launches Interactive Tools\n(Installation Pattern Designer or Surface Price Calculator)",
        "Dynamic layout rendering and real-time computation\n(Herringbone / Chevron layout + Wastage % & Budget)",
        "User adds surface samples to Cart Drawer,\nsaves to Wishlist, or requests Consultation"
    ]

    box_w, box_h = 7.6, 1.1
    y_positions = [10.5, 8.7, 6.9, 5.1, 3.3, 1.5]

    for i, (text, y) in enumerate(zip(steps, y_positions)):
        # First and last boxes light purple/blue, intermediate light green (matching sample style!)
        if i == 0 or i == len(steps) - 1:
            fc_color = "#e8edf8"
            ec_color = "#3b5998"
        else:
            fc_color = "#eef7f2"
            ec_color = "#2e5b44"

        rect = patches.FancyBboxPatch(
            ((10 - box_w)/2, y - box_h/2), box_w, box_h,
            boxstyle="round,pad=0.2,rounding_size=0.15",
            ec=ec_color, fc=fc_color, lw=1.2
        )
        ax.add_patch(rect)
        ax.text(5, y, text, ha='center', va='center', fontsize=11, fontfamily='serif', color='#111111')

        # Arrow down
        if i < len(steps) - 1:
            ax.annotate(
                '', xy=(5, y_positions[i+1] + box_h/2 + 0.05),
                xytext=(5, y - box_h/2 - 0.05),
                arrowprops=dict(facecolor='#333333', edgecolor='#333333', width=1.5, headwidth=7, headlength=7)
            )

    plt.tight_layout()
    plt.savefig(output_path, bbox_inches='tight', dpi=300)
    plt.close()

if __name__ == '__main__':
    create_flowchart_1(r"d:\ITR Project\lamiwood-ecom-website\report\assets\figure_3_1.png")
    create_flowchart_2(r"d:\ITR Project\lamiwood-ecom-website\report\assets\figure_3_2.png")
    print("Flowcharts generated successfully!")

import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  light?: boolean;
}

export default function Breadcrumb({ items, light = false }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "py-4 text-sm",
        light ? "text-white/60" : "text-charcoal-light",
      )}
    >
      <ol className="flex items-center gap-2">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-2">
            {i > 0 && (
              <span className={light ? "text-white/30" : "text-beige"}>
                /
              </span>
            )}
            {item.href ? (
              <Link
                to={item.href}
                className="hover:text-gold transition-colors duration-200"
              >
                {item.label}
              </Link>
            ) : (
              <span className={light ? "text-white" : "text-charcoal"}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

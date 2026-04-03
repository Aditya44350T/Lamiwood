import { cn } from "@/lib/utils";

const styles = {
  new: "bg-gold text-white",
  bestseller: "bg-charcoal dark:bg-white/20 text-white",
  premium: "bg-gold-muted text-charcoal",
  category: "bg-beige dark:bg-white/10 text-charcoal-light",
};

interface BadgeProps {
  variant: keyof typeof styles;
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ variant, children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-block px-3 py-1 text-xs font-medium uppercase tracking-wider",
        styles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}

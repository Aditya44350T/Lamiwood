import { type ButtonHTMLAttributes } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMagneticElement } from "@/hooks/useMagneticElement";

const variants = {
  primary:
    "bg-gold text-white hover:bg-gold-light active:bg-gold-muted",
  secondary:
    "border border-charcoal text-charcoal hover:bg-charcoal hover:text-white",
  ghost:
    "text-charcoal hover:text-gold underline-offset-4 hover:underline",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  href?: string;
  magnetic?: boolean;
}

export default function Button({
  variant = "primary",
  size = "md",
  href,
  magnetic = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const { ref, magneticX, magneticY, handlers } = useMagneticElement({
    strength: 0.25,
    radius: 120,
    stiffness: 150,
    damping: 15,
  });

  const classes = cn(
    "inline-flex items-center justify-center font-medium tracking-wide transition-all duration-300 cursor-pointer",
    variants[variant],
    sizes[size],
    className,
  );

  if (href) {
    if (magnetic) {
      return (
        <motion.div
          ref={ref as React.RefObject<HTMLDivElement>}
          style={{ x: magneticX, y: magneticY }}
          onMouseMove={handlers.onMouseMove}
          onMouseLeave={handlers.onMouseLeave}
          className="inline-block"
        >
          <Link to={href} className={classes}>
            {children}
          </Link>
        </motion.div>
      );
    }
    return (
      <Link to={href} className={classes}>
        {children}
      </Link>
    );
  }

  if (magnetic) {
    return (
      <motion.div
        ref={ref as React.RefObject<HTMLDivElement>}
        style={{ x: magneticX, y: magneticY }}
        onMouseMove={handlers.onMouseMove}
        onMouseLeave={handlers.onMouseLeave}
        className="inline-block"
      >
        <motion.button
          className={classes}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          {...(props as Record<string, unknown>)}
        >
          {children}
        </motion.button>
      </motion.div>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const widths = {
  narrow: "max-w-4xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
};

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: keyof typeof widths;
}

export default function Container({
  children,
  className,
  size = "default",
}: ContainerProps) {
  return (
    <div className={cn("mx-auto px-4 sm:px-6 lg:px-8", widths[size], className)}>
      {children}
    </div>
  );
}

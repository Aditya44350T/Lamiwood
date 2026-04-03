import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export default function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn("animate-shimmer rounded", className)}
      style={{
        background:
          "linear-gradient(90deg, var(--color-beige) 25%, var(--color-cream-dark) 50%, var(--color-beige) 75%)",
        backgroundSize: "200% 100%",
      }}
    />
  );
}

import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline" | "ghost";
};

export default function Button({
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-xl px-5 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 disabled:cursor-not-allowed disabled:opacity-60",
        variant === "primary" &&
          "bg-blue-600 text-white shadow-sm shadow-blue-600/20 hover:bg-blue-700",
        variant === "outline" &&
          "border border-blue-200 text-blue-700 hover:border-blue-300 hover:text-blue-800",
        variant === "ghost" && "text-blue-600 hover:text-blue-700",
        className,
      )}
      {...props}
    />
  );
}

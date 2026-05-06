import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
  error?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, hint, error, className, id, name, ...props }, ref) => {
    const inputId = id ?? name;
    const messageId = inputId ? `${inputId}-message` : undefined;

    return (
      <label className="flex flex-col gap-2 text-sm text-slate-700">
        {label ? (
          <span className="font-medium text-slate-900">{label}</span>
        ) : null}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={Boolean(error)}
          aria-describedby={messageId}
          className={cn(
            "rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm transition focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20",
            error &&
              "border-rose-300 focus:border-rose-400 focus:ring-rose-300/30",
            className,
          )}
          {...props}
        />
        {error ? (
          <span id={messageId} className="text-xs text-rose-600">
            {error}
          </span>
        ) : hint ? (
          <span id={messageId} className="text-xs text-slate-500">
            {hint}
          </span>
        ) : null}
      </label>
    );
  },
);

Input.displayName = "Input";

export default Input;

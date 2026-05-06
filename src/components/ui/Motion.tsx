"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type MotionProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
};

export function MotionPage({ children, className, ...props }: MotionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn("will-change-transform", className)}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function MotionStagger({ children, className, ...props }: MotionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn("will-change-transform", className)}
      initial={shouldReduceMotion ? false : "hidden"}
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.08,
            delayChildren: 0.04,
          },
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function MotionItem({ children, className, ...props }: MotionProps) {
  return (
    <motion.div
      className={cn("will-change-transform", className)}
      variants={{
        hidden: { opacity: 0, y: 10 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

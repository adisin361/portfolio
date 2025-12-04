import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface SketchyButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "accent" | "destructive";
  size?: "sm" | "md" | "lg";
}

export function SketchyButton({ 
  children, 
  className, 
  variant = "primary", 
  size = "md",
  ...props 
}: SketchyButtonProps) {
  
  const variants = {
    primary: "bg-ink text-paper hover:bg-ink/90 border-transparent",
    secondary: "bg-white text-ink hover:bg-gray-50 border-ink",
    accent: "bg-accent text-ink hover:bg-accent/90 border-transparent",
    destructive: "bg-destructive text-white hover:bg-destructive/90 border-transparent",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg font-bold",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02, rotate: -1 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "font-hand border-sketchy shadow-sketchy transition-colors relative overflow-hidden group cursor-pointer",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children as React.ReactNode}</span>
    </motion.button>
  );
}

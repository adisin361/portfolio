import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SketchyCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function SketchyCard({ children, className, onClick }: SketchyCardProps) {
  return (
    <motion.div
      whileHover={onClick ? { scale: 1.01, rotate: 0.5 } : {}}
      onClick={onClick}
      className={cn(
        "bg-card p-6 border-sketchy shadow-sketchy relative overflow-hidden",
        onClick && "cursor-pointer hover:shadow-lg transition-shadow",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

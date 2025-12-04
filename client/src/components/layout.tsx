import React from "react";
import { cn } from "@/lib/utils";
import paperTexture from "@assets/generated_images/cream_paper_texture_with_subtle_watercolor_washes.png";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function Layout({ children, className }: LayoutProps) {
  return (
    <div 
      className={cn(
        "min-h-screen w-full bg-paper text-ink font-serif overflow-x-hidden",
        className
      )}
      style={{
        backgroundImage: `url(${paperTexture})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed"
      }}
    >
      <div className="max-w-md mx-auto min-h-screen flex flex-col relative bg-white/40 backdrop-blur-[2px] shadow-2xl">
        {children}
      </div>
    </div>
  );
}

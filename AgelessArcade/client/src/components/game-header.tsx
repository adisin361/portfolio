import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { SketchyButton } from "./ui/sketchy-button";

interface GameHeaderProps {
  title: string;
  subtitle?: string;
}

export function GameHeader({ title, subtitle }: GameHeaderProps) {
  return (
    <header className="p-4 pt-6 flex items-center gap-4">
      <Link href="/">
        <SketchyButton variant="secondary" size="sm" className="!px-3 !py-2">
          <ArrowLeft className="w-5 h-5" />
        </SketchyButton>
      </Link>
      <div>
        <h1 className="text-2xl font-bold leading-none">{title}</h1>
        {subtitle && <p className="text-muted-foreground text-sm font-serif italic">{subtitle}</p>}
      </div>
    </header>
  );
}

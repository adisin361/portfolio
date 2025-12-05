import { Navbar } from "@/components/portfolio/navbar";
import { Hero } from "@/components/portfolio/hero";
import { Experience } from "@/components/portfolio/experience";
import { Projects } from "@/components/portfolio/projects";
import { Skills } from "@/components/portfolio/skills";
import { Connect } from "@/components/portfolio/connect";
import { BugSquashGame } from "@/components/portfolio/bug-squash";
import { TypingGame } from "@/components/portfolio/typing-game";
import { MemoryCardGame } from "@/components/portfolio/memory-card-game";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { CursorParticles } from "@/components/ui/cursor-particles";

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 cursor-none">
      <ScrollProgress />
      <CustomCursor />
      <CursorParticles />
      <Navbar />
      
      <main>
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <Connect />
      </main>

      <BugSquashGame />
      <TypingGame />
      <MemoryCardGame />

      <footer className="py-8 border-t border-white/10 text-center text-muted-foreground text-sm">
        <p>© {new Date().getFullYear()} Aditya Sinha. Built with React & Tailwind.</p>
      </footer>
    </div>
  );
}

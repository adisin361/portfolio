import { Link } from "wouter";
import { Layout } from "@/components/layout";
import { SketchyCard } from "@/components/ui/sketchy-card";
import { SketchyButton } from "@/components/ui/sketchy-button";
import { Brain, Lightbulb, Trophy, Clock, Calendar } from "lucide-react";
import { format } from "date-fns";
import lightbulbImage from "@assets/generated_images/hand_drawn_ink_sketch_of_a_lightbulb.png";
import trophyImage from "@assets/generated_images/hand_drawn_ink_sketch_of_a_trophy.png";

export default function Home() {
  const today = new Date();

  return (
    <Layout>
      <div className="p-6 flex flex-col h-full">
        {/* Header */}
        <header className="mb-8 text-center pt-4">
          <div className="inline-block mb-2 px-4 py-1 bg-watercolor-gold/30 rounded-full border border-ink/10 transform -rotate-1">
            <span className="font-serif text-sm font-medium flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {format(today, "EEEE, MMMM do")}
            </span>
          </div>
          <h1 className="text-5xl font-bold text-ink mb-2 drop-shadow-sm tracking-tight">MindSpark</h1>
          <p className="text-lg text-muted-foreground font-serif italic">Your daily dose of mental fitness</p>
        </header>

        {/* Daily Progress Snippet */}
        <section className="mb-8">
          <SketchyCard className="bg-gradient-to-br from-watercolor-blue/20 to-transparent border-2">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white border-2 border-ink/20 flex items-center justify-center shrink-0 overflow-hidden p-2">
                 <img src={trophyImage} alt="Trophy" className="w-full h-full object-contain opacity-80" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold">Daily Streak: 3 Days</h2>
                <p className="text-sm font-serif leading-snug text-muted-foreground">
                  Keep it up! Just 5 minutes a day keeps the mind sharp.
                </p>
              </div>
            </div>
          </SketchyCard>
        </section>

        {/* Game Menu */}
        <section className="space-y-6 flex-1">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-yellow-600" />
            Today's Challenges
          </h3>

          <Link href="/memory">
            <SketchyCard className="group hover:bg-watercolor-green/10 transition-colors mb-4 cursor-pointer">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-ink text-white text-xs px-2 py-0.5 rounded font-sans uppercase tracking-wider">Memory</span>
                    <span className="text-xs font-serif text-muted-foreground flex items-center">
                      <Clock className="w-3 h-3 mr-1" /> 3 min
                    </span>
                  </div>
                  <h4 className="text-2xl font-bold mb-1 group-hover:underline decoration-wavy decoration-ink/30">Memory Lane</h4>
                  <p className="font-serif text-sm text-muted-foreground">Match the pairs of cards. Good for short-term recall.</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-white/50 border border-ink/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Brain className="w-7 h-7 text-ink/70" />
                </div>
              </div>
            </SketchyCard>
          </Link>

          <SketchyCard className="opacity-60 cursor-not-allowed relative overflow-hidden">
             <div className="absolute inset-0 bg-gray-100/50 backdrop-blur-[1px] z-10 flex items-center justify-center">
                <span className="bg-white px-3 py-1 border border-ink rounded-full font-hand text-sm shadow-sm rotate-3">Coming Tomorrow</span>
             </div>
             <div className="flex justify-between items-start">
                <div>
                   <div className="flex items-center gap-2 mb-1">
                    <span className="bg-gray-500 text-white text-xs px-2 py-0.5 rounded font-sans uppercase tracking-wider">Logic</span>
                   </div>
                   <h4 className="text-2xl font-bold mb-1">Word Scramble</h4>
                   <p className="font-serif text-sm text-muted-foreground">Unscramble the letters to find the hidden word.</p>
                </div>
             </div>
          </SketchyCard>

          <div className="p-4 bg-watercolor-gold/20 rounded-xl border-dashed border-2 border-ink/20 text-center mt-8">
            <p className="font-hand text-lg">"Learning never exhausts the mind."</p>
            <p className="font-serif text-xs text-muted-foreground mt-1">— Leonardo da Vinci</p>
          </div>
        </section>
      </div>
    </Layout>
  );
}

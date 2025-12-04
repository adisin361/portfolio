import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bug, X, Trophy, Play, BugOff } from "lucide-react";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";

interface GameBug {
  id: number;
  x: number;
  y: number;
  type: "syntax" | "logic" | "runtime";
  isSquashed: boolean;
}

export function BugSquashGame() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [bugs, setBugs] = useState<GameBug[]>([]);
  const [highScore, setHighScore] = useState(0);

  // Timer - separate effect so it doesn't reset when bugs change
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsPlaying(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [isPlaying]);

  // Bug spawner - separate effect for spawning bugs
  useEffect(() => {
    if (!isPlaying) return;

    const spawner = setInterval(() => {
      setBugs((currentBugs) => {
        if (currentBugs.length < 8) {
          const types: ("syntax" | "logic" | "runtime")[] = ["syntax", "logic", "runtime"];
          const newBug: GameBug = {
            id: Date.now(),
            x: Math.random() * 80 + 10,
            y: Math.random() * 80 + 10,
            type: types[Math.floor(Math.random() * types.length)],
            isSquashed: false,
          };
          return [...currentBugs, newBug];
        }
        return currentBugs;
      });
    }, 800);

    return () => {
      clearInterval(spawner);
    };
  }, [isPlaying]);

  // Handle game end - check high score and show confetti
  useEffect(() => {
    if (timeLeft === 0 && !isPlaying && score > 0) {
      if (score > highScore) {
        setHighScore(score);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#60a5fa', '#a78bfa', '#34d399']
        });
      }
    }
  }, [timeLeft, isPlaying, score, highScore]);

  const squashBug = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setScore((prev) => prev + 1);
    setBugs((prev) =>
      prev.map((bug) => (bug.id === id ? { ...bug, isSquashed: true } : bug))
    );

    // Remove bug after animation
    setTimeout(() => {
      setBugs((prev) => prev.filter((bug) => bug.id !== id));
    }, 500);
  };

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setTimeLeft(30);
    setBugs([]);
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-4 bg-primary text-primary-foreground rounded-full shadow-2xl border-2 border-white/10 shadow-primary/20 group"
      >
        <BugOff size={28} className="group-hover:animate-bounce" />
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-card px-3 py-1 rounded-lg text-sm font-bold border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Debug Mode
        </span>
      </motion.button>

      {/* Game Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/90 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-3xl h-[calc(100vh-2rem)] md:h-auto md:aspect-video bg-card/50 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
              {/* Close Button */}
              <button
                onClick={() => {
                  setIsOpen(false);
                  setIsPlaying(false);
                }}
                className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full z-50 transition-colors"
              >
                <X size={24} />
              </button>

              {!isPlaying ? (
                // Menu Screen
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 md:p-8 overflow-y-auto">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="mb-4 md:mb-8"
                  >
                    <BugOff size={48} className="md:w-16 md:h-16 text-primary mb-2 md:mb-4 mx-auto" />
                    <h2 className="text-2xl md:text-4xl font-bold mb-2">Debug The Web</h2>
                    <p className="text-sm md:text-base text-muted-foreground max-w-md mx-auto">
                      Bugs are taking over the production server! 
                      Squash as many as you can in 30 seconds.
                    </p>
                  </motion.div>

                  <div className="grid grid-cols-3 gap-4 md:gap-8 mb-4 md:mb-8 text-xs md:text-sm">
                    <div className="flex flex-col items-center gap-1 md:gap-2">
                      <div className="p-2 md:p-3 bg-red-500/20 rounded-full text-red-400">
                        <Bug size={16} className="md:w-5 md:h-5" />
                      </div>
                      <span>Syntax Error</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 md:gap-2">
                      <div className="p-2 md:p-3 bg-yellow-500/20 rounded-full text-yellow-400">
                        <Bug size={16} className="md:w-5 md:h-5" />
                      </div>
                      <span>Logic Bug</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 md:gap-2">
                      <div className="p-2 md:p-3 bg-purple-500/20 rounded-full text-purple-400">
                        <Bug size={16} className="md:w-5 md:h-5" />
                      </div>
                      <span>Runtime Error</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-2 md:gap-4">
                    <button
                      onClick={startGame}
                      className="px-6 py-3 md:px-8 md:py-4 bg-primary text-primary-foreground rounded-xl font-bold text-base md:text-lg hover:scale-105 transition-transform flex items-center gap-2"
                    >
                      <Play size={20} fill="currentColor" />
                      Start Debugging
                    </button>
                    {highScore > 0 && (
                      <div className="flex items-center gap-2 text-yellow-400 font-mono">
                        <Trophy size={16} />
                        High Score: {highScore}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                // Game Screen
                <div className="absolute inset-0 cursor-crosshair" onClick={() => {
                    // Penalty for missing? Maybe later.
                }}>
                  {/* HUD */}
                  <div className="absolute top-0 left-0 right-0 p-3 md:p-6 flex justify-between items-start pointer-events-none z-40">
                    <div className="flex flex-col gap-0.5 md:gap-1">
                      <span className="text-[10px] md:text-xs uppercase tracking-widest text-muted-foreground">Time Remaining</span>
                      <span className={cn("text-xl md:text-3xl font-mono font-bold", timeLeft < 10 ? "text-red-500 animate-pulse" : "text-foreground")}>
                        00:{timeLeft.toString().padStart(2, '0')}
                      </span>
                    </div>
                    <div className="flex flex-col gap-0.5 md:gap-1 items-end">
                      <span className="text-[10px] md:text-xs uppercase tracking-widest text-muted-foreground">Bugs Squashed</span>
                      <span className="text-xl md:text-3xl font-mono font-bold text-primary">
                        {score}
                      </span>
                    </div>
                  </div>

                  {/* Play Area */}
                  {bugs.map((bug) => (
                    <motion.button
                      key={bug.id}
                      initial={{ scale: 0, rotate: Math.random() * 360 }}
                      animate={{ 
                        scale: bug.isSquashed ? 1.5 : 1,
                        opacity: bug.isSquashed ? 0 : 1,
                        x: [0, Math.random() * 20 - 10],
                        y: [0, Math.random() * 20 - 10]
                      }}
                      transition={{ 
                        scale: { duration: 0.2 },
                        opacity: { duration: 0.3, delay: 0.1 },
                        default: { repeat: Infinity, duration: 2, repeatType: "reverse" }
                      }}
                      style={{
                        left: `${bug.x}%`,
                        top: `${bug.y}%`,
                      }}
                      onClick={(e) => squashBug(bug.id, e)}
                      disabled={bug.isSquashed}
                      className={cn(
                        "absolute p-2 md:p-3 rounded-full shadow-lg transition-colors z-30",
                        bug.type === "syntax" && "bg-red-500 text-white",
                        bug.type === "logic" && "bg-yellow-500 text-black",
                        bug.type === "runtime" && "bg-purple-500 text-white",
                        bug.isSquashed && "bg-green-500 text-white scale-125 !opacity-100" // Override for splat effect
                      )}
                    >
                      {bug.isSquashed ? (
                        <span className="font-bold text-[10px] md:text-xs">FIXED!</span>
                      ) : (
                        <Bug size={20} className="md:w-6 md:h-6" />
                      )}
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

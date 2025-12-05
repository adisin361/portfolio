import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, BugOff, Keyboard, Brain, X, Play, Trophy, RotateCcw, Bug } from "lucide-react";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";

type GameType = "bug" | "typing" | "memory" | null;

interface GameBug {
  id: number;
  x: number;
  y: number;
  type: "syntax" | "logic" | "runtime";
  isSquashed: boolean;
}

interface MemoryCard {
  id: number;
  symbol: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const SAMPLE_TEXTS = [
  "The quick brown fox jumps over the lazy dog near the riverbank at sunset.",
  "Programming is the art of telling another human what one wants the computer to do.",
  "In the world of web development, speed and accuracy are equally important.",
  "TypeScript brings type safety to JavaScript, making code more maintainable.",
  "React hooks revolutionized how we write functional components in modern apps.",
];

const MEMORY_SYMBOLS = ["A", "B", "C", "D", "E", "F", "G", "H"];

export function GamesMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeGame, setActiveGame] = useState<GameType>(null);

  const [bugScore, setBugScore] = useState(0);
  const [bugTimeLeft, setBugTimeLeft] = useState(30);
  const [bugs, setBugs] = useState<GameBug[]>([]);
  const [bugHighScore, setBugHighScore] = useState(0);
  const [isBugPlaying, setIsBugPlaying] = useState(false);

  const [typingText, setTypingText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [typingStartTime, setTypingStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [typingTime, setTypingTime] = useState(0);
  const [bestWpm, setBestWpm] = useState(0);
  const [isTypingPlaying, setIsTypingPlaying] = useState(false);

  const [memoryCards, setMemoryCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [memoryMoves, setMemoryMoves] = useState(0);
  const [memoryMatches, setMemoryMatches] = useState(0);
  const [bestMemoryScore, setBestMemoryScore] = useState<number | null>(null);
  const [memoryTime, setMemoryTime] = useState(0);
  const [isMemoryPlaying, setIsMemoryPlaying] = useState(false);

  const startBugGame = () => {
    setIsBugPlaying(true);
    setBugScore(0);
    setBugTimeLeft(30);
    setBugs([]);

    const timer = setInterval(() => {
      setBugTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsBugPlaying(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const spawner = setInterval(() => {
      setBugs((currentBugs) => {
        if (currentBugs.length < 8) {
          const types: ("syntax" | "logic" | "runtime")[] = ["syntax", "logic", "runtime"];
          return [...currentBugs, {
            id: Date.now() + Math.random(),
            x: Math.random() * 80 + 10,
            y: Math.random() * 80 + 10,
            type: types[Math.floor(Math.random() * types.length)],
            isSquashed: false,
          }];
        }
        return currentBugs;
      });
    }, 800);

    setTimeout(() => {
      clearInterval(spawner);
      setBugScore((finalScore) => {
        if (finalScore > bugHighScore) {
          setBugHighScore(finalScore);
          confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        }
        return finalScore;
      });
    }, 30000);
  };

  const squashBug = (id: number) => {
    setBugScore((prev) => prev + 1);
    setBugs((prev) => prev.filter((bug) => bug.id !== id));
  };

  const startTypingGame = () => {
    const text = SAMPLE_TEXTS[Math.floor(Math.random() * SAMPLE_TEXTS.length)];
    setTypingText(text);
    setUserInput("");
    setTypingStartTime(Date.now());
    setIsTypingPlaying(true);
    setWpm(0);
    setAccuracy(100);
    setTypingTime(0);
  };

  const handleTypingInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isTypingPlaying) return;
    const value = e.target.value;
    setUserInput(value);

    const elapsed = (Date.now() - (typingStartTime || Date.now())) / 1000;
    setTypingTime(elapsed);

    const wordsTyped = value.trim().split(/\s+/).length;
    const minutes = elapsed / 60;
    setWpm(minutes > 0 ? Math.round(wordsTyped / minutes) : 0);

    let errors = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== typingText[i]) errors++;
    }
    setAccuracy(value.length > 0 ? Math.round(((value.length - errors) / value.length) * 100) : 100);

    if (value === typingText) {
      setIsTypingPlaying(false);
      if (wpm > bestWpm) {
        setBestWpm(wpm);
        confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
      }
    }
  };

  const initMemoryCards = () => {
    const pairs = MEMORY_SYMBOLS.flatMap((symbol, i) => [
      { id: i * 2, symbol, isFlipped: false, isMatched: false },
      { id: i * 2 + 1, symbol, isFlipped: false, isMatched: false },
    ]);
    for (let i = pairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
    }
    return pairs;
  };

  const startMemoryGame = () => {
    setMemoryCards(initMemoryCards());
    setFlippedCards([]);
    setMemoryMoves(0);
    setMemoryMatches(0);
    setIsMemoryPlaying(true);
    setMemoryTime(0);
  };

  const handleCardClick = (card: MemoryCard) => {
    if (!isMemoryPlaying || flippedCards.length === 2 || card.isMatched || card.isFlipped) return;

    const newCards = memoryCards.map((c) => c.id === card.id ? { ...c, isFlipped: true } : c);
    setMemoryCards(newCards);

    const newFlipped = [...flippedCards, card.id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMemoryMoves(memoryMoves + 1);
      const [first, second] = newFlipped;
      const firstCard = newCards.find((c) => c.id === first);
      const secondCard = newCards.find((c) => c.id === second);

      if (firstCard && secondCard && firstCard.symbol === secondCard.symbol) {
        setTimeout(() => {
          setMemoryCards((prev) => prev.map((c) => 
            c.id === first || c.id === second ? { ...c, isMatched: true } : c
          ));
          setFlippedCards([]);
          setMemoryMatches((prev) => {
            const newMatches = prev + 1;
            if (newMatches === MEMORY_SYMBOLS.length) {
              setIsMemoryPlaying(false);
              if (bestMemoryScore === null || memoryMoves + 1 < bestMemoryScore) {
                setBestMemoryScore(memoryMoves + 1);
                confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });
              }
            }
            return newMatches;
          });
        }, 500);
      } else {
        setTimeout(() => {
          setMemoryCards((prev) => prev.map((c) =>
            c.id === first || c.id === second ? { ...c, isFlipped: false } : c
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const closeGame = () => {
    setActiveGame(null);
    setIsBugPlaying(false);
    setIsTypingPlaying(false);
    setIsMemoryPlaying(false);
    setBugs([]);
    setUserInput("");
    setMemoryCards([]);
  };

  const games = [
    { id: "bug" as const, icon: BugOff, label: "Bug Squash", color: "bg-primary" },
    { id: "typing" as const, icon: Keyboard, label: "Typing Test", color: "bg-purple-600" },
    { id: "memory" as const, icon: Brain, label: "Memory Match", color: "bg-pink-600" },
  ];

  return (
    <>
      <div
        className="fixed bottom-6 right-6 z-40"
        onMouseEnter={() => setIsMenuOpen(true)}
        onMouseLeave={() => setIsMenuOpen(false)}
      >
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {games.map((game, index) => (
                <motion.button
                  key={game.id}
                  initial={{ opacity: 0, scale: 0.5, y: 0 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    y: -(index + 1) * 72 - 16
                  }}
                  exit={{ opacity: 0, scale: 0.5, y: 0 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 400,
                    damping: 20,
                    delay: index * 0.05 
                  }}
                  onClick={() => setActiveGame(game.id)}
                  className={cn(
                    "absolute bottom-0 right-0 p-4 rounded-full text-white shadow-2xl border-2 border-white/10",
                    game.color
                  )}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  data-testid={`button-game-${game.id}`}
                >
                  <game.icon size={24} />
                </motion.button>
              ))}
            </>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="relative p-4 bg-gradient-to-br from-primary via-purple-600 to-pink-600 text-white rounded-full shadow-2xl border-2 border-white/10"
          data-testid="button-games-menu"
        >
          <Gamepad2 size={28} />
        </motion.button>
      </div>

      <AnimatePresence>
        {activeGame === "bug" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/90 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-3xl h-[calc(100vh-2rem)] md:h-auto md:aspect-video bg-card/50 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
              <button onClick={closeGame} className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full z-50">
                <X size={24} />
              </button>

              {!isBugPlaying ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                  <BugOff size={64} className="text-primary mb-4" />
                  <h2 className="text-4xl font-bold mb-2">Debug The Web</h2>
                  <p className="text-muted-foreground max-w-md mb-8">
                    Bugs are taking over! Squash as many as you can in 30 seconds.
                  </p>
                  <button onClick={startBugGame} className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold text-lg flex items-center gap-2">
                    <Play size={20} fill="currentColor" />
                    Start Debugging
                  </button>
                  {bugHighScore > 0 && (
                    <div className="flex items-center gap-2 text-yellow-400 font-mono mt-4">
                      <Trophy size={20} />
                      High Score: {bugHighScore}
                    </div>
                  )}
                </div>
              ) : (
                <div className="absolute inset-0 cursor-crosshair">
                  <div className="absolute top-0 left-0 right-0 p-6 flex justify-between pointer-events-none z-40">
                    <div>
                      <span className="text-xs uppercase tracking-widest text-muted-foreground">Time</span>
                      <div className={cn("text-3xl font-mono font-bold", bugTimeLeft < 10 && "text-red-500 animate-pulse")}>
                        00:{bugTimeLeft.toString().padStart(2, '0')}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs uppercase tracking-widest text-muted-foreground">Score</span>
                      <div className="text-3xl font-mono font-bold text-primary">{bugScore}</div>
                    </div>
                  </div>
                  {bugs.map((bug) => (
                    <motion.button
                      key={bug.id}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      style={{ left: `${bug.x}%`, top: `${bug.y}%` }}
                      onClick={() => squashBug(bug.id)}
                      className={cn(
                        "absolute p-3 rounded-full shadow-lg",
                        bug.type === "syntax" && "bg-red-500",
                        bug.type === "logic" && "bg-yellow-500",
                        bug.type === "runtime" && "bg-purple-500"
                      )}
                    >
                      <Bug size={24} />
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {activeGame === "typing" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/90 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-4xl bg-card/50 border border-white/10 rounded-3xl p-8 shadow-2xl">
              <button onClick={closeGame} className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full">
                <X size={24} />
              </button>

              {!isTypingPlaying && !userInput ? (
                <div className="text-center">
                  <Keyboard size={64} className="text-purple-500 mb-4 mx-auto" />
                  <h2 className="text-4xl font-bold mb-2">Typing Speed Test</h2>
                  <p className="text-muted-foreground max-w-md mx-auto mb-8">
                    Test your typing speed and accuracy!
                  </p>
                  <button onClick={startTypingGame} className="px-8 py-4 bg-purple-600 text-white rounded-xl font-bold text-lg flex items-center gap-2 mx-auto">
                    <Play size={20} fill="currentColor" />
                    Start Test
                  </button>
                  {bestWpm > 0 && (
                    <div className="flex items-center gap-2 text-yellow-400 font-mono mt-4 justify-center">
                      <Trophy size={20} />
                      Best: {bestWpm} WPM
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 bg-background/50 rounded-xl">
                      <div className="text-xs uppercase text-muted-foreground mb-1">WPM</div>
                      <div className="text-3xl font-bold text-purple-500">{wpm}</div>
                    </div>
                    <div className="text-center p-4 bg-background/50 rounded-xl">
                      <div className="text-xs uppercase text-muted-foreground mb-1">Accuracy</div>
                      <div className="text-3xl font-bold text-green-500">{accuracy}%</div>
                    </div>
                    <div className="text-center p-4 bg-background/50 rounded-xl">
                      <div className="text-xs uppercase text-muted-foreground mb-1">Time</div>
                      <div className="text-3xl font-bold">{typingTime.toFixed(1)}s</div>
                    </div>
                  </div>
                  <div className="bg-background/50 rounded-xl p-6 mb-6 font-mono text-lg leading-relaxed">
                    {typingText.split("").map((char, i) => (
                      <span key={i} className={
                        i >= userInput.length ? "text-muted-foreground" :
                        userInput[i] === char ? "text-green-400" : "text-red-400 bg-red-400/20"
                      }>{char}</span>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={userInput}
                    onChange={handleTypingInput}
                    disabled={!isTypingPlaying}
                    className="w-full p-4 bg-background/80 border border-white/10 rounded-xl font-mono text-lg focus:outline-none focus:border-purple-500"
                    placeholder="Start typing..."
                    autoFocus
                  />
                  {!isTypingPlaying && userInput && (
                    <div className="text-center mt-6">
                      <p className="text-2xl font-bold mb-4">Complete!</p>
                      <button onClick={startTypingGame} className="px-6 py-3 bg-purple-600 text-white rounded-xl font-bold flex items-center gap-2 mx-auto">
                        <RotateCcw size={20} />
                        Try Again
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {activeGame === "memory" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/90 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-2xl bg-card/50 border border-white/10 rounded-3xl p-8 shadow-2xl">
              <button onClick={closeGame} className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full">
                <X size={24} />
              </button>

              {!isMemoryPlaying && memoryCards.length === 0 ? (
                <div className="text-center">
                  <Brain size={64} className="text-pink-500 mb-4 mx-auto" />
                  <h2 className="text-4xl font-bold mb-2">Memory Match</h2>
                  <p className="text-muted-foreground max-w-md mx-auto mb-8">
                    Match all pairs in as few moves as possible!
                  </p>
                  <button onClick={startMemoryGame} className="px-8 py-4 bg-pink-600 text-white rounded-xl font-bold text-lg flex items-center gap-2 mx-auto">
                    <Play size={20} fill="currentColor" />
                    Start Game
                  </button>
                  {bestMemoryScore !== null && (
                    <div className="flex items-center gap-2 text-yellow-400 font-mono mt-4 justify-center">
                      <Trophy size={20} />
                      Best: {bestMemoryScore} moves
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <div className="flex justify-between gap-4 mb-6">
                    <div className="text-center p-3 bg-background/50 rounded-xl flex-1">
                      <div className="text-xs uppercase text-muted-foreground mb-1">Moves</div>
                      <div className="text-2xl font-bold text-pink-500">{memoryMoves}</div>
                    </div>
                    <div className="text-center p-3 bg-background/50 rounded-xl flex-1">
                      <div className="text-xs uppercase text-muted-foreground mb-1">Matches</div>
                      <div className="text-2xl font-bold text-green-500">{memoryMatches}/{MEMORY_SYMBOLS.length}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-3 mb-6">
                    {memoryCards.map((card) => (
                      <motion.button
                        key={card.id}
                        onClick={() => handleCardClick(card)}
                        className="aspect-square rounded-xl relative"
                        whileHover={{ scale: card.isMatched ? 1 : 1.05 }}
                      >
                        <motion.div
                          className="w-full h-full"
                          animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          style={{ transformStyle: "preserve-3d" }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center text-2xl" style={{ backfaceVisibility: "hidden" }}>
                            ?
                          </div>
                          <div className={cn(
                            "absolute inset-0 rounded-xl flex items-center justify-center text-3xl font-bold",
                            card.isMatched ? "bg-green-500" : "bg-gradient-to-br from-blue-500 to-cyan-600"
                          )} style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                            {card.symbol}
                          </div>
                        </motion.div>
                      </motion.button>
                    ))}
                  </div>
                  {!isMemoryPlaying && memoryMatches === MEMORY_SYMBOLS.length && (
                    <div className="text-center">
                      <p className="text-2xl font-bold mb-4">You Won!</p>
                      <button onClick={startMemoryGame} className="px-6 py-3 bg-pink-600 text-white rounded-xl font-bold flex items-center gap-2 mx-auto">
                        <RotateCcw size={20} />
                        Play Again
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

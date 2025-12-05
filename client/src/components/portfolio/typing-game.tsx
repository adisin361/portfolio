import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Keyboard, Trophy, RotateCcw } from "lucide-react";
import confetti from "canvas-confetti";

const SAMPLE_TEXTS = [
  "The quick brown fox jumps over the lazy dog near the riverbank at sunset.",
  "Programming is the art of telling another human what one wants the computer to do.",
  "In the world of web development, speed and accuracy are equally important.",
  "TypeScript brings type safety to JavaScript, making code more maintainable.",
  "React hooks revolutionized how we write functional components in modern apps.",
];

export function TypingGame() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [targetText, setTargetText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [errors, setErrors] = useState(0);
  const [bestWpm, setBestWpm] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isPlaying && startTime) {
      const timer = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000;
        setTimeElapsed(elapsed);

        const wordsTyped = userInput.trim().split(/\s+/).length;
        const minutes = elapsed / 60;
        const currentWpm = minutes > 0 ? Math.round(wordsTyped / minutes) : 0;
        setWpm(currentWpm);

        let errorCount = 0;
        for (let i = 0; i < userInput.length; i++) {
          if (userInput[i] !== targetText[i]) {
            errorCount++;
          }
        }
        setErrors(errorCount);
        const acc = userInput.length > 0 
          ? Math.round(((userInput.length - errorCount) / userInput.length) * 100)
          : 100;
        setAccuracy(acc);
      }, 100);

      return () => clearInterval(timer);
    }
  }, [isPlaying, startTime, userInput, targetText]);

  useEffect(() => {
    if (userInput === targetText && targetText.length > 0) {
      finishGame();
    }
  }, [userInput, targetText]);

  const startGame = () => {
    const text = SAMPLE_TEXTS[Math.floor(Math.random() * SAMPLE_TEXTS.length)];
    setTargetText(text);
    setUserInput("");
    setStartTime(Date.now());
    setIsPlaying(true);
    setWpm(0);
    setAccuracy(100);
    setTimeElapsed(0);
    setErrors(0);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const finishGame = () => {
    setIsPlaying(false);
    if (wpm > bestWpm) {
      setBestWpm(wpm);
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#60a5fa', '#a78bfa', '#34d399', '#fbbf24']
      });
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isPlaying) return;
    setUserInput(e.target.value);
  };

  const getCharClass = (index: number) => {
    if (index >= userInput.length) return "text-muted-foreground";
    if (userInput[index] === targetText[index]) return "text-green-400";
    return "text-red-400 bg-red-400/20";
  };

  return (
    <>
      <motion.div
        className="fixed bottom-42 right-6 z-40"
        initial={false}
        whileHover="hover"
      >
        <motion.button
          variants={{
            hover: { scale: 1.1 }
          }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="p-4 bg-purple-600 text-white rounded-full shadow-2xl border-2 border-white/10 shadow-purple-600/20"
          data-testid="button-typing-game"
        >
          <motion.div
            variants={{
              hover: { rotate: [0, -10, 10, 0] }
            }}
            transition={{ repeat: Infinity, duration: 0.8 }}
          >
            <Keyboard size={28} />
          </motion.div>
        </motion.button>
        <motion.span
          variants={{
            hover: { opacity: 1, x: 0 }
          }}
          initial={{ opacity: 0, x: 10 }}
          transition={{ duration: 0.2 }}
          className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-card px-3 py-2 rounded-lg text-sm font-bold border border-white/10 whitespace-nowrap pointer-events-none shadow-lg"
        >
          Typing Test
        </motion.span>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/90 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-4xl bg-card/50 border border-white/10 rounded-3xl p-8 shadow-2xl">
              <button
                onClick={() => {
                  setIsOpen(false);
                  setIsPlaying(false);
                }}
                className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
                data-testid="button-close-typing-game"
              >
                <X size={24} />
              </button>

              {!isPlaying && userInput.length === 0 ? (
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="mb-8"
                  >
                    <Keyboard size={64} className="text-purple-500 mb-4 mx-auto" />
                    <h2 className="text-4xl font-bold mb-2">Typing Speed Test</h2>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      Test your typing speed and accuracy. Type the text as fast and accurately as you can!
                    </p>
                  </motion.div>

                  <button
                    onClick={startGame}
                    className="px-8 py-4 bg-purple-600 text-white rounded-xl font-bold text-lg hover:scale-105 transition-transform flex items-center gap-2 mx-auto"
                    data-testid="button-start-typing"
                  >
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
                      <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">WPM</div>
                      <div className="text-3xl font-bold text-purple-500">{wpm}</div>
                    </div>
                    <div className="text-center p-4 bg-background/50 rounded-xl">
                      <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Accuracy</div>
                      <div className="text-3xl font-bold text-green-500">{accuracy}%</div>
                    </div>
                    <div className="text-center p-4 bg-background/50 rounded-xl">
                      <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Time</div>
                      <div className="text-3xl font-bold text-foreground">{timeElapsed.toFixed(1)}s</div>
                    </div>
                  </div>

                  <div className="bg-background/50 rounded-xl p-6 mb-6 font-mono text-lg leading-relaxed min-h-[120px]">
                    {targetText.split("").map((char, index) => (
                      <span key={index} className={getCharClass(index)}>
                        {char}
                      </span>
                    ))}
                  </div>

                  <input
                    ref={inputRef}
                    type="text"
                    value={userInput}
                    onChange={handleInput}
                    disabled={!isPlaying}
                    className="w-full p-4 bg-background/80 border border-white/10 rounded-xl font-mono text-lg focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="Start typing here..."
                    autoComplete="off"
                    spellCheck={false}
                    data-testid="input-typing-text"
                  />

                  {!isPlaying && userInput.length > 0 && (
                    <div className="text-center mt-6">
                      <p className="text-2xl font-bold mb-4">Test Complete!</p>
                      <button
                        onClick={startGame}
                        className="px-6 py-3 bg-purple-600 text-white rounded-xl font-bold hover:scale-105 transition-transform flex items-center gap-2 mx-auto"
                        data-testid="button-retry-typing"
                      >
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
      </AnimatePresence>
    </>
  );
}

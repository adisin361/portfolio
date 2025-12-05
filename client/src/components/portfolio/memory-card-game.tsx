import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Trophy, RotateCcw, Brain } from "lucide-react";
import confetti from "canvas-confetti";

interface Card {
  id: number;
  symbol: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const SYMBOLS = ["🚀", "💻", "⚡", "🎨", "🎯", "🔥", "💡", "🎮"];

export function MemoryCardGame() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [bestScore, setBestScore] = useState<number | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    if (isPlaying && startTime) {
      const timer = setInterval(() => {
        setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isPlaying, startTime]);

  useEffect(() => {
    if (matches === SYMBOLS.length && isPlaying) {
      finishGame();
    }
  }, [matches, isPlaying]);

  const initializeCards = () => {
    const cardPairs = SYMBOLS.flatMap((symbol, index) => [
      { id: index * 2, symbol, isFlipped: false, isMatched: false },
      { id: index * 2 + 1, symbol, isFlipped: false, isMatched: false },
    ]);
    
    for (let i = cardPairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cardPairs[i], cardPairs[j]] = [cardPairs[j], cardPairs[i]];
    }
    
    return cardPairs;
  };

  const startGame = () => {
    setCards(initializeCards());
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setIsPlaying(true);
    setStartTime(Date.now());
    setTimeElapsed(0);
  };

  const finishGame = () => {
    setIsPlaying(false);
    if (bestScore === null || moves < bestScore) {
      setBestScore(moves);
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#60a5fa', '#a78bfa', '#34d399', '#f472b6']
      });
    }
  };

  const handleCardClick = (clickedCard: Card) => {
    if (!isPlaying || flippedCards.length === 2 || clickedCard.isMatched || clickedCard.isFlipped) {
      return;
    }

    const newCards = cards.map((card) =>
      card.id === clickedCard.id ? { ...card, isFlipped: true } : card
    );
    setCards(newCards);

    const newFlippedCards = [...flippedCards, clickedCard.id];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      
      const [firstId, secondId] = newFlippedCards;
      const firstCard = newCards.find((c) => c.id === firstId);
      const secondCard = newCards.find((c) => c.id === secondId);

      if (firstCard && secondCard && firstCard.symbol === secondCard.symbol) {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.id === firstId || card.id === secondId
                ? { ...card, isMatched: true }
                : card
            )
          );
          setFlippedCards([]);
          setMatches(matches + 1);
        }, 500);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.id === firstId || card.id === secondId
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <>
      <motion.div
        className="fixed bottom-6 right-42 z-40"
        initial={false}
        whileHover="hover"
      >
        <motion.button
          variants={{
            hover: { scale: 1.1 }
          }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="p-4 bg-pink-600 text-white rounded-full shadow-2xl border-2 border-white/10 shadow-pink-600/20"
          data-testid="button-memory-game"
        >
          <motion.div
            variants={{
              hover: { scale: [1, 1.2, 1] }
            }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            <Brain size={28} />
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
          Memory Game
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
            <div className="relative w-full max-w-2xl bg-card/50 border border-white/10 rounded-3xl p-8 shadow-2xl">
              <button
                onClick={() => {
                  setIsOpen(false);
                  setIsPlaying(false);
                }}
                className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
                data-testid="button-close-memory-game"
              >
                <X size={24} />
              </button>

              {!isPlaying && cards.length === 0 ? (
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="mb-8"
                  >
                    <Brain size={64} className="text-pink-500 mb-4 mx-auto" />
                    <h2 className="text-4xl font-bold mb-2">Memory Match</h2>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      Test your memory! Match all the pairs in as few moves as possible.
                    </p>
                  </motion.div>

                  <button
                    onClick={startGame}
                    className="px-8 py-4 bg-pink-600 text-white rounded-xl font-bold text-lg hover:scale-105 transition-transform flex items-center gap-2 mx-auto"
                    data-testid="button-start-memory"
                  >
                    <Play size={20} fill="currentColor" />
                    Start Game
                  </button>

                  {bestScore !== null && (
                    <div className="flex items-center gap-2 text-yellow-400 font-mono mt-4 justify-center">
                      <Trophy size={20} />
                      Best: {bestScore} moves
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <div className="flex justify-between mb-6 gap-4">
                    <div className="text-center p-3 bg-background/50 rounded-xl flex-1">
                      <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Moves</div>
                      <div className="text-2xl font-bold text-pink-500">{moves}</div>
                    </div>
                    <div className="text-center p-3 bg-background/50 rounded-xl flex-1">
                      <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Matches</div>
                      <div className="text-2xl font-bold text-green-500">{matches}/{SYMBOLS.length}</div>
                    </div>
                    <div className="text-center p-3 bg-background/50 rounded-xl flex-1">
                      <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Time</div>
                      <div className="text-2xl font-bold text-foreground">{timeElapsed}s</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-3 mb-6">
                    {cards.map((card) => (
                      <motion.button
                        key={card.id}
                        onClick={() => handleCardClick(card)}
                        className="aspect-square rounded-xl relative"
                        whileHover={{ scale: card.isMatched ? 1 : 1.05 }}
                        whileTap={{ scale: card.isMatched ? 1 : 0.95 }}
                        data-testid={`card-${card.id}`}
                      >
                        <motion.div
                          className="w-full h-full"
                          initial={false}
                          animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          style={{ transformStyle: "preserve-3d" }}
                        >
                          <div
                            className="absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center"
                            style={{ backfaceVisibility: "hidden" }}
                          >
                            <div className="text-2xl">?</div>
                          </div>
                          <div
                            className={`absolute inset-0 rounded-xl flex items-center justify-center text-4xl ${
                              card.isMatched ? "bg-green-500" : "bg-gradient-to-br from-blue-500 to-cyan-600"
                            }`}
                            style={{ 
                              backfaceVisibility: "hidden", 
                              transform: "rotateY(180deg)" 
                            }}
                          >
                            {card.symbol}
                          </div>
                        </motion.div>
                      </motion.button>
                    ))}
                  </div>

                  {!isPlaying && matches === SYMBOLS.length && (
                    <div className="text-center">
                      <p className="text-2xl font-bold mb-4">Congratulations! 🎉</p>
                      <p className="text-muted-foreground mb-4">
                        You matched all cards in {moves} moves and {timeElapsed} seconds!
                      </p>
                      <button
                        onClick={startGame}
                        className="px-6 py-3 bg-pink-600 text-white rounded-xl font-bold hover:scale-105 transition-transform flex items-center gap-2 mx-auto"
                        data-testid="button-retry-memory"
                      >
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

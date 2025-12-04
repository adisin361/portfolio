import { useState, useEffect } from "react";
import { Layout } from "@/components/layout";
import { SketchyButton } from "@/components/ui/sketchy-button";
import { SketchyCard } from "@/components/ui/sketchy-card";
import { GameHeader } from "@/components/game-header";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Shuffle, RotateCcw, Check, Brain } from "lucide-react";
import { cn } from "@/lib/utils";
import brainImage from "@assets/generated_images/hand_drawn_ink_sketch_of_a_brain.png";

const ICONS = ["🌸", "🐱", "🍎", "🏠", "🎵", "🚗", "⏰", "💡"];

interface Card {
  id: number;
  icon: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export default function MemoryGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [isLocked, setIsLocked] = useState(false);
  const [moves, setMoves] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    // Create pairs
    const gameIcons = [...ICONS.slice(0, 6)]; // Take 6 pairs for 12 cards total
    const pairs = [...gameIcons, ...gameIcons];
    
    const newCards = pairs
      .sort(() => Math.random() - 0.5)
      .map((icon, index) => ({
        id: index,
        icon,
        isFlipped: false,
        isMatched: false,
      }));

    setCards(newCards);
    setFlippedCards([]);
    setIsLocked(false);
    setMoves(0);
    setGameComplete(false);
  };

  const handleCardClick = (id: number) => {
    if (isLocked) return;
    const clickedCard = cards.find(c => c.id === id);
    if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched) return;

    // Flip the card
    const newCards = cards.map(c => 
      c.id === id ? { ...c, isFlipped: true } : c
    );
    setCards(newCards);
    
    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    // Check for match if we have 2 cards flipped
    if (newFlipped.length === 2) {
      setIsLocked(true);
      setMoves(m => m + 1);
      checkForMatch(newFlipped, newCards);
    }
  };

  const checkForMatch = (currentFlipped: number[], currentCards: Card[]) => {
    const [firstId, secondId] = currentFlipped;
    const firstCard = currentCards.find(c => c.id === firstId);
    const secondCard = currentCards.find(c => c.id === secondId);

    if (firstCard?.icon === secondCard?.icon) {
      // Match found
      setTimeout(() => {
        const matchedCards = currentCards.map(c => 
          c.id === firstId || c.id === secondId 
            ? { ...c, isMatched: true, isFlipped: true } 
            : c
        );
        setCards(matchedCards);
        setFlippedCards([]);
        setIsLocked(false);

        // Check win condition
        if (matchedCards.every(c => c.isMatched)) {
          handleWin();
        }
      }, 500);
    } else {
      // No match
      setTimeout(() => {
        const resetCards = currentCards.map(c => 
          c.id === firstId || c.id === secondId 
            ? { ...c, isFlipped: false } 
            : c
        );
        setCards(resetCards);
        setFlippedCards([]);
        setIsLocked(false);
      }, 1000);
    }
  };

  const handleWin = () => {
    setGameComplete(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#a8d5e2', '#f9d5e5', '#e2e2e2']
    });
  };

  return (
    <Layout>
      <GameHeader title="Memory Lane" subtitle="Match the pairs to train your recall" />
      
      <div className="flex-1 p-4 flex flex-col max-w-md mx-auto w-full">
        <div className="flex justify-between items-center mb-6 px-2">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-watercolor-blue/30 flex items-center justify-center border border-ink/10">
              <Brain className="w-5 h-5 text-ink" />
            </div>
            <span className="font-hand text-xl">Moves: {moves}</span>
          </div>
          <SketchyButton onClick={startNewGame} variant="secondary" size="sm" className="text-sm !py-2 !px-3">
            <RotateCcw className="w-4 h-4 mr-1 inline" /> Restart
          </SketchyButton>
        </div>

        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {cards.map((card) => (
            <motion.div
              key={card.id}
              initial={false}
              animate={{ rotateY: card.isFlipped ? 180 : 0 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 260, damping: 20 }}
              className="aspect-[3/4] perspective-1000 cursor-pointer"
              onClick={() => handleCardClick(card.id)}
            >
              <div 
                className={cn(
                  "w-full h-full relative preserve-3d transition-all duration-300",
                  "rounded-xl border-2 border-ink/80 shadow-sm"
                )}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Front (Hidden) */}
                <div 
                  className="absolute inset-0 w-full h-full backface-hidden bg-paper flex items-center justify-center"
                  style={{ 
                    backgroundImage: `url(${brainImage})`, 
                    backgroundSize: '60%', 
                    backgroundRepeat: 'no-repeat', 
                    backgroundPosition: 'center',
                    opacity: 0.8
                  }}
                />
                
                {/* Back (Revealed) */}
                <div 
                  className="absolute inset-0 w-full h-full backface-hidden bg-white flex items-center justify-center text-4xl"
                  style={{ transform: 'rotateY(180deg)' }}
                >
                  {card.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {gameComplete && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-8 p-6 bg-watercolor-green/20 border-sketchy text-center"
            >
              <h3 className="text-2xl font-bold mb-2">Wonderful!</h3>
              <p className="mb-4 font-serif">You completed the challenge in {moves} moves.</p>
              <SketchyButton onClick={startNewGame} className="w-full">
                Play Again
              </SketchyButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}

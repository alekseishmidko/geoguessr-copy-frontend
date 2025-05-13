import type { Dispatch, RefObject, SetStateAction } from "react";
import { useEffect, useRef, useState } from "react";
import type { BalloonProp } from "./BalloonPop";
import confetti from "canvas-confetti";

export const useBalloonPop = ({
  gameHeight,
  gameWidth,
  balloonSpeed,
  balloonInterval,
  balloonSize,
}: {
  gameHeight: number;
  gameWidth: number;
  balloonSpeed: number;
  balloonInterval: number;
  balloonSize: number;
}): {
  balloonId: RefObject<number>;
  balloons: BalloonProp[];
  setBalloons: Dispatch<SetStateAction<BalloonProp[]>>;
  score: number;
  setScore: Dispatch<SetStateAction<number>>;
  started: boolean;
  setStarted: Dispatch<SetStateAction<boolean>>;
  isGameOver: boolean;
  setIsGameOver: Dispatch<SetStateAction<boolean>>;
  isPaused: boolean;
  setIsPaused: Dispatch<SetStateAction<boolean>>;
  handlePop: (balloon: BalloonProp) => void;
  handleStart: () => void;
  togglePause: () => void;
} => {
  const [balloons, setBalloons] = useState<BalloonProp[]>([]);
  const [score, setScore] = useState(0);
  const [started, setStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const balloonId = useRef(0);

  const handlePop = (balloon: BalloonProp) => {
    if (isPaused) {
      return;
    }

    setBalloons((prev) =>
      prev.map((b) => (b.id === balloon.id ? { ...b, popped: true } : b))
    );

    confetti({
      particleCount: 90,
      spread: 200,
      origin: {
        x: balloon.x / gameWidth,
        y: balloon.y / gameHeight,
      },
    });
    setScore((prev) => prev + 1);
  };

  useEffect(() => {
    if (!started || isGameOver || isPaused) {
      return;
    }
    const interval = setInterval(() => {
      const newBalloon: BalloonProp = {
        id: balloonId.current++,
        x: Math.random() * (gameWidth - balloonSize),
        y: gameHeight,
        popped: false,
      };
      setBalloons((prev) => [...prev, newBalloon]);
    }, balloonInterval);
    return () => clearInterval(interval);
  }, [
    started,
    isGameOver,
    isPaused,
    balloonId,
    setBalloons,
    balloonInterval,
    gameWidth,
    balloonSize,
    gameHeight,
  ]);

  useEffect(() => {
    if (!started || isGameOver || isPaused) {
      return;
    }
    const animation = setInterval(() => {
      setBalloons((prev) => {
        const updated = prev.map((balloon) => ({
          ...balloon,
          y: balloon.y - balloonSpeed,
        }));

        const outOfBounds = updated.some(
          (b) => !b.popped && b.y + balloonSize <= 0
        );

        if (outOfBounds) {
          setIsGameOver(true);
          return prev;
        }

        return updated.filter((b) => !b.popped);
      });
    }, 16);

    return () => clearInterval(animation);
  }, [
    started,
    isGameOver,
    isPaused,
    setBalloons,
    setIsGameOver,
    balloonSpeed,
    balloonSize,
  ]);
  const handleStart = () => {
    setScore(0);
    setBalloons([]);
    setIsGameOver(false);
    setStarted(true);
    setIsPaused(false);
  };

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  return {
    balloonId,
    balloons,
    setBalloons,
    score,
    setScore,
    started,
    setStarted,
    isGameOver,
    setIsGameOver,
    isPaused,
    setIsPaused,
    handlePop,
    handleStart,
    togglePause,
  };
};

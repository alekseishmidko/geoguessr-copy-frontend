import { useEffect, useRef, useState } from "react";
import type { Pipe } from "./FlappyBird";

interface UseFlappyBirdParams {
  birdXInit: number;
  birdYInit: number;
  jump: number;
  gravity: number;
  birdWidth: number;
  birdHeight: number;
  gameHeight: number;
  gameWidth: number;
  pipeWidth: number;
  pipeGap: number;
  pipeInterval: number;
}

interface UseFlappyBirdReturn {
  birdY: number;
  setBirdY: React.Dispatch<React.SetStateAction<number>>;
  gameRef: React.RefObject<HTMLDivElement | null>;
  isPaused: boolean;
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
  isRunning: boolean;
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
  isStartScreen: boolean;
  setIsStartScreen: React.Dispatch<React.SetStateAction<boolean>>;
  velocity: number;
  setVelocity: React.Dispatch<React.SetStateAction<number>>;
  pipes: Pipe[];
  setPipes: React.Dispatch<React.SetStateAction<Pipe[]>>;
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  handleJump: () => void;
  handlePause: () => void;
  resetGame: () => void;
}

export const useFlappyBird = ({
  birdYInit,
  jump,
  gravity,
  birdWidth,
  birdHeight,
  gameHeight,
  gameWidth,
  pipeWidth,
  birdXInit,
  pipeGap,
  pipeInterval,
}: UseFlappyBirdParams): UseFlappyBirdReturn => {
  const [birdY, setBirdY] = useState(birdYInit);
  const [velocity, setVelocity] = useState(0);
  const [pipes, setPipes] = useState<Pipe[]>([]);
  const [isRunning, setIsRunning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [score, setScore] = useState(0);
  const [isStartScreen, setIsStartScreen] = useState(true);
  const gameRef = useRef<HTMLDivElement>(null);

  const handleJump = () => {
    if (!isRunning || isStartScreen) return;
    if (!isPaused) {
      setVelocity(jump);
    }
  };

  const handlePause = () => {
    setIsPaused((prev) => !prev);
  };

  const resetGame = () => {
    setBirdY(birdYInit);
    setVelocity(0);
    setPipes([]);
    setScore(0);
    setIsRunning(true);
    setIsPaused(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "KeyP" && isRunning && !isStartScreen) {
        setIsPaused((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isRunning, isStartScreen]);

  useEffect(() => {
    let animationFrame: number;

    const update = () => {
      if (!isPaused && !isStartScreen) {
        setVelocity((v) => v + gravity);
        setBirdY((y) => Math.min(gameHeight - birdHeight, y + velocity));

        setPipes((prev) => {
          const updated = prev
            .map((pipe) => ({ ...pipe, x: pipe.x - 2 }))
            .filter((pipe) => pipe.x + pipeWidth > 0);

          for (const pipe of updated) {
            if (pipe.x + pipeWidth === birdXInit) {
              setScore((s) => s + 0.5);
            }
          }

          return updated;
        });

        for (const pipe of pipes) {
          const withinPipeX =
            pipe.x < birdXInit + birdWidth && pipe.x + pipeWidth > birdXInit;
          const outsideGapY =
            birdY < pipe.gapTop || birdY + birdHeight > pipe.gapTop + pipeGap;
          if (withinPipeX && outsideGapY) {
            setIsRunning(false);
            return;
          }
        }
      }

      animationFrame = requestAnimationFrame(update);
    };

    if (isRunning && !isStartScreen) {
      animationFrame = requestAnimationFrame(update);
    }

    return () => cancelAnimationFrame(animationFrame);
  }, [
    isRunning,
    isPaused,
    velocity,
    birdY,
    pipes,
    isStartScreen,
    gravity,
    gameHeight,
    birdHeight,
    pipeWidth,
    birdXInit,
    birdWidth,
    pipeGap,
  ]);

  useEffect(() => {
    if (!isRunning || isPaused || isStartScreen) return;
    const interval = setInterval(() => {
      const gapTop = Math.floor(Math.random() * (gameHeight - pipeGap - 100));
      setPipes((prev) => [...prev, { x: gameWidth, gapTop }]);
    }, pipeInterval);
    return () => clearInterval(interval);
  }, [
    isRunning,
    isPaused,
    isStartScreen,
    pipeInterval,
    gameHeight,
    pipeGap,
    gameWidth,
  ]);

  return {
    birdY,
    setBirdY,
    gameRef,
    isPaused,
    setIsPaused,
    isRunning,
    setIsRunning,
    isStartScreen,
    setIsStartScreen,
    velocity,
    setVelocity,
    pipes,
    setPipes,
    score,
    setScore,
    handleJump,
    handlePause,
    resetGame,
  };
};

"use client";
import confetti from "canvas-confetti";
import { useEffect, useRef, useState } from "react";
import { Balloon } from "./components/Ball";

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const BALLOON_SIZE = 50;
const BALLOON_INTERVAL = 1000;
const BALLOON_SPEED = 2;

export type BalloonProp = {
  id: number;
  x: number;
  y: number;
  popped: boolean;
};

export function BalloonPop() {
  const [balloons, setBalloons] = useState<BalloonProp[]>([]);
  const [score, setScore] = useState(0);
  const balloonId = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const newBalloon: BalloonProp = {
        id: balloonId.current++,
        x: Math.random() * (GAME_WIDTH - BALLOON_SIZE),
        y: GAME_HEIGHT,
        popped: false,
      };
      setBalloons((prev) => [...prev, newBalloon]);
    }, BALLOON_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const animation = setInterval(() => {
      setBalloons((prev) =>
        prev
          .map((balloon) => ({ ...balloon, y: balloon.y - BALLOON_SPEED }))
          .filter((b) => b.y + BALLOON_SIZE > 0 && !b.popped)
      );
    }, 16);
    return () => clearInterval(animation);
  }, []);

  const handlePop = (balloon: BalloonProp) => {
    setBalloons((prev) =>
      prev.map((b) => (b.id === balloon.id ? { ...b, popped: true } : b))
    );
    console.log(balloon);
    confetti({
      particleCount: 90,
      spread: 200,
      origin: {
        x: balloon.x / 900,
        y: balloon.y / 900,
      },
    });
    setScore((prev) => prev + 1);
  };

  return (
    <div
      className="relative bg-sky-100 mx-auto mt-10 border border-gray-300 overflow-hidden"
      style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
    >
      {balloons.map((balloon) => (
        <Balloon
          key={balloon.id}
          {...balloon}
          balloonHeight={BALLOON_SIZE}
          balloonWidth={BALLOON_SIZE}
          onClick={() => handlePop(balloon)}
        />
      ))}
      <div className="absolute top-4 left-4 text-xl font-bold">
        Score: {score}
      </div>
    </div>
  );
}

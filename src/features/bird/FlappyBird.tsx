"use client";

import { Bird } from "@/features/bird/components/Bird";
import { RestartScreen } from "@/features/bird/components/RestartScreen";
import { useEffect, useRef, useState } from "react";
import { Score } from "./components/Score";
import { PipeBody } from "./components/PipeBody";

const GRAVITY = 0.5;
const JUMP = -10;
const PIPE_WIDTH = 20;
const PIPE_GAP = 420;
const PIPE_INTERVAL = 1500;
const GAME_HEIGHT = 900;
const GAME_WIDTH = 1200;
const BIRD_WIDTH = 64;
const BIRD_HEIGHT = 32;
const BIRD_X = 150;
export type Pipe = { x: number; gapTop: number };
export function FlappyBird() {
  const [birdY, setBirdY] = useState(300);
  const [velocity, setVelocity] = useState(0);
  const [pipes, setPipes] = useState<Pipe[]>([]);
  const [isRunning, setIsRunning] = useState(true);
  const [score, setScore] = useState(0);
  const gameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrame: number;

    const update = () => {
      setVelocity((v) => v + GRAVITY);
      setBirdY((y) => Math.min(GAME_HEIGHT - BIRD_HEIGHT, y + velocity));

      setPipes((prev) => {
        const updated = prev
          .map((pipe) => ({ ...pipe, x: pipe.x - 2 }))
          .filter((pipe) => pipe.x + PIPE_WIDTH > 0);

        // увеличиваем счёт при прохождении трубы
        for (const pipe of updated) {
          if (pipe.x + PIPE_WIDTH === BIRD_X) {
            setScore((s) => s + 0.5);
          }
        }

        return updated;
      });

      // collision check
      for (const pipe of pipes) {
        const withinPipeX =
          pipe.x < BIRD_X + BIRD_WIDTH && pipe.x + PIPE_WIDTH > BIRD_X;
        const outsideGapY =
          birdY < pipe.gapTop || birdY + BIRD_HEIGHT > pipe.gapTop + PIPE_GAP;
        if (withinPipeX && outsideGapY) {
          setIsRunning(false);
          return;
        }
      }

      animationFrame = requestAnimationFrame(update);
    };

    if (isRunning) {
      animationFrame = requestAnimationFrame(update);
    }

    return () => cancelAnimationFrame(animationFrame);
  }, [isRunning, velocity, birdY, pipes]);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      const gapTop = Math.floor(Math.random() * (GAME_HEIGHT - PIPE_GAP - 100));
      setPipes((prev) => [...prev, { x: GAME_WIDTH, gapTop }]);
    }, PIPE_INTERVAL);
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleJump = () => {
    if (!isRunning) {
      setBirdY(300);
      setVelocity(0);
      setPipes([]);
      setScore(0);
      setIsRunning(true);
    } else {
      setVelocity(JUMP);
    }
  };

  return (
    <div
      ref={gameRef}
      onClick={handleJump}
      className="relative mx-auto mt-10 border border-gray-300"
      style={{
        width: GAME_WIDTH,
        height: GAME_HEIGHT,
        overflow: "hidden",
        backgroundImage: `url('/city.png')`,
        backgroundSize: "cover",
      }}
    >
      <Bird birdY={birdY} width={BIRD_WIDTH} height={BIRD_HEIGHT} />

      {pipes.map((pipe, idx) => (
        <div key={idx}>
          <PipeBody
            key={`top-${idx}`}
            gameHeight={GAME_HEIGHT}
            pipe={pipe}
            pipeGap={PIPE_GAP}
            pipeWidth={PIPE_WIDTH}
            variant="top"
          />
          <PipeBody
            key={`bottom-${idx}`}
            gameHeight={GAME_HEIGHT}
            pipe={pipe}
            pipeGap={PIPE_GAP}
            pipeWidth={PIPE_WIDTH}
            variant="bottom"
          />
        </div>
      ))}

      <Score score={score} />

      {!isRunning && <RestartScreen />}
    </div>
  );
}

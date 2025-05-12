"use client";

import { Balloon } from "./components/Ball";
import { StartScreen } from "./components/StartScreen";
import { GameOverScreen } from "./components/GameOverScreen";
import { Button } from "@/shared/ui-kit/button/Button";
import { useBalloonPop } from "./useBalloonPop";
import type { FC } from "react";

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

export const BalloonPop: FC = () => {
  const {
    balloons,
    handlePop,
    handleStart,
    isGameOver,
    isPaused,
    score,

    started,
    togglePause,
  } = useBalloonPop({
    gameHeight: GAME_HEIGHT,
    gameWidth: GAME_WIDTH,
    balloonInterval: BALLOON_INTERVAL,
    balloonSize: BALLOON_SIZE,
    balloonSpeed: BALLOON_SPEED,
  });

  return (
    <div
      className="relative bg-sky-100 mx-auto mt-10 border border-gray-300 overflow-hidden"
      style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
    >
      {!started && <StartScreen onStart={handleStart} />}

      {balloons.map((balloon) => (
        <Balloon
          key={balloon.id}
          {...balloon}
          balloonHeight={BALLOON_SIZE}
          balloonWidth={BALLOON_SIZE}
          onClick={() => handlePop(balloon)}
        />
      ))}

      <div className="absolute top-4 left-4 text-xl font-bold text-gray-800">
        Score: {score}
      </div>

      {started && !isGameOver && (
        <div className="absolute top-4 right-4">
          <Button onClick={togglePause}>{isPaused ? "Resume" : "Pause"}</Button>
        </div>
      )}

      {isGameOver && <GameOverScreen handleStart={handleStart} score={score} />}
    </div>
  );
};

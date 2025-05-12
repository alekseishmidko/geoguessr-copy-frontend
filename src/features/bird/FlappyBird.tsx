"use client";

import { Bird } from "@/features/bird/components/Bird";
import { RestartScreen } from "@/features/bird/components/RestartScreen";

import { Score } from "./components/Score";
import { PipeBody } from "./components/PipeBody";
import { Button } from "@/shared/ui-kit/button/Button";
import { PauseScreen } from "./components/PausedScreen";
import { StartScreen } from "./components/StartScreen";
import { useFlappyBird } from "./useFlappyBird";
import type { FC } from "react";

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
const BIRD_Y = 300;

export type Pipe = { x: number; gapTop: number };

export const FlappyBird: FC = () => {
  const {
    birdY,
    gameRef,
    handleJump,
    handlePause,
    isPaused,
    isRunning,
    isStartScreen,
    pipes,
    resetGame,
    score,

    setIsStartScreen,
  } = useFlappyBird({
    birdHeight: BIRD_HEIGHT,
    birdWidth: BIRD_WIDTH,
    birdXInit: BIRD_X,
    birdYInit: BIRD_Y,
    gameHeight: GAME_HEIGHT,
    gameWidth: GAME_WIDTH,
    gravity: GRAVITY,
    jump: JUMP,
    pipeGap: PIPE_GAP,
    pipeInterval: PIPE_INTERVAL,
    pipeWidth: PIPE_WIDTH,
  });
  return (
    <div
      ref={gameRef}
      onClick={isRunning && !isStartScreen ? handleJump : undefined}
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

      <div className="flex justify-between gap-4 absolute pt-4 px-4 w-full">
        <Score score={score} />
        <Button onClick={handlePause}>Pause</Button>
      </div>

      {isStartScreen && (
        <StartScreen
          onStart={() => {
            setIsStartScreen(false);
          }}
        />
      )}

      {isPaused && !isStartScreen && <PauseScreen handlePause={handlePause} />}

      {!isRunning && !isStartScreen && (
        <RestartScreen score={score} onRestart={resetGame} />
      )}
    </div>
  );
};

import { Button } from "@/shared/ui-kit/button/Button";
import type { FC } from "react";

type Props = {
  score: number;
  handleStart: () => void;
};
export const GameOverScreen: FC<Props> = ({ handleStart, score }) => {
  return (
    <div className="absolute inset-0 bg-black/70 text-white flex flex-col items-center justify-center z-10">
      <div className="text-4xl font-bold mb-4">💥 Game Over!</div>
      <div className="text-2xl mb-6">Score: {score}</div>
      <Button onClick={handleStart}>Restart</Button>
    </div>
  );
};

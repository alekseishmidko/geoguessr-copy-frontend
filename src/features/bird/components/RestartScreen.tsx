import { Button } from "@/shared/ui-kit/button/Button";
import type { FC } from "react";
import React, { useEffect } from "react";

interface RestartScreenProps {
  score: number;
  onRestart: () => void;
}
const SCORE = "SCORE";
export const RestartScreen: FC<RestartScreenProps> = ({ score, onRestart }) => {
  const maximalScore = localStorage.getItem(SCORE) ?? 0;

  useEffect(() => {
    if (+score > +maximalScore) {
      localStorage.setItem(SCORE, score.toString());
    }
  }, [score, maximalScore]);

  return (
    <div className="absolute inset-0 bg-black/60 z-50 flex items-center justify-center pointer-events-none">
      <div className="flex flex-col items-center pointer-events-auto">
        {
          <div className="text-white text-5xl font-bold mb-4">
            Record: {maximalScore}
          </div>
        }
        <div className="text-white text-5xl font-bold mb-4">Score: {score}</div>
        <Button onClick={onRestart}>Restart</Button>
      </div>
    </div>
  );
};

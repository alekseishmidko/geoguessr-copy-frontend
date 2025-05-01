import { Button } from "@/shared/ui-kit/button/Button";
import React, { FC } from "react";

interface RestartScreenProps {
  score: number;
  onRestart: () => void;
}
export const RestartScreen: FC<RestartScreenProps> = ({ score, onRestart }) => {
  return (
    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center z-50 pointer-events-none">
      <div className="text-white text-5xl font-bold mb-4">Score: {score}</div>
      <Button onClick={onRestart}>Restart</Button>
    </div>
  );
};

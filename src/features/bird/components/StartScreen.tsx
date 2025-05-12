"use client";

import { Button } from "@/shared/ui-kit/button/Button";
import type { FC } from "react";

type StartScreenProps = {
  onStart: () => void;
};

export const StartScreen: FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="absolute inset-0 bg-black/60 z-50 flex flex-col items-center justify-center pointer-events-none">
      <div className="flex flex-col items-center pointer-events-auto">
        <h1 className="text-white text-5xl font-bold mb-6">Flappy Bird</h1>
        <Button onClick={onStart}>Start</Button>
      </div>
    </div>
  );
};

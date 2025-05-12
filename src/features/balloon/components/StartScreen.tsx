"use client";

import type { FC } from "react";
import { Button } from "@/shared/ui-kit/button/Button"; // если нет — замени на обычную <button>

type Props = {
  onStart: () => void;
};

export const StartScreen: FC<Props> = ({ onStart }) => {
  return (
    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center z-10">
      <h1 className="text-white text-5xl font-bold mb-6">🎈 Balloon Pop!</h1>
      <Button onClick={onStart} className="px-6 py-2 text-lg">
        Start
      </Button>
    </div>
  );
};

"use client";

import type { FC } from "react";

type PauseScreenProps = {
  handlePause: () => void;
};

export const PauseScreen: FC<PauseScreenProps> = ({ handlePause }) => {
  return (
    <div className="absolute inset-0 bg-black/60 z-50 flex flex-col items-center justify-center text-white">
      <div className="text-4xl font-bold mb-4">Paused</div>
      <button
        className="w-12 h-12 flex gap-2 cursor-pointer"
        onClick={handlePause}
      >
        <div className="w-4 h-12 bg-white rounded-sm" />
        <div className="w-4 h-12 bg-white rounded-sm" />
      </button>
    </div>
  );
};

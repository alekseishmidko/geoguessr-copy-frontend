import type { FC } from "react";
import React from "react";
type BirdProps = {
  birdY: number;
  birdUrl?: string;
  width?: number;
  height?: number;
};
export const Bird: FC<BirdProps> = ({
  birdY,
  birdUrl = `url('/plane.png')`,
  height = 32,
  width = 64,
}) => {
  return (
    <div
      className="absolute w-16 h-8 bg-no-repeat bg-contain"
      style={{
        top: birdY,
        left: 150,
        backgroundImage: birdUrl,
        height,
        width,
      }}
    ></div>
  );
};

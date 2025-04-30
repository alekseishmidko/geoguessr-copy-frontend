import { FC } from "react";
import { Pipe } from "../FlappyBird";
type Props = {
  pipeGap: number;
  pipeWidth: number;
  gameHeight: number;
  pipe: Pipe;
  variant: "top" | "bottom";
};
export const PipeBody: FC<Props> = ({
  pipeGap,
  gameHeight,
  pipeWidth,
  pipe,
  variant,
}) => {
  const height =
    variant === "top" ? pipe.gapTop : gameHeight - pipe.gapTop - pipeGap;
  const top = variant === "top" ? 0 : pipe.gapTop + pipeGap;
  return (
    <div
      className="absolute bg-green-600"
      style={{
        left: pipe.x,
        top: top,
        width: pipeWidth,
        height,
      }}
    ></div>
  );
};

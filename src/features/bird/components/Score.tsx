import { FC } from "react";
type ScoreProps = { score: number };
export const Score: FC<ScoreProps> = ({ score }) => {
  return (
    <span className="absolute top-4 left-4 text-2xl font-bold">
      Score: {score}
    </span>
  );
};

import { BalloonProp } from "../BalloonPop";

export const Balloon: React.FC<
  BalloonProp & {
    balloonWidth?: number;
    balloonHeight?: number;
    onClick: () => void;
  }
> = (props) => {
  const { id, x, y, balloonHeight = 50, balloonWidth = 50, onClick } = props;

  return (
    <div
      key={id}
      onClick={onClick}
      className={`absolute rounded-full cursor-pointer  bg-red-400`}
      style={{
        width: balloonWidth,
        height: balloonHeight,
        left: x,
        top: y,
        transition: "top 0.016s linear",
      }}
    />
  );
};

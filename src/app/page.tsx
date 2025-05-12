import { PRIVATE_URL } from "@/shared/router";
import { Button } from "@/shared/ui-kit/button/Button";
import Link from "next/link";
import type { FC } from "react";

const HomePage: FC = () => {
  return (
    <div className="flex mx-auto flex-col gap-4 justify-center items-center  mt-10">
      <Link href={PRIVATE_URL.box()}>
        <Button variant="danger">Box</Button>
      </Link>
      <Link href={PRIVATE_URL.bird()}>
        <Button variant="danger">Bird</Button>
      </Link>
      <Link href={PRIVATE_URL.balloon()}>
        <Button variant="danger">Balloon</Button>
      </Link>
    </div>
  );
};
export default HomePage;

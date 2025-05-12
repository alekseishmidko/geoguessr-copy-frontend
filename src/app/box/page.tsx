import { DragNDropBoxes } from "@/features/drag-n-drop-boxes/DragNDropBoxes";
import type { FC } from "react";

const BoxPage: FC = () => {
  return (
    <div className="flex justify-center mt-10">
      <DragNDropBoxes />
    </div>
  );
};
export default BoxPage;

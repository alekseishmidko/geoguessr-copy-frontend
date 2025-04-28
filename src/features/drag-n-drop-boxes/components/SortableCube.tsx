import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const SortableCube = ({
  id,
  color,
  disabled,
}: {
  id: string;
  color: string;
  disabled?: boolean; // сделаем optional
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: disabled ? 0.5 : isDragging ? 0.5 : 1,
    backgroundColor: color,
    cursor: disabled ? "not-allowed" : "grab",
  };

  return (
    <div
      ref={setNodeRef}
      {...(!disabled ? listeners : {})}
      {...(!disabled ? attributes : {})}
      style={style}
      className="w-24 h-24 flex items-center justify-center text-white font-bold rounded shadow"
    >
      {id}
    </div>
  );
};

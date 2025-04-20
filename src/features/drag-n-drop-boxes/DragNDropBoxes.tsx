"use client";

import { useState } from "react";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

import { COLORS } from "@/shared/constants/colors";
import { SortableCube } from "./components/SortableCube";
export const DragNDropBoxes = () => {
  const [items, setItems] = useState<string[]>(COLORS);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = items.indexOf(String(active.id));
      const newIndex = items.indexOf(String(over?.id));
      setItems(arrayMove(items, oldIndex, newIndex));
    }
  };
  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <div className="flex flex-col gap-4 items-center">
          {items &&
            items.map((color) => <SortableCube key={color} id={color} />)}
        </div>
      </SortableContext>
    </DndContext>
  );
};

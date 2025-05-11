"use client";

import { DndContext, closestCenter, DragOverlay } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { SortableCube } from "./components/SortableCube";
import { Button } from "@/shared/ui-kit/button/Button";
import { useDragAndDrop } from "./useDragAndDrop";
import { FC } from "react";

export type Cols = "0" | "1" | "2" | "3";

export type Item = {
  id: string;
  color: string;
};

export const DragNDropBoxes: FC = () => {
  const {
    activeItem,
    handleDragEnd,
    handleDragStart,
    handleRestart,
    isGameOver,
    items,
  } = useDragAndDrop();

  return (
    <div className="flex flex-col items-center">
      <DndContext
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-4 gap-6 mt-10">
          {Object.entries(items).map(([colKey, column]) => (
            <SortableContext
              key={colKey}
              items={column.map((item) => item.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="flex flex-col items-center gap-2 border border-gray-300 p-4 rounded bg-white min-h-[200px]">
                {column.map(({ id, color }) => (
                  <SortableCube
                    key={id}
                    id={id}
                    color={color}
                    disabled={isGameOver}
                  />
                ))}
              </div>
            </SortableContext>
          ))}
        </div>

        <DragOverlay>
          {activeItem && (
            <SortableCube id={activeItem.id} color={activeItem.color} />
          )}
        </DragOverlay>
      </DndContext>

      {isGameOver && (
        <Button className="mt-8" onClick={handleRestart}>
          Restart
        </Button>
      )}
    </div>
  );
};

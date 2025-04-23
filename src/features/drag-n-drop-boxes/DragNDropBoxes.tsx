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
type Cols = "0" | "1" | "2" | "3";

type Item = {
  id: string;
  color: string;
};
const MAX_ITEMS_PER_COLUMN = 4;
const COLUMNS: Cols[] = ["0", "1", "2", "3"];
const generateColorPool = (colors: string[], maxPerColor: number): Item[] => {
  const pool: Item[] = [];

  const colorCount: Record<string, number> = {};

  while (true) {
    const availableColors = colors.filter(
      (color) => (colorCount[color] || 0) < maxPerColor
    );

    if (availableColors.length === 0) break;

    const color =
      availableColors[Math.floor(Math.random() * availableColors.length)];

    const count = colorCount[color] || 0;
    colorCount[color] = count + 1;

    pool.push({
      id: `${color}-${count}`,
      color,
    });
  }

  // Перемешиваем финальный пул
  return pool.sort(() => Math.random() - 0.5);
};

// TODO сделать чтобы было ограничение на количество кубов в столбце,
// рандомные комбинации кубов вначале
// анимация передвижения куба
// улучшить типизацию
// юзать useId или что то такое

export const DragNDropBoxes = () => {
  const cubePool = generateColorPool(COLORS, MAX_ITEMS_PER_COLUMN);
  const [items, setItems] = useState<Record<Cols, Item[]>>(() => {
    const result: Partial<Record<Cols, Item[]>> = {};

    COLUMNS.forEach((col, i) => {
      const start = i * MAX_ITEMS_PER_COLUMN;
      const end = start + MAX_ITEMS_PER_COLUMN;

      result[col] =
        col === "0"
          ? cubePool.slice(start, end - 1)
          : cubePool.slice(start, end);
    });

    return result as Record<Cols, Item[]>;
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    let sourceCol: Cols | undefined;
    let targetCol: Cols | undefined;

    for (const col in items) {
      const typedCol = col as Cols;
      if (items[typedCol].some((item) => item.id === activeId)) {
        sourceCol = typedCol;
      }
      if (items[typedCol].some((item) => item.id === overId)) {
        targetCol = typedCol;
      }
    }

    if (sourceCol === undefined || targetCol === undefined) return;

    const sourceItems = [...items[sourceCol]];
    const targetItems = [...items[targetCol]];

    const draggedItemIndex = sourceItems.findIndex((i) => i.id === activeId);
    const targetIndex = targetItems.findIndex((i) => i.id === overId);

    if (sourceCol !== targetCol && targetItems.length >= MAX_ITEMS_PER_COLUMN) {
      return;
    }

    const [movedItem] = sourceItems.splice(draggedItemIndex, 1);

    if (sourceCol === targetCol) {
      const updated = arrayMove(targetItems, draggedItemIndex, targetIndex);
      setItems({ ...items, [sourceCol]: updated });
    } else {
      targetItems.splice(targetIndex, 0, movedItem);
      setItems({
        ...items,
        [sourceCol]: sourceItems,
        [targetCol]: targetItems,
      });
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-4 gap-6 mt-10">
        {Object.entries(items).map(([colKey, column]) => (
          <SortableContext
            key={colKey}
            items={column.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            <div
              className={`flex flex-col items-center gap-2 border border-gray-300 p-4 rounded bg-white`}
            >
              {column.map(({ id, color }) => (
                <SortableCube key={id} id={id} color={color} />
              ))}
            </div>
          </SortableContext>
        ))}
      </div>
    </DndContext>
  );
};

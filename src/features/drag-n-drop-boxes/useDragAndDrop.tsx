import { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { Cols, Item } from "./DragNDropBoxes";
import { useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import confetti from "canvas-confetti";

import { COLORS } from "@/shared/constants/colors";
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

  return pool.sort(() => Math.random() - 0.5);
};

const allColumnsHaveUniformColors = (items: Record<Cols, Item[]>) => {
  return Object.values(items).every((column) => {
    if (column.length === 0) return true;
    const firstColor = column[0].color;
    return column.every((item) => item.color === firstColor);
  });
};
export const useDragAndDrop = () => {
  const generateInitialItems = () => {
    const cubePool = generateColorPool(COLORS, MAX_ITEMS_PER_COLUMN);
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
  };
  const [items, setItems] =
    useState<Record<Cols, Item[]>>(generateInitialItems);
  const [activeItem, setActiveItem] = useState<Item | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const handleDragStart = (event: DragStartEvent) => {
    const activeId = event.active.id as string;

    for (const col in items) {
      const item = items[col as Cols].find((el) => el.id === activeId);
      if (item) {
        setActiveItem(item);
        break;
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveItem(null);
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
      const newState = { ...items, [sourceCol]: updated };
      setItems(newState);

      if (allColumnsHaveUniformColors(newState)) {
        setIsGameOver(true);
      }
    } else {
      targetItems.splice(targetIndex, 0, movedItem);
      const newState = {
        ...items,
        [sourceCol]: sourceItems,
        [targetCol]: targetItems,
      };
      setItems(newState);

      if (allColumnsHaveUniformColors(newState)) {
        setIsGameOver(true);
        confetti({
          particleCount: 1150,
          spread: 250,
          origin: { y: 0.5 },
        });
      }
    }
  };

  const handleRestart = () => {
    setItems(generateInitialItems());
    setIsGameOver(false);
    setActiveItem(null);
  };
  return {
    handleDragEnd,
    handleDragStart,
    isGameOver,
    handleRestart,
    items,
    activeItem,
  };
};

// @ts-nocheck
import Big from "big.js";

export interface IGridSourceItem {
  id: string;
  order: string;
  size: number;
}

export interface IGridSourceItemOrderBig {
  id: string
  order: Big;
  size: number;
}

export interface IOrderItem {
  id: string;
  order?: Big;
}

export interface IMatrixCell {
  filled: boolean;
  current?: IOrderItem;
  left?: IOrderItem;
  right?: IOrderItem;
}

export type Matrix = IMatrixCell[][];

export interface ShortLayout extends IGridSourceItem {
  y: number;
  x: number;
  w: number;
  h: number;
  i: string;
}

//Грид на 2 не правильные соотношениея изображения из-за того что они присылают картинку 1004:494
export const gridSizeMap: Record<1 | 2 | 4, Record<"w" | "h", 1 | 2>> = {
  1: { w: 1, h: 1 },
  2: { w: 2, h: 1 },
  4: { w: 2, h: 2 },
};

const range = (from: number, to: number): number[] => {
  const result = [];

  let n = from;

  while (n < to) {
    result.push(n);
    n += 1;
  }

  return result;
};

const sortBig = (a: IGridSourceItemOrderBig, b: IGridSourceItemOrderBig): number => {
  if (a.order.lt(b.order)) {
    return -1;
  } else if (a.order.gt(b.order)) {
    return 1;
  } else {
    return 0;
  }
};

export const getOrderItem = (index: number, items: IGridSourceItemOrderBig[]): IOrderItem => {
  const item = items?.[index];
  if (!item) {
    return undefined;
  }
  return ({
    id: item?.id,
    order: item?.order,
  });
};

export const computeGameGridLayout = (items: IGridSourceItem[], gridWidth: number, onlyMatrix = false): {
  matrix: Matrix;
  layout: ShortLayout[];
} => {
  // matrix
  const matrix: Matrix = [];
  const layout: ShortLayout[] = [];

  let prevGameOrderItem: IOrderItem;
  let currentGameOrderItem: IOrderItem;
  let nextGameOrderItem: IOrderItem;

  let currentX = 0;
  let currentY = 0;

  // change current position by clock arrow
  const move = () => {
    if (!matrix[currentY][currentX].filled) {
      matrix[currentY][currentX] = {
        ...matrix[currentY][currentX],
        left: prevGameOrderItem,
        right: currentGameOrderItem,
      };
    }

    if (currentX === gridWidth - 1) {
      currentY++;
      currentX = 0;

      return;
    }

    currentX++;
  };

  const canPut = (size: number): boolean => {
    const row = matrix[currentY];

    // row not exist now
    if (!row) {
      return true;
    }

    // cell filled
    if (isFilledMatrixCell(row[currentX])) {
      return false;
    }

    const hasSpaceLeft = (gridWidth - currentX) >= gridSizeMap[size].w;

    if (!hasSpaceLeft) {
      return false;
    }

    let width = gridSizeMap[size].w;

    while (width) {
      if (isFilledMatrixCell(row[currentX + width - 1])) {
        return false;
      }

      width--;
    }

    return true;
  };

  const initRow = (rowNumber: number) => {
    if (!matrix[rowNumber]) {
      matrix[rowNumber] = range(0, gridWidth).map((_) => (
        {
          filled: false,
          left: currentGameOrderItem,
          right: undefined,
        }
      ));
    }
  };

  const genMatrixCell = (current: IOrderItem, left: IOrderItem, right: IOrderItem): IMatrixCell => ({
    filled: true,
    current: current,
    left: left,
    right: right,
  });

  const isFilledMatrixCell = (matrixCell: IMatrixCell): boolean => matrixCell.filled;

  const putToMatrix = (size: number) => {
    initRow(currentY);

    const matrixCell = genMatrixCell(currentGameOrderItem, prevGameOrderItem, nextGameOrderItem);

    if (size === 4) {
      initRow(currentY + 1);

      matrix[currentY][currentX] = matrixCell;
      matrix[currentY][currentX + 1] = matrixCell;

      matrix[currentY + 1][currentX] = matrixCell;
      matrix[currentY + 1][currentX + 1] = matrixCell;

      return;
    }

    if (size === 2) {
      matrix[currentY][currentX] = matrixCell;
      matrix[currentY][currentX + 1] = matrixCell;

      return;
    }

    // size 1
    matrix[currentY][currentX] = matrixCell;
  };

  const put = (size: number, item: IGridSourceItemOrderBig) => {
    putToMatrix(size);

    if (!onlyMatrix) {
      layout.push({
        id: item.id,
        i: item.id,
        y: currentY,
        x: currentX,
        order: item.order.toString(),
        size,
        ...gridSizeMap[size],
      });
    }
  };

  const sorted = items
    .map(item => ({ ...item, order: Big(item.order) }))
    .sort(sortBig);

  sorted.forEach((item, index) => {
    nextGameOrderItem = getOrderItem(index + 1, sorted);
    prevGameOrderItem = getOrderItem(index - 1, sorted);
    currentGameOrderItem = getOrderItem(index, sorted);

    while (!canPut(item.size)) {
      move();
    }
    put(item.size, item);
  });

  return {
    matrix,
    layout,
  };
};
